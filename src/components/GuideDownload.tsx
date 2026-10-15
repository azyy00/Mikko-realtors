"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { CircleNotch, DownloadSimple, X } from "@phosphor-icons/react";
import { submitLead } from "@/lib/leads";

const UNLOCK_KEY = "guides-unlocked";

function isUnlocked() {
  try {
    return localStorage.getItem(UNLOCK_KEY) === "1";
  } catch {
    return false;
  }
}

function startDownload(file: string) {
  const link = document.createElement("a");
  link.href = file;
  link.download = "";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

/**
 * Asks for a name and email once before the first guide download, then sends
 * the visitor to Mikko as a lead. Without JavaScript the link still downloads.
 */
export default function GuideDownload({
  file,
  title,
  className,
  children,
}: {
  file: string;
  title: string;
  className?: string;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", website: "" });

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const trigger = document.activeElement as HTMLElement | null;
    dialog?.showModal();
    return () => {
      dialog?.close();
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!form.name.trim()) return setError("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return setError("Enter a valid email address.");
    if (submitting) return;
    setError("");
    setSubmitting(true);
    try {
      await submitLead({
        form: "guide",
        name: form.name,
        email: form.email,
        intent: title.slice(0, 80),
        website: form.website,
      });
    } catch {
      // Never block the guide on a delivery problem; the visitor already asked for it.
    }
    try {
      localStorage.setItem(UNLOCK_KEY, "1");
    } catch {}
    setSubmitting(false);
    setOpen(false);
    startDownload(file);
  }

  return (
    <>
      <a
        href={file}
        download
        className={className}
        onClick={(event) => {
          if (isUnlocked()) return;
          event.preventDefault();
          setOpen(true);
        }}
      >
        {children}
      </a>

      {open && (
        <dialog
          ref={dialogRef}
          onCancel={() => setOpen(false)}
          aria-labelledby="guide-gate-title"
          className="w-[min(440px,92vw)] rounded-xl2 border-0 bg-paper p-0 text-ink shadow-soft backdrop:bg-navy-950/70"
        >
          <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-4 p-6 sm:p-8">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full text-navy-800 transition-colors hover:bg-navy-900/5"
            >
              <X size={18} weight="bold" />
            </button>
            <div className="pr-10">
              <h2 id="guide-gate-title" className="font-display text-2xl font-semibold">
                Get your free guide
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Where should Mikko send updates? Your download of{" "}
                <span className="font-semibold text-navy-800">{title}</span>{" "}
                starts right after.
              </p>
            </div>

            <label className="flex flex-col gap-2 text-sm font-medium text-navy-800">
              Full name
              <input
                required
                maxLength={120}
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="rounded-xl border border-navy-900/15 bg-white px-4 py-3 text-sm font-normal text-ink outline-none transition-colors focus:border-gold-500"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-navy-800">
              Email
              <input
                required
                type="email"
                maxLength={254}
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="rounded-xl border border-navy-900/15 bg-white px-4 py-3 text-sm font-normal text-ink outline-none transition-colors focus:border-gold-500"
              />
            </label>
            {/* Honeypot for bots; hidden from people and assistive tech. */}
            <input
              tabIndex={-1}
              aria-hidden="true"
              autoComplete="off"
              value={form.website}
              onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
              className="hidden"
            />

            {error && (
              <p role="alert" className="text-sm text-red-700">
                {error}
              </p>
            )}

            <button type="submit" disabled={submitting} className="btn-gold mt-1">
              {submitting ? (
                <CircleNotch size={16} weight="bold" className="animate-spin" />
              ) : (
                <DownloadSimple size={16} weight="bold" />
              )}
              Send me the guide
            </button>
            <p className="text-xs text-muted">
              No spam. Mikko may follow up personally about your plans.
            </p>
          </form>
        </dialog>
      )}
    </>
  );
}
