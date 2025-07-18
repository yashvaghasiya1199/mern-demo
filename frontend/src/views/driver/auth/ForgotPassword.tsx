import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../../../componets/toast';
import { useAuthHook } from '../../../hooks/useAuth';
import '../../../assets/css/login.css';
import '../../../assets/css/signup.css';
import { CircularIndeterminate } from '../../../componets/loadder';
import { ErrorNote } from '../../../componets/common/errornote';

export function DriverPassword() {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const navigate = useNavigate();

  const { isPending, forgotPasswordDriver, isError, clearAuth } = useAuthHook();

  // Basic email validation function
  function validateEmail(email: string): boolean {
    // Simple regex for email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const payload = response.payload as { error?: boolean; msg?: string };


      if (payload.error ) {
        // errorToast(response.payload.msg);
      } else {
        successToast(payload.msg);
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
      clearAuth();
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