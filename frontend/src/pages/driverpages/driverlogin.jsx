import React, { useState } from 'react';
import '../../componets/css/login.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Cookies from "js-cookie";
import { errorToast, successToast } from '../../componets/toast';
import { userlogout } from '../../redux/slices/user.slice';
import { driverDocument, driverLogins } from '../../redux/slices/driver.slice';
import { api } from '../../axios/axios';


export const DriverLogin = () => {

  const [logIn, setLogIn] = useState({
    emailorusername: "",
    password: ""
  });

  const dispatch = useDispatch()

  function formHandel(e) {
    const { name, value } = e.target;

    setLogIn((prev) => ({
      ...prev,
      [name]: value
    }));
  }


  const navigate = useNavigate();

  async function verify(){
       const responce = await api.get("/api/driver/me",{
        withCredentials:true
       })
       console.log(responce);
       
  }

  async function handleSubmit (e){
    e.preventDefault();

    try {
      const response = await api.post('/api/auth/driver/login', logIn, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      

      const data = await response.data;
      console.log(data);
      

      if (data.error) {
        errorToast(data.msg)
      }
      if (!data.error) {
        verify()
        dispatch(userlogout())
        dispatch(driverLogins())
        Cookies.remove("usertoken")
        successToast(data.msg)
        setTimeout(() => {
          navigate("/driveradmin")
        }, 1000);
      }
      if(data.driver.document_uploaded){
        dispatch(driverDocument())
      }

    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Driver Login</h2>

        <label htmlFor="email">Email or Username</label>
        <input type="text" id="email" placeholder="Enter your email" name='emailorusername' value={logIn.emailorusername} onChange={formHandel} required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password" name='password' value={logIn.password} onChange={formHandel} required />
        <p className="login-footer">
          Forgot password <NavLink to='/driver/forgot-password' >forgot password</NavLink>
        </p>

        <button type="submit">Log In</button>

        <p className="login-footer">
          Don't have an account? <NavLink to='/user/signup' >Sign up</NavLink>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};
