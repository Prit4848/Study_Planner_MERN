import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const ChangePassword = ({email}) => {
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
     try {
      const data = {email:email,newpassword:newPassword}
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/change_pass`,data)
      if(response.status == 201){
       toast.success("Your Password is Changed Succesfully👍-> Login ")
      }
      console.log('Password changed for:', email);
     } catch (error) {
      console.log(error)
      toast.error("Something is wrong")
     }
  };

  return (
    <>
     <ToastContainer />
    <div>
      <div className="container mx-auto p-4 mt-20 mb-20">
        <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>
        <form
          onSubmit={(e)=>{handleSubmit(e)}}
          className="max-w-md mx-auto bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <input type="hidden" name="email" value={email} />
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="newpassword"
              id="newPassword"
              className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              value={newPassword}
              onChange={(e)=>{setNewPassword(e.target.value)}}
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300"
            >
              Change Password
            </button>
            <div className="flex items-center space-x-2">
              <p className="text-gray-600">Change Password?</p>
              <Link
                className="text-blue-600 font-bold hover:underline"
               to={'/Login'}
              >
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default ChangePassword;
