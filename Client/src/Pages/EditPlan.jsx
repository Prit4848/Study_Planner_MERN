import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const EditPlan = () => {
   const location = useLocation();
   const plan = location.state?.plan;
   const [tasks, setTasks] = useState(plan.tasks || []);
   const [title, setTitle] = useState(plan.title || "");
   const [description, setDescription] = useState(plan.description || "");
   const [date, setDate] = useState(plan.date ? plan.date.substring(0, 10) : "");

   const token = localStorage.getItem("token")
   const navigate = useNavigate()

  const addTask = () => {
    setTasks([
      ...tasks,
      { startTime: "", endTime: "", title: "", description: "" },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][field] = value;
    setTasks(updatedTasks);
  };
  
  const HandleEditPlan = async (e)=>{
   e.preventDefault()

   try {
    const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("date", date);
      
      formData.append("tasks", JSON.stringify(tasks));
    
      const objectData = Object.fromEntries(formData.entries());
       console.log(token)
       console.log(objectData)
      const response = await axios.post(
              `${import.meta.env.VITE_BASE_URL}/plan/edit/${plan._id}`,
              objectData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json", 
                },
              }
            );

    if (response.status === 200 || response.status === 201) {
        toast.success("Study Plan Edited Successfully!✅");
        navigate("/Dashboard");
        setTimeout(() => {
            window.location.reload(); 
        }, 1000);
    } else {
            toast.error("Something is wrong. Please check input fields ❌");
          }
   } catch (error) {
    console.error(error);
    toast.error("Something went wrong. Please try again ❌");
   }
  }
   console.log(plan.title)
  return (
    <div className="container mx-auto p-4 reveal">
    <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Edit Study Plan: {plan.title}</h2>
      <form className="mt-4 bg-white p-6 rounded-lg shadow-md" onSubmit={(e)=>{HandleEditPlan(e)}}>
        <div className="mb-4 reveal">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e)=>{setTitle(e.target.value)}}
            className="input border border-gray-300 p-2 w-full rounded-md"
            defaultValue={plan.title}
            required
          />
        </div>
        <div className="mb-4 reveal">
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
             onChange={(e)=>{setDescription(e.target.value)}}
            className="input border border-gray-300 p-2 w-full rounded-md"
            defaultValue={plan.description}
          ></textarea>
        </div>
        <div className="mb-4 reveal">
          <label className="block text-gray-700 font-medium mb-2">Date</label>
          <input
            type="date"
            onChange={(e)=>{setDate(e.target.value)}}
            className="input border border-gray-300 p-2 w-full rounded-md"
            defaultValue={plan.date.substring(0, 10)}
            required
          />
        </div>
        <div className="mb-4 reveal">
          <h3 className="text-xl font-semibold mb-2">Tasks</h3>
          <div id="tasks" className="reveal">
            {tasks.map((task, index) => (
              <div key={index} className="task mb-4 p-4 bg-gray-100 rounded-lg reveal">
                <div className="mb-2 reveal">
                  <label className="block text-gray-700">Start Time</label>
                  <input
                    type="time"
                    className="input border border-gray-300 p-2 w-full rounded-md"
                    onChange={(e) => handleInputChange(index, "startTime", e.target.value)}
                    defaultValue={task.startTime}
                    required
                  />
                </div>
                <div className="mb-2 reveal">
                  <label className="block text-gray-700">End Time</label>
                  <input
                    type="time"
                    className="input border border-gray-300 p-2 w-full rounded-md"
                    onChange={(e) => handleInputChange(index, "endTime", e.target.value)}
                    defaultValue={task.endTime}
                    required
                  />
                </div>
                <div className="mb-2 reveal">
                  <label className="block text-gray-700">Task Title</label>
                  <input
                    type="text"
                    className="input border border-gray-300 p-2 w-full rounded-md"
                    onChange={(e) => handleInputChange(index, "title", e.target.value)}
                    defaultValue={task.title}
                    required
                  />
                </div>
                <div className="mb-2 reveal">
                  <label className="block text-gray-700">Task Description</label>
                  <textarea
                    className="input border border-gray-300 p-2 w-full rounded-md"
                    onChange={(e) => handleInputChange(index, "description", e.target.value)}
                    defaultValue={task.description}
                  ></textarea>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addTask}
            className="btn-secondary bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Add Another Task
          </button>
        </div>
        <button
          type="submit"
          className="btn-primary bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditPlan;
