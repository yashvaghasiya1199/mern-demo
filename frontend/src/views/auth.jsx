import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../componets/toast';
import { useAuthHook } from '../componets/hooks/auth';
import '../componets/css/login.css'
import { useDispatch } from 'react-redux';
import Cookies from "js-cookie";
import { userlogout } from '../store/redusers/user.reduser';
import { driverDocument, driverLogins } from '../store/redusers/driver.reduser';
import '../componets/css/login.css'
import { api } from '../axios/axios';
import { userlogin } from '../store/redusers/user.reduser';
import '../componets/css/signup.css'
import '../componets/css/login.css'
import { CircularIndeterminate, Loaders } from '../componets/loadder';

export function DriverSignup() {

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    username: "",
    profileimage: null
  });

  const { isPending, driverSignup } = useAuthHook()
  console.log(isPending);

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


      if (!responce.error) {
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


  const driverToken = Cookies.get("drivertoken")

  if (driverToken) {
    return <Navigate to='/driveradmin' />
  }

  return (<>
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


        <button
          type="submit"
          disabled={isPending}
          style={{ backgroundColor: `${isPending ? "#9b9090" : "white"}` }}
        >
          {isPending ? <CircularIndeterminate /> : "Login"}
        </button>

        <p className="form-footer">
          Already have an account? <NavLink to='/driver/login' >Login</NavLink>
        </p>
      </form>
      <ToastContainer />
    </div></>
  );

}

export function DriverLogin() {

  const { isPending, driverLogin, driverMe } = useAuthHook()

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


  const navigate = useNavigate();

  async function verify() {
    const response = await driverMe()
    console.log(response);

  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await driverLogin(logIn)

      if (!response.error) {
        verify()
        dispatch(userlogout())
        dispatch(driverLogins())
        Cookies.remove("usertoken")
        Cookies.remove("userid")
        successToast(response.msg)
        setTimeout(() => {
          navigate("/driveradmin")
        }, 1000);
      }
      if (response.driver.document_uploaded) {
        dispatch(driverDocument())
      }

    } catch (error) {
      console.error("Error during login:", error);
      errorToast(error.msg)
    }
  };

  const driverToken = Cookies.get("drivertoken")

  if (driverToken) {
    return <Navigate to='/driveradmin' />
  }

  return <>
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Driver Login</h2>

        <label htmlFor="email">Email or Username</label>
        <input type="text" id="email" placeholder="Enter your email" name='emailorusername' value={logIn.emailorusername} onChange={formHandel} required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password" name='password' value={logIn.password} onChange={formHandel} required />
        <p className="login-footer">
          Forgot password <NavLink to='/driver/forgot-password' >forgot password</NavLink>
        </p>
        <button
          type="submit"
          disabled={isPending}
          style={{ backgroundColor: `${isPending ? "#9b9090" : "white"}` }}
        >
          {isPending ? <CircularIndeterminate /> : "Login"}
        </button>

        <p className="login-footer">
          Don't have an account? <NavLink to='/user/signup' >Sign up</NavLink>
        </p>
      </form>
      <ToastContainer />
    </div>
  </>
}

export function DriverPassword() {
  const [email, setEmail] = useState("")


  const navigate = useNavigate();

  const { isPending, driverForgotPassword } = useAuthHook()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await driverForgotPassword({ email: email })

      console.log(response);
      if (response.error) {
        errorToast(response.msg)
      }
      if (!response.error) {
        successToast(response.msg)
        setTimeout(() => {
          navigate("/driver/reset-password")
        }, 1500);
      }

    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return <>
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title"> d Forgot password</h2>

        <label htmlFor="email">Enter email</label>
        <input type="text" id="email" placeholder="Enter your email" name='emailorusername' value={email} onChange={(e) => setEmail(e.target.value)} required />

        <button
          type="submit"
          disabled={isPending}
          style={{ backgroundColor: `${isPending ? "#9b9090" : "white"}` }}
        >
          {isPending ? <CircularIndeterminate /> : "Login"}
        </button>

      </form>
      <ToastContainer />
    </div>
  </>
}

export const UserForgotPassword = () => {


  const [email, setEmail] = useState("")

  const { userPending,userForgotPassword } = useAuthHook();


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userForgotPassword({ email: email })
      console.log(response);


      if (response.error) {
        errorToast(response.msg)
      }
      if (!response.error) {
        successToast(response.msg)
        setTimeout(() => {
          navigate("/user/reset-password")
        }, 1500);
      }

    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Forgot password</h2>

        <label htmlFor="email">Enter email</label>
        <input type="text" id="email" placeholder="Enter your email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />

        <button
          type="submit"
          disabled={userPending}
          style={{ backgroundColor: `${userPending ? "#9b9090" : "white"}` }}
        >
          {userPending ? <CircularIndeterminate /> : "Send Otp"}
        </button>

      </form>
      <ToastContainer />
    </div>
  );
};


