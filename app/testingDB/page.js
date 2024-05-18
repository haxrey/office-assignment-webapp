// app/testingDB/page.js
'use client';

import React, { useState, useEffect } from 'react';

const TestingDBPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState('');

  useEffect(() => {
    fetch('/api/assignments')
      .then(response => response.json())
      .then(data => {
        setAssignments(data);
      })
      .catch(error => console.error('Error loading assignments:', error));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold text-center mb-4">Assignments</h1>
      <div style={{ margin: '10px 0' }}>
        <select onChange={e => setSelectedOffice(e.target.value)} defaultValue="">
          <option value="">All Offices</option>
          {assignments.map(office => (
            <option key={office.officeId} value={office.officeNumber}>{office.officeNumber}</option>
          ))}
        </select>
      </div>
      <table style={{ margin: 'auto', borderCollapse: 'collapse', border: 'solid 1px gray', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: 'solid 3px blue', background: 'aliceblue', color: 'black', fontWeight: 'bold', padding: '10px', border: 'solid 1px gray' }}>Office Number</th>
            <th style={{ borderBottom: 'solid 3px blue', background: 'aliceblue', color: 'black', fontWeight: 'bold', padding: '10px', border: 'solid 1px gray' }}>Person Occupying</th>
            <th style={{ borderBottom: 'solid 3px blue', background: 'aliceblue', color: 'black', fontWeight: 'bold', padding: '10px', border: 'solid 1px gray' }}>Role</th>
            <th style={{ borderBottom: 'solid 3px blue', background: 'aliceblue', color: 'black', fontWeight: 'bold', padding: '10px', border: 'solid 1px gray' }}>Department</th>
            <th style={{ borderBottom: 'solid 3px blue', background: 'aliceblue', color: 'black', fontWeight: 'bold', padding: '10px', border: 'solid 1px gray' }}>Office Current Occupation</th>
            <th style={{ borderBottom: 'solid 3px blue', background: 'aliceblue', color: 'black', fontWeight: 'bold', padding: '10px', border: 'solid 1px gray' }}>Capacity</th>
            <th style={{ borderBottom: 'solid 3px blue', background: 'aliceblue', color: 'black', fontWeight: 'bold', padding: '10px', border: 'solid 1px gray' }}>Floor NO</th>
          </tr>
        </thead>
        <tbody>
          {assignments.filter(assignment => !selectedOffice || assignment.officeNumber === selectedOffice).map(assignment => (
            <tr key={assignment.officeId}>
              <td style={{ padding: '10px', border: 'solid 1px gray', textAlign: 'center' }}>{assignment.officeNumber}</td>
              <td style={{ padding: '10px', border: 'solid 1px gray', textAlign: 'center' }}>{assignment.occupants.join(', ')}</td>
              <td style={{ padding: '10px', border: 'solid 1px gray', textAlign: 'center' }}>{assignment.role.join(', ')}</td>
              <td style={{ padding: '10px', border: 'solid 1px gray', textAlign: 'center' }}>{assignment.department}</td>
              <td style={{ padding: '10px', border: 'solid 1px gray', textAlign: 'center' }}>{assignment.currentOccupancy}</td>
              <td style={{ padding: '10px', border: 'solid 1px gray', textAlign: 'center' }}>{assignment.capacity}</td>
              <td style={{ padding: '10px', border: 'solid 1px gray', textAlign: 'center' }}>{assignment.floor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestingDBPage;
