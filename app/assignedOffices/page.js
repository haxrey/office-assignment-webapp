// pages/assignedOffices.js
'use client';
import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';
import { FaInfoCircle } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';
import SideNavbar from '../components/SideNavbar';
import Header from '../components/Header';
import Logo from '../components/Logo';

const fetchOfficeAssignments = async () => {
  try {
    const response = await fetch('/api/getStaffAssignments');
    const data = await response.json();
    return data;
  } catch (error) {
    toast.error('Error fetching data');
    throw new Error('Error fetching data');
  }
};

const fetchAvailableOffices = async () => {
  try {
    const response = await fetch('/api/getAvailableOffices');
    const data = await response.json();
    return data;
  } catch (error) {
    toast.error('Error fetching available offices');
    throw new Error('Error fetching available offices');
  }
};

const updateOfficeAssignment = async (assignmentData) => {
  try {
    const response = await fetch('/api/updateOfficeAssignment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assignmentData),
    });

    const result = await response.json();
    if (response.ok) {
      toast.success(result.message);
    } else {
      toast.error(result.message || 'Failed to update the assignment');
    }
  } catch (error) {
    toast.error(`Failed to update the assignment: ${error.message}`);
  }
};

const removeOfficeAssignment = async (assignmentData) => {
  try {
    const response = await fetch('/api/removeOfficeAssignment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assignmentData),
    });

    const result = await response.json();
    if (response.ok) {
      toast.success(result.message);
    } else {
      toast.error(result.message || 'Failed to remove the assignment');
    }
  } catch (error) {
    toast.error(`Failed to remove the assignment: ${error.message}`);
  }
};

const EditModal = ({ isOpen, onClose, data, availableOffices, onUpdate, onRemove }) => {
  const [formData, setFormData] = useState({ ...data });

  useEffect(() => {
    if (data) {
      setFormData({ ...data });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const office = availableOffices.find(office => office.id === formData.officeId);
    const updatedData = { ...formData, floor: office?.floor || formData.floor };
    onUpdate(updatedData);
    onClose();
  };

  const handleRemove = () => {
    onRemove(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Assignment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Office Number</label>
            <select
              name="officeId"
              value={formData.officeId || ''}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="">Select an office</option>
              {availableOffices.map(office => (
                <option key={office.id} value={office.id}>
                  {office.officeNumber} (Floor: {office.floor})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleRemove}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Remove
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AssignedOfficesPage = () => {
  const searchParams = useSearchParams();
  const initialDepartment = searchParams.get('department') || 'All Faculty';
  const assignee = searchParams.get('assignee') || ''; //The issue was here, we needed a local query parameter i fixed it -Nour :>
  const description = searchParams.get('description') || ''; //here as well -Nour :>
  const priority = searchParams.get('priority') || ''; //and here as well -Nour :>
  const [staffMembers, setStaffMembers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [availableOffices, setAvailableOffices] = useState([]);
  const [filterInput, setFilterInput] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(initialDepartment);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false); // Info state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('/api/departments');
        const data = await response.json();
        setDepartments([{ id: 'all', name: 'All Faculty' }, ...data]);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    const fetchData = async () => {
      try {
        const data = await fetchOfficeAssignments();
        setStaffMembers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching data');
      }
    };

    const fetchOffices = async () => {
      try {
        const data = await fetchAvailableOffices();
        setAvailableOffices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching available offices:', error);
        toast.error('Error fetching available offices');
      }
    };

    const loadData = async () => {
      await fetchDepartments();
      await fetchData();
      await fetchOffices();
      setLoading(false);
    };

    loadData();
  }, []);

  const data = useMemo(() => {
    if (selectedDepartment === 'All Faculty') return staffMembers;
    return staffMembers.filter(person => person.department === selectedDepartment);
  }, [staffMembers, selectedDepartment]);

  const columns = useMemo(() => [
    { Header: 'Office NO', accessor: 'officeNumber' },
    { Header: 'Person Occupying (full name)', accessor: row => `${row.firstName} ${row.lastName}`, id: 'fullName' },
    { Header: 'Role', accessor: 'role' },
    { Header: 'Department', accessor: 'department' },
    { Header: 'Current Occupation', accessor: 'currentOccupancy' },
    { Header: 'Capacity', accessor: 'capacity' },
    { Header: 'Floor', accessor: 'floor' },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <button onClick={() => handleEdit(row.original)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
          Edit
        </button>
      ),
    },
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

  const handleEdit = (data) => {
    setEditData(data);
    setIsModalOpen(true);
  };

  const handleUpdate = async (updatedData) => {
    const updatedAssignments = staffMembers.map(item =>
      item.id === updatedData.id ? updatedData : item
    );
    setStaffMembers(updatedAssignments);
    await updateOfficeAssignment(updatedData);
  };

  const handleRemove = async (data) => {
    const updatedAssignments = staffMembers.filter(item => item.id !== data.id);
    setStaffMembers(updatedAssignments);
    await removeOfficeAssignment({ staffId: data.id, officeId: data.officeId });
  };

  const exportToExcel = () => {
    try {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Assigned Offices");
      XLSX.writeFile(wb, "assigned_offices.xlsx");
      toast.success(`File has been successfully exported: assigned_offices.xlsx`);
    } catch (error) {
      toast.error(`Failed to export file: ${error.message}`);
    }
  };

  const saveData = () => {
    saveAssignment(data);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex-1 flex flex-col">
        <Header />
        <Logo />
        <div className="flex justify-between items-center p-8">
          <div className="relative">
            <FaInfoCircle 
              className="text-2xl cursor-pointer" 
              onClick={() => setIsInfoOpen(true)} 
              style={{ position: 'absolute', top: '0', left: '0' }}
            />
          </div>
          {/* <h1 className="text-2xl font-bold">Assigned Offices Page</h1> */}
        </div>
        {isInfoOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg relative">
              <h2 className="text-xl font-bold mb-4">Information</h2>
              <p>{description}</p>
              <p className="mt-2 font-semibold">Priority: {priority}</p>
              <button
                onClick={() => setIsInfoOpen(false)}
                className="absolute top-2 right-2 text-gray-700 font-bold"
              >
                &times;
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-col items-center justify-center p-8">
          <div className="mb-4">
            {assignee && <h2 className="text-lg font-semibold mb-2">Assignee: {assignee}</h2>}
          </div>
          <div style={{ margin: '10px 0', display: 'flex', gap: '1rem' }}>
            <input
              value={filterInput}
              onChange={handleFilterChange}
              placeholder="Search by name..."
              className="border p-2 w-full"
              style={{ flex: 1 }}
            />
            <select onChange={handleSelectDepartment} value={selectedDepartment} className="border p-2 w-full" style={{ flex: 1 }}>
              {departments.map(dept => (
                <option key={dept.id} value={dept.name}>{dept.name}</option>
              ))}
            </select>
          </div>
          <div className="flex mb-4">
            <button onClick={exportToExcel} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
              Export to Excel
            </button>
            <button onClick={saveData} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Save Assignment
            </button>
          </div>
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
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={editData}
        availableOffices={availableOffices}
        onUpdate={handleUpdate}
        onRemove={handleRemove}
      />
    </div>
  );
};

export default AssignedOfficesPage;
