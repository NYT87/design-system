import type { ReactNode } from 'react';
import { cx } from '../cx';

export interface EmptyStateProps {
  title: ReactNode;
  /** Say what to do next, not just that there is nothing here. */
  children?: ReactNode;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function EmptyState({ title, children, action, icon, className }: EmptyStateProps) {
  return (
    <div className={cx('ds-empty', className)}>
      {icon ? <div className="ds-empty__icon" aria-hidden="true">{icon}</div> : null}
      <p className="ds-empty__title">{title}</p>
      {children ? <p className="ds-empty__body">{children}</p> : null}
      {action ? <div className="ds-empty__action">{action}</div> : null}
    </div>
  );
}
