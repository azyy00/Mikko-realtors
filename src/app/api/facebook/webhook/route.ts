import { revalidatePath, revalidateTag } from "next/cache";
import { FACEBOOK_CACHE_TAG, hasFacebookFeedChange } from "@/lib/facebook-posts";
import { matchesSecret, readLimitedBody, validFacebookSignature } from "@/lib/facebook-security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const expected = process.env.FACEBOOK_WEBHOOK_VERIFY_TOKEN;
  if (!expected) return new Response("Facebook webhook is not configured.", { status: 503 });
  const params = new URL(request.url).searchParams;
  const challenge = params.get("hub.challenge");
  if (params.get("hub.mode") !== "subscribe" || !challenge ||
      !matchesSecret(params.get("hub.verify_token") || "", expected)) {
    return new Response("Verification failed.", { status: 403 });
  }
  return new Response(challenge, { headers: { "Content-Type": "text/plain", "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const secret = process.env.FACEBOOK_APP_SECRET;
  const pageId = process.env.FACEBOOK_PAGE_ID;
  if (!secret || !pageId) return new Response("Facebook webhook is not configured.", { status: 503 });
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json")
    return new Response("JSON required.", { status: 415 });
  let body: Uint8Array;
  try {
    body = await readLimitedBody(request, 1024 * 1024);
  } catch (error) {
    return new Response("Invalid request body.", { status: error instanceof RangeError ? 413 : 400 });
  }
  if (!validFacebookSignature(body, request.headers.get("x-hub-signature-256"), secret))
    return new Response("Invalid signature.", { status: 403 });
  let payload: unknown;
  try {
    payload = JSON.parse(new TextDecoder().decode(body));
  } catch {
    return new Response("Invalid JSON.", { status: 400 });
  }
  if (hasFacebookFeedChange(payload, pageId)) {
    revalidateTag(FACEBOOK_CACHE_TAG);
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/blog/[slug]", "page");
    revalidatePath("/sitemap.xml");
  }
  // No detached background work: acknowledge only after invalidation completes.
  return Response.json({ received: true });
}
