import { Link } from 'react-router-dom';

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`wordmark ${className}`.trim()} aria-label="Awuraama Dadson, home">
      <span className="wordmark__first">Awuraama</span>
      <span className="wordmark__last">Dadson</span>
    </Link>
  );
}
