import React, { useContext, useState } from 'react';
import { Context } from '../Context/UserContext';
import Header from '../Componets/Header';
import defaultProfileImage from '../assets/profile.png';

const Profile = () => {
    const [isLoggedIn, setisLoggedIn] = useState(true)
  const {userdata} = useContext(Context)
 
  const [user, setuser] = useState(userdata) 
  console.log(user)

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
                <li className="p-4 bg-gray-100 rounded-lg shadow-md">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg text-purple-600">
                      Sample Plan
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                    <div
                      className="bg-blue-600 h-4 rounded-full"
                      style={{ width: '50%' }}
                    ></div>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-red-600">
                  Goals
                </h2>
              </div>
              <ul className="space-y-4">
                <li className="p-4 bg-gray-100 rounded-lg shadow-md">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg text-yellow-600">
                      Sample Goal
                    </span>
                    <span className="text-gray-500">Due: 01/01/2024</span>
                  </div>
                  <p className="text-gray-600 mt-2">Priority: High</p>
                </li>
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
