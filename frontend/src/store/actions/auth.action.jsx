// actions/userauth.action.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../libs/axios";

export const userLoginAction = createAsyncThunk(
  "/api/auth/user/login",
  async function (credentials, { fulfillWithValue,rejectWithValue }) {
    try {
      const response = await api.post('/api/auth/user/login', credentials);
      return fulfillWithValue (response?.data)
    } catch (error) {
      console.log(error.response.data.msg);
      return rejectWithValue(error.response?.data.msg ||  "Login failed" );
    }
  }
);

export const userSignupAction = createAsyncThunk(
  "/api/auth/user/signup",
  async function (credentials, { fulfillWithValue,rejectWithValue }) {
    try {
      const response = await api.post('/api/auth/user/signup', credentials);
      return fulfillWithValue (response?.data)
    } catch (error) {
      return rejectWithValue(error.response?.data.msg || "signup falied");
    }
  }
);

export const userMeAction = createAsyncThunk(
  '/api/user/me',
  async function (_, { fulfillWithValue,rejectWithValue }) {
    try {
      const response = await api.get('/api/user/me');
      return fulfillWithValue (response?.data)
    } catch (error) {
      return rejectWithValue(error.response?.data.msg || "falied user fatch");
    }
  }
);

export const driverLoginAction = createAsyncThunk(
  "/api/auth/driver/login",
  async function (credentials, { fulfillWithValue,rejectWithValue }) {
    try {
      const response = await api.post('/api/auth/driver/login', credentials)
      console.log(response);
      
      return fulfillWithValue (response?.data)
    } catch (error) {
      return rejectWithValue(error.response?.data  || "falied driver login");
    }
  }
)

export const driverMeAction = createAsyncThunk(
  "/api/driver/me",
  async function (_, { fulfillWithValue,rejectWithValue }) {
    try {
      const response = await api.get('/api/driver/me')
      return fulfillWithValue (response?.data)
    } catch (error) {
      return rejectWithValue(error.response?.data.msg|| "falied to fetch driver profile" );
    }
  }
)

export const driverSignupAction = createAsyncThunk(
  "/api/auth/driver/signup",
  async function (credentials, { fulfillWithValue,rejectWithValue }) {
    try {
      const response = await api.post('/api/auth/driver/signup',credentials , {
        headers: {
          'Content-Type': 'multipart/form-data'
        }

      })
      return fulfillWithValue (response?.data)
    } catch (error) {
      console.log(error);
      
      return rejectWithValue(error.response?.data.msg || "signup falied");
    }
  }
)

export const driverForgotPasswordAction = createAsyncThunk(
  "/api/auth/driver/forgot-password",
  async function (credentials, { fulfillWithValue,rejectWithValue }) {
    try {
      const response = await api.put('/api/auth/driver/forgot-password',credentials )
      return fulfillWithValue (response?.data)
    } catch (error) {
      return rejectWithValue(error.response?.data || "falied to send otp");
    }
  }
)

export const driverResetPasswordAction = createAsyncThunk(
  "/api/auth/driver/change-password",
  async function (credentials, { fulfillWithValue,rejectWithValue }) {
    try {
      const response = await api.put('/api/auth/driver/change-password',credentials )
      return fulfillWithValue (response?.data)
    } catch (error) {
      return rejectWithValue(error.response?.data || "falied to reset password");
    }
  }
)


export const userForgotPasswordAction = createAsyncThunk(
  "/api/auth/user/forgot-password",
  async function (credentials, { fulfillWithValue,rejectWithValue }) {
    try {
      const response = await api.put('/api/auth/user/forgot-password',credentials )
      return fulfillWithValue (response?.data)
    } catch (error) {
      return rejectWithValue(error.response?.data.msg || "falied to send otp");
    }
  }
)

export const userResetPasswordAction = createAsyncThunk(
  "/api/auth/user/change-password",
  async function (credentials, { fulfillWithValue,rejectWithValue }) {
    try {
      const response = await api.put('/api/auth/user/change-password',credentials )
      return fulfillWithValue (response?.data)
    } catch (error) {
      return rejectWithValue(error.response?.data.msg|| "falid to reset password");
    }
  }
)
