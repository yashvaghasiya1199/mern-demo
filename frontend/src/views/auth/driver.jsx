import React, {  useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../../componets/toast';
import { useAuthHook } from '../../hooks/useAuth';
import '../../assets/css/login.css'
import { useDispatch } from 'react-redux';
import Cookies from "js-cookie";
import { userlogout } from '../../store/redusers/user.reduser';
import {  driverLogins } from '../../store/redusers/driver.reduser';
import '../../assets/css/signup.css'
import { CircularIndeterminate, Loaders } from '../../componets/loadder';
import { ErrorNote } from '../../componets/common/errornote';  
import { useDriverHooks } from '../../hooks/useDriver';

export function DriverSignup(){
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    username: "",
    profileimage: null,
  });

  const [errors, setErrors] = useState({});
  const { message, isError, isPending, signupDriver } = useAuthHook();
  const { clearData } = useDriverHooks();
  const navigate = useNavigate();
  const driverToken = Cookies.get("drivertoken");

  useEffect(() => {
    return () => {
      clearData();
    };
  }, []);

  if (driverToken) {
    return <Navigate to="/driveradmin" />;
  }

  const formHandle = (e) => {
    const { name, value, files } = e.target;

    if (name === "profileimage") {
      setFormData((prev) => ({
        ...prev,
        profileimage: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.profileimage) newErrors.profileimage = "Profile image is required";

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
      

      if (!response.payload) {
        successToast(response.payload);

        setTimeout(() => {
          navigate("/driver/login");
        }, 2000); 
      }
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Driver Signup</h2>
        {isError && <ErrorNote data={message} />}

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
          style={{ backgroundColor: isPending ? "#9b9090" : "white" }}
        >
          {isPending ? <CircularIndeterminate /> : "Signup"}
        </button>

        <p className="form-footer">
          Already have an account? <NavLink to="/driver/login">Login</NavLink>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
  }


export function DriverLogin() {
  const [logIn, setLogIn] = useState({
    emailorusername: "",
    password: ""
  });

  const [formErrors, setFormErrors] = useState({
    emailorusername: "",
    password: ""
  });

  const { message, isError, isPending, loginDriver, driverMe } = useAuthHook();
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

      // if (response.payload.driver?.document_uploaded) {
      //   dispatch(driverDocument());
      // }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }
  const driverToken = Cookies.get("drivertoken");

  useEffect(() => {
    return () => {
      clearData();
    };
  }, []);


  if (driverToken) {
    return <Navigate to='/driveradmin' />;
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Driver Login</h2>
        {isError && <ErrorNote data={message.msg} />}

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

  export function DriverPassword(){
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
  
    const navigate = useNavigate();
  
    const { isPending, forgotPasswordDriver, isError, message } = useAuthHook();
    const { clearData } = useDriverHooks();
  
    // Basic email validation function
    function validateEmail(email) {
      // Simple regex for email validation
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Reset previous errors
      setEmailError("");
  
      // Validate email before submitting
      if (!validateEmail(email)) {
        setEmailError("Please enter a valid email address");
        return;
      }
  
      try {
        const response = await forgotPasswordDriver({ email });
  
        if (response.payload.error) {
          errorToast(response.payload.msg);
        } else {
          successToast(response.payload.msg);
          setTimeout(() => {
            navigate("/driver/reset-password");
          }, 1500);
        }
      } catch (error) {
        console.error("Error during forgot password:", error);
        errorToast("Something went wrong. Please try again.");
      }
    };
  
    useEffect(() => {
      return () => {
        clearData();
      };
    }, []);
  
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Driver Forgot Password</h2>
          {isError && <ErrorNote data={"invalid email"} />}
          
          <label htmlFor="email">Enter email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailError"
          />
          {emailError && (
            <p id="emailError" style={{ color: "red", marginTop: "5px" }}>
              {emailError}
            </p>
          )}
  
          <button
            type="submit"
            disabled={isPending}
            style={{ backgroundColor: `${isPending ? "#9b9090" : "white"}` }}
          >
            {isPending ? <CircularIndeterminate /> : "Send Reset Link"}
          </button>
        </form>
        <ToastContainer />
      </div>
    );
  }

  export function DriverResetPassword() {
    const [newData, setNewdata] = useState({
      otp: "",
      newpassword: "",
      checkpassword: ""
    });
  
    const [errors, setErrors] = useState({});
  
    const { clearData } = useDriverHooks();
    const { isPending, resetPasswordDriver, isError, message } = useAuthHook();
  
    const navigate = useNavigate();
  
    function validate() {
      const errs = {};
  
      // OTP validation
      if (!newData.otp) {
        errs.otp = "Please enter OTP";
      } else if (!/^\d{4,6}$/.test(newData.otp)) {
        errs.otp = "OTP must be 4 to 6 digits";
      }
  
      // Password validation
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
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!validate()) return;
  
      try {
        const response = await resetPasswordDriver(newData);
        console.log(response);
  
        if (response.payload.error) {
          errorToast(response.payload.msg);
        } else {
          successToast(response.payload.msg);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } catch (error) {
        console.error("Error during password reset:", error);
        errorToast("Something went wrong. Please try again.");
      }
    };
  
    function formHandel(e) {
      const { name, value } = e.target;
  
      setNewdata((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  
    useEffect(() => {
      return () => {
        clearData();
      };
    }, []);
  
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <h2 className="login-title">Reset password</h2>
          {isError && <ErrorNote data={message} />}
  
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
            <p id="otpError" style={{ color: "red", marginTop: "5px" }}>
              {errors.otp}
            </p>
          )}
  
          <label htmlFor="newpassword">Enter new password</label>
          <input
            type="password"
            id="newpassword"
            placeholder="Enter your new password"
            name="newpassword"
            value={newData.newpassword}
            onChange={formHandel}
            required
            aria-describedby="newpasswordError"
          />
          {errors.newpassword && (
            <p id="newpasswordError" style={{ color: "red", marginTop: "5px" }}>
              {errors.newpassword}
            </p>
          )}
  
          <label htmlFor="checkpassword">Confirm password</label>
          <input
            type="password"
            id="checkpassword"
            placeholder="Confirm your password"
            name="checkpassword"
            value={newData.checkpassword}
            onChange={formHandel}
            required
            aria-describedby="checkpasswordError"
          />
          {errors.checkpassword && (
            <p id="checkpasswordError" style={{ color: "red", marginTop: "5px" }}>
              {errors.checkpassword}
            </p>
          )}
  
          <button
            type="submit"
            disabled={isPending}
            style={{ backgroundColor: `${isPending ? "#9b9090" : "white"}` }}
          >
            {isPending ? <CircularIndeterminate /> : "Reset Password"}
          </button>
        </form>
        <ToastContainer />
      </div>
    );
  }
  