import { useEffect, useRef, useState, type HTMLAttributes } from 'react';

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  /** Delay in ms, for gentle staggering. */
  delay?: number;
  variant?: 'up' | 'fade' | 'image';
}

/** Fades content in as it enters the viewport. Does nothing when motion is off. */
export function Reveal({ delay = 0, variant = 'up', className = '', style, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!document.documentElement.classList.contains('motion') || !('IntersectionObserver' in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal reveal--${variant}${shown ? ' is-in' : ''}${className ? ' ' + className : ''}`}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </div>
  );
}
