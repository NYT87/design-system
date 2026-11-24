import { useId, useRef, useState, type DragEvent, type ReactNode } from 'react';
import { cx } from '../cx';
import { Button } from './Button';

export interface FileDropZoneProps {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  /** Visible instruction. */
  children?: ReactNode;
  className?: string;
}

/** Drag-and-drop target that is also a real file picker, so keyboard and touch users are not left out. */
export function FileDropZone({ onFiles, accept, multiple, children, className }: FileDropZoneProps) {
  const [over, setOver] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const id = useId();

  const drop = (e: DragEvent) => {
    e.preventDefault();
    setOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length) onFiles(multiple ? files : files.slice(0, 1));
  };

  return (
    <div
      className={cx('ds-drop', over && 'ds-drop--over', className)}
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={drop}
    >
      <p className="ds-drop__text" id={id}>{children ?? 'Drop a file here'}</p>
      <input
        ref={input}
        type="file"
        hidden
        accept={accept}
        multiple={multiple}
        onChange={(e) => { const f = Array.from(e.target.files ?? []); if (f.length) onFiles(f); e.target.value = ''; }}
      />
      <Button variant="secondary" aria-describedby={id} onClick={() => input.current?.click()}>Choose file</Button>
    </div>
  );
}
