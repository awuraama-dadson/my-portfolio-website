import { Reveal } from './Reveal';

interface ImageFrameProps {
  src?: string;
  alt: string;
  /** CSS aspect ratio, e.g. "4 / 5". */
  ratio?: string;
  /** Shown on the placeholder so it's clear what photo goes here. */
  label?: string;
  className?: string;
  position?: string;
  priority?: boolean;
  delay?: number;
}

/** An image with a gentle reveal. With no src, renders a refined placeholder to be replaced later. */
export function ImageFrame({ src, alt, ratio = '4 / 5', label, className = '', position, priority, delay }: ImageFrameProps) {
  return (
    <Reveal variant="image" delay={delay} className={`frame ${className}`} style={{ aspectRatio: ratio }}>
      {src ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
          style={position ? { objectPosition: position } : undefined}
        />
      ) : (
        <div className="frame__placeholder" role="img" aria-label={alt}>
          <span className="frame__mark" aria-hidden="true">A</span>
          {label && <span className="frame__label">{label}</span>}
        </div>
      )}
    </Reveal>
  );
}
