// actions/userauth.action.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../libs/axios";

export const userLoginAction = createAsyncThunk(
  "/api/auth/user/login",
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
  "/api/auth/user/signup",
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
  '/api/user/me',
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
  "/api/auth/driver/login",
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
  "/api/driver/me",
  async function (_, { rejectWithValue }) {
    try {
      const response = await api.get('/api/driver/me')
      return response.data
    } catch (error) {
      const message =
        error.response?.data?.msg || 'Failed to fetch user details';
      return rejectWithValue({ error: true, msg: message });
    }
  }
)

export const driverSignupAction = createAsyncThunk(
  "/api/auth/driver/signup",
  async function (credentials, { rejectWithValue }) {
    try {
      const response = await api.post('/api/auth/driver/signup',credentials , {
        headers: {
          'Content-Type': 'multipart/form-data'
        }

      })
      return response.data
    } catch (error) {
      const message =
        error.response?.data?.msg || 'Failed to fetch user details';
      return rejectWithValue({ error: true, msg: message });
    }
  }
)

export const driverForgotPasswordAction = createAsyncThunk(
  "/api/auth/driver/forgot-password",
  async function (credentials, { rejectWithValue }) {
    try {
      const response = await api.put('/api/auth/driver/forgot-password',credentials )
      return response.data
    } catch (error) {
      const message =
        error.response?.data?.msg || 'Failed to reset password';
      return rejectWithValue({ error: true, msg: message });
    }
  }
)

export const driverResetPasswordAction = createAsyncThunk(
  "/api/auth/driver/change-password",
  async function (credentials, { rejectWithValue }) {
    try {
      const response = await api.put('/api/auth/driver/change-password',credentials )
      return response.data
    } catch (error) {
      const message =
        error.response?.data?.msg || 'Failed to reset password';
      return rejectWithValue({ error: true, msg: message });
    }
  }
)


export const userForgotPasswordAction = createAsyncThunk(
  "/api/auth/user/forgot-password",
  async function (credentials, { rejectWithValue }) {
    try {
      const response = await api.put('/api/auth/user/forgot-password',credentials )
      return response.data
    } catch (error) {
      const message =
        error.response?.data?.msg || 'Failed to reset password';
      return rejectWithValue({ error: true, msg: message });
    }
  }
)

export const userResetPasswordAction = createAsyncThunk(
  "/api/auth/user/change-password",
  async function (credentials, { rejectWithValue }) {
    try {
      const response = await api.put('/api/auth/user/change-password',credentials )
      return response.data
    } catch (error) {
      const message =
        error.response?.data?.msg || 'Failed to reset password';
      return rejectWithValue({ error: true, msg: message });
    }
  }
)
