import React, { useState } from 'react';
import '../../componets/css/signup.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../../componets/toast';
import { ToastContainer } from 'react-toastify';
import { api } from '../../axios/axios';

export const Signup = () => {

    const navigate = useNavigate()

    const [signUp, setSignUp] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        phone: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await api.post('/api/auth/user/signup',signUp,{
                withCredentials:true,
                headers:{
                    'Content-Type': 'multipart/form-data'
                  }
            })
            const data = await response.data;
            // console.log(data);

            if(data.error){
                errorToast(data.msg)
            }
            if(!data.error){
                successToast("user signup successfully")

                setTimeout(() => {
                    navigate("/user/login")
                }, 1200);

            }
        } catch (error) {
             console.log(error)
        }
    };
    

    function handleChange(e) {
        const { name, value } = e.target;

        setSignUp((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2 className="form-title">User Signup</h2>

                <div className="name-row">
                    <div>
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" id="firstname" placeholder="First Name" name='first_name' value={signUp.first_name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" id="lastname" placeholder="Last Name" name='last_name' value={signUp.last_name} onChange={handleChange} required />
                    </div>
                </div>

                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Choose a username" name='username' value={signUp.username} onChange={handleChange} required />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" name='email' value={signUp.email} onChange={handleChange} required />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Create a password" name='password' value={signUp.password} onChange={handleChange} required />

                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" placeholder="123-456-7890" name='phone' value={signUp.phone} onChange={handleChange} required />

                <button type="submit" >Sign Up</button>

                <p className="form-footer">
                    Already have an account? <NavLink to={"/user/login"} >Login</NavLink>
                </p>
            </form>
            <ToastContainer/>
        </div>
    );
};
