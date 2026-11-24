import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../cx';
import { Spinner } from './Spinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** sm = 32px (dense desktop UI), md = 40px, lg = 44px (touch layouts). */
  size?: 'sm' | 'md' | 'lg';
  /** Shows a spinner and blocks clicks. The label stays so the width does not jump. */
  loading?: boolean;
  /** Icon before the label. Decorative: it is hidden from assistive tech. */
  icon?: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', loading, icon, className, children, disabled, type = 'button', ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={cx('ds-btn', `ds-btn--${variant}`, `ds-btn--${size}`, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <Spinner size="1em" label="" /> : icon ? <span aria-hidden="true" className="ds-btn__icon">{icon}</span> : null}
      {children}
    </button>
  );
}

export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'icon'> {
  /** Required: an icon-only control has no visible name. */
  label: string;
  children: ReactNode;
}

export function IconButton({ label, children, variant = 'ghost', size = 'md', className, ...rest }: IconButtonProps) {
  return (
    <Button variant={variant} size={size} className={cx('ds-btn--icon-only', className)} aria-label={label} title={label} {...rest}>
      <span aria-hidden="true" className="ds-btn__icon">{children}</span>
    </Button>
  );
}
