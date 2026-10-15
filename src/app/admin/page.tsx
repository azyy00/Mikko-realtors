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

  const peak = Math.max(1, ...data.daily.map((d) => d.visitors));
  const stats = [
    { label: "Visitors", value: data.totals.visitors, note: "unique per day" },
    { label: "Page views", value: data.totals.views },
    { label: "Leads", value: data.totals.leads, note: "all forms" },
    { label: "Guide downloads", value: data.totals.downloads },
  ];

  return (
    <div className="min-h-[100dvh] bg-paper text-ink">
      <header className="bg-navy-950 text-white">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="" width={36} height={36} className="h-9 w-auto" />
            <span className="font-display text-lg tracking-wide">Site dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="rounded-full px-4 py-2 text-sm text-white/75 transition-colors hover:text-white">
              View site
            </Link>
            <form action={logout}>
              <button type="submit" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm transition-colors hover:border-gold-300 hover:text-gold-300 active:scale-[0.97]">
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

        <section aria-labelledby="daily-heading" className="mt-12">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="daily-heading" className="display text-2xl">Visitors per day</h2>
            <p className="text-sm text-muted">
              <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-sm bg-navy-900" aria-hidden="true" />
              visitors
              <span className="ml-4 mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-gold-400" aria-hidden="true" />
              day with a lead
            </p>
          </div>
          <div className="mt-5 overflow-x-auto">
            <ol
              className="flex h-48 items-end gap-[3px] border-b border-navy-900/15"
              style={{ minWidth: `${data.daily.length * 10}px` }}
            >
              {data.daily.map((d) => (
                <li key={d.day} className="group relative flex h-full flex-1 flex-col items-center justify-end">
                  {d.leads > 0 && <span className="mb-1 h-2 w-2 shrink-0 rounded-full bg-gold-400" aria-hidden="true" />}
                  <span
                    className="w-full rounded-t-[3px] bg-navy-900 transition-colors group-hover:bg-gold-600"
                    style={{ height: `${(d.visitors / peak) * 100}%`, minHeight: d.visitors ? 3 : 0 }}
                  />
                  <span className="sr-only">
                    {shortDay.format(new Date(`${d.day}T00:00:00Z`))}: {d.visitors} visitors, {d.views} page views, {d.leads} leads
                  </span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-full z-10 mb-2 hidden whitespace-nowrap rounded-md bg-navy-950 px-2.5 py-1.5 text-xs text-white group-hover:block"
                  >
                    {shortDay.format(new Date(`${d.day}T00:00:00Z`))} · {d.visitors} visitors · {d.leads} leads
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted">
            <span>{shortDay.format(new Date(`${data.daily[0]?.day}T00:00:00Z`))}</span>
            <span>Today</span>
          </div>
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
              <div className="mt-1.5 h-1.5 rounded-full bg-navy-900/[0.07]">
                <div className="h-full rounded-full bg-gold-400" style={{ width: `${(row.count / top) * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
