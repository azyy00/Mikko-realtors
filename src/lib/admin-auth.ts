import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "lvp_admin";
export const ADMIN_MAX_AGE = 60 * 60 * 24 * 30;

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

// The session value is derived from the password, so changing
// ADMIN_PASSWORD in Vercel signs everyone out.
export function sessionToken() {
  return createHmac("sha256", process.env.ADMIN_PASSWORD!).update("lvp-admin-session-v1").digest("hex");
}

function same(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function passwordMatches(input: string) {
  return adminConfigured() && same(input, process.env.ADMIN_PASSWORD!);
}

export async function isAdmin() {
  if (!adminConfigured()) return false;
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  return Boolean(value) && same(value!, sessionToken());
}
