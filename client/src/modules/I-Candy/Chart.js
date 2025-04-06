import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, 
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

export default function MyAnimatedLineChart() {
  const chartRef = useRef(null);

  const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Past Month Credit Score',
        data: [650, 670, 690, 710],
        borderColor: 'gray',
        backgroundColor: 'rgba(81, 81, 81, 0.2)',
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: 'gray',
        pointBorderColor: 'gray',
        fill: true, 
        tension: 0.4, 
      },
      {
        label: 'This Month Credit Score',
        data: [720, 630, 740, 750], 
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.2)', 
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: 'green',
        pointBorderColor: 'green',
        fill: true, 
        tension: 0.4, 
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      title: {
        display: true,
      },
      legend: {
        position: 'bottom',
      },
    },
    animation: {
      duration: 1900,
      easing: 'easeInOutQuart', 
      onComplete: () => {
        console.log('Animation Completed');
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '400px' }}> 
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
}
