import React, { useContext, useState } from "react";
import Header from "../Componets/Header";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../Context/UserContext";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const { userdata, setuserdata } = useContext(Context);

  const LoginHandller = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        return toast.error("All Fields Are require!!");
      }

      if (password.length < 6) {
        toast.error("Password must be at least 6 characters ❌");
        return;
      }
      const userdata = { email: email, password: password };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        userdata
      );

      if (response.status == 201 || response.status == 200) {
        const token = response.data.user.token;
        localStorage.setItem("token", token);
        navigate("/Dashboard");
      }else{
        toast.error("Invalid Credentials ❌");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "An error occurred ❌");
      } else {
        toast.error("An error occurred ❌");
      }
    }
  };
  return (
    <>
      <Header />
      <ToastContainer />
      <div className="p-4 mt-20 mb-20">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form
          onSubmit={(e) => {
            LoginHandller(e);
          }}
          className="max-w-md mx-auto bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              type="email"
              id="email"
              className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              type="password"
              id="password"
              className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300"
            >
              Login
            </button>
            <Link
              to={"/ForgotePassword"}
              className="text-blue-600 hover:underline"
            >
              Forgot Password..
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
