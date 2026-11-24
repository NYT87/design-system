import { Button, Card } from '@nyt87/ui';

export default function Example() {
  return (
    <div className="row">
      <Card title="Connected accounts" actions={<Button size="sm" variant="secondary">Add</Button>} style={{ flex: '1 1 18rem' }}>
        You have 3 accounts connected. Tokens refresh automatically.
      </Card>
      <Card style={{ flex: '1 1 18rem' }}>A card without a header is just a surface.</Card>
    </div>
  );
}
