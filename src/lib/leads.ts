export type LeadForm = "contact" | "home-valuation" | "guide";

export type LeadPayload = {
  form: LeadForm;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  intent?: string;
  address?: string;
  website?: string;
  page?: string;
};

export async function submitLead(payload: LeadPayload) {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ page: window.location.pathname.slice(0, 300), ...payload }),
  });

  const data = (await response.json().catch(() => ({}))) as {
    error?: string;
  };
  if (!response.ok) {
    throw new Error(data.error || "We couldn't send your request. Please try again.");
  }
}
