import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const CreateGoal = () => {
  const navigate = useNavigate();
  const [goalTitle, setgoalTitle] = useState('')
  const [goalDescription, setgoalDescription] = useState('')
  const [priority, setpriority] = useState('')
  const [dueDate, setdueDate] = useState('')
  const token = localStorage.getItem("token")

  const HandleCreateGoal = async (e)=>{
  e.preventDefault()

  if(!goalTitle || !goalDescription || !priority || !dueDate){
    return toast.error('All Fields Are Required')
  }

  if(goalTitle.length < 3){
   return toast.error('goal Title Should Be 3 Or More Charecter Required')
  }

  if(goalDescription.length < 5){
    return toast.error('Goal Description Shoud Be 5 Or More Charecter Required')
  }

  try {
    const goaldata = {goalTitle,goalDescription,priority,dueDate}
    console.log(goaldata)
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/goal/create-goal`,goaldata,
     {
        headers:{
            Authorization: `Bearer ${token}`
        }
     }
    )

    if(response.status == 200 || response.status == 201){
     navigate('/Dashboard')
     setTimeout(() => {
      window.location.reload(); 
    }, 1000);
    }else{
        toast.error("something is Wrong Please Check")
    }
    
  } catch (error) {
    console.log(error)
    toast.error('Something is Wrong Please Check All the fields')
  }
  }


  return (
    <main className="container mx-auto p-4">
        <ToastContainer />
      <h2 className="text-2xl font-bold mb-4 reveal">Create a New Goal</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg reveal">
        <form className="space-y-4 reveal" onSubmit={(e)=>{HandleCreateGoal(e)}}>
          <div className="reveal">
            <label htmlFor="goalTitle" className="block text-sm font-medium text-gray-700">
              Goal Title
            </label>
            <input
              type="text"
              id="goalTitle"
              name="goalTitle"
              value={goalTitle}
              onChange={(e)=>{setgoalTitle(e.target.value)}}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="reveal">
            <label htmlFor="goalDescription" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={goalDescription}
              onChange={(e)=>{setgoalDescription(e.target.value)}}
              id="goalDescription"
              name="goalDescription"
              rows="4"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>

          <div className="reveal">
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              value={dueDate}
              onChange={(e)=>{setdueDate(e.target.value)}}
              type="date"
              id="dueDate"
              name="dueDate"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="reveal">
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e)=>{setpriority(e.target.value)}}
              id="priority"
              name="priority"
              required
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
              Create Goal
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

export default CreateGoal;
