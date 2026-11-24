import type { ReactNode } from 'react';
import { cx } from '../cx';

export interface StatProps {
  label: ReactNode;
  value: ReactNode;
  /** Unit shown smaller after the value, e.g. "km/h". */
  unit?: string;
  hint?: ReactNode;
}

export function Stat({ label, value, unit, hint }: StatProps) {
  return (
    <div className="ds-stat">
      <dt className="ds-stat__label">{label}</dt>
      <dd className="ds-stat__value">
        <span className="ds-stat__num">{value}</span>
        {unit ? <span className="ds-stat__unit"> {unit}</span> : null}
        {hint ? <span className="ds-stat__hint">{hint}</span> : null}
      </dd>
    </div>
  );
}

/** A responsive grid of Stat. Renders a <dl>, so each value is announced with its label. */
export function StatGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <dl className={cx('ds-stats', className)}>{children}</dl>;
}
