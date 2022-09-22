import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import Login from './Login';

const useAuth = () => {
  const user = { loggedIn: localStorage.getItem('isLoggedIn') }
  return user && user.loggedIn;
}

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : < Navigate to='/login' />
}

export default ProtectedRoutes