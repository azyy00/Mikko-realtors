import "server-only";
import { neon } from "@neondatabase/serverless";

type Sql = ReturnType<typeof neon>;

let client: Sql | null = null;
let schemaReady: Promise<void> | null = null;

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

// Created on first use so `next build` works before DATABASE_URL exists.
function getSql() {
  if (!client) client = neon(process.env.DATABASE_URL!);
  return client;
}

// Tables are created on demand (idempotent), so a fresh database needs no
// separate migration step.
function ensureSchema() {
  if (!schemaReady) {
    const sql = getSql();
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS leads (
          id bigserial PRIMARY KEY,
          created_at timestamptz NOT NULL DEFAULT now(),
          form text NOT NULL,
          name text NOT NULL,
          email text NOT NULL,
          phone text,
          intent text,
          address text,
          message text,
          page text
        )`;
      await sql`CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC)`;
      await sql`
        CREATE TABLE IF NOT EXISTS page_views (
          id bigserial PRIMARY KEY,
          created_at timestamptz NOT NULL DEFAULT now(),
          path text NOT NULL,
          referrer text,
          device text,
          visitor text NOT NULL
        )`;
      await sql`CREATE INDEX IF NOT EXISTS page_views_created_at_idx ON page_views (created_at DESC)`;
    })().catch((error) => {
      schemaReady = null;
      throw error;
    });
  }
  return schemaReady;
}

export async function db() {
  await ensureSchema();
  return getSql();
}
