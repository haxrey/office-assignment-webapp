'use client';
import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';
import { FaInfoCircle } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import SideNavbar from '../components/SideNavbar';
import Header from '../components/Header';
import Logo from '../components/Logo';

const fetchOptimizationData = async () => {
  try {
    const response = await axios.post('http://localhost:8000/optimize');
    return response.data;
  } catch (error) {
    toast.error('Error fetching data');
    throw new Error('Error fetching data');
  }
};

const AssignedOfficesPage = () => {
  const [data, setData] = useState([]);
  const [filterInput, setFilterInput] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Faculty');
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchOptimizationData();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const columns = useMemo(
    () => [
      { Header: 'Employee', accessor: 'employee' },
      { Header: 'Office', accessor: 'office' },
      { Header: 'Department', accessor: 'department' },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <button
            onClick={() => handleEdit(row.original)}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit
          </button>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data }, useFilters, useGlobalFilter, useSortBy);

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setGlobalFilter(value);
    setFilterInput(value);
  };

  const handleEdit = (data) => {
    setEditData(data);
    setIsModalOpen(true);
  };

  const handleUpdate = async (updatedData) => {
    // Add your update logic here
  };

  const handleRemove = async (data) => {
    // Add your remove logic here
  };

  const exportToExcel = () => {
    try {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Assigned Offices');
      XLSX.writeFile(wb, 'assigned_offices.xlsx');
      toast.success(`File has been successfully exported: assigned_offices.xlsx`);
    } catch (error) {
      toast.error(`Failed to export file: ${error.message}`);
    }
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
        </div>
        {isInfoOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg relative">
              <h2 className="text-xl font-bold mb-4">Information</h2>
              <p>Description of the page and its usage.</p>
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
          <div style={{ margin: '10px 0', display: 'flex', gap: '1rem' }}>
            <input
              value={filterInput}
              onChange={handleFilterChange}
              placeholder="Search by name..."
              className="border p-2 w-full"
              style={{ flex: 1 }}
            />
          </div>
          <div className="flex mb-4">
            <button
              onClick={exportToExcel}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Export to Excel
            </button>
          </div>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <div className="overflow-x-auto">
            <table
              {...getTableProps()}
              style={{
                margin: 'auto',
                borderCollapse: 'collapse',
                border: 'solid 1px gray',
                width: '100%',
              }}
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        style={{
                          borderBottom: 'solid 3px blue',
                          background: 'aliceblue',
                          color: 'black',
                          fontWeight: 'bold',
                          padding: '10px',
                          border: 'solid 1px gray',
                        }}
                      >
                        {column.render('Header')}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? ' 🔽'
                              : ' 🔼'
                            : ''}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          style={{
                            padding: '10px',
                            border: 'solid 1px gray',
                            textAlign: 'center',
                          }}
                        >
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
        availableOffices={[]} // Add available offices data if needed
        onUpdate={handleUpdate}
        onRemove={handleRemove}
      />
    </div>
  );
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
    onUpdate(formData);
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
            <label className="block text-gray-700">Office</label>
            <input
              type="text"
              name="office"
              value={formData.office}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Employee</label>
            <input
              type="text"
              name="employee"
              value={formData.employee}
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

export default AssignedOfficesPage;
