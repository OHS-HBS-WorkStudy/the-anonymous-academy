import React, { useRef, useState } from 'react';
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
        borderColor: '#888888',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: '#888888',
        pointBorderColor: '#888888',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'This Month Credit Score',
        data: [720, 630, 740, 750],
        borderColor: '#28a745',
        backgroundColor: 'rgba(40, 167, 69, 0.3)',
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: '#28a745',
        pointBorderColor: '#28a745',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = tooltipItem.dataset.label || '';
            const value = tooltipItem.raw;
            return `${label}: ${value}`;
          },
        },
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart',
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          stepSize: 50,
        },
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
      onHover: (event, chartElement) => {
        if (chartElement.length > 0) {
          const { datasetIndex, index } = chartElement[0];
          const datasetLabel = data.datasets[datasetIndex].label;
          const week = data.labels[index];
          const score = data.datasets[datasetIndex].data[index];
          console.log(`Hovered over ${datasetLabel}: Week ${week} - Score: ${score}`);
        }
      },
    },
  };


  return (

    <div className="chartjs" style={{ width: '100%', height: '400px' }}>
    
        <Line ref={chartRef} data={data} options={options} />
      </div>
    );
}