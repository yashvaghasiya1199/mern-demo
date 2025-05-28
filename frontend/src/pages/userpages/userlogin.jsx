import React, { useState } from 'react';
import '../../componets/css/login.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../../componets/toast';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Cookies from "js-cookie";
import { userlogin } from '../../redux/slices/user.slice';
import { api } from '../../axios/axios';
import { pink } from '@mui/material/colors';

export const Login = () => {

  const [logIn, setLogIn] = useState({
    emailorusername: "",
    password: ""
  });

  // const token = Cookies.get("usertoken");

  const dispatch = useDispatch()

  function formHandel(e) {
    const { name, value } = e.target;

    setLogIn((prev) => ({
      ...prev,
      [name]: value
    }));
  }

async function myProfile(){
  const responce = await api.get("/api/user/me",{
    withCredentials:true
  })
  console.log(responce);
  
}
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/api/auth/user/login',logIn,{
        withCredentials:true,
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      })

      const data = await response.data

      if (data.error) {
        errorToast(data.msg)
      }
      if (!data.error) {
        dispatch(userlogin())
        successToast(data.msg)
        myProfile()
        setTimeout(() => {
          navigate("/")
        }, 1000);
      }

    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>

        <label htmlFor="email">Email or Username</label>
        <input type="text" id="email" placeholder="Enter your email" name='emailorusername' value={logIn.emailorusername} onChange={formHandel} required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password" name='password' value={logIn.password} onChange={formHandel} required />
        <p className="login-footer">
          Forgot password <NavLink to='/user/forgot-password' >forgot password</NavLink>
        </p>

        <button type="submit">Log In</button>

        <p className="login-footer">
          Don't have an account? <NavLink to='/signup' >Sign up</NavLink>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};
