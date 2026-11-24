import { Alert, Button } from '@nyt87/ui';

export default function Example() {
  return (
    <div className="stack">
      <Alert title="Heads up">Imports run in the background; you can leave this page.</Alert>
      <Alert tone="ok" title="Saved">Your changes are live.</Alert>
      <Alert tone="warn" title="Credential expires in 3 days">Reconnect to avoid interruption.</Alert>
      <Alert tone="danger" title="Could not parse the file" action={<Button size="sm" variant="secondary">Try again</Button>}>
        Line 42: unexpected end of input.
      </Alert>
    </div>
  );
}
