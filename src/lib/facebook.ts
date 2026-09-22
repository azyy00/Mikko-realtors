import "server-only";
import { createHmac } from "node:crypto";
import { cache } from "react";
import { FACEBOOK_CACHE_TAG, facebookPostId, toFacebookBlogPost } from "./facebook-posts";
import type { BlogPost } from "./blog";

const FIELDS = [
  "id", "from{id}", "message", "created_time", "permalink_url",
  "full_picture", "status_type", "is_published", "is_hidden", "is_expired",
  "privacy", "targeting",
].join(",");

function configuration() {
  const pageId = process.env.FACEBOOK_PAGE_ID?.trim();
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN?.trim();
  const secret = process.env.FACEBOOK_APP_SECRET?.trim();
  const version = process.env.FACEBOOK_GRAPH_API_VERSION?.trim() || "v26.0";
  if (!pageId || !token || !secret) return null;
  if (!/^\d{1,30}$/.test(pageId) || !/^v\d+\.0$/.test(version)) return null;
  return { pageId, token, secret, version };
}

async function graphRead(path: string, config: NonNullable<ReturnType<typeof configuration>>) {
  const url = new URL("https://graph.facebook.com/" + config.version + "/" + path);
  url.searchParams.set("fields", FIELDS);
  if (path.endsWith("/feed")) url.searchParams.set("limit", "100");
  url.searchParams.set("appsecret_proof", createHmac("sha256", config.secret).update(config.token).digest("hex"));
  const response = await fetch(url, {
    headers: { Authorization: "Bearer " + config.token },
    redirect: "error",
    signal: AbortSignal.timeout(6000),
    next: { revalidate: 300, tags: [FACEBOOK_CACHE_TAG] },
  });
  const payload = await response.json();
  if (!response.ok || payload?.error) {
    // Do not log provider payloads, tokens, request headers, or secret-bearing URLs.
    if (response.status === 404 ||
        (payload?.error?.code === 100 && payload?.error?.error_subcode === 33)) return null;
    throw new Error("Facebook could not be reached or authorized.");
  }
  return payload as unknown;
}

export const getFacebookPosts = cache(async (): Promise<BlogPost[]> => {
  const config = configuration();
  if (!config) return [];
  try {
    const payload = await graphRead(config.pageId + "/feed", config);
    if (!payload || typeof payload !== "object" || !("data" in payload) || !Array.isArray(payload.data))
      throw new Error("Invalid Facebook response");
    const posts = new Map<string, BlogPost>();
    for (const item of payload.data) {
      const post = toFacebookBlogPost(item, config.pageId);
      if (post) posts.set(post.slug, post);
    }
    return [...posts.values()].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  } catch {
    console.warn("Facebook blog refresh unavailable. Check Page credentials and Meta permissions.");
    return [];
  }
});

export const getFacebookPost = cache(async (slug: string): Promise<BlogPost | null> => {
  const config = configuration();
  if (!config) return null;
  const id = facebookPostId(slug, config.pageId);
  if (!id) return null;
  // Fetch by ID so older article links keep working outside the recent-feed window.
  // Transient failures propagate to the page error boundary rather than a false 404.
  const payload = await graphRead(id, config);
  return toFacebookBlogPost(payload, config.pageId);
});
