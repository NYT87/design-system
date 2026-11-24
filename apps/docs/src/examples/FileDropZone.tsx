import { useState } from 'react';
import { FileDropZone } from '@nyt87/ui';

export default function Example() {
  const [names, setNames] = useState<string[]>([]);
  return (
    <div className="stack">
      <FileDropZone accept=".gpx,.tcx,.fit" onFiles={(files) => setNames(files.map((f) => f.name))}>
        Drop a GPX, TCX or FIT file here
      </FileDropZone>
      {names.length ? <p>Received: <code>{names.join(', ')}</code></p> : null}
    </div>
  );
}
