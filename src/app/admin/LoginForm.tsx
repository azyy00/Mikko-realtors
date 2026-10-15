"use client";

import { useFormStatus } from "react-dom";
import { LockSimple } from "@phosphor-icons/react";
import { login } from "./actions";

export default function LoginForm({ error }: { error?: string }) {

  return (
    <form action={login} className="w-full max-w-sm rounded-xl3 bg-white p-7 text-ink shadow-[0_24px_60px_-28px_rgba(16,34,56,0.55)] sm:p-9">
      <span className="grid h-11 w-11 place-items-center rounded-full bg-navy-950 text-gold-300">
        <LockSimple size={20} weight="bold" aria-hidden="true" />
      </span>
      <h1 className="display mt-5 text-3xl">Site dashboard</h1>
      <p className="mt-2 text-sm text-muted">Visitors and leads for lvp.realtor.</p>

      <label htmlFor="password" className="mt-7 block text-sm font-semibold">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        autoFocus
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "password-error" : undefined}
        className="mt-2 w-full rounded-lg border border-navy-900/20 bg-white px-4 py-3 text-base outline-none transition-colors focus:border-gold-600 focus:ring-2 focus:ring-gold-400/40"
      />
      {error && (
        <p id="password-error" role="alert" className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-gold mt-6 w-full justify-center disabled:opacity-60">
      {pending ? "Checking…" : "Sign in"}
    </button>
  );
}
