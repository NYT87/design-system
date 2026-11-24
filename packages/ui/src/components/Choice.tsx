import type { InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../cx';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label: ReactNode;
  hint?: ReactNode;
}

export function Checkbox({ label, hint, className, ...rest }: CheckboxProps) {
  return (
    <label className={cx('ds-choice', className)}>
      <input type="checkbox" className="ds-choice__box" {...rest} />
      <span className="ds-choice__text">
        {label}
        {hint ? <span className="ds-choice__hint">{hint}</span> : null}
      </span>
    </label>
  );
}

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label: ReactNode;
  hint?: ReactNode;
}

/** An on/off setting that takes effect immediately. For a choice submitted with a form, use Checkbox. */
export function Switch({ label, hint, className, ...rest }: SwitchProps) {
  return (
    <label className={cx('ds-choice', className)}>
      <input type="checkbox" role="switch" className="ds-switch" {...rest} />
      <span className="ds-choice__text">
        {label}
        {hint ? <span className="ds-choice__hint">{hint}</span> : null}
      </span>
    </label>
  );
}
