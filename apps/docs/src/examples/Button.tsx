import { Button, IconButton } from '@nyt87/ui';

export default function Example() {
  return (
    <div className="stack">
      <div className="row">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Delete</Button>
      </div>
      <div className="row">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large (touch)</Button>
      </div>
      <div className="row">
        <Button loading>Saving</Button>
        <Button disabled>Disabled</Button>
        <Button icon="＋">With icon</Button>
        <IconButton label="Settings">⚙</IconButton>
      </div>
    </div>
  );
}
