import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../../../componets/toast';
import { useAuthHook } from '../../../hooks/useAuth';
import '../../../assets/css/login.css'
import '../../../assets/css/signup.css'
import { CircularIndeterminate, Loaders } from '../../../componets/loadder';
import { ErrorNote } from '../../../componets/common/errornote';

export function UserForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const { isPending, forgotPasswordUser, isError, message, clearAuth } = useAuthHook();

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
      console.log(response.payload);

      if (response.payload.error) {
        errorToast(response.msg);
      } else {
        successToast(response.payload.msg);
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
      clearAuth();
    };
  }, []);

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <h2 className="login-title">Forgot password</h2>
        {isError && <ErrorNote data={message?.msg || message} />}

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
          disabled={isPending}
          style={{ backgroundColor: `${isPending ? "#9b9090" : "white"}` }}
        >
          {isPending ? <CircularIndeterminate /> : "Send OTP"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};