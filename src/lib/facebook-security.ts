import { createHmac, timingSafeEqual } from "node:crypto";

export function matchesSecret(received: string, expected: string): boolean {
  if (!expected) return false;
  const a = Buffer.from(received);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function validFacebookSignature(
  body: Uint8Array,
  signature: string | null,
  appSecret: string,
): boolean {
  if (!appSecret || !signature || !/^sha256=[a-f0-9]{64}$/i.test(signature)) return false;
  const actual = createHmac("sha256", appSecret).update(body).digest();
  const supplied = Buffer.from(signature.slice(7), "hex");
  return actual.length === supplied.length && timingSafeEqual(actual, supplied);
}

export async function readLimitedBody(request: Request, maxBytes: number): Promise<Uint8Array> {
  if (Number(request.headers.get("content-length")) > maxBytes)
    throw new RangeError("Request too large");
  if (!request.body) return new Uint8Array();
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > maxBytes) {
        await reader.cancel();
        throw new RangeError("Request too large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return Buffer.concat(chunks, length);
}
