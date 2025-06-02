

import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../../componets/toast';
import { AuthHook } from '../../componets/hooks/auth';



export const DriverSignup = () => {

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    username: "",
    profileimage: null
  });

  const {driverSignup} = AuthHook()

  const navigate = useNavigate()

  const formHandle = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileimage') {
      setFormData((prev) => ({
        ...prev,
        profileimage: files[0]
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newform = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      newform.append(key, value);
    });

    try {
     const responce = await driverSignup(newform)
     console.log(responce);
     
     
      if(!responce.error){
        successToast(responce.msg)

        setTimeout(() => {
          navigate("/driver/login")
        }, 2000);

      }
    } catch (err) {
      console.error("Signup failed", err);
      errorToast(err.msg)
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Driver Signup</h2>

        <div className="name-row">
          <div>
            <label htmlFor="firstname">First Name</label>
            <input type="text" name='first_name' id="firstname" value={formData.first_name} onChange={formHandle} required />
          </div>
          <div>
            <label htmlFor="lastname">Last Name</label>
            <input type="text" name='last_name' id="lastname" value={formData.last_name} onChange={formHandle} required />
          </div>
        </div>

        <label htmlFor="username">Username</label>
        <input type="text" name='username' id="username" value={formData.username} onChange={formHandle} required />

        <label htmlFor="email">Email</label>
        <input type="email" name='email' id="email" value={formData.email} onChange={formHandle} required />

        <label htmlFor="password">Password</label>
        <input type="password" name='password' id="password" value={formData.password} onChange={formHandle} required />

        <label htmlFor="phone">Phone Number</label>
        <input type="tel" name='phone' id="phone" value={formData.phone} onChange={formHandle} required />

        <label htmlFor="profile">Profile Image</label>
        <input type="file" name='profileimage' id="profile" onChange={formHandle} accept="image/*" required />


        <button type="submit">Sign Up</button>

        <p className="form-footer">
          Already have an account? <NavLink to='/driver/login' >Login</NavLink>
        </p>
      </form>
      <ToastContainer/>
    </div>
  );
};
