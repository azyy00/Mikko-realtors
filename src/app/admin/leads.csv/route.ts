import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getLeads, LEAD_FORMS, type LeadFormFilter } from "@/lib/analytics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Quote every cell; prefix formula-like values so spreadsheets don't run them.
function cell(value: unknown) {
  let text = value == null ? "" : String(value);
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET(request: NextRequest) {
  if (!(await isAdmin())) return new NextResponse("Not found", { status: 404 });

  const param = request.nextUrl.searchParams.get("form") ?? "";
  const form = ((LEAD_FORMS as readonly string[]).includes(param) ? param : "all") as LeadFormFilter;
  const leads = await getLeads(form, 10_000);

  const header = ["Date (UTC)", "Type", "Name", "Email", "Phone", "Guide / interest", "Address", "Message", "Page"];
  const lines = [
    header.map(cell).join(","),
    ...leads.map((l) =>
      [l.created_at, l.form, l.name, l.email, l.phone, l.intent, l.address, l.message, l.page].map(cell).join(","),
    ),
  ];
  const date = new Date().toISOString().slice(0, 10);

  return new NextResponse(`﻿${lines.join("\r\n")}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="lvp-leads-${form}-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
