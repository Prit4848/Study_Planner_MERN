import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const ViewGoal = () => {
  const location = useLocation();
  const goal = location.state?.goal || null;
  const [goals, setGoals] = useState(goal ? [goal] : []);

  const GoalCompleteHandler = async (goalId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/goal/complete/${goalId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log(response.data);

        // Update state instead of reloading the page
        setGoals((prevGoals) =>
          prevGoals.map((g) =>
            g._id === goalId ? { ...g, completed: !g.completed } : g
          )
        );
      }
    } catch (error) {
      console.error("Error marking goal as completed:", error.response?.data || error.message);
    }
  };

  return (
    <main className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg reveal">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Goals</h2>

        <div className="space-y-4">
          {goals.length > 0 ? (
            goals.map((goal) => (
              <div
                key={goal._id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {goal.goalTitle}
                </h3>
                <p className="text-gray-700 mb-4">{goal.goalDescription}</p>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Due Date:</strong>{" "}
                  {new Date(goal.dueDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  <strong>Priority:</strong> {goal.priority}
                </p>
                <p className="text-sm text-gray-500 mb-4 flex items-center">
                  <strong>Status:</strong>
                  <span
                    className={`${
                      goal.completed ? "text-green-500" : "text-red-500"
                    } font-bold flex items-center ml-2`}
                  >
                    <i
                      className={`${
                        goal.completed
                          ? "fas fa-check-circle"
                          : "fas fa-times-circle"
                      } mr-2`}
                    ></i>
                    {goal.completed ? "Completed" : "Pending"}
                  </span>
                </p>
                <div className="flex items-center space-x-4">
                  <a
                    href={`/goal/${goal._id}/${goal.userId}/edit`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                  >
                    Edit
                  </a>

                  <button
                    onClick={() => GoalCompleteHandler(goal._id)}
                    className={`px-4 py-2 rounded-md transition duration-300 ease-in-out ${
                      goal.completed
                        ? "bg-gray-500 hover:bg-gray-600"
                        : "bg-blue-500 hover:bg-blue-600"
                    } text-white`}
                  >
                    {goal.completed ? "Mark as Pending" : "Mark as Completed"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No goals available.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default ViewGoal;
