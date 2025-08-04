import React, { useRef, useState, useEffect } from 'react';
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
  Filler, // Needed for area fill
} from 'chart.js';

// MUI Imports
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // For accessing theme colors

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // Register Filler plugin for area fill
);

export default function MyAnimatedLineChart() {
  const chartRef = useRef(null);
  const theme = useTheme();

  // Function to create a linear gradient for Chart.js background
  const createGradient = (chart, color) => {
    const ctx = chart.canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, chart.chartArea.bottom);
    gradient.addColorStop(0, color.start); // Top of the gradient
    gradient.addColorStop(1, color.end);   // Bottom of the gradient
    return gradient;
  };

  const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

  // Use state for chart data to allow for dynamic updates (even if hardcoded for now)
  const [chartData, setChartData] = useState({
    labels: labels,
    datasets: [], // Initialize empty, fill in useEffect
  });

  // Update datasets when theme changes or on mount to apply gradients
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    // Define gradient colors using theme palette
    const pastMonthGradientColors = {
      start: theme.palette.grey[400], // Lighter grey at top
      end: theme.palette.background.paper, // Use paper background, assuming it's light and will blend
    };

    const thisMonthGradientColors = {
      start: theme.palette.primary.light, // Lighter primary color at top
      end: theme.palette.background.paper, // Use paper background
    };

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Past Month Score',
          data: [650, 670, 690, 710],
          borderColor: theme.palette.grey[600], // Darker grey for line
          backgroundColor: createGradient(chart, pastMonthGradientColors), // Dynamic gradient
          borderWidth: 2, // Slightly thinner line
          pointRadius: 4, // Smaller points
          pointBackgroundColor: theme.palette.grey[600],
          pointBorderColor: theme.palette.background.paper, // Point border matches paper background
          pointBorderWidth: 2,
          fill: true,
          tension: 0.3, // Smoother curve
        },
        {
          label: 'This Month Score',
          data: [720, 730, 740, 750], // Slightly adjusted data for better visual progression
          borderColor: theme.palette.primary.main, // Primary theme color for line
          backgroundColor: createGradient(chart, thisMonthGradientColors), // Dynamic gradient
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: theme.palette.primary.main,
          pointBorderColor: theme.palette.background.paper,
          pointBorderWidth: 2,
          fill: true,
          tension: 0.3,
        },
      ],
    });
  }, [theme]); // Re-run effect if theme changes


  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows chart to fill container's height
    plugins: {
      title: {
        display: true,
        text: '',
        font: {
          size: 18,
          weight: 'bold',
          family: theme.typography.fontFamily,
        },
        color: theme.palette.text.primary,
        align: 'start', // Align title to the start
        padding: { top: 10, bottom: 20 },
      },
      legend: {
        position: 'bottom', // Move legend to bottom for cleaner top space
        labels: {
          font: {
            size: 12,
            family: theme.typography.fontFamily,
          },
          color: theme.palette.text.secondary,
          boxWidth: 20, // Smaller color box
          padding: 15, // Padding between legend items
        },
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper, // Solid paper background
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        cornerRadius: 8, // Rounded corners
        displayColors: true, // Show color box next to label
        boxPadding: 4,
        callbacks: {
          label: (tooltipItem) => {
            const label = tooltipItem.dataset.label || '';
            const value = tooltipItem.raw;
            return `${label}: ${value} pts`; // Add "pts" for score
          },
          title: (tooltipItems) => `Week ${tooltipItems[0].dataIndex + 1}`, // Cleaner title
        },
      },
    },
    layout: {
        padding: {
            top: 10,
            left: 10,
            right: 10,
            bottom: 10
        }
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove vertical grid lines
          borderColor: theme.palette.divider,
        },
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            family: theme.typography.fontFamily,
            size: 10,
          },
        },
        border: {
            display: false, // Remove x-axis line
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          color: theme.palette.grey[300], // Use a solid light grey for grid lines
          drawBorder: false, // Remove y-axis line
          drawOnChartArea: true, // Ensure grid lines are drawn
          drawTicks: false, // Remove small tick marks on axis
          borderDash: [5, 5], // Dashed grid lines
        },
        ticks: {
          stepSize: 25, // Adjust step size as needed
          color: theme.palette.text.secondary,
          font: {
            family: theme.typography.fontFamily,
            size: 10,
          },
          callback: function(value) { // Add "pts" to y-axis labels
              return value + ' pts';
          }
        },
        border: {
            display: false, // Remove y-axis line
        },
      },
    },
    animation: {
      duration: 1200, // Slightly faster animation
      easing: 'easeOutQuart', // Smooth easing
    },
    hover: {
      mode: 'index', // Show tooltip for all datasets at the same index
      intersect: false, // Tooltip shows even if not directly on a point
    },
  };

  return (
    // Box to contain the chart and provide dimensions/padding within its parent
    <Box sx={{ width: '100%', height: 'calc(100% - 40px)', minHeight: '250px' }}> {/* Adjusted height for chart area within card */}
      <Line ref={chartRef} data={chartData} options={options} />
    </Box>
  );
}