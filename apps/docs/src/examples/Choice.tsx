import { useState } from 'react';
import { Checkbox, Switch } from '@nyt87/ui';

export default function Example() {
  const [sync, setSync] = useState(true);
  return (
    <div className="stack">
      <Checkbox label="Send me product updates" hint="At most one email a month." defaultChecked />
      <Checkbox label="Disabled option" disabled />
      <Switch label="Background sync" hint={sync ? 'On: syncs every 5 minutes.' : 'Off: sync manually.'} checked={sync} onChange={(e) => setSync(e.target.checked)} />
    </div>
  );
}
