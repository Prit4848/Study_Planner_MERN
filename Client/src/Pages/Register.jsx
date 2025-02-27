import React, { useState } from 'react';
import Header from '../Componets/Header';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

const Register = () => {
  const [username, setusername] = useState('')
  const [phoneno, setphoneno] = useState()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate()
  
  const RegisterHandller = async (e)=>{
    e.preventDefault()
    try {
      if(!username || !phoneno || !email || !password){
        return  toast.error("All Fields Are require!!")
      }

      const userData = {
        username:username,
        phone_no:phoneno,
        email:email,
        password:password
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`,userData)

      if(response.status == 201 || response.status == 200){
       toast.success("Register Success->Login")
      }else{
        toast.error("Email Or Password Are Invalid Choose Another")
      }
    } catch (error) {
      console.log(error)
      toast.error("Something is wrong Please check the Email or password")
    }
  }
  return (
    <>
    <Header/>
    <ToastContainer />
    <div className="p-4 mt-5 mb-5">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={(e)=>{
        RegisterHandller(e)
      }} className="max-w-md mx-auto bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Username</label>
          <input
          value={username}
          onChange={(e)=>{
            setusername(e.target.value)
          }}
            type="text"
            id="username"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone_no" className="block text-gray-700">Phone No</label>
          <input
            value={phoneno}
            onChange={(e)=>{
              setphoneno(e.target.value)
            }}
            type="tel"
            id="phone_no"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
          value={email}
          onChange={(e)=>{
            setemail(e.target.value)
          }}
            type="email"
            id="email"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
          value={password}
          onChange={(e)=>{
            setpassword(e.target.value)
          }}
            type="password"
            id="password"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300"
          >
            Register
          </button>
          <div className="flex items-center space-x-2">
            <p className="text-gray-600">Already registered?</p>
            <Link to={'/Login'} className="text-blue-600 font-bold hover:underline" >Login</Link>
          </div>
        </div>
      </form>
    </div>
    </>
  );
};

export default Register;
