import React, { useState } from 'react'
import Header from './Componets/Header'
import Index from './Pages/Index'
import Footer from './Componets/Footer'
import Register from './Pages/Register'
import Login from './Pages/Login'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashbord'
import UserProtectedWrapper from './Pages/UserProtectedWrapper'
import ForgotPassword from './Pages/Forgot_password'
import EnterOTP from './Pages/EnterOTP'
import ChangePassword from './Pages/ChangePassword'
import Logout from './Pages/Logout'
import ContactUs from './Pages/ContactUs'
import Profile from './Pages/Profile'
import Settings from './Pages/Settings'
import CreateStudyPlan from './Pages/CreateStudyPlane'
import Support from './Pages/Support'
import WhyUs from './Pages/WhyUs'
import AboutUs from './Pages/AboutUs'
import Features from './Pages/Features'
import ViewPlan from './Pages/ViewPlan'
import EditPlan from './Pages/EditPlan'
import CreateGoal from './Pages/CreateGoal'
import ViewGoal from './Pages/ViewGoal'
import EditGoal from './Pages/EditGoal'
import Visualization from './Pages/Visualization'
import HowToUse from './Pages/HowToUse'



const App = () => {
  const [email, setemail] = useState('')
  return (
    <div>
      <Routes>
        <Route path="/" element={<Index />} /> 
        //User Router
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path='/ForgotePassword' element={<ForgotPassword setemail={setemail}/>} />
        <Route path='Logout' element={<Logout><UserProtectedWrapper/></Logout>} />
        <Route path='/EnterOTP' element={<EnterOTP email={email}/>} />
        <Route path='/ChangePassword' element={<ChangePassword email={email}/>} />
        <Route path="/Dashboard" element={<UserProtectedWrapper><Dashboard /></UserProtectedWrapper>} />
        <Route path='/ContactUs' element={<ContactUs/>} />
        <Route path='/User/Profile' element={<UserProtectedWrapper><Profile/></UserProtectedWrapper>}/>
        <Route path='/User/Settings' element={<UserProtectedWrapper><Settings/></UserProtectedWrapper>}/>
        <Route path='/Visualization' element={<Visualization/>} />
        <Route path='/HowToUse' element={<HowToUse/>} />
        //Plane Routes
        <Route path='/Plan/Create' element={<CreateStudyPlan/>} />
        <Route path='/Plan/View' element={<ViewPlan/>} />
        <Route path='/Plan/Edit' element={<EditPlan/>}/>
        //Goal Router
        <Route path='/Goal/Create' element={<CreateGoal/>} />
        <Route path='/Goal/View' element={<ViewGoal/>} />
        <Route path='/Goal/Edit' element={<EditGoal/>} />
        //footer Routes
        <Route path='/Support' element={<Support/>} />
        <Route path='/WhyUs' element={<WhyUs/>} />
        <Route path='/AboutUs' element={<AboutUs/>} />
        <Route path='/Features' element={<Features/>} />
      </Routes>
    </div>
  )
}

export default App