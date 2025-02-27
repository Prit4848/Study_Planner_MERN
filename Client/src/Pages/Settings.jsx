import React, { useContext, useState } from "react";
import { Context } from "../Context/UserContext";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import Header from "../Componets/Header";
import defaultProfileImage from '../assets/profile.png';

const Settings = () => {
    const {userdata} = useContext(Context)
    const [file, setfile] = useState(null)
    const [image, setimage] = useState([])
    const [username, setusername] = useState('')
    const [phone_no, setphone_no] = useState('')
    const [bio, setbio] = useState('')
    const [isLoggedIn, setisLoggedIn] = useState(true)
    const [user, setuser] = useState(userdata)
    const token = localStorage.getItem('token')

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
    const HanddleUploadImage = async (e)=>{
        e.preventDefault()
        try {
            const formData = new FormData();
            formData.append("image", file);

            await axios.post(`${import.meta.env.VITE_BASE_URL}/user/account/upload-profile-image`,formData
                ,{headers:{"Authorization":`Bearer ${token}`,"Content-Type": "multipart/form-data"}}
            ).then((response)=>{
                if(response.status == 201){
                    toast.success('profile Updated Succesfully👍')
                }else{
                    toast.error('Somethin is Wrong Please Try Again')
                }
            })
        } catch (error) {
         console.log(error)
         toast.error('Somethin is Wrong Please Try Again')   
        }
    }

    const HanddleApdateAccount =async (e)=>{
        e.preventDefault()
        try {
          const ApdateData = {username:username,phone_no:phone_no,Bio:bio}
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/account/update`,ApdateData,{headers:{"Authorization":`Bearer ${token}`}})
          if(response.status == 201){
            toast.success('profile Updated Succesfully👍')
        }else{
            toast.error('Somethin is Wrong Please Try Again')
        }
        } catch (error) {
          console.log(error)
          toast.error('Somethin is Wrong Please Try Again')   
        }
    }
  return (
    <>
      <Header user={user} isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn}/>
      <ToastContainer />
      <main className="container mx-auto mt-10 p-5 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Profile Section */}
          <div className="w-full md:w-1/3">
            <div className="flex flex-col items-center p-5 bg-gray-200 rounded-lg shadow-inner">
              <img
               src={getImageSrc()}
                alt="Profile"
                className="w-32 h-32 rounded-full"
              ></img>
              <form
                onSubmit={(e)=>{HanddleUploadImage(e)}}
                className="mt-4"
              >
                <h2 className="mt-4 text-xl font-semibold">{userdata.username}</h2>
                <p className="text-gray-600">{userdata.email}</p>
                <label className="block text-gray-700 mb-2">Change Profile Image</label>
                <input
                  onChange={(e)=>{setfile(e.target.files[0])}}
                  type="file"
                  name="image"
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-2 rounded-md"
                >
                  Change Image
                </button>
              </form>
            </div>
          </div>

          {/* Account Settings Section */}
          <div className="w-full md:w-2/3">
            <div className="p-5 bg-gray-100 rounded-lg shadow-inner">
              <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
              <form onSubmit={(e)=>{HanddleApdateAccount(e)}} className="space-y-4" >
                <div>
                  <label className="block text-gray-700">Name</label>
                  <input
                  value={username}
                  onChange={(e)=>{setusername(e.target.value)}}
                    type="text"
                    name="username"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    defaultValue="User Name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Phone No</label>
                  <input
                    value={phone_no}
                    onChange={(e)=>{setphone_no(e.target.value)}}
                    type="tel"
                    name="phone_no"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    defaultValue="123-456-7890"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Bio</label>
                  <textarea
                  value={bio}
                  onChange={(e)=>{setbio(e.target.value)}}
                    name="Bio"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    defaultValue="This is the user bio."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-4 bg-blue-600 text-white p-2 rounded-md"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Settings;
