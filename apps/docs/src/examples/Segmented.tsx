import { useState } from 'react';
import { Segmented } from '@nyt87/ui';

export default function Example() {
  const [metric, setMetric] = useState('speed');
  return (
    <div className="stack">
      <Segmented
        label="Chart metric"
        value={metric}
        onChange={setMetric}
        options={[
          { value: 'speed', label: 'Speed' },
          { value: 'pace', label: 'Pace' },
          { value: 'hr', label: 'Heart rate' },
        ]}
      />
      <p>Showing: <strong>{metric}</strong></p>
    </div>
  );
}
