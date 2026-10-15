import "server-only";
import { db } from "@/lib/db";

// Dates are grouped in Las Vegas time so "today" matches Mikko's day.
const TZ = "America/Los_Angeles";

export const RANGES = [7, 30, 90] as const;
export type Range = (typeof RANGES)[number];

export const LEAD_FORMS = ["guide", "contact", "home-valuation"] as const;
export type LeadFormFilter = (typeof LEAD_FORMS)[number] | "all";

export type Lead = {
  id: string;
  created_at: string;
  form: string;
  name: string;
  email: string;
  phone: string | null;
  intent: string | null;
  address: string | null;
  message: string | null;
  page: string | null;
};

type Count = { label: string; count: number };

export async function getDashboard(range: Range) {
  const sql = await db();
  const since = `${range - 1} days`;

  const [totals, daily, pages, referrers, devices, guides] = await Promise.all([
    sql`
      SELECT
        (SELECT count(*) FROM page_views WHERE created_at >= date_trunc('day', now() AT TIME ZONE ${TZ}) AT TIME ZONE ${TZ} - ${since}::interval) AS views,
        (SELECT count(DISTINCT visitor) FROM page_views WHERE created_at >= date_trunc('day', now() AT TIME ZONE ${TZ}) AT TIME ZONE ${TZ} - ${since}::interval) AS visitors,
        (SELECT count(*) FROM leads WHERE created_at >= date_trunc('day', now() AT TIME ZONE ${TZ}) AT TIME ZONE ${TZ} - ${since}::interval) AS leads,
        (SELECT count(*) FROM leads WHERE form = 'guide' AND created_at >= date_trunc('day', now() AT TIME ZONE ${TZ}) AT TIME ZONE ${TZ} - ${since}::interval) AS downloads`,
    sql`
      WITH days AS (
        SELECT generate_series(
          (now() AT TIME ZONE ${TZ})::date - ${since}::interval,
          (now() AT TIME ZONE ${TZ})::date,
          '1 day'
        )::date AS day
      )
      SELECT to_char(d.day, 'YYYY-MM-DD') AS day,
        (SELECT count(DISTINCT visitor) FROM page_views p WHERE (p.created_at AT TIME ZONE ${TZ})::date = d.day) AS visitors,
        (SELECT count(*) FROM page_views p WHERE (p.created_at AT TIME ZONE ${TZ})::date = d.day) AS views,
        (SELECT count(*) FROM leads l WHERE (l.created_at AT TIME ZONE ${TZ})::date = d.day) AS leads
      FROM days d ORDER BY d.day`,
    sql`
      SELECT path AS label, count(*) AS count FROM page_views
      WHERE created_at >= now() - ${`${range} days`}::interval
      GROUP BY path ORDER BY count DESC LIMIT 8`,
    sql`
      SELECT coalesce(referrer, 'Direct / unknown') AS label, count(DISTINCT visitor) AS count FROM page_views
      WHERE created_at >= now() - ${`${range} days`}::interval
      GROUP BY 1 ORDER BY count DESC LIMIT 6`,
    sql`
      SELECT device AS label, count(DISTINCT visitor) AS count FROM page_views
      WHERE created_at >= now() - ${`${range} days`}::interval
      GROUP BY device ORDER BY count DESC`,
    sql`
      SELECT coalesce(intent, 'Guide') AS label, count(*) AS count FROM leads
      WHERE form = 'guide' AND created_at >= now() - ${`${range} days`}::interval
      GROUP BY 1 ORDER BY count DESC`,
  ]);

  const num = (value: unknown) => Number(value) || 0;
  const counts = (rows: Record<string, unknown>[]): Count[] =>
    rows.map((row) => ({ label: String(row.label), count: num(row.count) }));
  const t = (totals as Record<string, unknown>[])[0];

  return {
    totals: {
      visitors: num(t.visitors),
      views: num(t.views),
      leads: num(t.leads),
      downloads: num(t.downloads),
    },
    daily: (daily as Record<string, unknown>[]).map((row) => ({
      day: String(row.day),
      visitors: num(row.visitors),
      views: num(row.views),
      leads: num(row.leads),
    })),
    pages: counts(pages as Record<string, unknown>[]),
    referrers: counts(referrers as Record<string, unknown>[]),
    devices: counts(devices as Record<string, unknown>[]),
    guides: counts(guides as Record<string, unknown>[]),
  };
}

export async function getLeads(form: LeadFormFilter, limit = 500) {
  const sql = await db();
  const rows =
    form === "all"
      ? await sql`SELECT * FROM leads ORDER BY created_at DESC LIMIT ${limit}`
      : await sql`SELECT * FROM leads WHERE form = ${form} ORDER BY created_at DESC LIMIT ${limit}`;
  return (rows as Record<string, unknown>[]).map((row) => ({
    ...row,
    id: String(row.id),
    created_at: new Date(row.created_at as string).toISOString(),
  })) as Lead[];
}
