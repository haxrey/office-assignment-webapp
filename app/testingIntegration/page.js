'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Optimize = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data from /api/optimize...');
        const response = await axios.get('/api/optimize');
        console.log('Data fetched:', response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching optimization data:', error);
        setError('Error fetching optimization data');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Optimization Results</h1>
      {data.length === 0 ? (
        <p>No data available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Office</th>
              <th>Role</th>
              <th>Department</th>
              <th>Floor</th>
              <th>Capacity</th>
              <th>Occupancy</th>
            </tr>
          </thead>
          <tbody>
            {data.map((assignment, index) => (
              <tr key={index}>
                <td>{assignment.name}</td>
                <td>{assignment.id}</td>
                <td>{assignment.office}</td>
                <td>{assignment.role}</td>
                <td>{assignment.department}</td>
                <td>{assignment.floor}</td>
                <td>{assignment.capacity}</td>
                <td>{assignment.occupancy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Optimize;
