import { Badge } from '@nyt87/ui';

export default function Example() {
  return (
    <div className="row">
      <Badge>Draft</Badge>
      <Badge tone="accent">New</Badge>
      <Badge tone="ok">Connected</Badge>
      <Badge tone="warn">Expiring</Badge>
      <Badge tone="danger">Failed</Badge>
    </div>
  );
}
