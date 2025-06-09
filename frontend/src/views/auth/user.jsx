import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../../componets/toast';
import { useAuthHook } from '../../hooks/useAuth';
import '../../assets/css/login.css'
import { useDispatch } from 'react-redux';
import Cookies from "js-cookie";
import { userlogout } from '../../store/redusers/user.reduser';
import { driverDocument, driverLogins } from '../../store/redusers/driver.reduser';
import { userlogin } from '../../store/redusers/user.reduser';
import '../../assets/css/signup.css'
import { CircularIndeterminate, Loaders } from '../../componets/loadder';
import { ErrorNote } from '../../componets/common/errornote';
import { useDriverHooks } from '../../hooks/useDriver';
import { useUserHooks } from '../../hooks/useUser';



export function UserForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const { userPending, forgotPasswordUser, userError, userMessage } = useAuthHook();
  const { userClear } = useUserHooks();

  const navigate = useNavigate();

  // Email format validation
  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous error
    setEmailError("");

    // Basic validation
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Enter a valid email address");
      return;
    }

    try {
      const response = await forgotPasswordUser({ email });
      console.log(response);

      if (response.error) {
        errorToast(response.msg);
      } else {
        successToast(response.msg);
        setTimeout(() => {
          navigate("/user/reset-password");
        }, 1500);
      }

    } catch (error) {
      console.error("Error during forgot password:", error);
      errorToast("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    return () => {
      userClear();
    };
  }, []);

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <h2 className="login-title">Forgot password</h2>
        {userError && <ErrorNote data={userMessage.msg} />}

        <label htmlFor="email">Enter email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-describedby="emailError"
        />
        {emailError && (
          <p id="emailError" style={{ color: "red", marginTop: "5px" }}>
            {emailError}
          </p>
        )}

        <button
          type="submit"
          disabled={userPending}
          style={{ backgroundColor: `${userPending ? "#9b9090" : "white"}` }}
        >
          {userPending ? <CircularIndeterminate /> : "Send OTP"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export function UserResetPassword() {
  const [newData, setNewdata] = useState({
    otp: "",
    newpassword: "",
    checkpassword: ""
  });
  const [errors, setErrors] = useState({});
  const { userPending, resetPasswordUser, userError, userMessage } = useAuthHook();
  const { userClear } = useUserHooks();



  const navigate = useNavigate();

  const validate = () => {
    const errs = {};

    if (!newData.otp) {
      errs.otp = "OTP is required";
    } else if (!/^\d{4,6}$/.test(newData.otp)) {
      errs.otp = "OTP must be 4 to 6 digits";
    }

    if (!newData.newpassword) {
      errs.newpassword = "Please enter a new password";
    }

    if (!newData.checkpassword) {
      errs.checkpassword = "Please confirm your new password";
    }

    if (
      newData.newpassword &&
      newData.checkpassword &&
      newData.newpassword !== newData.checkpassword
    ) {
      errs.checkpassword = "Passwords do not match";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await resetPasswordUser(newData);

      if (!response.payload.error) {
        successToast(response.payload.msg);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        errorToast(response.payload.msg);
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      errorToast("Something went wrong.");
    }
  };

  const formHandel = (e) => {
    const { name, value } = e.target;
    setNewdata((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    return () => {
      userClear();
    };
  }, []);

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <h2 className="login-title">Reset password</h2>
        {userError && <ErrorNote data={userMessage.msg} />}

        <label htmlFor="otp">Enter OTP</label>
        <input
          type="text"
          id="otp"
          placeholder="Enter your OTP"
          name="otp"
          value={newData.otp}
          onChange={formHandel}
          required
          aria-describedby="otpError"
        />
        {errors.otp && (
          <p id="otpError" style={{ color: "red", marginTop: "5px" }}>{errors.otp}</p>
        )}

        <label htmlFor="newpassword">Enter new password</label>
        <input
          type="password"
          id="newpassword"
          placeholder="Enter your password"
          name="newpassword"
          value={newData.newpassword}
          onChange={formHandel}
          required
          aria-describedby="newpasswordError"
        />
        {errors.newpassword && (
          <p id="newpasswordError" style={{ color: "red", marginTop: "5px" }}>{errors.newpassword}</p>
        )}

        <label htmlFor="checkpassword">Confirm password</label>
        <input
          type="password"
          id="checkpassword"
          placeholder="Confirm password"
          name="checkpassword"
          value={newData.checkpassword}
          onChange={formHandel}
          required
          aria-describedby="checkpasswordError"
        />
        {errors.checkpassword && (
          <p id="checkpasswordError" style={{ color: "red", marginTop: "5px" }}>{errors.checkpassword}</p>
        )}

        <button
          type="submit"
          disabled={userPending}
          style={{ backgroundColor: `${userPending ? "#9b9090" : "white"}` }}
        >
          {userPending ? <CircularIndeterminate /> : "Reset Password"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export function UserLogin() {
  const { userPending, loginUser, userMe, userError, userMessage } = useAuthHook();
  
  const { userClear } = useUserHooks();

  const [logIn, setLogIn] = useState({
    emailorusername: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = Cookies.get("usertoken");

  
  
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
  useEffect(() => {
    return () => {
      userClear();
    };
  }, []);

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        {userError && <ErrorNote data={userMessage} />}

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
          disabled={userPending}
          style={{ backgroundColor: userPending ? "#9b9090" : "white" }}
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
  const [signUp, setSignUp] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const { userPending, signupUser, userError, userMessage } = useAuthHook()

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

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="form-title">User Signup</h2>
        {userError && <ErrorNote data={userMessage} />}

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
          disabled={userPending}
          style={{ backgroundColor: userPending ? '#9b9090' : 'white' }}
        >
          {userPending ? <CircularIndeterminate /> : 'Signup'}
        </button>

        <p className="form-footer">
          Already have an account? <NavLink to="/user/login">Login</NavLink>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

