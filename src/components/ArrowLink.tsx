import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ArrowLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

const isExternal = (to: string) => /^(https?:|mailto:)/.test(to);

/** A quiet text link with an arrow. An empty `to` renders a "coming soon" placeholder. */
export function ArrowLink({ to, children, className = '' }: ArrowLinkProps) {
  const cls = `arrow-link ${className}`.trim();
  const inner = (
    <>
      <span className="arrow-link__text">{children}</span>
      <span className="arrow-link__arrow" aria-hidden="true">→</span>
    </>
  );

  if (!to) {
    return (
      <span className={`${cls} is-placeholder`} title="Link coming soon">
        {inner}
      </span>
    );
  }
  if (isExternal(to)) {
    return (
      <a className={cls} href={to} target={to.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link className={cls} to={to}>
      {inner}
    </Link>
  );
}
