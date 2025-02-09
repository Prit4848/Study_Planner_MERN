import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Context = createContext()
const UserContext = ({children}) => {
    const [userdata, setuserdata] = useState({username:'',email:'',password:'',phone_no:'',Bio:'',image:''})
    const token = localStorage.getItem("token")

    useEffect(() => {
     
     const featchProfile =async ()=>{
      await axios.get(`${import.meta.env.VITE_BASE_URL}/user/Profile`,{headers:{Authorization: `Bearer${token}`}})
      .then((response)=>{
        if(response.status == 200){
          setuserdata(response.data.user)
        }
      })
     }
     featchProfile()
    }, [token,setuserdata])
    

  return (
    <Context.Provider value={{userdata,setuserdata}}>
      {children}
    </Context.Provider>
  )
}

export default UserContext