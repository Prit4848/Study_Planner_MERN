import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

const ViewPlan = () => {
  const location = useLocation();
  const plan = location.state?.plan;
  const [QRImage, setQRImage] = useState('')
  const [ReminderDAte, setReminderDAte] = useState('')
  const token = localStorage.getItem("token")

  if (!plan) {
    return (
      <p className="text-center text-red-500 text-xl">
        No plan data available.
      </p>
    );
  }

  // Function to handle task completion (You can connect this to backend)
  const handleCompleteTask = async (taskId) => {
    try {
      console.log(`Task ${taskId} marked as completed.`);
      
      
  
      if (!token) {
        console.error("No token found");
        return;
      }
  
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/plan/${plan._id}/${taskId}/toggle`,
        {}, // Empty body as it's a toggle request
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error marking task as completed:", error.response?.data || error.message);
    }
  };
  

  const getAttachmentSrc = () => {
    if (plan.Attachment && plan.Attachment.data && plan.Attachment.data.data) {
      return `data:${plan.Attachment.contentType};base64,${btoa(
        new Uint8Array(plan.Attachment.data.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      )}`;
    }
    return null; // Return null if no valid attachment is available
  };

  const getQRCode = async () =>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/qr-code`);
      if(response.status == 200 || response.status == 201){
        const data =  response.data
        setQRImage(data.qrCodeImage)
      }else{
        toast.error("Try Again")
      }
    } catch (error) {
      console.log(error.message)
      toast.error(`${error.message}`)
    }
  }

  const setReminder = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        toast.error("User not authenticated.");
        return;
      }
  
      if (!ReminderDAte) {
        toast.error("Reminder date is required.");
        return;
      }

      console.log(ReminderDAte);
      
  
      const url = `${import.meta.env.VITE_BASE_URL}/plan/${plan._id}/set-reminder`;
      const formattedDate = new Date(ReminderDAte).toISOString();
      const data = { reminderDate: formattedDate };
  
      const response = await axios.post(url, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200 || response.status === 201) {
        toast.success(`Reminder set for ${new Date(ReminderDAte).toLocaleString()}`);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <div className="flex flex-col md:flex-row justify-between">
        {/* Left Section */}
        <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-md mb-4 md:mb-0 md:mr-4">
          <h2 className="text-3xl font-bold mb-2">{plan.title}</h2>
          <p className="mt-2 text-gray-700">{plan.description}</p>
          <p className="mt-2 text-gray-700">
            <strong>Date:</strong> {new Date(plan.date).toDateString()}
          </p>

          {/* Attachment Section */}
          <div className="w-full p-6 bg-white text-gray-800 rounded-lg shadow-lg mt-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-purple-600">
              Attachment
            </h2>
            {plan.Attachment && plan.Attachment.data && (
              <iframe
                title="PDF Preview"
                src={getAttachmentSrc()}
                width="100%"
                height="600px"
                className="border rounded-lg"
              />
            )}
          </div>

          {/* Tasks Section */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Tasks</h3>
            <ul className="list-disc pl-5">
              {plan.tasks.map((task, index) => (
                <li key={index} className="mt-2 p-4 bg-gray-100 rounded-lg">
                  <p>
                    <strong>Start Time:</strong> {task.startTime} -{" "}
                    <strong>End Time:</strong> {task.endTime}
                  </p>
                  <p>
                    <strong>Task Title:</strong> {task.title}
                  </p>
                  <p>{task.description}</p>
                  <span
                    className={`${
                      task.completed ? "text-green-500" : "text-red-500"
                    } font-bold flex items-center`}
                  >
                    <i
                      className={`${
                        task.completed
                          ? "fas fa-check-circle"
                          : "fas fa-times-circle"
                      } mr-2`}
                    ></i>
                    {task.completed ? "Completed" : "Pending"}
                  </span>

                  {/* Mark as Completed Button */}
                  {!task.completed && (
                    <button
                      onClick={() => handleCompleteTask(task._id)}
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                    >
                      Mark as Completed
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
              Edit Plan
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Set Reminder</h3>
          <form onSubmit={(e)=>{setReminder(e)}}>
            <label className="block text-gray-700">Select Date and Time:</label>
            <input
            value={ReminderDAte}
            onChange={(e)=>{setReminderDAte(e.target.value)}}
              type="datetime-local"
              className="border p-2 rounded-md w-full mt-2"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-600 transition duration-300 ease-in-out w-full"
            >
              Set Reminder
            </button>
          </form>

          {/* QR Code Section */}
          <div className="mt-4">
            <h3 className="text-2xl font-semibold mb-4">WhatsApp QR Code</h3>
            <div className="border p-2 rounded-md w-full mt-2">
              <img
                src={`${QRImage}`}
                alt="QR Code"
                className="w-full"
              />
            </div>
            <button onClick={()=>{getQRCode()}} className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-yellow-600 transition duration-300 ease-in-out w-full">
              Get QR Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPlan;
