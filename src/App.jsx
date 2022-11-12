import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from './Home.jsx'
import SignIn from './pages/SignIn.jsx'
import CreateAccount from './pages/CreateAccount'
import ForgotPassword from './pages/ForgotPassword'
import MyDiary from './pages/MyDiary.jsx'
import Profile from './pages/Profile.jsx'
import PageNotFound from './pages/PageNotFound'
import PrivateRoutes from './Services/PrivateRoutes.jsx'
import './App.css'

function App() {
  return (
    <div className="App">
        <Routes>
            <Route element={<PrivateRoutes/>}>
                <Route path="/my-diary" element={<MyDiary />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    </div>
  )
}

export default App
