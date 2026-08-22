type RalliiMarkProps = {
  className?: string;
  title?: string;
};

/**
 * Shared Rallii family mark. The paired strokes are the reusable “ii” motif;
 * Rail adds sleepers so the mark reads as a small stretch of track.
 */
export function RalliiMark({ className, title = "Rallii Rail" }: RalliiMarkProps) {
  return (
    <svg className={className} viewBox="0 0 40 40" role="img" aria-label={title} fill="none">
      <circle cx="20" cy="20" r="19" fill="#173f32" />
      <path d="M10 18.5h20M10 23h20M10 27.5h20M10 32h20" stroke="#D5B86A" strokeWidth="2.1" strokeLinecap="square" opacity=".82" />
      <path d="M15 15v18M25 15v18" stroke="#F5F2EA" strokeWidth="3.2" strokeLinecap="square" />
      <circle cx="15" cy="9.5" r="2.5" fill="#F5F2EA" />
      <circle cx="25" cy="9.5" r="2.5" fill="#F5F2EA" />
    </svg>
  );
}
