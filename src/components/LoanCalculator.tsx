"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Variant = "mortgage" | "va";

function usd(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function monthlyPI(principal: number, annualRatePct: number, years: number) {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (principal <= 0) return 0;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

export default function LoanCalculator({ variant }: { variant: Variant }) {
  const isVa = variant === "va";
  const [price, setPrice] = useState(500000);
  const [downPct, setDownPct] = useState(isVa ? 0 : 5);
  const [rate, setRate] = useState(isVa ? 5.5 : 6.5);
  const [years, setYears] = useState(30);
  const [hoa, setHoa] = useState(50);
  const fundingFeePct = 2.15; // typical first-use VA funding fee

  const calc = useMemo(() => {
    const down = isVa ? 0 : (price * downPct) / 100;
    let loan = price - down;
    const fundingFee = isVa ? (loan * fundingFeePct) / 100 : 0;
    loan += fundingFee; // VA funding fee is typically financed into the loan
    const pi = monthlyPI(loan, rate, years);
    const tax = (price * 0.0055) / 12; // ~0.55% Clark County effective
    const insurance = 95;
    // Conventional PMI estimate when < 20% down; VA never has PMI
    const pmi = !isVa && downPct < 20 ? ((price - down) * 0.005) / 12 : 0;
    const total = pi + tax + insurance + pmi + hoa;
    return { down, loan, fundingFee, pi, tax, insurance, pmi, total };
  }, [price, downPct, rate, years, hoa, isVa]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
      {/* Inputs */}
      <div className="rounded-xl2 border border-navy-900/10 bg-cream p-6 sm:p-8">
        <Field
          label="Home price"
          value={usd(price)}
          min={150000}
          max={2000000}
          step={5000}
          raw={price}
          onChange={setPrice}
        />
        {!isVa && (
          <Field
            label="Down payment"
            value={`${downPct}%  ·  ${usd((price * downPct) / 100)}`}
            min={0}
            max={40}
            step={1}
            raw={downPct}
            onChange={setDownPct}
          />
        )}
        <Field
          label="Interest rate"
          value={`${rate.toFixed(2)}%`}
          min={3}
          max={9}
          step={0.05}
          raw={rate}
          onChange={setRate}
        />
        <div className="mt-5">
          <span className="text-sm font-medium text-navy-800">Loan term</span>
          <div className="mt-2 flex gap-2">
            {[15, 30].map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setYears(y)}
                aria-pressed={years === y}
                className={`min-h-11 rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  years === y
                    ? "border-gold-400 bg-gold-400 text-navy-950"
                    : "border-navy-900/15 text-navy-800 hover:border-gold-400"
                }`}
              >
                {y} years
              </button>
            ))}
          </div>
        </div>
        <Field
          label="HOA / month"
          value={usd(hoa)}
          min={0}
          max={400}
          step={5}
          raw={hoa}
          onChange={setHoa}
        />
      </div>

      {/* Result */}
      <div className="flex flex-col rounded-xl2 bg-navy-950 p-6 text-white sm:p-8">
        <p className="text-sm text-white/60">Estimated monthly payment</p>
        <p className="tnum mt-1 font-display text-5xl font-semibold text-gold-300">
          {usd(calc.total)}
        </p>

        <dl className="mt-6 space-y-2.5 text-sm">
          <Row label="Principal & interest" value={usd(calc.pi)} />
          <Row label="Property tax (est.)" value={usd(calc.tax)} />
          <Row label="Insurance (est.)" value={usd(calc.insurance)} />
          {!isVa && calc.pmi > 0 && (
            <Row label="PMI (est.)" value={usd(calc.pmi)} />
          )}
          {hoa > 0 && <Row label="HOA" value={usd(hoa)} />}
        </dl>

        <dl className="mt-5 border-t border-white/10 pt-4 text-sm text-white/70">
          <Row label="Loan amount" value={usd(calc.loan)} muted />
          {isVa && (
            <Row
              label={`VA funding fee (${fundingFeePct}%, financed)`}
              value={usd(calc.fundingFee)}
              muted
            />
          )}
          {isVa && <Row label="Down payment" value="$0" muted />}
          {isVa && <Row label="Monthly PMI" value="None" muted />}
        </dl>

        <Link href="/#contact" className="btn-gold mt-6 justify-center">
          Get a lender referral
        </Link>
        <p className="mt-3 text-[11px] leading-relaxed text-white/65">
          Estimate only, not a loan offer or financial advice. Taxes, insurance,
          and rates vary. Talk to a licensed lender for exact numbers.
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  min,
  max,
  step,
  raw,
  onChange,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  raw: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="mt-5 block first:mt-0">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-navy-800">{label}</span>
        <span className="tnum text-sm font-semibold text-ink">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={raw}
        aria-valuetext={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-11 w-full cursor-pointer accent-gold-500"
      />
    </label>
  );
}

function Row({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className={muted ? "text-white/50" : "text-white/75"}>{label}</dt>
      <dd
        className={`tnum ${muted ? "text-white/60" : "font-medium text-white"}`}
      >
        {value}
      </dd>
    </div>
  );
}
