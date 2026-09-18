import type { ReactNode } from "react";

// Keep the existing layout API without delaying readable content until hydration.
export default function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
