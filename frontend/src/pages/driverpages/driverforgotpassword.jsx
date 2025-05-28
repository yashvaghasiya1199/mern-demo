import React, { useState } from 'react';
import '../../componets/css/login.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../../componets/toast';
import { ToastContainer } from 'react-toastify';
import { api } from '../../axios/axios';

export const DriverForgotPassword = () => {


  const [email, setEmail] = useState("")


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await api.put('/api/auth/driver/forgot-password', {
        email: email
      }, {
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
        successToast(data.msg)
        setTimeout(() => {
          navigate("/driver/reset-password")
        }, 1500);
      }

    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title"> d Forgot password</h2>

        <label htmlFor="email">Enter email</label>
        <input type="text" id="email" placeholder="Enter your email" name='emailorusername' value={email} onChange={(e) => setEmail(e.target.value)} required />

        <button type="submit">Send OTP</button>

      </form>
      <ToastContainer />
    </div>
  );
};


