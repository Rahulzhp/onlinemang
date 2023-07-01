import React from 'react'
import { Routes, Route } from "react-router-dom"

import Login from './Login/Login'

import DashboardBody from './Navbar/Secondbar/DashboardBody'
import Signup from './Signup/Signup'
export default function AllPages() {
  return (
    <Routes>
      <Route path='/' element={<DashboardBody />} ></Route>
      <Route path='/login' element={<Login />} ></Route>
      {/* <Route path='/dashboard' element={<Sidebar/>} ></Route> */}
      <Route path='/signup' element={<Signup />} ></Route>
    </Routes>
  )
}
