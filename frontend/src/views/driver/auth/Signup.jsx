// import React, {  useEffect, useState } from 'react';
// import { ToastContainer } from 'react-toastify';
// import { Navigate, NavLink, useNavigate } from 'react-router-dom';
// import {  successToast } from '../../../componets/toast';
// import { useAuthHook } from '../../../hooks/useAuth';
// import '../../../assets/css/login.css'
// import Cookies from "js-cookie";
// import '../../../assets/css/signup.css'
// import { CircularIndeterminate, Loaders } from '../../../componets/loadder';
// import { ErrorNote } from '../../../componets/common/errornote';  
// import { useDriverHooks } from '../../../hooks/useDriver';
// import { clearAuthData } from '../../../store/redusers/auth.reduser';

// export function DriverSignup(){
//     const [formData, setFormData] = useState({
//       first_name: "",
//       last_name: "",
//       email: "",
//       password: "",
//       phone: "",
//       username: "",
//       profileimage: null,
//     });
  
//     useEffect(() => {
//       return () => {
//         clearAuthData();
//       };
//     }, []);
//     const [errors, setErrors] = useState({});
//     const { message, isError, isPending, signupDriver } = useAuthHook();
//     const { clearData } = useDriverHooks();
//     const navigate = useNavigate();
//     const driverToken = Cookies.get("drivertoken");
  
//     useEffect(() => {
//       return () => {
//         clearData();
//       };
//     }, []);
  
//     if (driverToken) {
//       return <Navigate to="/driveradmin" />;
//     }
  
//     const formHandle = (e) => {
//       const { name, value, files } = e.target;
  
//       if (name === "profileimage") {
//         setFormData((prev) => ({
//           ...prev,
//           profileimage: files[0],
//         }));
//       } else {
//         setFormData((prev) => ({
//           ...prev,
//           [name]: value,
//         }));
//       }
  
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     };
  
//     const validate = () => {
//       const newErrors = {};
  
//       if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
//       if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
//       if (!formData.username.trim()) newErrors.username = "Username is required";
//       if (!formData.email.trim()) newErrors.email = "Email is required";
//       if (!formData.password.trim()) newErrors.password = "Password is required";
//       if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
//       if (!formData.profileimage) newErrors.profileimage = "Profile image is required";
  
//       setErrors(newErrors);
  
//       return Object.keys(newErrors).length === 0;
//     };
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
  
//       if (!validate()) return;
  
//       const newForm = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         newForm.append(key, value);
//       });
  
//       try {
//         const response = await signupDriver(newForm);
        
  
//         if (!response.payload) {
//           successToast(response.payload);
  
//           setTimeout(() => {
//             navigate("/driver/login");
//           }, 2000); 
//         }
//       } catch (err) {
//         console.error("Signup failed", err);
//       }
//     };
    
  
//     return (
//       <div className="signup-container">
//         <form className="signup-form" onSubmit={handleSubmit}>
//           <h2 className="form-title">Driver Signup</h2>
//           {isError && <ErrorNote data={message} />}
  
//           <div className="name-row">
//             <div>
//               <label htmlFor="firstname">First Name</label>
//               <input
//                 type="text"
//                 name="first_name"
//                 id="firstname"
//                 value={formData.first_name}
//                 onChange={formHandle}
//               />
//               {errors.first_name && <p className="error">{errors.first_name}</p>}
//             </div>
  
//             <div>
//               <label htmlFor="lastname">Last Name</label>
//               <input
//                 type="text"
//                 name="last_name"
//                 id="lastname"
//                 value={formData.last_name}
//                 onChange={formHandle}
//               />
//               {errors.last_name && <p className="error">{errors.last_name}</p>}
//             </div>
//           </div>
  
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             name="username"
//             id="username"
//             value={formData.username}
//             onChange={formHandle}
//           />
//           {errors.username && <p className="error">{errors.username}</p>}
  
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             name="email"
//             id="email"
//             value={formData.email}
//             onChange={formHandle}
//           />
//           {errors.email && <p className="error">{errors.email}</p>}
  
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             name="password"
//             id="password"
//             value={formData.password}
//             onChange={formHandle}
//           />
//           {errors.password && <p className="error">{errors.password}</p>}
  
