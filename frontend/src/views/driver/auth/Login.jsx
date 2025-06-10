import React, {  useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { successToast } from '../../../componets/toast';
import { useAuthHook } from '../../../hooks/useAuth';
import '../../../assets/css/login.css'
import { useDispatch } from 'react-redux';
import Cookies from "js-cookie";
import { userlogout } from '../../../store/redusers/user.reduser';
import {  driverLogins } from '../../../store/redusers/driver.reduser';
import '../../../assets/css/signup.css'
import { CircularIndeterminate } from '../../../componets/loadder';
import { ErrorNote } from '../../../componets/common/errornote';  
import { useDriverHooks } from '../../../hooks/useDriver';
import { clearAuthData } from '../../../store/redusers/auth.reduser';

export function DriverLogin() {
  const [logIn, setLogIn] = useState({
    emailorusername: "",
    password: ""
  });

  const [formErrors, setFormErrors] = useState({
    emailorusername: "",
    password: ""
  });

  const { message, isError, isPending, loginDriver, clearAuth } = useAuthHook();
  const { clearData } = useDriverHooks();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function formHandel(e) {
    const { name, value } = e.target;
    setLogIn((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear field-specific error
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ""
    }));
  }

  // async function verify() {
  //   const response = await driverMe();
  //   console.log(response);
  // }

  const validateForm = () => {
    const errors = {};
    if (!logIn.emailorusername.trim()) {
      errors.emailorusername = "Email or username is required";
    }
    if (!logIn.password) {
      errors.password = "Password is required";
    } else if (logIn.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return; 
    }

    try {
      const response = await loginDriver(logIn);
      console.log(response.payload);

      if (!response.payload.error) {
        // verify();
        dispatch(userlogout());
        dispatch(driverLogins());
        Cookies.remove("usertoken");
        Cookies.remove("userid");
        successToast(response.msg);
        setTimeout(() => {
          navigate("/driveradmin");
        }, 1000);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }
  const driverToken = Cookies.get("drivertoken");

  useEffect(() => {
    return () => {
      clearAuth();
    };
  }, []);


  if (driverToken) {
    return <Navigate to='/driveradmin' />;
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Driver Login</h2>
        {isError && <ErrorNote data={message?.msg || message} />}

        <label htmlFor="email">Email or Username</label>
        <input
          type="text"
          id="email"
          placeholder="Enter your email"
          name="emailorusername"
          value={logIn.emailorusername}
          onChange={formHandel}
        />
        {formErrors.emailorusername && (
          <p style={{ color: "red", marginTop: "5px" }}>{formErrors.emailorusername}</p>
        )}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          name="password"
          value={logIn.password}
          onChange={formHandel}
        />
        {formErrors.password && (
          <p style={{ color: "red", marginTop: "5px" }}>{formErrors.password}</p>
        )}

        <p className="login-footer">
          Forgot password? <NavLink to="/driver/forgot-password">Click here</NavLink>
        </p>

        <button
          type="submit"
          disabled={isPending}
          style={{ backgroundColor: isPending ? "#9b9090" : "white" }}
        >
          {isPending ? <CircularIndeterminate /> : "Login"}
        </button>

        <p className="login-footer">
          Don't have an account? <NavLink to="/driver/signup">Sign up</NavLink>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
  }