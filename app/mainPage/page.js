import React from 'react';
import SideNavbar from '../components/SideNavbar';
import LatestAssignments from '../components/LatestAssignment';
import OptimizationStatus from '../components/OptimizationStatus';
import AssignmentOverview from '../components/AssignmentOverview';
import HistoricalAssignments from '../components/HistoricalAssignments';
import Header from '../components/Header';
import Logo from '../components/Logo';

export const metadata = {
  title: "Main Page",
};

const MainPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideNavbar />
      <Logo />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-grow p-10">
          <header className="mb-10">
            <h1 className="text-2xl font-bold text-gray-700">Office Space Request</h1>
          </header>
          <section className="mb-8">
            <LatestAssignments />
          </section>
          <section className="flex flex-wrap justify-between gap-4 mb-10">
            <div className="flex-1">
              <OptimizationStatus />
            </div>
            <div className="flex-1">
              <AssignmentOverview />
            </div>
          </section>
          <section className="mb-8">
            <HistoricalAssignments />
          </section>
        </main>
      </div>
    </div>
  );
};

export default MainPage;
