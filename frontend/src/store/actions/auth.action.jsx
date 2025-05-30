// actions/userauth.action.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axios/axios";

export const userLoginAction = createAsyncThunk(
  "userLoginAction",
  async function (credentials, { rejectWithValue }) {
    console.log(rejectWithValue.meta);

    try {
      const response = await api.post('/api/auth/user/login', credentials, {
        withCredentials: true, // optional: for cookies/sessions
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { error: true, msg: "Login failed" });
    }
  }
);

export const userSignupAction = createAsyncThunk(
  "user/signup",
  async function (credentials, { rejectWithValue }) {
    try {
      const response = await api.post('/api/auth/user/signup', credentials, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

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
      const response = await api.get('/api/user/me', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.msg || 'Failed to fetch user details';
      return rejectWithValue({ error: true, msg: message });
    }
  }
);

export const driverLoginAction = createAsyncThunk(
  "driverLoginAction",
  async function (credentials, { rejectWithValue }) {
    try {
      const response = await api.post('/api/auth/driver/login', credentials, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        },
      })
      return response.data
    } catch (error) {
      const message =
        error.response?.data?.msg || 'Failed to fetch user details';
      return rejectWithValue({ error: true, msg: message });
    }
  }
)

export const DriverMeAction = createAsyncThunk(
  "driverMeAction",
  async function (_, { rejectWithValue }) {
    try {
      const responce = await api.get('/api/driver/me', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
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

export const driverSignupAction = createAsyncThunk(
  "driverSignUp",
  async function (credentials, { rejectWithValue }) {
    try {
      const responce = await api.post('/api/auth/driver/signup',credentials , {
        withCredentials: true,
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


//return responce.data karvu

