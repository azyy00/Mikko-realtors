"use client";

import { useId, useState } from "react";

import { CaretDown } from "@phosphor-icons/react";

type Faq = { q: string; a: string };

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const id = useId();
  // First question open by default so an answer is visible right away.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mt-6 divide-y divide-navy-900/10 border-y border-navy-900/10">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                id={`${id}-question-${i}`}
                aria-controls={`${id}-answer-${i}`}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-medium text-ink">{f.q}</span>
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-colors ${
                    isOpen
                      ? "border-gold-400 bg-gold-400 text-navy-950"
                      : "border-navy-900/15 text-navy-700"
                  }`}
                >
                  <CaretDown
                    size={15}
                    weight="bold"
                    className={`transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-answer-${i}`}
              role="region"
              aria-labelledby={`${id}-question-${i}`}
              hidden={!isOpen}
            >
              <p className="pb-5 pr-10 leading-relaxed text-muted">{f.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
