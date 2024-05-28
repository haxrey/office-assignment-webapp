'use client';
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

//mock component for resource monitor currently disabled (not in use)
const ResourceMonitor = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Resource Usage',
        data: [65, 59, 80, 81, 56, 55, 40], 
        fill: true,
        backgroundColor: 'rgba(37, 99, 235, 0.2)', 
        borderColor: '#2563EB', 
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="resource-monitor bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Resource Monitor</h2>

      <div className="chart-container"> 
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ResourceMonitor;