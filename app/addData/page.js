"use client";
import React, { useState, useEffect } from 'react';
import SideNavbar from "../components/SideNavbar";
import Header from '../components/Header';
import Logo from '../components/Logo';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InsertionPage = () => {
  const [departments, setDepartments] = useState([]);
  const [staffFormData, setStaffFormData] = useState({
    firstName: '',
    lastName: '',
    role: '',
    departmentId: '',
  });
  const [officeFormData, setOfficeFormData] = useState({
    officeNumber: '',
    capacity: '',
    location: 'D Building', //Made this a default location
    floor: '',
  });

  // fetches the departments for the dropdown menu straight from the database to make sure the data is up to date! :)
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('/api/departments');
        setDepartments(response.data);
      } catch (error) {
        toast.error('Failed to fetch departments');
        console.error('Failed to fetch departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  //handelrs for the form data
  const handleStaffChange = (e) => {
    const { name, value } = e.target;
    setStaffFormData({ ...staffFormData, [name]: value });
  };

  const handleOfficeChange = (e) => {
    const { name, value } = e.target;
    setOfficeFormData({ ...officeFormData, [name]: value });
  };

  const handleStaffSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/staff', staffFormData);
      setStaffFormData({
        firstName: '',
        lastName: '',
        role: '',
        departmentId: '',
      });
      toast.success("Staff added successfully!");
    } catch (error) {
      console.error('Failed to add staff:', error);
      toast.error("Failed to add staff.");
    }
  };

  const handleOfficeSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/offices', officeFormData);
      setOfficeFormData({
        officeNumber: '',
        capacity: '',
        location: 'D Building',
        floor: '',
      });
      toast.success("Office added successfully!");
    } catch (error) {
      console.error('Failed to add office:', error);
      toast.error("Failed to add office.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex flex-grow p-8">
          <div className="w-1/2">
            <h1 className="text-2xl font-bold mb-4">Add New Staff</h1>
            <form className="space-y-4" onSubmit={handleStaffSubmit}>
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={staffFormData.firstName}
                  onChange={handleStaffChange}
                  className="border border-gray-300 rounded p-2 flex-1"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={staffFormData.lastName}
                  onChange={handleStaffChange}
                  className="border border-gray-300 rounded p-2 flex-1"
                />
              </div>
              <input
                type="text"
                name="role"
                placeholder="Role"
                value={staffFormData.role}
                onChange={handleStaffChange}
                className="border border-gray-300 rounded p-2 w-full"
              />
              <select
                name="departmentId"
                value={staffFormData.departmentId}
                onChange={handleStaffChange}
                className="border border-gray-300 rounded p-2 w-full"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
              <button type="submit" className="bg-blue-500 text-white rounded p-2">
                Add Staff
              </button>
            </form>
          </div>
          <div className="w-1/2 ml-8">
            <h1 className="text-2xl font-bold mb-4">Add New Office</h1>
            <form className="space-y-4" onSubmit={handleOfficeSubmit}>
              <input
                type="text"
                name="officeNumber"
                placeholder="Office Number"
                value={officeFormData.officeNumber}
                onChange={handleOfficeChange}
                className="border border-gray-300 rounded p-2 w-full"
              />
              <input
                type="text"
                name="capacity"
                placeholder="Capacity"
                value={officeFormData.capacity}
                onChange={handleOfficeChange}
                className="border border-gray-300 rounded p-2 w-full"
                inputMode="numeric"
                pattern="\d*"
              />
              <select
                name="location"
                value={officeFormData.location}
                onChange={handleOfficeChange}
                className="border border-gray-300 rounded p-2 w-full"
              >
                <option value="D Building">D Building</option>
              </select>
              <input
                type="text"
                name="floor"
                placeholder="Floor"
                value={officeFormData.floor}
                onChange={handleOfficeChange}
                className="border border-gray-300 rounded p-2 w-full"
                inputMode="numeric"
                pattern="\d*"
              />
              <button type="submit" className="bg-blue-500 text-white rounded p-2">
                Add Office
              </button>
            </form>
          </div>
        </div>
        <Logo />
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default InsertionPage;
