import { Spinner } from '@nyt87/ui';

export default function Example() {
  return (
    <div className="row">
      <Spinner />
      <Spinner size="2rem" label="Loading map" />
    </div>
  );
}
