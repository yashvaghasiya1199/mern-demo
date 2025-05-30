import React, { useState } from 'react';
import '../../componets/css/login.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Cookies from "js-cookie";
import { errorToast, successToast } from '../../componets/toast';
import { userlogout } from '../../store/redusers/userauth.reduser';
import { AuthHook } from '../../componets/hooks/auth';
import { driverDocument,driverLogins } from '../../store/redusers/driver.reduser';

export const DriverLogin = () => {

  const {driverLogin, driverMe} = AuthHook()

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
      //  const responce = await api.get("/api/driver/me",{
      //   withCredentials:true
      //  })
      const response = await driverMe()
       console.log(response);
       
  }

  async function handleSubmit (e){
    e.preventDefault();

    try {
      const response = await driverLogin(logIn)
      
      if (!response.error) {
        verify()
        dispatch(userlogout())
        dispatch(driverLogins())
        Cookies.remove("usertoken")
        successToast(response.msg)
        setTimeout(() => {
          navigate("/driveradmin")
        }, 1000);
      }
      if(response.driver.document_uploaded){
        dispatch(driverDocument())
      }

    } catch (error) {
      console.error("Error during login:", error);
      errorToast(error.msg)
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
