import { useId } from 'react';
import { cx } from '../cx';

export interface SegmentedOption<T extends string> { value: T; label: string }

export interface SegmentedProps<T extends string> {
  /** Names the group for assistive tech, e.g. "Chart metric". */
  label: string;
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: 'sm' | 'md';
  className?: string;
}

/** Pick exactly one of 2-5 short options (a view or metric). Native radios: arrow keys work for free. */
export function Segmented<T extends string>({ label, options, value, onChange, size = 'md', className }: SegmentedProps<T>) {
  const name = useId();
  return (
    <div role="radiogroup" aria-label={label} className={cx('ds-seg', `ds-seg--${size}`, className)}>
      {options.map((o) => (
        <label key={o.value} className="ds-seg__item">
          <input type="radio" name={name} value={o.value} checked={o.value === value} onChange={() => onChange(o.value)} />
          <span>{o.label}</span>
        </label>
      ))}
    </div>
  );
}
