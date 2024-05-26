'use client';
import { useState } from 'react';
import axios from 'axios';

const fetchOptimization = async () => {
  try {
    const response = await axios.post('http://localhost:8000/optimize');
    return response.data;
  } catch (error) {
    console.error("Error fetching optimization data:", error);
    return [];
  }
};

export default function Page() {
  const [data, setData] = useState([]);

  const handleFetchData = async () => {
    const result = await fetchOptimization();
    setData(result);
  };

  return (
    <div>
      <h1>Optimization Results</h1>
      <button onClick={handleFetchData}>Fetch Data</button>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Office</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.employee}</td>
              <td>{item.office}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