//           <label htmlFor="phone">Phone Number</label>
//           <input
//             type="tel"
//             name="phone"
//             id="phone"
//             value={formData.phone}
//             onChange={formHandle}
//           />
//           {errors.phone && <p className="error">{errors.phone}</p>}
  
//           <label htmlFor="profile">Profile Image</label>
//           <input
//             type="file"
//             name="profileimage"
//             id="profile"
//             onChange={formHandle}
//             accept="image/*"
//           />
//           {errors.profileimage && <p className="error">{errors.profileimage}</p>}
  
//           <button
//             type="submit"
//             disabled={isPending}
//             style={{ backgroundColor: isPending ? "#9b9090" : "white" }}
//           >
//             {isPending ? <CircularIndeterminate /> : "Signup"}
//           </button>
  
//           <p className="form-footer">
//             Already have an account? <NavLink to="/driver/login">Login</NavLink>
//           </p>
//         </form>
//         <ToastContainer />
//       </div>
//     );
//     }


import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { successToast } from '../../../componets/toast';
import { useAuthHook } from '../../../hooks/useAuth';
import '../../../assets/css/login.css';
import '../../../assets/css/signup.css';
import Cookies from 'js-cookie';
import { CircularIndeterminate } from '../../../componets/loadder';
import { ErrorNote } from '../../../componets/common/errornote';
import { useDriverHooks } from '../../../hooks/useDriver';
import { clearAuthData } from '../../../store/redusers/auth.reduser';

export function DriverSignup() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: '',
    username: '',
    profileimage: null,
  });

  const [errors, setErrors] = useState({});
  const { message, isError, isPending, signupDriver,clearAuth } = useAuthHook();
  const navigate = useNavigate();
  const driverToken = Cookies.get('drivertoken');

  useEffect(() => {
    return () => {
      clearAuth();
      
    };
  }, []);

  if (driverToken) {
    return <Navigate to="/driveradmin" />;
  }

  const formHandle = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'profileimage' ? files[0] : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.profileimage) newErrors.profileimage = 'Profile image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const newForm = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      newForm.append(key, value);
    });

    try {
      const response = await signupDriver(newForm);

      if (response?.success) {
        successToast('Signup successful!');
        setTimeout(() => {
          navigate('/driver/login');
        }, 2000);
      }
    } catch (err) {
      console.error('Signup failed', err);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Driver Signup</h2>

        {isError && <ErrorNote data={message?.msg || message} />}

        <div className="name-row">
          <div>
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="first_name"
              id="firstname"
              value={formData.first_name}
              onChange={formHandle}
            />
            {errors.first_name && <p className="error">{errors.first_name}</p>}
          </div>

          <div>
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="last_name"
              id="lastname"
              value={formData.last_name}
              onChange={formHandle}
            />
            {errors.last_name && <p className="error">{errors.last_name}</p>}
          </div>
        </div>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={formHandle}
        />
        {errors.username && <p className="error">{errors.username}</p>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={formHandle}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={formHandle}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={formHandle}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <label htmlFor="profile">Profile Image</label>
        <input
          type="file"
          name="profileimage"
          id="profile"
          onChange={formHandle}
          accept="image/*"
        />
        {errors.profileimage && <p className="error">{errors.profileimage}</p>}

        <button
          type="submit"
          disabled={isPending}
          style={{ backgroundColor: isPending ? '#9b9090' : 'white' }}
        >
          {isPending ? <CircularIndeterminate /> : 'Signup'}
        </button>

        <p className="form-footer">
          Already have an account? <NavLink to="/driver/login">Login</NavLink>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}
