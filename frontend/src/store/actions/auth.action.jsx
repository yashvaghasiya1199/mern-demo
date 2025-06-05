// actions/userauth.action.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../libs/axios";

export const userLoginAction = createAsyncThunk(
  "user/login",
  async function (credentials, { rejectWithValue }) {
    try {
      const response = await api.post('/api/auth/user/login', credentials);
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || { error: true, msg: "Login failed" });
    }
  }
);

export const userSignupAction = createAsyncThunk(
  "user/signup",
  async function (credentials, { rejectWithValue }) {
    try {
      const response = await api.post('/api/auth/user/signup', credentials);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.msg || "Something went wrong during signup.";
      return rejectWithValue({ error: true, msg: message });
    }
  }
);

export const userMeAction = createAsyncThunk(
  'user/me',
  async function (_, { rejectWithValue }) {
    try {
      const response = await api.get('/api/user/me');
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.msg || 'Failed to fetch user details';
      return rejectWithValue({ error: true, msg: message });
    }
  }
);

export const driverLoginAction = createAsyncThunk(
  "driver/login",
  async function (credentials, { rejectWithValue }) {
    try {
      const response = await api.post('/api/auth/driver/login', credentials)
      return response.data
    } catch (error) {
      const message =
        error.response?.data?.msg || 'Failed to fetch user details';
      return rejectWithValue({ error: true, msg: message });
    }
  }
)

export const DriverMeAction = createAsyncThunk(
  "driver/me",
  async function (_, { rejectWithValue }) {
    try {
      const responce = await api.get('/api/driver/me')
      return responce.data
    } catch (error) {
      const message =
        error.response?.data?.msg || 'Failed to fetch user details';
      return rejectWithValue({ error: true, msg: message });
    }
  }
)

export const driverSignupAction = createAsyncThunk(
  "driver/signUp",
  async function (credentials, { rejectWithValue }) {
    try {
      const responce = await api.post('/api/auth/driver/signup',credentials , {
        headers: {
          'Content-Type': 'multipart/form-data'
        }

      })
      return responce.data
    } catch (error) {
      const message =
        error.response?.data?.msg || 'Failed to fetch user details';
      return rejectWithValue({ error: true, msg: message });
    }
  }
)

export const driverForgotPasswordAction = createAsyncThunk(
  "driver/forgotpassword",
  async function (credentials, { rejectWithValue }) {
    try {
      const responce = await api.put('/api/auth/driver/forgot-password',credentials )
      return responce.data
    } catch (error) {
      const message =
        error.response?.data?.msg || 'Failed to reset password';
      return rejectWithValue({ error: true, msg: message });
    }
  }
)

export const driverResetPasswordAction = createAsyncThunk(
  "driver/resetPassword",
  async function (credentials, { rejectWithValue }) {
    try {
      const responce = await api.put('/api/auth/driver/change-password',credentials )
      return responce.data
    } catch (error) {
      const message =
        error.response?.data?.msg || 'Failed to reset password';
      return rejectWithValue({ error: true, msg: message });
    }
  }
)


export const userForgotPasswordAction = createAsyncThunk(
  "user/ForgotPassword",
  async function (credentials, { rejectWithValue }) {
    try {
      const responce = await api.put('/api/auth/user/forgot-password',credentials )
      return responce.data
    } catch (error) {
      const message =
        error.response?.data?.msg || 'Failed to reset password';
      return rejectWithValue({ error: true, msg: message });
    }
  }
)

export const userResetPasswordAction = createAsyncThunk(
  "user/ResetPassword",
  async function (credentials, { rejectWithValue }) {
    try {
      const responce = await api.put('/api/auth/user/change-password',credentials )
      return responce.data
    } catch (error) {
      const message =
        error.response?.data?.msg || 'Failed to reset password';
      return rejectWithValue({ error: true, msg: message });
    }
  }
)
