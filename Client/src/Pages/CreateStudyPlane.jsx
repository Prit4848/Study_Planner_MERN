import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateStudyPlan = () => {
  const [tasks, setTasks] = useState([{ startTime: "", endTime: "", title: "", description: "" }]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [attachment, setAttachment] = useState(null);
  
  const navigate = useNavigate();

  const handleAddTask = () => {
    setTasks([...tasks, { startTime: "", endTime: "", title: "", description: "" }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][field] = value;
    setTasks(updatedTasks);
  };

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [tasks]);

  const handleCreatePlan = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !date) {
      toast.error("Title and Date are required!");
      return;
    }

    // Ensure tasks are properly filled
    if (tasks.some(task => !task.title.trim() || !task.startTime || !task.endTime)) {
      toast.error("All tasks must have a title and time range!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("date", date);
      
      // Pass tasks array as a JSON string
      formData.append("tasks", JSON.stringify(tasks));

      if (attachment) {
        formData.append("Attachment", attachment);
      }
       
      const objectData = Object.fromEntries(formData.entries());
console.log(objectData);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/plan/create`,
        objectData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Study Plan Created Successfully!");
        navigate("/Plan/View");
      } else {
        toast.error("Something is wrong. Please check input fields ❌");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again ❌");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4 reveal">Create New Study Plan</h2>
      <form onSubmit={handleCreatePlan} method="POST" encType="multipart/form-data" className="mt-4 bg-white p-6 rounded-lg shadow-md reveal">
        <div className="mb-4 reveal">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input border border-gray-300 p-2 w-full rounded-md"
            required
          />
        </div>
        <div className="mb-4 reveal">
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input border border-gray-300 p-2 w-full rounded-md"
          ></textarea>
        </div>
        <div className="mb-4 reveal">
          <label className="block text-gray-700 font-medium mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input border border-gray-300 p-2 w-full rounded-md"
            required
          />
        </div>
        <div className="mb-4 reveal">
          <label className="block text-gray-700 font-medium mb-2">Attachment (PDF)</label>
          <input
            type="file"
            name="Attachment"
            accept=".pdf"
            onChange={handleFileChange}
            className="input border border-gray-300 p-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4 reveal">
          <h3 className="text-xl font-semibold mb-2">Tasks</h3>
          <div id="tasks">
            {tasks.map((task, index) => (
              <div key={index} className="task mb-4 p-4 bg-gray-100 rounded-lg reveal">
                <div className="w-full flex gap-2">
                  <div className="w-1/2">
                    <label className="block text-gray-700">Start Time</label>
                    <input
                      type="time"
                      value={task.startTime}
                      onChange={(e) => handleInputChange(index, "startTime", e.target.value)}
                      className="input border border-gray-300 p-2 w-full rounded-md"
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-gray-700">End Time</label>
                    <input
                      type="time"
                      value={task.endTime}
                      onChange={(e) => handleInputChange(index, "endTime", e.target.value)}
                      className="input border border-gray-300 p-2 w-full rounded-md"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700">Task Title</label>
                  <input
                    type="text"
                    value={task.title}
                    onChange={(e) => handleInputChange(index, "title", e.target.value)}
                    className="input border border-gray-300 p-2 w-full rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Task Description</label>
                  <textarea
                    value={task.description}
                    onChange={(e) => handleInputChange(index, "description", e.target.value)}
                    className="input border border-gray-300 p-2 w-full rounded-md"
                  ></textarea>
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={handleAddTask} className="btn-secondary bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out reveal">
            Add Another Task
          </button>
        </div>
        <button type="submit" className="btn-primary bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out reveal">
          Create Plan
        </button>
      </form>
    </div>
  );
};

export default CreateStudyPlan;
