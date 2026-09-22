import type { BlogPost } from "./blog";

export const FACEBOOK_CACHE_TAG = "facebook-posts";

function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

export function facebookPostId(slug: string, pageId: string): string | null {
  if (!/^\d{1,30}$/.test(pageId)) return null;
  const match = /^facebook-(\d{1,30}_\d{1,30})$/.exec(slug);
  return match?.[1].startsWith(pageId + "_") ? match[1] : null;
}

function facebookUrl(value: unknown, image = false): string | undefined {
  if (typeof value !== "string") return;
  try {
    const url = new URL(value);
    const domains = image ? ["fbcdn.net", "fbsbx.com", "facebook.com"] : ["facebook.com"];
    if (
      url.protocol !== "https:" ||
      url.username || url.password ||
      (url.port && url.port !== "443") ||
      !domains.some(domain => url.hostname === domain || url.hostname.endsWith("." + domain))
    ) return;
    return url.href;
  } catch {
    return;
  }
}

/** Only publish the configured Page's public, visible, published posts. */
export function toFacebookBlogPost(value: unknown, pageId: string): BlogPost | null {
  const post = record(value);
  if (!post || typeof post.id !== "string") return null;
  if (!facebookPostId("facebook-" + post.id, pageId)) return null;
  if (record(post.from)?.id !== pageId || post.is_published !== true ||
      post.is_hidden !== false || post.is_expired === true) return null;
  // Fail closed if public visibility is unknown. A Page token may read private,
  // scheduled, targeted, or unpublished material that visitors must never see.
  if (record(post.privacy)?.value !== "EVERYONE") return null;
  const targeting = record(post.targeting);
  if (targeting && Object.values(targeting).some(v =>
    Array.isArray(v) ? v.length > 0 : v !== null && v !== undefined && v !== "" && v !== 0 && v !== false
  )) return null;

  const date = typeof post.created_time === "string" ? new Date(post.created_time) : null;
  if (!date || !Number.isFinite(date.getTime()) || date.getTime() > Date.now()) return null;
  const message = typeof post.message === "string" ? post.message.trim() : "";
  const coverImage = facebookUrl(post.full_picture, true);
  if (!message && !coverImage) return null;
  const sourceUrl = facebookUrl(post.permalink_url) || "https://www.facebook.com/" + post.id;
  const isVideo = post.status_type === "added_video";
  const headline = message.split(/\r?\n/).find(line => line.trim()) || "A new update from Mikko";
  const title = headline.length > 110 ? headline.slice(0, 107).trimEnd() + "…" : headline;
  const excerpt = message.replace(/\s+/g, " ").slice(0, 200) || "See Mikko’s latest update on Facebook.";

  return {
    slug: "facebook-" + post.id,
    title,
    excerpt,
    category: "Facebook update",
    date: date.toISOString(),
    readMinutes: Math.max(1, Math.ceil(message.split(/\s+/).length / 200)),
    coverSeed: "",
    coverImage: coverImage || "/profile/mikko.png",
    source: { platform: "facebook", url: sourceUrl, isVideo },
    body: message ? message.split(/\n\s*\n/).filter(Boolean) : ["View this update on Mikko’s Facebook Page."],
    cta: "Have a question about this update? Get in touch with Mikko.",
  };
}

/** Webhooks invalidate cached reads; repeated deliveries cannot duplicate posts. */
export function hasFacebookFeedChange(value: unknown, pageId: string): boolean {
  const payload = record(value);
  if (payload?.object !== "page" || !Array.isArray(payload.entry)) return false;
  return payload.entry.some(value => {
    const entry = record(value);
    if (entry?.id !== pageId) return false;
    if (Array.isArray(entry.changed_fields) && entry.changed_fields.includes("feed")) return true;
    return Array.isArray(entry.changes) &&
      entry.changes.some(change => record(change)?.field === "feed");
  });
}
