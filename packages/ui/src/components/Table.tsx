import type { TableHTMLAttributes } from 'react';
import { cx } from '../cx';

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /** Required: names the table for assistive tech. */
  caption: string;
  /** Show the caption visibly (default hides it visually but keeps it for screen readers). */
  showCaption?: boolean;
}

/** Styled native table inside a horizontal scroller. Use <thead>/<th scope> as normal; add class "ds-num" to numeric cells to right-align them. */
export function Table({ caption, showCaption, className, children, ...rest }: TableProps) {
  return (
    <div className="ds-table-wrap" role="region" aria-label={caption} tabIndex={0}>
      <table className={cx('ds-table', className)} {...rest}>
        <caption className={showCaption ? 'ds-table__caption' : 'ds-sr-only'}>{caption}</caption>
        {children}
      </table>
    </div>
  );
}
