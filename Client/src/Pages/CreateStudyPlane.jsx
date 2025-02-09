import React, { useState, useRef, useEffect } from 'react';

const CreateStudyPlan = () => {
  const [tasks, setTasks] = useState([{ startTime: '', endTime: '', title: '', description: '' }]);
  const tasksContainerRef = useRef(null);

  const handleAddTask = () => {
    setTasks([...tasks, { startTime: '', endTime: '', title: '', description: '' }]);
  };

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [tasks]);

  const handleInputChange = (index, field, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][field] = value;
    setTasks(updatedTasks);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 reveal">Create New Study Plan</h2>
      <form action="/plan/create" method="POST" encType="multipart/form-data" className="mt-4 bg-white p-6 rounded-lg shadow-md reveal">
        <div className="mb-4 reveal">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
          <input type="text" name="title" id="title" className="input border border-gray-300 p-2 w-full rounded-md" required />
        </div>
        <div className="mb-4 reveal">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea name="description" id="description" className="input border border-gray-300 p-2 w-full rounded-md"></textarea>
        </div>
        <div className="mb-4 reveal">
          <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Date</label>
          <input type="date" name="date" id="date" className="input border border-gray-300 p-2 w-full rounded-md" required />
        </div>
        <div className="mb-4 reveal">
          <label htmlFor="Attachment" className="block text-gray-700 font-medium mb-2">Attachment</label>
          <input type="file" name="Attachment" id="Attachment" className="input border border-gray-300 p-2 w-full rounded-md" accept=".pdf" />
        </div>
        <div className="mb-4 reveal">
          <h3 className="text-xl font-semibold mb-2">Tasks</h3>
          <div ref={tasksContainerRef} id="tasks">
            {tasks.map((task, index) => (
              <div key={index} className="task mb-4 p-4   bg-gray-100 rounded-lg reveal">
                <div className='w-full flex'>
                <div className="mb-2 w-1/2">
                  <label className="block text-gray-700">Start Time</label>
                  <input
                    type="time"
                    name={`tasks[${index}][startTime]`}
                    value={task.startTime}
                    onChange={(e) => handleInputChange(index, 'startTime', e.target.value)}
                    className="input border border-gray-300 p-2 w-full rounded-md"
                    required
                  />
                </div>
                <div className="mb-2 w-1/2">
                  <label className="block text-gray-700">End Time</label>
                  <input
                    type="time"
                    name={`tasks[${index}][endTime]`}
                    value={task.endTime}
                    onChange={(e) => handleInputChange(index, 'endTime', e.target.value)}
                    className="input border border-gray-300 p-2 w-full rounded-md"
                    required
                  />
                </div>
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">Task Title</label>
                  <input
                    type="text"
                    name={`tasks[${index}][title]`}
                    value={task.title}
                    onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                    className="input border border-gray-300 p-2 w-full rounded-md"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">Task Description</label>
                  <textarea
                    name={`tasks[${index}][description]`}
                    value={task.description}
                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    className="input border border-gray-300 p-2 w-full rounded-md"
                  ></textarea>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddTask}
            className="btn-secondary bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out reveal"
          >
            Add Another Task
          </button>
        </div>
        <button
          type="submit"
          className="btn-primary bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out reveal"
        >
          Create Plan
        </button>
      </form>
    </div>
  );
};

export default CreateStudyPlan;
