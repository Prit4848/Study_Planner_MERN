import React, { useContext, useEffect, useState } from 'react'
import Login from './Login'
import {Context} from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectedWrapper = ({children}) => {
    const token = localStorage.getItem("token")
    const {userdata,setuserdata} = useContext(Context)
    const navigate = useNavigate()
    const [Loading, setLoading] = useState(true)     
    useEffect(() => {
      const token = localStorage.getItem("token")
        if(!token){
            return navigate('/Login')
        }
        const featchProfile =async ()=>{
          await axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`,{
            headers: { Authorization: `Bearer ${token}` },
          }).then((response)=>{
            if(response.status == 200){
                setuserdata(response.data.user)
                setLoading(false)   
            }
          }).catch((e)=>{
            console.log(e)
            localStorage.removeItem("token")
            navigate("/Login")
          })
        }
        featchProfile()
    }, [token,navigate,setuserdata])
    
   
    if(Loading){
        return <div>Loading....</div>
    }
  return (
    <div>{children}</div>
  )
}

export default UserProtectedWrapper