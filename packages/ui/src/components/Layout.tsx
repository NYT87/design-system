import type { HTMLAttributes } from 'react';
import { cx } from '../cx';

/** Centres content at --max-width with the page gutter on both sides. */
export function Container({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('ds-container', className)} {...rest} />;
}

export interface SkipLinkProps { href?: string; children?: string }

/** First focusable element of the page: lets keyboard users jump past the header. Visible only on focus. */
export function SkipLink({ href = '#main', children = 'Skip to content' }: SkipLinkProps) {
  return <a className="ds-skip" href={href}>{children}</a>;
}
