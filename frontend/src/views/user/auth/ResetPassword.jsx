import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useAuthHook } from '../../../hooks/useAuth';
import '../../../assets/css/login.css'
import '../../../assets/css/signup.css'
import { ErrorNote } from '../../../componets/common/errornote';
import { CircularIndeterminate } from '../../../componets/loadder';
import { errorToast,successToast } from '../../../componets/toast';


export function UserResetPassword() {
  const [newData, setNewdata] = useState({
    otp: "",
    newpassword: "",
    checkpassword: ""
  });
  const [errors, setErrors] = useState({});
  const { isPending, resetPasswordUser, isError, message,clearAuth } = useAuthHook();



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
      clearAuth();
    };
  }, []);

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <h2 className="login-title">Reset password</h2>
        {isError && <ErrorNote data={message?.msg ||  message} />}

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