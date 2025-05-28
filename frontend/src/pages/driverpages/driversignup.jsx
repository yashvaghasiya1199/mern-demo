// import { Password } from '@mui/icons-material';
// import React, { useState } from 'react';

// export const DriverSignup = () => {

//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//     phone: "",
//     username: "",
//     profileimage: ""
//   })

//   function formHandel(e) {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newform = new FormData()

//     newform.append("profileimage", formData.profileimage)
//     newform.append("first_name", formData.first_name)
//     newform.append("last_name", formData.last_name)
//     newform.append("email", formData.email)
//     newform.append("password", formData.password)
//     newform.append("phone", formData.phone)
//     newform.append("username", formData.username)


//     let responce = await fetch("http://localhost:8010/api/auth/driver/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       credentials: "include",
//       body: JSON.stringify(newform)
//     })

//     // const result = await responce.json()
//     console.log(responce);
//   };

//   return (
//     <div className="signup-container">
//       <form className="signup-form" onSubmit={handleSubmit}>
//         <h2 className="form-title">Driver Signup</h2>

//         <div className="name-row">
//           <div>
//             <label htmlFor="firstname">First Name</label>
//             <input type="text" name='first_name' id="firstname" value={formData.first_name} onChange={formHandel} required />
//           </div>
//           <div>
//             <label htmlFor="lastname">Last Name</label>
//             <input type="text" name='last_name' id="lastname" value={formData.last_name} onChange={formHandel} required />
//           </div>
//         </div>

//         <label htmlFor="username">Username</label>
//         <input type="text" name='username' id="username" value={formData.username} onChange={formHandel} required />

//         <label htmlFor="email">Email</label>
//         <input type="email" name='email' id="email" value={formData.email} onChange={formHandel} required />

//         <label htmlFor="password">Password</label>
//         <input type="password" name='password' id="password" value={formData.password} onChange={formHandel} required />

//         <label htmlFor="phone">Phone Number</label>
//         <input type="tel" name='phone' id="phone" value={formData.phone} onChange={formHandel} required />

//         <label htmlFor="profile">Profile Image</label>
//         <input type="file" name='profileimage' id="profile" value={formData.profileimage} onChange={formHandel} accept="image/*" required />

//         <button type="submit">Sign Up</button>

//         <p className="form-footer">
//           Already have an account? <a href="/login">Login</a>
//         </p>
//         <Documents />
//       </form>
//     </div>
//   );
// };



// function Documents() {
//   const [docType, setDocType] = useState('');

//   function formSubmit(e) {
//     e.preventDefault();
//     alert("done")
//   }

//   return <>
//     <form action="" onSubmit={formSubmit} >
//       <label>Document Type</label>
//       <div className="radio-group">
//         <label>
//           <input
//             type="radio"
//             name="docType"
//             value="pancard"
//             checked={docType === 'pancard'}
//             onChange={(e) => setDocType(e.target.value)}
//           />
//           PAN Card
//         </label>
//         <label>
//           <input
//             type="radio"
//             name="docType"
//             value="aadharcard"
//             checked={docType === 'aadharcard'}
//             onChange={(e) => setDocType(e.target.value)}
//           />
//           Aadhar Card
//         </label>
//       </div>

//       {docType === 'pancard' && (
//         <>
//           <label htmlFor="pancard">PAN Card Upload</label>
//           <input type="file" id="pancard" accept="image/*" required />
//         </>
//       )}

//       {docType === 'aadharcard' && (
//         <>
//           <label htmlFor="aadharFront">Aadhar Card Front</label>
//           <input type="file" id="aadharFront" accept="image/*" required />

//           <label htmlFor="aadharBack">Aadhar Card Back</label>
//           <input type="file" id="aadharBack" accept="image/*" required />
//         </>
//       )}
//       <button type="submit">Sign Up</button>
//     </form>
//   </>
// }

import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../../componets/toast';
import { api } from '../../axios/axios';


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
      const response = await api.post('/api/auth/driver/signup', newform, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      

      const result = await response.data;

      if(result.error){
        errorToast(result.msg)
      }
      if(!result.error){
        successToast(result.msg)

        setTimeout(() => {
          navigate("/driver/login")
        }, 2000);

      }
      console.log(result);
    } catch (err) {
      console.error("Signup failed", err);
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
