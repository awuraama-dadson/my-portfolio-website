import type { ReactNode } from 'react';

/** Small editorial label, optionally numbered: "01 — The Engineer". */
export function Eyebrow({ num, children, className = '' }: { num?: string; children: ReactNode; className?: string }) {
  return (
    <p className={`eyebrow ${className}`.trim()}>
      {num && <span className="eyebrow__num">{num}</span>}
      <span>{children}</span>
    </p>
  );
}
