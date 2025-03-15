import React, { useContext, useState } from "react";
import Header from "../Componets/Header";
import Footer from "../Componets/Footer";
import { ToastContainer, toast } from "react-toastify";
import { Context } from "../Context/UserContext";
import { PContext } from "../Context/planContext";
import { Goalcontext } from "../Context/GoalContext";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [isLoggedIn, setisLoggedIn] = useState(true);
  const { userdata } = useContext(Context);
  const { plan } = useContext(PContext);
  const { goal } = useContext(Goalcontext);
  const [user] = useState(userdata);

  const DeletePlanHanndler = async (planid) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/plan/delete/${planid}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status == 200 || response.status == 201) {
        toast.success("plan delete sucessfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteGoalHandller = async (goalid)=>{
  const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/goal/delete/${goalid}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status == 200 || response.status == 201) {
        toast.success("plan delete sucessfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ToastContainer />
      <Header
        user={user}
        isLoggedIn={isLoggedIn}
        setisLoggedIn={setisLoggedIn}
      />
      <div className="container mx-auto p-4 mt-10 flex flex-col gap-6">
        {/* Header Section */}
        <div className="bg-white shadow-md rounded-lg p-6 flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold mb-4">Dashboard</h1>
          <p className="text-base lg:text-lg mb-6">
            Welcome, {userdata.username}
          </p>
          <h2 className="text-lg lg:text-xl font-semibold mb-6">
            Current Streak: ⭐ 0 days
          </h2>

          {/* Filters */}
          <div className="mb-6">
            <label
              htmlFor="date-filter"
              className="block text-sm font-medium text-gray-700"
            >
              Filter by Date:
            </label>
            <select
              id="date-filter"
              className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="completion-filter"
              className="block text-sm font-medium text-gray-700"
            >
              Filter by Completion:
            </label>
            <select
              id="completion-filter"
              className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Plans</option>
              <option value="completed">Completed</option>
              <option value="non-completed">Non-Completed</option>
            </select>
          </div>
        </div>

        {/* Study Plans Section */}
        <div className="bg-white shadow-md rounded-lg p-6 flex-1">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <h2 className="text-xl lg:text-2xl font-semibold mb-4 lg:mb-0">
              Your Study Plans
            </h2>
            <Link
              to={"/Plan/Create"}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Create New Plan
            </Link>
          </div>

          {/* If no study plans exist */}
          {plan.length === 0 ? (
            <p className="text-gray-600">
              No study plans available. Start by creating one!
            </p>
          ) : (
            <ul className="list-disc pl-6 space-y-4">
              {plan.map((plan, index) => {
                const completedTasks = plan.tasks.length;
                const totalTasks = plan.tasks.filter(
                  (task) => task.completed
                ).length;
                const progressPercentage = Math.round(
                  (completedTasks / totalTasks) * 100
                );

                return (
                  <li key={index} className="mb-4">
                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
                        <h3 className="text-lg lg:text-xl font-semibold text-gray-900">
                          {plan.title} - Date:{" "}
                          {new Date(plan.date).toDateString()}
                        </h3>
                        <span className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2 mt-2 lg:mt-0">
                          <Link
                            to={`/plan/View`}
                            state={{ plan }}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                          >
                            View Plan
                          </Link>
                          <Link
                            to={"/Plan/Edit"}
                            state={{ plan }}
                            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => {
                              DeletePlanHanndler(plan._id);
                            }}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </span>
                      </div>

                      {/* Progress Bar */}

                      <p className="text-sm text-gray-700 mt-1">
                        {completedTasks}/{totalTasks} tasks completed
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Goals Section */}
        <div className="bg-white shadow-md rounded-lg p-6 flex-1">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <h2 className="text-xl lg:text-2xl font-semibold mb-4 lg:mb-0">
              Your Goals
            </h2>
            <Link
              to={"/Goal/Create"}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Create New Goal
            </Link>
          </div>

          {/* Goals List (Example) */}
          <ul className="list-disc pl-6 space-y-2">
            {goal.map((goal, index) => {
              return (
                <li className="mb-4" key={index}>
                  <div className="bg-gray-100 p-4 rounded-lg shadow">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
                      <h3 className="text-lg lg:text-xl font-semibold">
                        {goal.goalTitle}
                      </h3>
                      <span className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2 mt-2 lg:mt-0">
                        <Link to={"/Goal/View"} state={{goal}} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                          View Goal
                        </Link>
                        <Link to={"/Goal/Edit"} state={{goal}} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
                          Edit
                        </Link>
                        <button onClick={()=>{DeleteGoalHandller(goal._id)}} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                          Delete
                        </button>
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">
                      Due Date:{" "}
                      {new Date(goal.dueDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>

                    <p className="text-sm text-gray-700 mt-1">
                      Priority: {goal.priority}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
