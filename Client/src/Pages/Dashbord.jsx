import React, { useContext, useState } from 'react';
import Header from '../Componets/Header';
import Footer from '../Componets/Footer';
import { Context } from '../Context/UserContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [isLoggedIn, setisLoggedIn] = useState(true)
  const {userdata} = useContext(Context)
  const [user, setuser] = useState(userdata)
  return (
    <>
    <Header user={user} isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn}/>
    <div className="container mx-auto p-4 mt-10 flex flex-col gap-6">
      {/* Header Section */}
      <div className="bg-white shadow-md rounded-lg p-6 flex-1">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-4">Dashboard</h1>
          <p className="text-base lg:text-lg mb-6">Welcome, {userdata.username}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-lg lg:text-xl font-semibold">Current Streak: ⭐ 0 days</h2>
        </div>
        <div className="mb-6">
          <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700">Filter by Date:</label>
          <select id="date-filter" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <option value="all">All Time</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="completion-filter" className="block text-sm font-medium text-gray-700">Filter by Completion:</label>
          <select id="completion-filter" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <option value="all">All Plans</option>
            <option value="completed">Completed</option>
            <option value="non-completed">Non-Completed</option>
          </select>
        </div>
      </div>

      {/* Study Plans Section */}
      <div className="bg-white shadow-md rounded-lg p-6 flex-1">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <h2 className="text-xl lg:text-2xl font-semibold mb-4 lg:mb-0">Your Study Plans</h2>
          <Link to={'/Create/plan'} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
            Create New Plan
          </Link>
        </div>
        <ul className="list-disc pl-6 space-y-2">
          <li className="mb-4">
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900">Sample Plan - Date: 01 Jan 2024</h3>
                <span className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2 mt-2 lg:mt-0">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
                    View Plan
                  </button>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300 ease-in-out">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out">
                    Delete
                  </button>
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                <div className="bg-green-500 h-4 rounded-full" style={{ width: '50%' }}></div>
              </div>
              <p className="text-sm text-gray-700 mt-1">1/2 tasks completed</p>
            </div>
          </li>
        </ul>
      </div>

      {/* Goals Section */}
      <div className="bg-white shadow-md rounded-lg p-6 flex-1">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <h2 className="text-xl lg:text-2xl font-semibold mb-4 lg:mb-0">Your Goals</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
            Create New Goal
          </button>
        </div>
        <ul className="list-disc pl-6 space-y-2">
          <li className="mb-4">
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
                <h3 className="text-lg lg:text-xl font-semibold">Sample Goal</h3>
                <span className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2 mt-2 lg:mt-0">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
                    View Goal
                  </button>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300 ease-in-out">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out">
                    Delete
                  </button>
                </span>
              </div>
              <p className="text-sm text-gray-700 mt-1">Due Date: 01 Jan 2024</p>
              <p className="text-sm text-gray-700 mt-1">Priority: High</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Dashboard;
