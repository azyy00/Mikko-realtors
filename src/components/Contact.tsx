"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Phone,
  EnvelopeSimple,
  MapPin,
  CheckCircle,
  CircleNotch,
} from "@phosphor-icons/react";
import BackgroundVideo from "./BackgroundVideo";
import { agent } from "@/lib/data";
import { submitLead } from "@/lib/leads";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = { name?: string; email?: string };

const intents = ["Buying", "Selling", "Relocating", "New Construction"];

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const successRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (status === "success")
      successRef.current?.focus({ preventScroll: true });
  }, [status]);
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    intent: intents[0],
    message: "",
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
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(Object.keys(next)[0])?.focus();
      return;
    }
    if (status === "submitting") return;

    setStatus("submitting");
    try {
      await submitLead({ form: "contact", ...form });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-24 text-white">
      <BackgroundVideo src="/videos/bg-2.mp4" />
      <div className="pointer-events-none absolute inset-0 bg-navy-950/75" />

      <div className="container-x relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
        {/* Left: invitation */}
        <div>
          <h2 className="display text-4xl sm:text-5xl">
            Ready to find your place in Las Vegas?
          </h2>
          <p className="mt-5 max-w-md text-white/70">
            Tell me a little about what you&apos;re looking for. I&apos;ll
            follow up personally, no call center, no pressure.
          </p>

          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/8 text-gold-300">
                <Phone size={18} weight="fill" />
              </span>
              <a href={agent.phoneHref} className="hover:text-gold-200">
                {agent.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/8 text-gold-300">
                <EnvelopeSimple size={18} weight="fill" />
              </span>
              <a href={`mailto:${agent.email}`} className="hover:text-gold-200">
                {agent.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/8 text-gold-300">
                <MapPin size={18} weight="fill" />
              </span>
              Serving Las Vegas · Henderson · North Las Vegas
            </li>
          </ul>
        </div>

        {/* Right: form card */}
        <div className="contact-glass rounded-xl2 p-6 sm:p-8">
          {status === "success" ? (
            <div
              ref={successRef}
              tabIndex={-1}
              role="status"
              className="flex min-h-[380px] flex-col items-center justify-center text-center"
            >
              <CheckCircle size={56} weight="fill" className="text-sage-300" />
              <h3 className="mt-4 font-display text-2xl font-semibold">
                Thanks, {form.name.split(" ")[0] || "there"}!
              </h3>
              <p className="mt-2 max-w-xs text-sm text-white/70">
                Your message is on its way. Mikko will get back to you shortly.
              </p>
              <button
                onClick={() => {
                  setStatus("idle");
                  setForm({
                    name: "",
                    email: "",
                    phone: "",
                    intent: intents[0],
                    message: "",
                    website: "",
                  });
                }}
                className="btn-ghost-light mt-6"
              >
                Send another
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              aria-busy={status === "submitting"}
              noValidate
              className="flex flex-col gap-5"
            >
              {status === "error" && (
                <p
                  role="alert"
                  className="rounded-lg border border-red-300/50 bg-red-950/30 px-3 py-2 text-sm text-red-100"
                >
                  We couldn&apos;t send your message. Please{" "}
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
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-white/80"
                  >
                    Full name
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
                    className={`rounded-xl border bg-white/[0.08] px-4 py-3 text-sm text-white placeholder:text-white/55 outline-none transition-colors focus:border-gold-400 ${
                      errors.name ? "border-red-400/70" : "border-white/15"
                    }`}
                  />
                  {errors.name && (
                    <span id="name-error" className="text-xs text-red-300">
                      {errors.name}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-white/80"
                  >
                    Phone <span className="text-white/65">(optional)</span>
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
                    className="rounded-xl border border-white/15 bg-white/[0.08] px-4 py-3 text-sm text-white placeholder:text-white/55 outline-none transition-colors focus:border-gold-400"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-white/80"
                >
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
                  className={`rounded-xl border bg-white/[0.08] px-4 py-3 text-sm text-white placeholder:text-white/55 outline-none transition-colors focus:border-gold-400 ${
                    errors.email ? "border-red-400/70" : "border-white/15"
                  }`}
                />
                {errors.email && (
                  <span id="email-error" className="text-xs text-red-300">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-white/80">
                  I&apos;m interested in
                </span>
                <div className="flex flex-wrap gap-2">
                  {intents.map((it) => (
                    <button
                      type="button"
                      aria-pressed={form.intent === it}
                      disabled={status === "submitting"}
                      key={it}
                      onClick={() => set("intent", it)}
                      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                        form.intent === it
                          ? "border-gold-400 bg-gold-400 text-navy-950"
                          : "border-white/15 text-white/75 hover:border-white/40"
                      }`}
                    >
                      {it}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-white/80"
                >
                  Message <span className="text-white/65">(optional)</span>
                </label>
                <textarea
                  disabled={status === "submitting"}
                  id="message"
                  maxLength={2000}
                  rows={3}
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  placeholder="Tell me about your timeline, budget, or the area you like."
                  className="resize-none rounded-xl border border-white/15 bg-white/[0.08] px-4 py-3 text-sm text-white placeholder:text-white/55 outline-none transition-colors focus:border-gold-400"
                />
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
                className="btn-gold justify-center disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>
                    <CircleNotch
                      size={16}
                      className="animate-spin"
                      weight="bold"
                    />
                    Sending…
                  </>
                ) : (
                  "Start the conversation"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
