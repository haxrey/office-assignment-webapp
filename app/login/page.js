// app/login/page.js

'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/login', { username, password });
      if (response.data.token) {
        console.log('Login successful');
        router.push('/mainPage');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-blue-950 h-full w-1/2 flex justify-end items-center" style={{ clipPath: "ellipse(50% 100% at 100% 50%)" }}>
        <img src="/BAU-Istanbul-login-rightSide-image.png" alt="Background" className="h-full" style={{ objectFit: 'cover', width: 'auto', maxHeight: '100%' }} />
      </div>

      <div className="z-10 px-10 py-8 mt-4 text-left bg-slate-200 shadow-lg border rounded-md">
        <div className="flex justify-center mb-4">
          <img src="/Bahçeşehir_Üniversitesi_logo.png" alt="Logo" className="h-28 w-24" />
        </div>

        <h3 className="text-2xl font-bold text-center text-blue-950">Login to your account</h3>
        <form onSubmit={handleLogin}>
          <div className="mt-4">
            <label className="block text-blue-950" htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Username" value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <label className="block text-blue-950 mt-4" htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <div className="flex items-baseline justify-between">
              <button type="submit" className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
