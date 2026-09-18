"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle, CircleNotch, House } from "@phosphor-icons/react";
import { agent } from "@/lib/data";
import { submitLead } from "@/lib/leads";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = { address?: string; name?: string; email?: string };

export default function HomeValuationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const successRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (status === "success")
      successRef.current?.focus({ preventScroll: true });
  }, [status]);
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState({
    address: "",
    name: "",
    email: "",
    phone: "",
    website: "",
  });

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key as keyof Errors])
      setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!form.address.trim()) next.address = "Enter your property address.";
    if (!form.name.trim()) next.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(Object.keys(next)[0])?.focus();
      return;
    }
    if (status === "submitting") return;
    setStatus("submitting");
    try {
      await submitLead({ form: "home-valuation", ...form });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex min-h-[360px] flex-col items-center justify-center rounded-xl2 border border-navy-900/10 bg-cream p-8 text-center"
      >
        <CheckCircle size={56} weight="fill" className="text-sage-500" />
        <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
          Request received, {form.name.split(" ")[0] || "there"}.
        </h3>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Mikko will prepare a valuation for {form.address} based on real,
          current comps and get back to you personally.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-busy={status === "submitting"}
      noValidate
      className="rounded-xl2 border border-navy-900/10 bg-cream p-6 sm:p-8"
    >
      {status === "error" && (
        <p
          role="alert"
          className="mb-5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          We couldn&apos;t send your request. Please{" "}
          <a className="underline" href={agent.phoneHref}>
            call
          </a>{" "}
          or{" "}
          <a className="underline" href={`mailto:${agent.email}`}>
            email Mikko
          </a>{" "}
          directly.
        </p>
      )}
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-950 text-gold-300">
          <House size={22} weight="fill" />
        </span>
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">
            What&apos;s my home worth?
          </h2>
          <p className="text-xs text-muted">Free, no obligation.</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="address"
            className="text-sm font-medium text-navy-800"
          >
            Property address
          </label>
          <input
            disabled={status === "submitting"}
            id="address"
            required
            maxLength={250}
            aria-invalid={Boolean(errors.address)}
            aria-describedby={errors.address ? "address-error" : undefined}
            autoComplete="street-address"
            value={form.address}
            onChange={(e) => set("address", e.target.value)}
            placeholder="123 Example St, Las Vegas, NV"
            className={`rounded-xl border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold-400 ${
              errors.address ? "border-red-400" : "border-navy-900/15"
            }`}
          />
          {errors.address && (
            <span id="address-error" className="text-xs text-red-700">
              {errors.address}
            </span>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-navy-800">
              Name
            </label>
            <input
              disabled={status === "submitting"}
              id="name"
              required
              maxLength={120}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              autoComplete="name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Jordan Rivera"
              className={`rounded-xl border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold-400 ${
                errors.name ? "border-red-400" : "border-navy-900/15"
              }`}
            />
            {errors.name && (
              <span id="name-error" className="text-xs text-red-700">
                {errors.name}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-navy-800"
            >
              Phone <span className="text-muted">(optional)</span>
            </label>
            <input
              disabled={status === "submitting"}
              id="phone"
              maxLength={40}
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="(702) 555-0148"
              className="rounded-xl border border-navy-900/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold-400"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-navy-800">
            Email
          </label>
          <input
            disabled={status === "submitting"}
            id="email"
            required
            maxLength={254}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@email.com"
            className={`rounded-xl border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold-400 ${
              errors.email ? "border-red-400" : "border-navy-900/15"
            }`}
          />
          {errors.email && (
            <span id="email-error" className="text-xs text-red-700">
              {errors.email}
            </span>
          )}
        </div>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            disabled={status === "submitting"}
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => set("website", e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-gold mt-1 justify-center disabled:opacity-70"
        >
          {status === "submitting" ? (
            <>
              <CircleNotch size={16} className="animate-spin" weight="bold" />
              Sending…
            </>
          ) : (
            "Get my home value"
          )}
        </button>
        <p className="text-center text-xs text-muted">
          A real valuation from Mikko, not an automated guess.
        </p>
      </div>
    </form>
  );
}
