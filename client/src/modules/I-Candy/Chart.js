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

// Register Chart.js components to be used for the line chart
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
  // Ref for the chart instance
  const chartRef = useRef(null);

  // Labels for the X-axis (weeks)
  const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

  // Data for the chart
  const data = {
    labels: labels, // Weeks
    datasets: [
      {
        label: 'Past Month Credit Score', // Label for past month dataset
        data: [650, 670, 690, 710], // Past month data
        borderColor: '#888888', // Light gray for past data
        backgroundColor: 'rgba(136, 136, 136, 0.3)', // Semi-transparent fill
        borderWidth: 3,
        pointRadius: 5, // Point size
        pointBackgroundColor: '#888888', // Point color
        pointBorderColor: '#888888',
        fill: true, // Fill under the line
        tension: 0.4, // Smoothing the line
      },
      {
        label: 'This Month Credit Score', // Label for current month dataset
        data: [720, 630, 740, 750], // Current month data
        borderColor: '#28a745', // Green for current data
        backgroundColor: 'rgba(40, 167, 69, 0.3)', // Semi-transparent green fill
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: '#28a745',
        pointBorderColor: '#28a745',
        fill: true, // Fill under the line
        tension: 0.4, // Smoothing the line
      },
    ],
  };

  // Options to customize chart behavior and appearance
  const options = {
    responsive: true, // Make the chart responsive to screen size
    maintainAspectRatio: false, // Allow chart to stretch
    plugins: {
      legend: {
        position: 'top', // Position legend at the bottom
        labels: {
          font: {
            size: 14, // Larger font size for legend items
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
      duration: 1500, // Animation duration
      easing: 'easeInOutQuart', // Smooth animation effect
    },
    scales: {
      y: {
        beginAtZero: false, // Ensure the Y-axis doesn't start at zero
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
    <div style={{ width: '100%', height: '400px' }}>
      {/* Line chart with provided data and options */}
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
}
