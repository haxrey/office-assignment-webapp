
import React from 'react';
//mock component for optimization status currently disabled (not in use)
const OptimizationStatus = () => {

  const status = {
    lastRun: '2024-05-18 14:32:00',
    runtime: '15 seconds',
    objective: 'Maximize office utilization',
    status: 'Optimal',
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Optimization Status</h2>
      <p><strong>Last Run:</strong> {status.lastRun}</p>
      <p><strong>Runtime:</strong> {status.runtime}</p>
      <p><strong>Objective:</strong> {status.objective}</p>
      <p><strong>Status:</strong> {status.status}</p>
    </div>
  );
};

export default OptimizationStatus;
