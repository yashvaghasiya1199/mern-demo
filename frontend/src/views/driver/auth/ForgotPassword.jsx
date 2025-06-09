import React, {  useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../../../componets/toast';
import { useAuthHook } from '../../../hooks/useAuth';
import '../../../assets/css/login.css'
import '../../../assets/css/signup.css'
import { CircularIndeterminate } from '../../../componets/loadder';
import { ErrorNote } from '../../../componets/common/errornote';  
import { useDriverHooks } from '../../../hooks/useDriver';

export function DriverPassword(){
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
  
    const navigate = useNavigate();
  
    const { isPending, forgotPasswordDriver, isError } = useAuthHook();
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
        clearData()
      }
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