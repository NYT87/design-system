import { Stat, StatGrid } from '@nyt87/ui';

export default function Example() {
  return (
    <StatGrid>
      <Stat label="Distance" value="15.0" unit="km" />
      <Stat label="Moving time" value="1:12:34" />
      <Stat label="Avg speed" value="12.4" unit="km/h" hint="+0.6 vs last week" />
      <Stat label="Elevation" value="240" unit="m" />
    </StatGrid>
  );
}
