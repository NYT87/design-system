import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { cx } from '../cx';
import { Field } from './Field';

interface Shared { label: ReactNode; hint?: ReactNode; error?: ReactNode }

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, Shared {}
export function Input({ label, hint, error, className, required, ...rest }: InputProps) {
  return (
    <Field label={label} hint={hint} error={error} required={required}>
      {(c) => <input className={cx('ds-control', className)} required={required} {...c} {...rest} />}
    </Field>
  );
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, Shared {}
export function Textarea({ label, hint, error, className, required, rows = 4, ...rest }: TextareaProps) {
  return (
    <Field label={label} hint={hint} error={error} required={required}>
      {(c) => <textarea className={cx('ds-control', 'ds-control--area', className)} rows={rows} required={required} {...c} {...rest} />}
    </Field>
  );
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, Shared {}
export function Select({ label, hint, error, className, required, children, ...rest }: SelectProps) {
  return (
    <Field label={label} hint={hint} error={error} required={required}>
      {(c) => <select className={cx('ds-control', 'ds-control--select', className)} required={required} {...c} {...rest}>{children}</select>}
    </Field>
  );
}
