import React from 'react';
import { Scatter } from 'react-chartjs-2';

function Chromatogram({ chromatogramData }) {
  const chartData = {
    labels: ['Scatter'],
    datasets: [
      {
        label: 'Chromatogram',
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.4)',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: chromatogramData,
      },
    ],
  };

  return (
    <div style={{ marginTop: '32px' }}>
      <h3>Chromatogram Plot</h3>
      <Scatter data={chartData} />
    </div>
  );
}

export default Chromatogram;
