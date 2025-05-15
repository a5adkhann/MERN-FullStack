import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import UserForm from './pages/UserForm'
import UserData from './pages/UserData'
import Navbar from './components/header/Navbar'
import Footer from './components/footer/Footer'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

const App = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  console.log(user)

  useEffect(() => {
    let users = JSON.parse(localStorage.getItem('user'))
    setUser(users);
  }, [user])

  return (
    <>
      <BrowserRouter>
        <Navbar setUser={setUser}/>
        <Routes>
          <Route path="/" element={user ? <UserData setUser={setUser}/> : <Navigate to="/signin" />}></Route>
          <Route path="/adduser" element={<UserForm setUser={setUser}/>}></Route>
          <Route path="/signin" element={<Signin  />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
