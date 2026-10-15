import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { db, hasDatabase } from "@/lib/db";

export const runtime = "nodejs";

const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|headless|lighthouse|vercel/i;

function deviceOf(ua: string) {
  if (/ipad|tablet/i.test(ua)) return "tablet";
  if (/mobi|iphone|android/i.test(ua)) return "mobile";
  return "desktop";
}

// External referrer host only (no full URLs, no own-site navigation).
function referrerOf(value: unknown, host: string | null) {
  if (typeof value !== "string" || !value) return null;
  try {
    const ref = new URL(value).hostname.replace(/^www\./, "");
    if (host && ref === host.replace(/^www\./, "").split(":")[0]) return null;
    return ref.slice(0, 120);
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  const ua = request.headers.get("user-agent") || "";
  // Only the live site counts; local dev and preview deploys share this database.
  const live =
    process.env.NODE_ENV === "production" &&
    (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production");
  if (!live || !hasDatabase() || BOT.test(ua)) return new NextResponse(null, { status: 204 });

  let body: { path?: unknown; referrer?: unknown };
  try {
    body = JSON.parse((await request.text()).slice(0, 2_000));
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  const path = typeof body.path === "string" ? body.path.slice(0, 300) : "";
  if (!path.startsWith("/") || path.startsWith("/admin") || path.startsWith("/api")) {
    return new NextResponse(null, { status: 204 });
  }

  // Anonymous visitor key: a one-way hash that changes every day, so unique
  // visitors can be counted per day without cookies or storing IP addresses.
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";
  const day = new Date().toISOString().slice(0, 10);
  const visitor = createHash("sha256")
    .update(`${day}|${ip}|${ua}|${process.env.DATABASE_URL}`)
    .digest("hex")
    .slice(0, 24);

  try {
    const sql = await db();
    await sql`
      INSERT INTO page_views (path, referrer, device, visitor)
      VALUES (${path}, ${referrerOf(body.referrer, request.headers.get("host"))}, ${deviceOf(ua)}, ${visitor})`;
  } catch (error) {
    console.error("Page view save failed", error);
  }
  return new NextResponse(null, { status: 204 });
}
