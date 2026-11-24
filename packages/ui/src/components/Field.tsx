import { useId, type ReactNode } from 'react';
import { cx } from '../cx';

export interface FieldControlProps {
  id: string;
  'aria-describedby'?: string;
  'aria-invalid'?: true;
}

export interface FieldProps {
  label: ReactNode;
  hint?: ReactNode;
  /** When set the field is invalid and the message is announced. */
  error?: ReactNode;
  required?: boolean;
  className?: string;
  /** Render the control with the ids and aria attributes it must carry. */
  children: (control: FieldControlProps) => ReactNode;
}

/** Label + control + hint + error, wired together. Input, Textarea and Select use it; use it directly for custom controls. */
export function Field({ label, hint, error, required, className, children }: FieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
  return (
    <div className={cx('ds-field', className)}>
      <label className="ds-field__label" htmlFor={id}>
        {label}
        {required ? <span className="ds-field__req" aria-hidden="true"> *</span> : null}
      </label>
      {children({ id, 'aria-describedby': describedBy, 'aria-invalid': error ? true : undefined })}
      {hint ? <p className="ds-field__hint" id={hintId}>{hint}</p> : null}
      {error ? <p className="ds-field__error" id={errorId} role="alert">{error}</p> : null}
    </div>
  );
}
