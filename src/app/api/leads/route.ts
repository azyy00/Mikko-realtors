import { NextRequest, NextResponse } from "next/server";
import type { LeadPayload } from "@/lib/leads";

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_REQUEST_BYTES = 10_000;
const LIMIT_WINDOW_MS = 10 * 60 * 1000;
const LIMIT_MAX_REQUESTS = 5;
const requestsByIp = new Map<string, number[]>();

function validText(value: unknown, max: number, required = false) {
  if (typeof value !== "string") return !required;
  const length = value.trim().length;
  return required ? length > 0 && length <= max : length <= max;
}

function allowedRequest(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (requestsByIp.get(ip) || []).filter((time) => now - time < LIMIT_WINDOW_MS);
  if (recent.length >= LIMIT_MAX_REQUESTS) return false;
  recent.push(now);
  requestsByIp.set(ip, recent);
  return true;
}

function isValidLead(value: unknown): value is LeadPayload {
  if (!value || typeof value !== "object") return false;
  const lead = value as Record<string, unknown>;
  return (
    (lead.form === "contact" || lead.form === "home-valuation") &&
    validText(lead.name, 120, true) &&
    typeof lead.email === "string" &&
    lead.email.length <= 254 &&
    EMAIL.test(lead.email) &&
    validText(lead.phone, 40) &&
    validText(lead.message, 2_000) &&
    validText(lead.intent, 80) &&
    validText(lead.address, 250) &&
    validText(lead.website, 0)
  );
}

export async function POST(request: NextRequest) {
  if (request.headers.get("content-type")?.split(";")[0] !== "application/json") {
    return NextResponse.json({ error: "Unsupported request format." }, { status: 415 });
  }
  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  }
  if (!allowedRequest(request)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  const body = await request.text();
  if (body.length > MAX_REQUEST_BYTES) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  }

  let lead: unknown;
  try {
    lead = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!isValidLead(lead)) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  // A filled honeypot is treated as success so bots cannot learn the rule.
  if (lead.website) return NextResponse.json({ ok: true });

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json(
      { error: "Lead delivery is not configured yet. Please call or email Mikko directly." },
      { status: 503 },
    );
  }
  try {
    const url = new URL(webhook);
    if (url.protocol !== "https:") throw new Error("Lead webhook must use HTTPS");
    const response = await fetch(url, {
      method: "POST",
      redirect: "error",
      signal: AbortSignal.timeout(10_000),
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "mikko-lucernas-real-estate-leads/1.0",
      },
      body: JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }),
    });
    if (!response.ok) throw new Error(`Webhook returned ${response.status}`);
  } catch {
    return NextResponse.json(
      { error: "We couldn't send your request. Please call or email Mikko directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
