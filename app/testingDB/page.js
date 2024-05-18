'use client';
import React, { useEffect, useState } from 'react';
import SideNavbar from '../components/SideNavbar';
import Header from '../components/Header';
import Logo from '../components/Logo';

const AssignedOfficesPage = () => {
  const [offices, setOffices] = useState([]);
  const [staff, setStaff] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [officesRes, staffRes, departmentsRes] = await Promise.all([
          fetch('/api/fetchOffices'),
          fetch('/api/fetchStaff'),
          fetch('/api/fetchDepartments'),
        ]);
        if (!officesRes.ok) throw new Error('Failed to fetch offices');
        if (!staffRes.ok) throw new Error('Failed to fetch staff');
        if (!departmentsRes.ok) throw new Error('Failed to fetch departments');

        const [officesData, staffData, departmentsData] = await Promise.all([
          officesRes.json(),
          staffRes.json(),
          departmentsRes.json(),
        ]);

        setOffices(officesData);
        setStaff(staffData);
        setDepartments(departmentsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex-1 flex flex-col">
        <Header />
        <Logo />
        <div className="flex flex-col items-center justify-center p-8">
          <h1 className="text-2xl font-bold text-center mb-4">Assigned Offices Page</h1>
          <div style={{ margin: '10px 0' }}>
            <select onChange={e => setSelectedOffice(e.target.value)} defaultValue="">
              <option value="">All Offices</option>
              {offices.map(office => (
                <option key={office.id} value={office.officeNumber}>{office.officeNumber}</option>
              ))}
            </select>
          </div>
          <div className="overflow-x-auto">
            <table style={{ margin: 'auto', borderCollapse: 'collapse', border: 'solid 1px gray', width: '100%' }}>
              <thead>
                <tr>
                  <th>Office Number</th>
                  <th>Person Occupying</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Office Current Occupation</th>
                  <th>Capacity</th>
                  <th>Floor NO</th>
                </tr>
              </thead>
              <tbody>
                {offices.map(office => {
                  const occupyingStaff = staff.filter(member => member.officeNumber === office.officeNumber);
                  return (
                    <tr key={office.id}>
                      <td>{office.officeNumber}</td>
                      <td>{occupyingStaff.map(member => `${member.firstName} ${member.lastName}`).join(', ')}</td>
                      <td>{occupyingStaff.map(member => member.role).join(', ')}</td>
                      <td>{occupyingStaff.map(member => member.department.name).join(', ')}</td>
                      <td>{office.currentOccupancy}</td>
                      <td>{office.capacity}</td>
                      <td>{office.floor}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedOfficesPage;
