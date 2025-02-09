import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const ForgotPassword = (props) => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        props.setemail(email)
    const data = {email:email}
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL
      
    }/user/forgot-password`,data)
    if(response.status == 200){
     navigate('/EnterOTP')
    }
    console.log('Forgot password for email:', email);
    } catch (error) {
        console.log(error)
        toast.error("Something is Wrong Try Again!")
    }
    
  };

  return (
    <>
     <ToastContainer />
    <div className="container mx-auto p-4 mt-20 mb-20">
      <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
      <form
        onSubmit={(e)=>{handleSubmit(e)}}
        className="max-w-md mx-auto bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            required
            autoComplete="email"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300"
        >
          Send OTP
        </button>
      </form>
    </div>
    </>
  );
};

export default ForgotPassword;