export function UserResetPassword() {

  const { userPending,userResetPassword } = useAuthHook();

  const [newData, setNewdata] = useState({
    otp: "",
    newpassword: "",
    checkpassword: ""
  })


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newData.newpassword !== newData.checkpassword) {
      return errorToast("Confirem password doesn't match");
    }

    try {
      // const response = await api.put('/api/auth/user/change-password', newData, {
      //   withCredentials: true,
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // })
 
      const response = await userResetPassword(newData)

      if (response.error) {
        errorToast(response.msg)
      }
      if (!response.error) {
        successToast(response.msg)
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
        <button
          type="submit"
          disabled={userPending}
          style={{ backgroundColor: `${userPending ? "#9b9090" : "white"}` }}
        >
          {userPending ? <CircularIndeterminate /> : "reset password"}
        </button>

      </form>
      <ToastContainer />
    </div>
  );
}

export function UserLogin() {
  const { userPending, userLogin, userMe } = useAuthHook();

  const [logIn, setLogIn] = useState({
    emailorusername: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userToken = Cookies.get("usertoken");

  console.log(userToken);

  if (userToken) {
    return <Navigate to='/' />
  }


  function formHandel(e) {
    const { name, value } = e.target;
    setLogIn((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function myProfile() {
    try {
      const response = await userMe();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await userLogin(logIn);

      if (response.error) {
        errorToast(response.msg);
      } else {
        dispatch(userlogin());
        Cookies.remove("drivertoken");
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
        <input
          type="text"
          id="email"
          placeholder="Enter your email"
          name="emailorusername"
          value={logIn.emailorusername}
          onChange={formHandel}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          name="password"
          value={logIn.password}
          onChange={formHandel}
          required
        />

        <p className="login-footer">
          Forgot password?{" "}
          <NavLink to="/user/forgot-password">Reset it here</NavLink>
        </p>

        <button
          type="submit"
          disabled={userPending}
          style={{ backgroundColor: `${userPending ? "#9b9090" : "white"}` }}
        >
          {userPending ? <CircularIndeterminate /> : "Login"}
        </button>

        <p className="login-footer">
          Don't have an account? <NavLink to="/user/signup">Sign up</NavLink>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}


export function UserSignup() {

  const navigate = useNavigate()
  const { userPending, userSignup } = useAuthHook()

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
      const responce = await userSignup(signUp)
      if (!responce.error) {
        successToast("ok")
        navigate("/")
      }

    } catch (error) {
      console.log(error)
      errorToast(error.msg)
    }
  };


  function handleChange(e) {
    const { name, value } = e.target;

    setSignUp((prev) => ({
      ...prev,
      [name]: value
    }));
  }
  const userToken = Cookies.get("usertoken");

  console.log(userToken)

  if (userToken) {
    return <Navigate to='/' />
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

        <button
          type="submit"
          disabled={userPending}
          style={{ backgroundColor: `${userPending ? "#9b9090" : "white"}` }}
        >
          {userPending ? <CircularIndeterminate /> : "Login"}
        </button>
        <p className="form-footer">
          Already have an account? <NavLink to={"/user/login"} >Login</NavLink>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};


export function DriverResetPassword() {

  const [newData, setNewdata] = useState({
    otp: "",
    newpassword: "",
    checkpassword: ""
  })

  const { isPending, driverResetPassword } = useAuthHook();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newData.newpassword !== newData.checkpassword) {
      return errorToast("Confirm password doesn't match");
    }

    try {
      const response = await driverResetPassword(newData)
      console.log(response);


      if (response.error) {
        errorToast(response.msg)
      }
      if (!response.error) {
        successToast(response.msg)
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

  return <>
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Reset password</h2>

        <label htmlFor="email">Enter OTP</label>
        <input type="text" id="email" placeholder="Enter your otp" name='otp' value={newData.otp} onChange={formHandel} required />

        <label htmlFor="email">Enter new password</label>
        <input type="text" id="email" placeholder="Enter your password" name='newpassword' value={newData.Password} onChange={formHandel} required />

        <label htmlFor="email">confirm password</label>
        <input type="text" id="email" placeholder="confirm password" name='checkpassword' value={newData.checkpassword} onChange={formHandel} required />
        <button
          type="submit"
          disabled={isPending}
          style={{ backgroundColor: `${isPending ? "#9b9090" : "white"}` }}
        >
          {isPending ? <CircularIndeterminate /> : "reset password"}
        </button>

      </form>
      <ToastContainer />
    </div>
  </>

}