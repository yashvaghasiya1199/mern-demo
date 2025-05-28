import React, { useState } from 'react';
import '../../componets/css/login.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../../componets/toast';
import { ToastContainer } from 'react-toastify';
import { api } from '../../axios/axios';

export function ResetPassword(){

    
    const [newData,setNewdata] = useState({
        otp:"",
        newpassword:"",
        checkpassword:""
    })
 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newData.newpassword !== newData.checkpassword) {
        return errorToast("Confirem password doesn't match");
      }

    try {  
   const response = await api.put('/api/auth/user/change-password',newData,{
    withCredentials:true,
    headers:{
      'Content-Type': 'multipart/form-data'
    }
   })

      const data = await response.data;
      console.log(data);
      
      

      if (data.error) {
        errorToast(data.msg)
      }
      if (!data.error) {
        successToast(data.msg)
        setTimeout(() => {
          navigate("/")
        }, 1000);
      }

    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  function formHandel(e) {
    const { name, value } = e.target;

    setNewdata((prev) => ({
      ...prev,
      [name]: value
    }));
  }
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Reset password</h2>

        <label htmlFor="email">Enter OTP</label>
        <input type="text" id="email" placeholder="Enter your otp" name='otp' value={newData.otp} onChange={formHandel} required />

        <label htmlFor="email">Enter new password</label>
        <input type="text" id="email" placeholder="Enter your password" name='newpassword' value={newData.Password} onChange={formHandel} required />
        
        <label htmlFor="email">confirm password</label>
        <input type="text" id="email" placeholder="confirm password" name='checkpassword' value={newData.checkpassword} onChange={formHandel} required />
        <button type="submit">Send OTP</button>

      </form>
      <ToastContainer />
    </div>
  );
}