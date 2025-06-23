import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../../../componets/toast';
import { useAuthHook } from '../../../hooks/useAuth';
import '../../../assets/css/login.css';
import '../../../assets/css/signup.css';
import { CircularIndeterminate } from '../../../componets/loadder';
import { ErrorNote } from '../../../componets/common/errornote';

interface INewData {
  otp: string;
  newpassword: string;
  checkpassword: string;
}

interface IErrors {
  otp?: string;
  newpassword?: string;
  checkpassword?: string;
}

export function DriverResetPassword() {
  const [newData, setNewdata] = useState<INewData>({
    otp: "",
    newpassword: "",
    checkpassword: ""
  });

  const [errors, setErrors] = useState<IErrors>({});

  const { isPending, resetPasswordDriver, isError, message, clearAuth } = useAuthHook();

  const navigate = useNavigate();

  function validate(): boolean {
    const errs: IErrors = {};

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await resetPasswordDriver(newData);
      const payload = response.payload as {error:boolean,msg:string}

      if (!payload.error) {
        successToast(payload.msg);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      errorToast("Something went wrong. Please try again.");
    }
  };

  function formHandel(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setNewdata((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  useEffect(() => {
    return () => {
      clearAuth();
    };
  }, []);

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <h2 className="login-title">Reset password</h2>
        {isError && <ErrorNote data={message?.msg} />}

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
