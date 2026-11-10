/** Small three-tiered pagoda roof — the brand emblem. */
export function Emblem({ className = 'h-8 w-8' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none">
      <path d="M24 5 34 13H14z" fill="currentColor" />
      <path d="M24 15 38 24H10z" fill="currentColor" opacity=".85" />
      <path d="M24 26 42 36H6z" fill="currentColor" opacity=".7" />
      <path d="M20 36h8v7h-8z" fill="currentColor" opacity=".55" />
      <path d="M24 2v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Horizontal rule with a carved lotus-diamond centrepiece. */
export function Divider({ className = '' }) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-current opacity-30" />
      <svg viewBox="0 0 40 16" className="h-4 w-10 shrink-0">
        <path d="M20 1 27 8 20 15 13 8z" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M20 5 23 8 20 11 17 8z" fill="currentColor" />
        <circle cx="5" cy="8" r="1.4" fill="currentColor" />
        <circle cx="35" cy="8" r="1.4" fill="currentColor" />
      </svg>
      <span className="h-px flex-1 bg-current opacity-30" />
    </div>
  );
}

/**
 * Frames an image like a carved Newari window: a timber surround,
 * a dentil band along the lintel and an inner fillet.
 */
export function CarvedFrame({ children, className = '' }) {
  return (
    <div className={`relative bg-umber p-2.5 shadow-[0_30px_60px_-30px_rgba(42,28,19,.6)] sm:p-3.5 ${className}`}>
      <div className="dentil absolute inset-x-3.5 top-[5px] text-terracotta-400/70 sm:top-[7px]" aria-hidden="true" />
      <div className="relative mt-3 overflow-hidden ring-1 ring-sand/30">{children}</div>
    </div>
  );
}
