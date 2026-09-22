import test from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import * as crypto from "node:crypto";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

// Exercise the real TypeScript modules without requiring a running Next server.
function load(file, dependencies = {}, env = {}, fetcher = globalThis.fetch) {
  const source = readFileSync(new URL("../" + file, import.meta.url), "utf8");
  const js = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(js, {
    exports: module.exports, module,
    require(name) {
      if (name in dependencies) return dependencies[name];
      throw new Error("Unexpected import: " + name);
    },
    process: { env }, Buffer, URL, Response, Request, TextDecoder, AbortSignal,
    Uint8Array, RangeError, console: { warn() {} }, fetch: fetcher,
  }, { filename: file });
  return module.exports;
}

const posts = load("src/lib/facebook-posts.ts");
const security = load("src/lib/facebook-security.ts", { "node:crypto": crypto });
const pageId = "12345";
const published = {
  id: "12345_67890", from: { id: pageId }, message: "An update from Mikko\n\nA second paragraph.",
  created_time: "2025-01-15T12:00:00+0000",
  is_published: true, is_hidden: false, is_expired: false,
  privacy: { value: "EVERYONE" }, targeting: {},
  permalink_url: "https://www.facebook.com/12345/posts/67890",
  full_picture: "https://scontent.example.fbcdn.net/photo.jpg",
};
const env = {
  FACEBOOK_PAGE_ID: pageId, FACEBOOK_PAGE_ACCESS_TOKEN: "test-page-token",
  FACEBOOK_APP_SECRET: "test-app-secret", FACEBOOK_WEBHOOK_VERIFY_TOKEN: "test-verifier",
};
const event = { object: "page", entry: [{ id: pageId, changes: [{ field: "feed", value: { item: "post", verb: "add" } }] }] };
const sign = (body) => "sha256=" + createHmac("sha256", env.FACEBOOK_APP_SECRET).update(body).digest("hex");

test("published Page text, date, image, and stable source URL become a blog entry", () => {
  const post = posts.toFacebookBlogPost(published, pageId);
  assert.equal(post.slug, "facebook-12345_67890");
  assert.equal(post.body.length, 2);
  assert.equal(post.coverImage, published.full_picture);
  assert.equal(post.source.url, published.permalink_url);
  assert.equal(post.date, "2025-01-15T12:00:00.000Z");
  assert.equal(posts.toFacebookBlogPost({ ...published, message: "Edited" }, pageId).slug, post.slug);
});

test("private, scheduled, hidden, expired, targeted, and other authors' posts are excluded", () => {
  for (const patch of [
    { is_published: false }, { is_published: undefined }, { is_hidden: true },
    { is_hidden: undefined }, { is_expired: true }, { privacy: { value: "SELF" } },
    { privacy: undefined }, { targeting: { countries: ["US"] } },
    { from: { id: "54321" } }, { id: "54321_67890" },
    { created_time: "invalid" }, { created_time: "2999-01-01T00:00:00Z" },
  ]) assert.equal(posts.toFacebookBlogPost({ ...published, ...patch }, pageId), null);
});

test("unsafe URLs use safe fallbacks; text stays plain; video links point to the source", () => {
  const post = posts.toFacebookBlogPost({
    ...published, message: "<script>alert(1)</script>", status_type: "added_video",
    full_picture: "https://fbcdn.net.evil.example/photo.jpg", permalink_url: "javascript:alert(1)",
  }, pageId);
  assert.equal(post.coverImage, "/profile/mikko.png");
  assert.equal(post.source.url, "https://www.facebook.com/12345_67890");
  assert.equal(post.source.isVideo, true);
  assert.equal(post.body[0], "<script>alert(1)</script>");
  assert.equal(posts.facebookPostId("facebook-12345_1/../me", pageId), null);
  assert.equal(posts.facebookPostId("facebook-54321_1", pageId), null);
});

test("photo-only updates retain the real image without invented article text", () => {
  const post = posts.toFacebookBlogPost({ ...published, message: "" }, pageId);
  assert.equal(post.coverImage, published.full_picture);
  assert.equal(post.title, "A new update from Mikko");
  assert.equal(posts.toFacebookBlogPost({ ...published, message: "", full_picture: null }, pageId), null);
});

test("webhook signatures cover exact UTF-8 bytes and reject tampering", () => {
  const raw = Buffer.from('{"message":"Mikko’s update 🏠"}');
  assert.ok(security.validFacebookSignature(raw, sign(raw), env.FACEBOOK_APP_SECRET));
  assert.equal(security.validFacebookSignature(Buffer.from("{}"), sign(raw), env.FACEBOOK_APP_SECRET), false);
  assert.equal(security.validFacebookSignature(raw, "sha256=1234", env.FACEBOOK_APP_SECRET), false);
  assert.equal(security.validFacebookSignature(raw, sign(raw), ""), false);
  assert.equal(security.matchesSecret("", ""), false);
  assert.equal(security.matchesSecret("wrong", env.FACEBOOK_WEBHOOK_VERIFY_TOKEN), false);
});

