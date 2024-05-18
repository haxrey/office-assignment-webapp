"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideNavbar from '../components/SideNavbar';
import Header from '../components/Header';
import Logo from '../components/Logo';

const OfficeAssignmentPage = () => {
    const [assignments, setAssignments] = useState([]);
    const [assignee, setAssignee] = useState('');
    const [department, setDepartment] = useState('');
    const [priority, setPriority] = useState('Low Priority');
    const [description, setDescription] = useState('');
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Enable the submit button only if all required fields are filled
        if (assignee && department && description) {
            setIsSubmitDisabled(false);
        } else {
            setIsSubmitDisabled(true);
        }
    }, [assignee, department, description]);

    const handleAddAssignment = () => {
        if (description !== '') {
            const newAssignment = { assignee, department, priority, description };
            setAssignments([...assignments, newAssignment]);
            setDescription('');
            setPriority('Low Priority');
            setDepartment('');
            setAssignee('');
        }
    };

    const handleSubmit = async () => {
        if (isSubmitDisabled) {
            toast.error('Please fill in all the required fields before submitting.');
            return;
        }

        try {
            const response = await fetch(`/api/getDepartmentData?department=${department}`);
            const data = await response.json();
            localStorage.setItem('assignments', JSON.stringify(data));
            router.push('/assignedOffices');
        } catch (error) {
            console.error('Failed to fetch department data:', error);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <SideNavbar />
            <div className="flex-1 flex flex-col">
                <Header />
                <Logo />
                <div className="flex justify-center p-8">
                    <div className="bg-white shadow-lg rounded-lg p-6 w-2/3">
                        <h1 className="text-2xl font-bold mb-4">New Request</h1>
                        <div className="mb-4">
                            <input 
                                type="text" 
                                placeholder="Assignee" 
                                value={assignee} 
                                onChange={(e) => setAssignee(e.target.value)}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <select 
                                value={department} 
                                onChange={(e) => setDepartment(e.target.value)}
                                className="border p-2 w-full"
                            >
                                <option disabled value="">Choose Department...</option>
                                <option value="All Faculty">All Faculty</option>
                                <option value="Industrial Engineering">Industrial Engineering</option>
                                <option value="Software Engineering">Software Engineering</option>
                                <option value="Computer Engineering">Computer Engineering</option>
                                <option value="Artificial Intelligence Engineering">Artificial Intelligence Engineering</option>
                                <option value="Energy Systems Engineering">Energy Systems Engineering</option>
                                <option value="Biomedical Engineering">Biomedical Engineering</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <select 
                                value={priority} 
                                onChange={(e) => setPriority(e.target.value)}
                                className="border p-2 w-full"
                            >
                                <option value="Low Priority">Low Priority</option>
                                <option value="Medium Priority">Medium Priority</option>
                                <option value="High Priority">High Priority</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <textarea 
                                placeholder="Description" 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)}
                                className="border p-2 w-full h-32"
                            ></textarea>
                        </div>
                        <button 
                            onClick={handleAddAssignment} 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Add Assignment
                        </button>
                        <button 
                            onClick={handleSubmit} 
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default OfficeAssignmentPage;
