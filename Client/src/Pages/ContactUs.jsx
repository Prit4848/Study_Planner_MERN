import React, { useState } from 'react';
import Header from '../Componets/Header'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
const ContactUs = () => {
 const [name, setname] = useState('')
 const [email, setemail] = useState('')
 const [message, setmessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!email || !name || !message){
      return  toast.error("All Fields Are require!!")
      }
      const messagedata = {name:name,email:email,message:message}
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/contactUs`,messagedata)
      if(response.status == 200){
        toast.success('message send success !!!')
      }else{
        toast.error('something is wrong')
      }
    } catch (error) {
      console.log(error)
      toast.error('something is wrong')
    }
  };

  return (
    <>
    <Header/>
    <ToastContainer />
    <main className="container mx-auto p-6 flex flex-wrap justify-center">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
        <form onSubmit={(e)=>{
            handleSubmit(e)
        }} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              aria-label="Name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={name}
              onChange={(e)=>{setname(e.target.value)}}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              aria-label="Email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e)=>{setemail(e.target.value)}}
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              aria-label="Message"
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={message}
              onChange={(e)=>{setmessage(e.target.value)}}
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg mb-8">
        <h3 className="text-2xl font-bold mb-4 text-center">Our Location</h3>
        <div className="w-full h-64">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3715.799303332242!2d73.10203491493237!3d21.091562379184702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0674c90ed97ef%3A0x525fd0e16a7025f3!2sR.N.G.%20Patel%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1620643171596!5m2!1sen!2sin"
            allowFullScreen
            aria-label="R.N.G. Patel Institute of Technology Location"
          ></iframe>
        </div>
      </div>
    </main>
    </>
  );
};

export default ContactUs;
