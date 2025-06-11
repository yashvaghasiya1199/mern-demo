import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import {  Navigate, NavLink, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../../../componets/toast';
import { useAuthHook } from '../../../hooks/useAuth';
import '../../../assets/css/login.css'
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import { userlogin } from '../../../store/redusers/user.reduser';
import '../../../assets/css/signup.css'
import { CircularIndeterminate } from '../../../componets/loadder';
import { ErrorNote } from '../../../componets/common/errornote';

export function UserLogin() {
    const { userLogin,message, loginUser, userMe, isError, isPending ,clearAuth} = useAuthHook();
    
    
  
    const [logIn, setLogIn] = useState({
      emailorusername: "",
      password: "",
    });
  
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userToken = Cookies.get("usertoken");
  
    useEffect(() => {
      return () => {
        clearAuth();
      };
    }, []);
    
    const formHandel = (e) => {
      const { name, value } = e.target;
      setLogIn((prev) => ({
        ...prev,
        [name]: value,
      }));
      
      // Clear error as user types
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    };
    
    const validate = () => {
      let tempErrors = {};
      
      if (!logIn.emailorusername.trim()) tempErrors.emailorusername = "Email or username is required";
      if (!logIn.password.trim()) tempErrors.password = "Password is required";
      
      setErrors(tempErrors);
      return Object.keys(tempErrors).length === 0;
    };
    
    const myProfile = async () => {
      try {
        const response = await userMe();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!validate()) return;
      
      try {
        const response = await loginUser(logIn);
        console.log(response.payload);
        
        
        if (!response.payload.error) {
          successToast(response.payload.msg);
        }
        if (response.error) {
          errorToast(response.msg);
        } else {
          dispatch(userlogin());
          Cookies.remove("drivertoken");
          myProfile();
          
          setTimeout(() => {
            navigate("/findride");
          }, 2000);
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    };
    console.log(userLogin);
    
    if(userLogin){
      return <Navigate to="/findride"/>
    }
  
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Login</h2>
          {isError && <ErrorNote data={message?.msg || message} />}
  
          <label htmlFor="email">Email or Username</label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email or username"
            name="emailorusername"
            value={logIn.emailorusername}
            onChange={formHandel}
          />
          {errors.emailorusername && <p className="error">{errors.emailorusername}</p>}
  
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            name="password"
            value={logIn.password}
            onChange={formHandel}
          />
          {errors.password && <p className="error">{errors.password}</p>}
  
          <p className="login-footer">
            Forgot password? <NavLink to="/user/forgot-password">Reset it here</NavLink>
          </p>
  
          <button
            type="submit"
            disabled={isPending}
            style={{ backgroundColor: isPending ? "#9b9090" : "white" }}
          >
            {isPending ? <CircularIndeterminate /> : "Login"}
          </button>
  
          <p className="login-footer">
            Don't have an account? <NavLink to="/user/signup">Sign up</NavLink>
          </p>
        </form>
        <ToastContainer />
      </div>
    );
  } 