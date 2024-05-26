
'use client'; 

import React, { useState } from 'react';

const AddEntryPage = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [departmentId, setDepartmentId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          firstName,
          lastName,
          role,
          departmentId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log("User added successfully:", result);
      alert('User added successfully!');
      // Reset form fields here VV
      setUsername('');
      setFirstName('');
      setLastName('');
      setRole('');
      setDepartmentId('');
    } catch (error) {
      console.error("Failed to add user:", error);
      alert(`Failed to add user: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <h1>Add New User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <input
            type="text"
            value={role}
            onChange={e => setRole(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Department ID (optional):</label>
          <input
            type="text"
            value={departmentId}
            onChange={e => setDepartmentId(e.target.value)}
          />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddEntryPage;
