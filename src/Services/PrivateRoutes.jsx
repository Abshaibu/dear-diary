import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoutes() {
    const auth = localStorage.getItem('Active')
  return auth ? <Outlet /> : <Navigate to={"/sign-in"} />
}