test("streamed payload limits apply even without Content-Length", async () => {
  const request = new Request("https://example.test", {
    method: "POST", body: new ReadableStream({
      start(controller) { controller.enqueue(new Uint8Array(5)); controller.enqueue(new Uint8Array(5)); controller.close(); },
    }), duplex: "half",
  });
  await assert.rejects(security.readLimitedBody(request, 8), RangeError);
});

function route(config = env) {
  const invalidated = [];
  const handlers = load("src/app/api/facebook/webhook/route.ts", {
    "next/cache": {
      revalidateTag: (...args) => invalidated.push(["tag", ...args]),
      revalidatePath: (...args) => invalidated.push(["path", ...args]),
    },
    "@/lib/facebook-posts": posts, "@/lib/facebook-security": security,
  }, config);
  return { ...handlers, invalidated };
}

function webhook(value, signature) {
  const body = JSON.stringify(value);
  return new Request("https://example.test/api/facebook/webhook", {
    method: "POST", headers: { "Content-Type": "application/json", "X-Hub-Signature-256": signature || sign(body) },
    body,
  });
}

test("verification requires the configured token and returns the raw challenge", async () => {
  const handler = route();
  const url = "https://example.test/api/facebook/webhook?hub.mode=subscribe&hub.challenge=123&hub.verify_token=";
  assert.equal((await handler.GET(new Request(url + "wrong"))).status, 403);
  assert.equal(await (await handler.GET(new Request(url + env.FACEBOOK_WEBHOOK_VERIFY_TOKEN))).text(), "123");
  assert.equal((await route({}).GET(new Request(url))).status, 503);
});

test("valid Page events invalidate blog, homepage, articles and sitemap; repeats are idempotent", async () => {
  const handler = route();
  assert.equal((await handler.POST(webhook(event))).status, 200);
  assert.equal(handler.invalidated.length, 5);
  assert.ok(handler.invalidated.some(entry => entry[0] === "tag" && entry[1] === "facebook-posts"));
  assert.equal((await handler.POST(webhook(event))).status, 200);
  assert.equal(handler.invalidated.length, 10);
});

test("forged signatures, unrelated Pages and non-feed events cannot invalidate content", async () => {
  const handler = route();
  assert.equal((await handler.POST(webhook(event, "sha256=" + "0".repeat(64)))).status, 403);
  assert.equal((await handler.POST(webhook({ ...event, entry: [{ ...event.entry[0], id: "54321" }] }))).status, 200);
  assert.equal((await handler.POST(webhook({ object: "page", entry: [{ id: pageId, changed_fields: ["messages"] }] }))).status, 200);
  assert.equal(handler.invalidated.length, 0);
});

test("field-name-only notifications are handled and unconfigured hooks fail closed", async () => {
  const handler = route();
  assert.equal((await handler.POST(webhook({ object: "page", entry: [{ id: pageId, changed_fields: ["feed"] }] }))).status, 200);
  assert.equal(handler.invalidated.length, 5);
  assert.equal((await route({}).POST(webhook(event))).status, 503);
});

function graph(fetcher, config = env) {
  return load("src/lib/facebook.ts", {
    "server-only": {}, "node:crypto": crypto,
    react: { cache: fn => fn }, "./facebook-posts": posts,
  }, config, fetcher);
}

test("feed fetch keeps credentials on the server, deduplicates, and uses bounded cache refresh", async () => {
  let called = false;
  const client = graph(async (url, options) => {
    called = true;
    assert.equal(url.origin, "https://graph.facebook.com");
    assert.equal(url.pathname, "/v26.0/12345/feed");
    assert.equal(url.searchParams.has("access_token"), false);
    assert.equal(options.headers.Authorization, "Bearer test-page-token");
    assert.equal(options.next.revalidate, 300);
    assert.equal(options.next.tags[0], "facebook-posts");
    return Response.json({ data: [published, published, { ...published, is_published: false }] });
  });
  const result = await client.getFacebookPosts();
  assert.ok(called);
  assert.equal(result.length, 1);
  assert.equal(JSON.stringify(result).includes("test-page-token"), false);
});

test("an unconfigured site makes no Graph requests and an outage preserves local-blog fallback", async () => {
  let called = false;
  const disabled = graph(async () => { called = true; throw new Error("unexpected"); }, {});
  assert.equal((await disabled.getFacebookPosts()).length, 0);
  assert.equal(called, false);
  const broken = graph(async () => Response.json({ error: { code: 190 } }, { status: 400 }));
  assert.equal((await broken.getFacebookPosts()).length, 0);
  await assert.rejects(broken.getFacebookPost("facebook-12345_67890"), /could not be reached/);
});

test("article lookup rejects foreign IDs without fetching and fetches older posts by ID", async () => {
  let requests = 0;
  const client = graph(async url => {
    requests++;
    assert.equal(url.pathname, "/v26.0/12345_67890");
    return Response.json(published);
  });
  assert.equal(await client.getFacebookPost("facebook-999_1"), null);
  assert.equal(requests, 0);
  assert.equal((await client.getFacebookPost("facebook-12345_67890")).slug, "facebook-12345_67890");
  assert.equal(requests, 1);
});
