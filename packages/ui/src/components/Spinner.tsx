export interface SpinnerProps {
  size?: string;
  /** Announced to screen readers. Pass "" when the spinner sits inside something already labelled. */
  label?: string;
}

export function Spinner({ size = '1.25rem', label = 'Loading' }: SpinnerProps) {
  return (
    <svg className="ds-spinner" width={size} height={size} viewBox="0 0 24 24" role={label ? 'status' : undefined} aria-label={label || undefined} aria-hidden={label ? undefined : true}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
