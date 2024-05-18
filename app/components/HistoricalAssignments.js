// components/HistoricalAssignments.js
import React from 'react';

const HistoricalAssignments = () => {
  // Example data, replace with real data fetching
  const history = [
    { date: '2024-05-10', changes: '5 assignments changed' },
    { date: '2024-05-05', changes: '3 assignments changed' },
    { date: '2024-05-01', changes: '7 assignments changed' },
    // Add more history as needed
  ];

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Historical Assignments</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Date</th>
            <th className="py-2">Changes</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry) => (
            <tr key={entry.date}>
              <td className="py-2">{entry.date}</td>
              <td className="py-2">{entry.changes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoricalAssignments;
