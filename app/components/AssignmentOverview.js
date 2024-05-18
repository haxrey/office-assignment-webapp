// components/AssignmentOverview.js
import React from 'react';

const AssignmentOverview = () => {
  // Example data, replace with real data fetching
  const overview = [
    { office: 'D112', assigned: 2, capacity: 2 },
    { office: 'D113', assigned: 3, capacity: 3 },
    { office: 'D114', assigned: 1, capacity: 2 },
    // Add more offices as needed
  ];

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Assignment Overview</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Office</th>
            <th className="py-2">Assigned</th>
            <th className="py-2">Capacity</th>
          </tr>
        </thead>
        <tbody>
          {overview.map((office) => (
            <tr key={office.office}>
              <td className="py-2">{office.office}</td>
              <td className="py-2">{office.assigned}</td>
              <td className="py-2">{office.capacity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentOverview;
