import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import UserForm from './pages/UserForm'
import UserData from './pages/UserData'
import Navbar from './components/header/Navbar'
import Footer from './components/footer/Footer'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

const App = () => {

  const [user,setUser] = useState(JSON.parse(localStorage.getItem('user'))|| '')


  const LoginUser =(data)=>{
    localStorage.setItem('user',JSON.stringify(data))
    setUser(data)
  }

  const LogoutUser = ()=>{
    localStorage.removeItem('user')
    setUser('')
  }


  return (
    <>
      <BrowserRouter>
        <Navbar LogoutUser={LogoutUser}/>
        <Routes>
          <Route path="/" element={user?<UserData/>:<Navigate to='/signin'/>}></Route>
          <Route path="/adduser" element={user?<UserForm/>:<Navigate to='/signin'/>}></Route>
          <Route path="/signin" element={<Signin  LoginUser={LoginUser}/>}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
