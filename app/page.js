import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Office Optimization System",
};

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-gray-100">
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-4 py-1 bg-[#E2E8F0] z-10 shadow-md">
        <div className="h-10" />
        {/* <Link href="/login">
          <button className="px-4 py-1 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
        </Link> */}
      </header>

      <div className="absolute top-10 left-0 p-8">
        <img src="/Bahçeşehir_Üniversitesi_logo.png" alt="Logo" className="h-28 w-26" />
      </div>

      <div className="absolute top-0 right-0 bg-blue-950 h-full w-1/2" style={{ clipPath: "ellipse(50% 100% at 100% 50%)" }}>
        <img src="/BAU-Istanbul-login-rightSide-image.png" alt="Background" className="h-full" style={{ objectFit: 'cover', width: 'auto', maxHeight: '100%' }} />
      </div>

      <div className="pt-48 px-8 text-center">
        <h1 className="text-4xl font-bold text-gray-700 mb-4">{metadata.title}</h1>
        <p className="text-gray-600 mx-auto leading-relaxed max-w-2xl mb-8">
          Discover the future of office space management with our optimization system.
        </p>
        <Link href="/mainPage">
          <button className="relative inline-block px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1 active:translate-y-0 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
