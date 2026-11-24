import { Table } from '@nyt87/ui';

export default function Example() {
  return (
    <Table caption="Laps">
      <thead>
        <tr><th scope="col">Lap</th><th scope="col" className="ds-num">Distance (km)</th><th scope="col" className="ds-num">Time</th></tr>
      </thead>
      <tbody>
        <tr><th scope="row">1</th><td className="ds-num">5.02</td><td className="ds-num">24:31</td></tr>
        <tr><th scope="row">2</th><td className="ds-num">5.00</td><td className="ds-num">24:08</td></tr>
        <tr><th scope="row">3</th><td className="ds-num">4.98</td><td className="ds-num">23:55</td></tr>
      </tbody>
    </Table>
  );
}
