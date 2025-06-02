import React, { useState } from 'react';
import '../../componets/css/login.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../../componets/toast';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { userlogin } from '../../store/redusers/user.reduser';
import { AuthHook } from '../../componets/hooks/auth';
import Cookies from 'js-cookie'


export const Login = () => {
  const {userLogin, userMe} = AuthHook()

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

  async function myProfile(){
    try {
      const responce = await userMe()
      console.log(responce);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
   
      console.log("hello");
      
      const response = await userLogin(logIn)
     

      if (response.error) {
        errorToast(response.msg);
      } else {
        dispatch(userlogin());
        Cookies.remove("drivertoken")
        successToast(response.msg);
        myProfile();

        setTimeout(() => {
          navigate("/findride");
        }, 1000);
      }
    } catch (error) {
      errorToast(error.msg || "Login failed");
      console.error("Login error:", error);
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
          Don't have an account? <NavLink to='/user/signup' >Sign up</NavLink>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};
