import React, { useContext, useState } from "react";
import Header from "../Componets/Header";
import Footer from "../Componets/Footer";
import { ToastContainer, toast } from "react-toastify";
import { Context } from "../Context/UserContext";
import { PContext } from "../Context/planContext";
import { Goalcontext } from "../Context/GoalContext";
import { Link } from "react-router-dom";
import axios from "axios";
import motivatedImage from "../assets/motivated image.jpg";

const Dashboard = () => {
  const [isLoggedIn, setisLoggedIn] = useState(true);
  const { userdata } = useContext(Context);
  const { plan } = useContext(PContext);
  const { goal } = useContext(Goalcontext);
  const [user] = useState(userdata);

  const [dateFilter, setDateFilter] = useState("all");
  const [completionFilter, setCompletionFilter] = useState("all");

  const DeletePlanHanndler = async (planid) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/plan/delete/${planid}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Plan deleted successfully");
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const DeleteGoalHandller = async (goalid) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/goal/delete/${goalid}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Goal deleted successfully");
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredPlans = plan.filter((p) => {
    const today = new Date();
    const planDate = new Date(p.date);

    let dateMatch = true;
    if (dateFilter === "week") {
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(today.getDate() - 7);
      dateMatch = planDate >= oneWeekAgo;
    } else if (dateFilter === "month") {
      const oneMonthAgo = new Date(today);
      oneMonthAgo.setMonth(today.getMonth() - 1);
      dateMatch = planDate >= oneMonthAgo;
    } else if (dateFilter === "year") {
      const oneYearAgo = new Date(today);
      oneYearAgo.setFullYear(today.getFullYear() - 1);
      dateMatch = planDate >= oneYearAgo;
    }

    let completionMatch = true;
    const total = p.tasks.length;
    const completed = p.tasks.filter((t) => t.completed).length;

    if (completionFilter === "completed") {
      completionMatch = total > 0 && completed === total;
    } else if (completionFilter === "non-completed") {
      completionMatch = completed < total;
    }

    return dateMatch && completionMatch;
  });

  const calculateStreak = (plans) => {
    const completedDates = new Set();
    plans.forEach((p) => {
      if (p.tasks.length > 0 && p.tasks.every((t) => t.completed)) {
        completedDates.add(new Date(p.date).toDateString());
      }
    });

    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      if (completedDates.has(checkDate.toDateString())) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const currentStreak = calculateStreak(plan);

  return (
    <>
      <ToastContainer />
      <Header
        user={user}
        isLoggedIn={isLoggedIn}
        setisLoggedIn={setisLoggedIn}
      />
      <div className="container mx-auto p-4 mt-10 flex flex-col gap-6">
        <div className="bg-white shadow-md rounded-lg p-4 md:p-6 flex flex-col lg:flex-row gap-6">
  {/* Left Section: Dashboard Info */}
  <div className="flex-1">
    <h1 className="text-2xl lg:text-3xl font-bold mb-4">Dashboard</h1>
    <p className="text-base lg:text-lg mb-4">Welcome, {user.username}</p>
    <h2 className="text-lg lg:text-xl font-semibold mb-6">
      Current Streak: ⭐ {currentStreak} {currentStreak === 1 ? "day" : "days"}
    </h2>

    {/* Date Filter */}
    <div className="mb-4">
      <label
        htmlFor="date-filter"
        className="block text-sm font-medium text-gray-700"
      >
        Filter by Date:
      </label>
      <select
        id="date-filter"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="all">All Time</option>
        <option value="week">Last Week</option>
        <option value="month">Last Month</option>
        <option value="year">Last Year</option>
      </select>
    </div>

    {/* Completion Filter */}
    <div className="mb-4">
      <label
        htmlFor="completion-filter"
        className="block text-sm font-medium text-gray-700"
      >
        Filter by Completion:
      </label>
      <select
        id="completion-filter"
        value={completionFilter}
        onChange={(e) => setCompletionFilter(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="all">All Plans</option>
        <option value="completed">Completed</option>
        <option value="non-completed">Non-Completed</option>
      </select>
    </div>
  </div>

  {/* Right Section: Motivational Image */}
  <div className="w-full lg:w-1/3">
    <img
      src={motivatedImage}
      alt="Motivational"
      className="w-full h-auto rounded-lg shadow-md object-cover"
    />
  </div>
</div>


        <div className="bg-white shadow-md rounded-lg p-6 flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl lg:text-2xl font-semibold">
              Your Study Plans
            </h2>
            <Link
              to="/Plan/Create"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Create New Plan
            </Link>
          </div>

          {filteredPlans.length === 0 ? (
            <p className="text-gray-600">
              No study plans match the selected filters.
            </p>
          ) : (
            <ul className="space-y-4">
              {filteredPlans.map((plan, index) => {
                const completed = plan.tasks.filter((t) => t.completed).length;
                const total = plan.tasks.length;

                return (
                  <li key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                    <div className="flex flex-col lg:flex-row justify-between">
                      <h3 className="text-lg lg:text-xl font-semibold text-gray-900">
                        {plan.title} - Date:{" "}
                        {new Date(plan.date).toDateString()}
                      </h3>
                      <div className="flex gap-2 mt-2 lg:mt-0">
                        <Link
                          to="/plan/View"
                          state={{ plan }}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                          View
                        </Link>
                        <Link
                          to="/Plan/Edit"
                          state={{ plan }}
                          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => DeletePlanHanndler(plan._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">
                      {completed}/{total} tasks completed
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl lg:text-2xl font-semibold">Your Goals</h2>
            <Link
              to="/Goal/Create"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Create New Goal
            </Link>
          </div>

          <ul className="space-y-4">
            {goal.map((goal, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                <div className="flex flex-col lg:flex-row justify-between">
                  <h3 className="text-lg lg:text-xl font-semibold">
                    {goal.goalTitle}
                  </h3>
                  <div className="flex gap-2 mt-2 lg:mt-0">
                    <Link
                      to="/Goal/View"
                      state={{ goal }}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      View
                    </Link>
                    <Link
                      to="/Goal/Edit"
                      state={{ goal }}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => DeleteGoalHandller(goal._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
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
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
