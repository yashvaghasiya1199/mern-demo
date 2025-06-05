import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../libs/axios";

export const findRideAction = createAsyncThunk(
    'find/ride',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/ride/findride', credentials,{
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            const message = error.response?.data?.msg || 'Failed to find ride';
            return rejectWithValue({ error: true, msg: message });
        }
    }
);

export const bookRideAction = createAsyncThunk(
    'book/Ride',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/ride/create', credentials,{
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            const message = error.response?.data?.msg || 'Failed to book ride';
            return rejectWithValue({ error: true, msg: message });
        }
    }
);

export const paymentAction = createAsyncThunk(
    'paymentAction',
    async (credentials, { rejectWithValue }) => {
        console.log(credentials);
        
        try {
            const response = await api.post(`/api/payment/pay/${credentials.ride_id}`, credentials,{
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            const message = error.response?.data?.msg || 'Failed to payment';
            return rejectWithValue({ error: true, msg: message });
        }
    }
);

export const userAllRidesAction = createAsyncThunk(
    'userAllRides',
    async (_, { rejectWithValue }) => {
        
        try {
            const response = await api.get(`/api/ride/userallride`,{
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            const message = error.response?.data?.msg || 'Failed to fetch all rides';
            return rejectWithValue({ error: true, msg: message });
        }
    }
);

export const userProfileAction = createAsyncThunk(
    'userProfileAction',
    async (_, { rejectWithValue }) => {
        
        try {
            const response = await api.get(`/api/user/me`,{
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            const message = error.response?.data?.msg || 'Failed to fetch user data';
            return rejectWithValue({ error: true, msg: message });
        }
    }
);

export const userProfileUpdateAction = createAsyncThunk(
    'userProfileUpdateAction',
    async (credentials, { rejectWithValue }) => {
        
        try {
            const response = await api.put(`/api/user/profile`,credentials,{
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            const message = error.response?.data?.msg || 'Failed to fetch user data';
            return rejectWithValue({ error: true, msg: message });
        }
    }
);

export const userReviewAction = createAsyncThunk(
    'userProfileUpdateAction',
    async (credentials, { rejectWithValue }) => {
        
        try {
            const response = await api.post(`/api/review/postreview`,credentials,{
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            const message = error.response?.data?.msg || 'Failed to fetch user data';
            return rejectWithValue({ error: true, msg: message });
        }
    }
);
