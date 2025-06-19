import React, { useContext, useState } from 'react';
import { Context } from '../Context/UserContext';
import { PContext } from '../Context/planContext';
import { Goalcontext } from '../Context/GoalContext';
import Header from '../Componets/Header';
import defaultProfileImage from '../assets/profile.png';

const Profile = () => {
    const [isLoggedIn, setisLoggedIn] = useState(true)
    const {userdata} = useContext(Context)
    const {plan} = useContext(PContext)
    const {goal} = useContext(Goalcontext)

    const [user, setuser] = useState(userdata) 

    // Function to get image source
    const getImageSrc = () => {
        if (userdata.image && userdata.image.data) {
            return `data:image/jpeg;base64,${btoa(
                new Uint8Array(userdata.image.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ''
                )
            )}`;
        }
        return defaultProfileImage; // Use default image if no profile picture is available
    };

    // Filter plans and goals for the current user (if userId is available)
    const userPlans = plan && userdata && userdata._id ? plan.filter(p => p.userId === userdata._id) : plan;
    const userGoals = goal && userdata && userdata._id ? goal.filter(g => g.userId === userdata._id) : goal;

    return (
        <>
        <Header user={user} isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn}/>
        <div className="bg-gray-100 text-gray-900">
          <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
            <div className="flex flex-col lg:flex-row gap-6 mb-4">
              {/* Profile Section */}
              <div className="w-full lg:w-1/3 p-6 bg-white text-gray-800 rounded-lg shadow-lg flex flex-col items-center">
                <img
                    src={getImageSrc()}
                    alt="Profile"
                    className="rounded-full w-32 h-32 sm:w-48 sm:h-48 mb-4 border-4 border-blue-600"
                  />
                <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center text-blue-600">
                  {userdata.username}
                </h2>
                <p className="text-gray-600 mb-4 text-center">
                  {userdata.Bio}
                </p>
                <div className="text-center mt-4 text-sm sm:text-base">
                  <p className="text-gray-600">
                    Email Id:{' '}
                    <a
                      href="mailto:example@example.com"
                      className="text-blue-600 hover:underline"
                    >
                      {userdata.email}
                    </a>
                  </p>
                  <p className="text-gray-600">
                    Contact No:{' '}
                    <a href="tel:1234567890" className="text-blue-600 hover:underline">
                      {userdata.phone_no}
                    </a>
                  </p>
                </div>
              </div>

              {/* Study Plan and Goals Section */}
              <div className="w-full lg:w-2/3 p-6 bg-white text-gray-800 rounded-lg shadow-lg">
                <div>
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 text-green-600">
                      Study Plan
                    </h2>
                  </div>
                  <ul className="space-y-4 mb-6">
                    {userPlans && userPlans.length > 0 ? (
                      userPlans.map((p, idx) => (
                        <li key={p._id || idx} className="p-4 bg-gray-100 rounded-lg shadow-md">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-lg text-purple-600">
                              {p.title}
                            </span>
                            <span className="text-gray-500">{new Date(p.date).toLocaleDateString()}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                            <div
                              className="bg-blue-600 h-4 rounded-full"
                              style={{ width: p.tasks && p.tasks.length > 0 ? `${Math.round((p.tasks.filter(t => t.completed).length / p.tasks.length) * 100)}%` : '0%' }}
                            ></div>
                          </div>
                          <div className="mt-2 text-sm text-gray-600">
                            {p.description}
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="p-4 bg-gray-100 rounded-lg shadow-md text-center text-gray-500">No study plans found.</li>
                    )}
                  </ul>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 text-red-600">
                      Goals
                    </h2>
                  </div>
                  <ul className="space-y-4">
                    {userGoals && userGoals.length > 0 ? (
                      userGoals.map((g, idx) => (
                        <li key={g._id || idx} className="p-4 bg-gray-100 rounded-lg shadow-md">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-lg text-yellow-600">
                              {g.goalTitle}
                            </span>
                            <span className="text-gray-500">Due: {new Date(g.dueDate).toLocaleDateString()}</span>
                          </div>
                          <p className="text-gray-600 mt-2">Priority: {g.priority}</p>
                          <p className="text-gray-600 mt-1">{g.goalDescription}</p>
                        </li>
                      ))
                    ) : (
                      <li className="p-4 bg-gray-100 rounded-lg shadow-md text-center text-gray-500">No goals found.</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
      );
};

export default Profile;
