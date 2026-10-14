# Facebook Page → blog

## Status

The connector is implemented but is inactive until the site's server has valid
Page credentials and the Meta app is subscribed to the client's Page.
It supports a **Facebook business Page**, not a personal profile, group, or
Instagram/TikTok/YouTube feed. No credentials are included in the repository.

## What visitors see

- Published, public, visible posts authored by the configured Page populate
  the blog index and homepage teaser, newest first.
- Each entry has a stable `/blog/facebook-PAGE_ID_POST_ID` article URL, the original
  caption, publication date, available cover photo, and a link to the original.
- Blog previews and article media use portrait **9:16** frames. Images and
  self-hosted videos use `object-contain` so their edges are not cropped; legacy
  landscape media is letterboxed, not stretched or re-encoded.
- Facebook video posts and Reels have an in-article **Play video** control. It
  loads Facebook's embedded player on demand, using the attachment's video ID
  (which is different from the feed post ID). The original Facebook link remains
  available if privacy restrictions, removed content, or browser settings prevent
  embedding. Facebook controls streaming quality and may require another play
  gesture; the site does not download or recompress videos.
- Photo-only posts use a neutral title; captions are not expanded into invented
  articles. For mixed-media albums, the first recognized video is the article's
  player; the original-post link exposes the complete album.
- Private, hidden, expired, unpublished, scheduled, visitor-authored and
  audience-restricted posts are excluded. Unknown public visibility is excluded.
- Sample articles have been removed. Only Facebook posts appear in the index,
  homepage teaser, and sitemap; former sample article URLs return not found.

This is a **live mirror**, not a permanent content archive. The index checks the
latest 5 feed items; filtering and Meta limits can reduce the number shown.
This small batch avoids failures seen with attachment-heavy 100-item requests.
The index does not currently paginate through older Facebook posts.
Older article URLs fetch their post by ID. Deleted/unavailable posts are removed
when Meta's current data is fetched. Photos use Meta CDN URLs, which can expire.
There is no database, source-file rewriting, or background filesystem storage.

## Required setup

1. Confirm the client's Facebook Page URL and numeric Page ID.
2. The Page owner must authorize a Meta app and obtain a Page access token.
   This implementation reads the Page feed: follow Meta's documented
   `pages_read_engagement` and `pages_read_user_content` requirements.
   Page feed webhooks also require `pages_manage_metadata` and `pages_show_list`.
   App Review, advanced access and business verification requirements depend
   on the app's use case and who manages the Page. Development-mode testing does
   not establish production access.
3. Set these **server-only** environment variables in local `.env.local` and in
   the production hosting dashboard:

   | Variable | Value |
   | --- | --- |
   | `FACEBOOK_PAGE_ID` | Numeric ID of the authorized Page |
   | `FACEBOOK_PAGE_ACCESS_TOKEN` | Page token with the required read permissions |
   | `FACEBOOK_APP_SECRET` | Secret of the app used for the token and webhook |
   | `FACEBOOK_WEBHOOK_VERIFY_TOKEN` | A long random value you generate for verification |
   | `FACEBOOK_GRAPH_API_VERSION` | Supported version; currently defaults to `v26.0` |

   Never use `NEXT_PUBLIC_` for these values. Do not send credentials in chat or
   commit them. Tokens may expire or be revoked; maintain them in the host's
   secret settings and monitor the server's generic refresh-failure warnings.

4. Deploy to an HTTPS domain, then configure the Meta app's **Page** webhook:
   - Callback: `https://YOUR_DOMAIN/api/facebook/webhook`
   - Verify token: the same `FACEBOOK_WEBHOOK_VERIFY_TOKEN`
   - Subscribe to the **feed** field.
5. Install/subscribe that same app on the Page through the Page's
   `subscribed_apps` edge with `subscribed_fields=feed`, using Meta's Graph API
   Explorer or your approved authorization flow. Configuring the app-level
   webhook alone is not enough.
6. Publish a public test Page post with a caption. Check the webhook delivery
   in Meta, visit `/blog`, and open its article. Edit and delete the test post to
   verify updates and removals. Confirm no Page token appears in page source.

## Timing and reliability

Verified feed notifications expire the shared Facebook cache and invalidate the
homepage, blog index, article pages and sitemap. The next page request reads
current Facebook content. This is near-real-time, dependent on Meta delivery;
it is not an instant browser push. An already-open tab needs navigation/refresh.

Without a webhook delivery, reads use a five-minute revalidation interval.
This is request-driven caching, not a scheduled job. A request may see the prior
cache value while background revalidation occurs. On provider failures,
no sample posts are substituted; a failed direct article read uses the page error
state rather than returning a false permanent 404.

Webhook authenticity uses HMAC-SHA256 over the exact request bytes. Unverified
requests are rejected. Other Page IDs are ignored. Duplicate deliveries only
invalidate caches, so they cannot create duplicate articles. No detached task
is launched after the webhook responds.

Use a Next.js deployment supporting server routes and shared Data Cache. Multiple
self-hosted instances require a shared cache/invalidation strategy. Static file
hosting alone cannot run this integration.

## Verification

`npm run test:facebook` checks filtering, signature validation, request limits,
webhook verification/invalidation, video attachment mapping, unsafe media URLs,
deduplication, credential handling and Graph
request behavior using fixtures. `npm run build` verifies the Next.js integration.
Real authorization and end-to-end Meta delivery still require the client's Page.

## Official references

- [Page feed fields, permissions and limits](https://developers.facebook.com/docs/graph-api/reference/page/feed/)
- [Facebook embedded video player](https://developers.facebook.com/docs/plugins/embedded-video-player/)
- [Webhook verification and signature validation](https://developers.facebook.com/docs/graph-api/webhooks/getting-started/)
- [Page subscriptions and feed notifications](https://developers.facebook.com/docs/graph-api/webhooks/getting-started/webhooks-for-pages/)
- [Next.js 15 cache invalidation](https://nextjs.org/docs/15/app/api-reference/functions/revalidateTag)
