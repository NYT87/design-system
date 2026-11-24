import { Button, EmptyState } from '@nyt87/ui';

export default function Example() {
  return (
    <EmptyState icon="🗂" title="No activities yet" action={<Button>Import a file</Button>}>
      Drop a GPX, TCX or FIT file to see your route and statistics.
    </EmptyState>
  );
}
