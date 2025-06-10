import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import {  NavLink, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../../../componets/toast';
import { useAuthHook } from '../../../hooks/useAuth';
import '../../../assets/css/login.css'
import '../../../assets/css/signup.css'
import { CircularIndeterminate } from '../../../componets/loadder';
import { ErrorNote } from '../../../componets/common/errornote';
import { clearAuthData } from '../../../store/redusers/auth.reduser';

export function UserSignup() {
    const [signUp, setSignUp] = useState({
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      phone: '',
    });
    const [errors, setErrors] = useState({});
    const { isPending, signupUser, isError, message,clearAuth } = useAuthHook()
  
    const navigate = useNavigate()
    const handleChange = (e) => {
      setSignUp({
        ...signUp,
        [e.target.name]: e.target.value,
      });
  
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    };
  
    const validate = () => {
      let validationErrors = {};
  
      if (!signUp.first_name.trim()) validationErrors.first_name = 'First name is required';
      if (!signUp.last_name.trim()) validationErrors.last_name = 'Last name is required';
      if (!signUp.username.trim()) validationErrors.username = 'Username is required';
      if (!signUp.email.trim()) validationErrors.email = 'Email is required';
      if (!signUp.password.trim()) validationErrors.password = 'Password is required';
      if (!signUp.phone.trim()) validationErrors.phone = 'Phone number is required';
  
      setErrors(validationErrors);
  
      return Object.keys(validationErrors).length === 0;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validate()) return;
      try {
        const response = await signupUser(signUp)
        if (!response.error) {
          successToast("ok")
          navigate("/user/login")
        }
  
      } catch (error) {
        console.log(error)
        errorToast(error.msg)
      }
  
  
    };
useEffect(() => {
      return () => {
        clearAuth();
      };
    }, []);
    return (
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2 className="form-title">User Signup</h2>
          {isError && <ErrorNote data={message?.msg || message} />}
  
          <div className="name-row">
            <div>
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                id="firstname"
                placeholder="First Name"
                name="first_name"
                value={signUp.first_name}
                onChange={handleChange}
              />
              {errors.first_name && <p className="error">{errors.first_name}</p>}
            </div>
            <div>
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                id="lastname"
                placeholder="Last Name"
                name="last_name"
                value={signUp.last_name}
                onChange={handleChange}
              />
              {errors.last_name && <p className="error">{errors.last_name}</p>}
            </div>
          </div>
  
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Choose a username"
            name="username"
            value={signUp.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}
  
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            name="email"
            value={signUp.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
  
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Create a password"
            name="password"
            value={signUp.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
  
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            placeholder="123-456-7890"
            name="phone"
            value={signUp.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
  
          <button
            type="submit"
            disabled={isPending}
            style={{ backgroundColor: isPending ? '#9b9090' : 'white' }}
          >
            {isPending ? <CircularIndeterminate /> : 'Signup'}
          </button>
  
          <p className="form-footer">
            Already have an account? <NavLink to="/user/login">Login</NavLink>
          </p>
        </form>
        <ToastContainer />
      </div>
    );
  };