'use client';
import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';
import * as XLSX from 'xlsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideNavbar from '../components/SideNavbar';
import Header from '../components/Header';
import Logo from '../components/Logo';

const saveAssignment = async (assignmentData) => {
  try {
    const response = await fetch('/api/saveAssignments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assignmentData),
    });

    const result = await response.json();
    if (response.ok) {
      console.log(result.message);
      toast.success(result.message);
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Failed to save the assignment:', error);
    toast.error(`Failed to save the assignment: ${error.message}`);
  }
};

const AssignedOfficesPage = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [filterInput, setFilterInput] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  useEffect(() => {
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    setStaffMembers(assignments);
  }, []);

  const data = useMemo(() => {
    return staffMembers.filter(person => person.department.includes(selectedDepartment));
  }, [staffMembers, selectedDepartment]);

  const columns = useMemo(() => [
    { Header: 'Office NO', accessor: 'officeNumber' },
    { Header: 'Person Occupying', accessor: 'name' },
    { Header: 'Role', accessor: 'role' },
    { Header: 'Current Occupation', accessor: 'currentOccupancy' },
    { Header: 'Capacity', accessor: 'capacity' },
    { Header: 'Floor', accessor: 'floor' },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data }, useFilters, useGlobalFilter, useSortBy);

  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setGlobalFilter(value);
    setFilterInput(value);
  };

  const handleSelectDepartment = e => {
    setSelectedDepartment(e.target.value);
  };

  const exportToExcel = () => {
    try {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Assigned Offices");
      XLSX.writeFile(wb, "assigned_offices.xlsx");
      console.log("Export function called."); 
      toast.success(`File has been successfully exported: assigned_offices.xlsx`);
    } catch (error) {
      console.error("Export failed:", error); 
      toast.error(`Failed to export file: ${error.message}`); 
    }
  };

  const saveData = () => {
    saveAssignment(data); 
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex-1 flex flex-col">
        <Header />
        <Logo />
        <div className="flex flex-col items-center justify-center p-8">
          <h1 className="text-2xl font-bold text-center mb-4">Assigned Offices Page</h1>
          <div className="mb-4">
            {staffMembers.length > 0 && <h2 className="text-lg font-semibold mb-2">{staffMembers[0].assignee}</h2>}
            <button onClick={() => alert(staffMembers[0].description)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mb-2">
              Description
            </button>
          </div>
          <div style={{ margin: '10px 0' }}>
            <input
              value={filterInput}
              onChange={handleFilterChange}
              placeholder="Search by name..."
            />
            <select onChange={handleSelectDepartment} defaultValue="">
              <option value="">All Departments</option>
              {[...new Set(staffMembers.map(item => item.department))].map(department => (
                <option key={department} value={department}>{department}</option>
              ))}
            </select>
          </div>
          <button onClick={exportToExcel} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Export to Excel
          </button>
          <button onClick={saveData} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Save Assignment
            </button>
          <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
          <div className="overflow-x-auto">
            <table {...getTableProps()} style={{ margin: 'auto', borderCollapse: 'collapse', border: 'solid 1px gray', width: '100%' }}>
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ borderBottom: 'solid 3px blue', background: 'aliceblue', color: 'black', fontWeight: 'bold', padding: '10px', border: 'solid 1px gray' }}>
                        {column.render('Header')}
                        <span>
                          {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''} 
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => (
                        <td {...cell.getCellProps()} style={{ padding: '10px', border: 'solid 1px gray', textAlign: 'center' }}>
                          {cell.render('Cell')}
                        </td>
                      ))}
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
