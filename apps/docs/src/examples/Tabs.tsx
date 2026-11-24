import { Tabs } from '@nyt87/ui';

export default function Example() {
  return (
    <Tabs
      label="Activity sections"
      tabs={[
        { id: 'summary', label: 'Summary', content: 'Distance, time and average speed.' },
        { id: 'laps', label: 'Laps', content: 'One row per lap.' },
        { id: 'sensors', label: 'Sensors', content: 'Heart rate, cadence and power streams.' },
      ]}
    />
  );
}
