import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const EditGoal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const goal = location.state?.goal || {}; // Get goal data from state

  const [goalTitle, setGoalTitle] = useState(goal.goalTitle || "");
  const [goalDescription, setGoalDescription] = useState(goal.goalDescription || "");
  const [dueDate, setDueDate] = useState(goal.dueDate ? goal.dueDate.split("T")[0] : "");
  const [priority, setPriority] = useState(goal.priority || "Medium");

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/goal/${goal._id}/${goal.userId}/edit`,
        { goalTitle, goalDescription, dueDate, priority },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if(response.status == 200 || response.status == 201){
          navigate("/dashboard"); // Redirect to dashboard after successful update
          setTimeout(() => {
            window.location.reload(); 
          }, 1000);
      }
    } catch (error) {
      console.error("Error updating goal:", error.response?.data || error.message);
    }
  };

  return (
    <main className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg reveal">
        <h2 className="text-2xl font-bold mb-4">Update Goal</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="reveal">
            <label htmlFor="goalTitle" className="block text-sm font-medium text-gray-700">
              Goal Title
            </label>
            <input
              type="text"
              id="goalTitle"
              name="goalTitle"
              required
              value={goalTitle}
              onChange={(e) => setGoalTitle(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="reveal">
            <label htmlFor="goalDescription" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="goalDescription"
              name="goalDescription"
              rows="4"
              required
              value={goalDescription}
              onChange={(e) => setGoalDescription(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="reveal">
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="reveal">
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              required
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="flex items-center justify-between reveal">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="text-blue-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditGoal;
