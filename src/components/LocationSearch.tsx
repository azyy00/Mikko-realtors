"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MapPin, X } from "@phosphor-icons/react";

export type LocationSuggestion = {
  name: string;
  city?: string;
  region?: string;
  category?: string;
  lat?: number;
  lon?: number;
};
const apiKey = process.env.NEXT_PUBLIC_MAP_KEY;

/** Shared combobox: keyboard and pointer selection keep focus in the input. */
export default function LocationSearch({
  value,
  onChange,
  onSelect,
  onSubmit,
  label,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  onSelect: (suggestion: LocationSuggestion) => void;
  onSubmit?: () => void;
  label: string;
  placeholder: string;
}) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [active, setActive] = useState(-1);
  const [result, setResult] = useState<{
    query: string;
    items: LocationSuggestion[];
  }>({ query: "", items: [] });
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const suggestions = result.query === value ? result.items : [];
  const open = focused && !dismissed && suggestions.length > 0;

  useEffect(() => {
    if (!focused || dismissed || !apiKey || value.trim().length < 2) {
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      setFailed(false);
      try {
        const response = await fetch(
          `https://suggest.latlng.work/autosuggest?q=${encodeURIComponent(value)}&lat=36.1699&lon=-115.1398&radius=60000&limit=6&country=us&api_key=${apiKey}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Suggestions unavailable");
        const data = await response.json();
        const items = Array.isArray(data.suggestions)
          ? data.suggestions
              .filter(
                (s: LocationSuggestion) => s && typeof s.name === "string",
              )
              .slice(0, 6)
          : [];
        if (!controller.signal.aborted) setResult({ query: value, items });
      } catch {
        if (!controller.signal.aborted) {
          setResult({ query: value, items: [] });
          setFailed(true);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 250);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [value, focused, dismissed]);

  function select(suggestion: LocationSuggestion) {
    setDismissed(true);
    setActive(-1);
    onSelect(suggestion);
  }

  return (
    <div className="relative min-w-0 flex-1">
      <div className="flex min-h-12 items-center gap-2">
        <MapPin
          size={18}
          className="shrink-0 text-navy-700"
          aria-hidden="true"
        />
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <input
          ref={inputRef}
          id={id}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={open ? `${id}-results` : undefined}
          aria-activedescendant={
            open && active >= 0 ? `${id}-option-${active}` : undefined
          }
          autoComplete="off"
          placeholder={placeholder}
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
            setActive(-1);
            setDismissed(false);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            setActive(-1);
          }}
          onKeyDown={(event) => {
            if (event.nativeEvent.isComposing) return;
            if (event.key === "Escape") {
              setDismissed(true);
              setActive(-1);
            }
            if (
              (event.key === "ArrowDown" || event.key === "ArrowUp") &&
              suggestions.length
            ) {
              event.preventDefault();
              setDismissed(false);
              setActive((i) =>
                i < 0
                  ? event.key === "ArrowDown"
                    ? 0
                    : suggestions.length - 1
                  : (i +
                      (event.key === "ArrowDown" ? 1 : -1) +
                      suggestions.length) %
                    suggestions.length,
              );
            }
            if (event.key === "Enter") {
              event.preventDefault();
              if (open && active >= 0) select(suggestions[active]);
              else {
                setDismissed(true);
                onSubmit?.();
              }
            }
          }}
          className="search-input min-w-0 w-full border-0 border-b border-transparent bg-transparent py-2 text-ink placeholder:text-muted"
        />
        {value && (
          <button
            type="button"
            aria-label="Clear search"
            className="grid h-11 w-11 shrink-0 place-items-center text-muted hover:text-navy-900"
            onClick={() => {
              onChange("");
              setDismissed(false);
              setActive(-1);
              inputRef.current?.focus();
            }}
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>
      <span role="status" className="sr-only">
        {focused && !dismissed
          ? loading
            ? "Finding locations…"
            : failed
              ? "Suggestions unavailable. You can still type a location to search."
              : `${suggestions.length} suggestions available.`
          : ""}
      </span>
      {open && (
        <ul
          id={`${id}-results`}
          role="listbox"
          aria-label="Suggested locations"
          className="popover-enter absolute inset-x-0 top-full z-30 mt-2 max-h-72 overflow-y-auto rounded-xl border border-navy-900/15 bg-paper py-1 shadow-soft"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={`${suggestion.name}-${index}`}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={active === index}
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => select(suggestion)}
              className={`cursor-pointer px-4 py-3 text-left hover:bg-cream ${active === index ? "bg-cream" : ""}`}
            >
              <span className="block truncate text-sm font-medium text-ink">
                {suggestion.name}
              </span>
              <span className="block truncate text-xs text-muted">
                {[suggestion.city, suggestion.region]
                  .filter(Boolean)
                  .join(", ") || suggestion.category?.replace(/_/g, " ")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
