import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../libs/axios";

export const rideFindAction = createAsyncThunk(
    '/api/ride/findride',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/ride/findride', credentials);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.msg || 'Failed to find ride';
            return rejectWithValue({ error: true, msg: message });
        }
    }
);

export const bookRideAction = createAsyncThunk(
    '/api/ride/create',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/ride/create', credentials);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.msg || 'Failed to book ride';
            return rejectWithValue({ error: true, msg: message });
        }
    }
);

export const paymentAction = createAsyncThunk(
    '/api/payment/pay/',
    async (credentials, { rejectWithValue }) => {
        console.log(credentials);
        
        try {
            const response = await api.post(`/api/payment/pay/${credentials.ride_id}`, credentials);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.msg || 'Failed to payment';
            return rejectWithValue({ error: true, msg: message });
        }
    }
);

export const AllUserRidesAction = createAsyncThunk(
    '/api/ride/userallride',
    async (_, { rejectWithValue }) => {
        
        try {
            const response = await api.get(`/api/ride/userallride`);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.msg || 'Failed to fetch all rides';
            return rejectWithValue({ error: true, msg: message });
        }
    }
);

export const userProfileAction = createAsyncThunk(
    '/api/user/me',
    async (_, { rejectWithValue }) => {
        
        try {
            const response = await api.get(`/api/user/me`);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.msg || 'Failed to fetch user data';
            return rejectWithValue({ error: true, msg: message });
        }
    }
);

export const userProfileUpdateAction = createAsyncThunk(
    '/api/user/profile',
    async (credentials, { rejectWithValue }) => {
        
        try {
            const response = await api.put(`/api/user/profile`,credentials);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.msg || 'Failed to fetch user data';
            return rejectWithValue({ error: true, msg: message });
        }
    }
);

export const userReviewAction = createAsyncThunk(
    '/api/review/postreview',
    async (credentials, { rejectWithValue }) => {
        
        try {
            const response = await api.post(`/api/review/postreview`,credentials);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.msg || 'Failed to fetch user data';
            return rejectWithValue({ error: true, msg: message });
        }
    }
);
