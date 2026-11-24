import type { HTMLAttributes } from 'react';
import { cx } from '../cx';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'accent' | 'ok' | 'warn' | 'danger';
}

/** Status or category label. Colour is a dot; the text is always readable on its own, so colour is never the only signal. */
export function Badge({ tone = 'neutral', className, children, ...rest }: BadgeProps) {
  return (
    <span className={cx('ds-badge', `ds-badge--${tone}`, className)} {...rest}>
      <span className="ds-badge__dot" aria-hidden="true" />
      {children}
    </span>
  );
}
