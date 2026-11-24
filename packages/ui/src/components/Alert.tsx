import type { ReactNode } from 'react';
import { cx } from '../cx';

export interface AlertProps {
  tone?: 'info' | 'ok' | 'warn' | 'danger';
  title?: ReactNode;
  children?: ReactNode;
  /** e.g. a retry Button. */
  action?: ReactNode;
  className?: string;
}

/** Inline message. warn and danger are announced immediately (role="alert"); info and ok politely (role="status"). */
export function Alert({ tone = 'info', title, children, action, className }: AlertProps) {
  const urgent = tone === 'warn' || tone === 'danger';
  return (
    <div className={cx('ds-alert', `ds-alert--${tone}`, className)} role={urgent ? 'alert' : 'status'}>
      <div className="ds-alert__main">
        {title ? <p className="ds-alert__title">{title}</p> : null}
        {children ? <div className="ds-alert__body">{children}</div> : null}
      </div>
      {action ? <div className="ds-alert__action">{action}</div> : null}
    </div>
  );
}
