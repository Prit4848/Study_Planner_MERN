import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const EnterOTP = ({ email }) => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const data = {email:email,newotp:otp}

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/enter-otp`,data)
        if(response.status == 201){
          navigate('/ChangePassword')
        }
        console.log('OTP submitted for:', email, 'with OTP:', otp);
    } catch (error) {
       console.log(error)
       toast.error("Wrong OTP try Again")
    }
    
  };

  return (
    <>
     <ToastContainer />
    <div className="container mx-auto p-4 mt-20 mb-20">
      <h2 className="text-2xl font-bold mb-4 text-center">Enter OTP</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <input type="hidden" name="email" value={email} />
        <div className="mb-4">
          <label htmlFor="otp" className="block text-gray-700">
            OTP
          </label>
          <input
            type="text"
            name="newotp"
            id="newotp"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            value={otp}
            onChange={(e)=>{setOtp(e.target.value)}}
            required
            autoComplete="one-time-code"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
    </>
  );
};

export default EnterOTP;
