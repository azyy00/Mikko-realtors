import Image from "next/image";
import Link from "next/link";
import {
  DownloadSimple,
  EnvelopeSimple,
  FileArrowDown,
  SignOut,
} from "@phosphor-icons/react/dist/ssr";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { hasDatabase } from "@/lib/db";
import {
  getDashboard,
  getLeads,
  LEAD_FORMS,
  RANGES,
  type LeadFormFilter,
  type Range,
} from "@/lib/analytics";
import LoginForm from "./LoginForm";
import { logout } from "./actions";

export const dynamic = "force-dynamic";

const FORM_LABELS: Record<string, string> = {
  guide: "Guide download",
  contact: "Contact",
  "home-valuation": "Home valuation",
};

const dateTime = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});
const shortDay = new Intl.DateTimeFormat("en-US", { timeZone: "UTC", month: "short", day: "numeric" });

type SearchParams = Promise<{ range?: string; form?: string; error?: string }>;

export default async function AdminPage({ searchParams }: { searchParams: SearchParams }) {
  if (!adminConfigured() || !hasDatabase()) {
    return (
      <Shell>
        <div className="max-w-md rounded-xl3 bg-white p-8 text-ink">
          <h1 className="display text-3xl">Dashboard not set up</h1>
          <p className="mt-3 text-muted">
            Add {!adminConfigured() && <code className="font-semibold text-ink">ADMIN_PASSWORD</code>}
            {!adminConfigured() && !hasDatabase() && " and "}
            {!hasDatabase() && <code className="font-semibold text-ink">DATABASE_URL</code>} in
            Vercel → Settings → Environment Variables, then redeploy.
          </p>
        </div>
      </Shell>
    );
  }

  const params = await searchParams;
  if (!(await isAdmin())) {
    return (
      <Shell>
        <LoginForm error={params.error ? "That password isn't right." : undefined} />
      </Shell>
    );
  }

  const range = (RANGES.find((r) => String(r) === params.range) ?? 30) as Range;
  const form = ((LEAD_FORMS as readonly string[]).includes(params.form ?? "")
    ? params.form
    : "all") as LeadFormFilter;
  const [data, leads] = await Promise.all([getDashboard(range), getLeads(form)]);

  const href = (next: { range?: Range; form?: LeadFormFilter }) => {
    const query = new URLSearchParams();
    const r = next.range ?? range;
    const f = next.form ?? form;
    if (r !== 30) query.set("range", String(r));
    if (f !== "all") query.set("form", f);
    const qs = query.toString();
    return qs ? `/admin?${qs}` : "/admin";
  };

  const stats = [
    { label: "Visitors", value: data.totals.visitors, note: "unique per day" },
    { label: "Page views", value: data.totals.views },
    { label: "Leads", value: data.totals.leads, note: "all forms" },
    { label: "Guide downloads", value: data.totals.downloads },
  ];

  return (
    <div className="min-h-[100dvh] bg-paper text-ink">
      <header className="bg-navy-950 text-white">
        {/* One row on every screen: brand and title left, actions right. */}
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-8 sm:py-4">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Image src="/logo.png" alt="" width={412} height={236} className="h-7 w-auto shrink-0 min-[400px]:h-8 sm:h-9" />
            <span className="truncate font-display text-[15px] tracking-wide min-[400px]:text-base sm:text-lg">Site dashboard</span>
          </div>
          <div className="flex shrink-0 items-center gap-0.5 sm:gap-2">
            <Link href="/" className="whitespace-nowrap rounded-full px-2 py-2 text-[13px] text-white/75 min-[400px]:px-2.5 min-[400px]:text-sm transition-colors hover:text-white sm:px-4">
              View site
            </Link>
            <form action={logout}>
              <button type="submit" className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/20 px-2.5 py-2 text-[13px] min-[400px]:px-3 min-[400px]:text-sm transition-colors hover:border-gold-300 hover:text-gold-300 active:scale-[0.97] sm:gap-2 sm:px-4">
                <SignOut size={16} aria-hidden="true" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1240px] px-4 pb-20 pt-8 sm:px-8 sm:pt-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="display text-4xl sm:text-5xl">Visitors &amp; leads</h1>
            <p className="mt-2 text-muted">Las Vegas time · last {range} days</p>
          </div>
          <Segmented
            label="Date range"
            items={RANGES.map((r) => ({ label: `${r} days`, href: href({ range: r }), active: r === range }))}
          />
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl2 border border-navy-900/10 bg-navy-900/10 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white px-5 py-5 sm:px-7 sm:py-6">
              <dt className="text-sm text-muted">{stat.label}</dt>
              <dd className="tnum mt-1 font-display text-4xl font-medium sm:text-5xl">{stat.value.toLocaleString("en-US")}</dd>
              {stat.note && <dd className="mt-1 text-xs text-muted">{stat.note}</dd>}
            </div>
          ))}
        </dl>

        <section aria-labelledby="daily-heading" className="mt-12 rounded-xl2 border border-navy-900/10 bg-white p-5 sm:p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="daily-heading" className="display text-2xl">Visitors per day</h2>
            <p className="text-sm text-muted">
              <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full border-2 border-white bg-[#B7791F] ring-1 ring-[#B7791F]" aria-hidden="true" />
              day with a lead
            </p>
          </div>
          <VisitorsChart daily={data.daily} />
        </section>

        <div className="mt-14 grid gap-12 lg:grid-cols-3">
          <RankList title="Top pages" unit="views" rows={data.pages} empty="No page views yet." />
          <RankList title="Where visitors come from" unit="visitors" rows={data.referrers} empty="No visits yet." />
          <div className="space-y-12">
            <RankList title="Devices" unit="visitors" rows={data.devices} empty="No visits yet." capitalize />
            <RankList title="Guides downloaded" unit="downloads" rows={data.guides} empty="No downloads yet." />
          </div>
        </div>

        <section aria-labelledby="leads-heading" className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="leads-heading" className="display text-3xl sm:text-4xl">People</h2>
              <p className="mt-1 text-sm text-muted">Everyone who downloaded a guide or sent a form, newest first.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Segmented
                label="Filter people by form"
                items={[
                  { label: "All", href: href({ form: "all" }), active: form === "all" },
                  ...LEAD_FORMS.map((f) => ({
                    label: f === "home-valuation" ? "Valuation" : f === "guide" ? "Guides" : "Contact",
                    href: href({ form: f }),
                    active: form === f,
                  })),
                ]}
              />
              <a
                href={`/admin/leads.csv${form === "all" ? "" : `?form=${form}`}`}
                className="btn-gold px-5 py-2.5 text-sm"
              >
                <DownloadSimple size={16} weight="bold" aria-hidden="true" />
                Export CSV
              </a>
            </div>
          </div>

          {leads.length === 0 ? (
            <div className="mt-6 rounded-xl2 border border-dashed border-navy-900/20 px-6 py-14 text-center">
              <FileArrowDown size={32} className="mx-auto text-gold-600" aria-hidden="true" />
              <p className="mt-3 font-display text-xl">No one here yet</p>
              <p className="mt-1 text-sm text-muted">
                New guide downloads and form messages will show up here as they arrive.
              </p>
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto rounded-xl2 border border-navy-900/10 bg-white">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="border-b border-navy-900/10 text-xs uppercase tracking-wider text-muted">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Date</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Name</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Contact</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Type</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-900/10">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="align-top transition-colors hover:bg-navy-900/[0.03]">
                      <td className="tnum whitespace-nowrap px-4 py-3.5 text-muted">{dateTime.format(new Date(lead.created_at))}</td>
                      <td className="px-4 py-3.5 font-semibold">{lead.name}</td>
                      <td className="px-4 py-3.5">
                        <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1.5 text-navy-900 underline decoration-gold-400/70 underline-offset-4 hover:text-gold-600">
                          <EnvelopeSimple size={14} aria-hidden="true" />
                          {lead.email}
                        </a>
                        {lead.phone && (
                          <a href={`tel:${lead.phone}`} className="mt-1 block text-muted hover:text-ink">{lead.phone}</a>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5">
                        <span className={`inline-block rounded-md px-2 py-1 text-xs font-semibold ${lead.form === "guide" ? "bg-gold-400/20 text-gold-600" : lead.form === "home-valuation" ? "bg-navy-900 text-white" : "bg-navy-900/10 text-navy-900"}`}>
                          {FORM_LABELS[lead.form] ?? lead.form}
                        </span>
                      </td>
                      <td className="max-w-[26rem] px-4 py-3.5 text-muted">
                        {lead.intent && <p className="text-ink">{lead.intent}</p>}
                        {lead.address && <p>{lead.address}</p>}
                        {lead.message && <p className="mt-1 line-clamp-3 whitespace-pre-line">{lead.message}</p>}
                        {lead.page && <p className="mt-1 text-xs">from {lead.page}</p>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

// Facebook-style blue for the analytics, with a deeper gold for lead days;
// the pair passes the dataviz palette checks on white.
const CHART_BLUE = "#1877F2";
const LEAD_GOLD = "#B7791F";

// Round the y-axis top up to a friendly number (1, 2, 5, 10, 20, 50…).
function niceMax(value: number) {
  if (value <= 4) return 4;
  const magnitude = 10 ** Math.floor(Math.log10(value / 4));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * magnitude).find((m) => m * 4 >= value) ?? 10 * magnitude;
  return step * 4;
}

type Day = { day: string; visitors: number; views: number; leads: number };

// Line + soft area chart in the style of Facebook Insights. Hover a day for a
// crosshair, a dot on the line, and the day's numbers.
function VisitorsChart({ daily }: { daily: Day[] }) {
  const n = Math.max(daily.length, 1);
  const top = niceMax(Math.max(0, ...daily.map((d) => d.visitors)));
  const y = (v: number) => 100 - (v / top) * 100;
  const points = daily.map((d, i) => `${i + 0.5},${y(d.visitors)}`);
  const line = `M${points.join("L")}`;
  const area = `${line}L${n - 0.5},100L0.5,100Z`;
  const ticks = [0, 1, 2, 3, 4].map((i) => (top / 4) * i);
  const label = (day: string) => shortDay.format(new Date(`${day}T00:00:00Z`));

  return (
    <>
      <div className="mt-6 flex gap-3">
        <div className="relative h-56 w-8 shrink-0 text-right text-xs text-muted" aria-hidden="true">
          {ticks.map((t) => (
            <span key={t} className="tnum absolute right-0 -translate-y-1/2" style={{ top: `${y(t)}%` }}>
              {t.toLocaleString("en-US")}
            </span>
          ))}
        </div>
        <div className="min-w-0 flex-1 overflow-x-auto">
          <div className="relative h-56" style={{ minWidth: `${n * 10}px` }}>
            {ticks.map((t) => (
              <span
                key={t}
                aria-hidden="true"
                className={`absolute inset-x-0 h-px ${t === 0 ? "bg-navy-900/20" : "bg-navy-900/[0.07]"}`}
                style={{ top: `${y(t)}%` }}
              />
            ))}
            <svg
              viewBox={`0 0 ${n} 100`}
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="visitors-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_BLUE} stopOpacity="0.28" />
                  <stop offset="100%" stopColor={CHART_BLUE} stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <path d={area} fill="url(#visitors-fill)" />
              <path
                d={line}
                fill="none"
                stroke={CHART_BLUE}
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <ol className="absolute inset-0 flex">
              {daily.map((d, i) => (
                <li key={d.day} className="group relative h-full flex-1">
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 group-hover:block"
                    style={{ background: `${CHART_BLUE}55` }}
                  />
                  {d.leads > 0 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white group-hover:hidden"
                      style={{ top: `${y(d.visitors)}%`, background: LEAD_GOLD }}
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow group-hover:block"
                    style={{ top: `${y(d.visitors)}%`, background: d.leads > 0 ? LEAD_GOLD : CHART_BLUE }}
                  />
                  <span className="sr-only">
                    {label(d.day)}: {d.visitors} visitors, {d.views} page views, {d.leads} leads
                  </span>
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute z-10 hidden whitespace-nowrap rounded-lg ${
                      // Keep the tooltip inside the chart near either edge.
                      i < n * 0.15 ? "left-0" : i > n * 0.85 ? "right-0" : "left-1/2 -translate-x-1/2"
                    } bg-white px-3 py-2 text-xs text-ink shadow-[0_4px_16px_-4px_rgba(16,34,56,0.3)] ring-1 ring-navy-900/10 group-hover:block`}
                    style={{ bottom: `calc(${100 - y(d.visitors)}% + 12px)` }}
                  >
                    <span className="block font-semibold">{label(d.day)}</span>
                    <span className="mt-0.5 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full" style={{ background: CHART_BLUE }} />
                      <span className="tnum">{`${d.visitors} visitors · ${d.views} views`}</span>
                    </span>
                    {d.leads > 0 && (
                      <span className="mt-0.5 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full" style={{ background: LEAD_GOLD }} />
                        <span className="tnum">{`${d.leads} ${d.leads === 1 ? "lead" : "leads"}`}</span>
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <div className="mt-2 flex justify-between pl-11 text-xs text-muted">
        <span>{daily[0] ? label(daily[0].day) : ""}</span>
        <span>Today</span>
      </div>
    </>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid min-h-[100dvh] place-items-center bg-navy-950 px-4 py-16">{children}</main>
  );
}

function Segmented({ label, items }: { label: string; items: { label: string; href: string; active: boolean }[] }) {
  return (
    <nav aria-label={label} className="inline-flex rounded-full border border-navy-900/15 bg-white p-1">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          scroll={false}
          aria-current={item.active ? "page" : undefined}
          className={`rounded-full px-4 py-1.5 text-sm transition-colors ${item.active ? "bg-navy-950 font-semibold text-white" : "text-muted hover:text-ink"}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function RankList({
  title,
  unit,
  rows,
  empty,
  capitalize,
}: {
  title: string;
  unit: string;
  rows: { label: string; count: number }[];
  empty: string;
  capitalize?: boolean;
}) {
  const top = Math.max(1, ...rows.map((r) => r.count));
  return (
    <section>
      <h2 className="display text-2xl">{title}</h2>
      {rows.length === 0 ? (
        <p className="mt-4 text-sm text-muted">{empty}</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {rows.map((row) => (
            <li key={row.label}>
              <div className="flex items-baseline justify-between gap-4 text-sm">
                <span className={`truncate ${capitalize ? "capitalize" : ""}`}>{row.label}</span>
                <span className="tnum shrink-0 text-muted">
                  {row.count.toLocaleString("en-US")} <span className="sr-only">{unit}</span>
                </span>
              </div>
              <div className="mt-1.5 h-1.5 rounded-full bg-[#1877F2]/10">
                <div className="h-full rounded-full" style={{ width: `${(row.count / top) * 100}%`, background: CHART_BLUE }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
