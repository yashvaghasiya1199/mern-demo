import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../libs/axios";

export const rideFindAction = createAsyncThunk(
    '/api/ride/findride',
    async (credentials, { fulfillWithValue,rejectWithValue }) => {
        try {
            const response = await api.post('/api/ride/findride', credentials);
            return fulfillWithValue (response?.data)
        } catch (error) {
             return rejectWithValue(error.response?.data.msg|| "falid to find ride");
        }
    }
);

export const bookRideAction = createAsyncThunk(
    '/api/ride/create',
    async (credentials, { fulfillWithValue,rejectWithValue }) => {
        try {
            const response = await api.post('/api/ride/create', credentials);
            return fulfillWithValue (response?.data)
        } catch (error) {
             return rejectWithValue(error.response?.data.msg|| "falid to bokking ride");
        }
    }
);

export const paymentAction = createAsyncThunk(
    '/api/payment/pay/',
    async (credentials, { fulfillWithValue,rejectWithValue }) => {
        console.log(credentials);
        
        try {
            const response = await api.post(`/api/payment/pay/${credentials.ride_id}`, credentials);
            return fulfillWithValue (response?.data)
        } catch (error) {
             return rejectWithValue(error.response?.data.msg|| "falid to payment");
        }
    }
);

export const AllUserRidesAction = createAsyncThunk(
    '/api/ride/userallride',
    async (_, { fulfillWithValue,rejectWithValue }) => {
        
        try {
            const response = await api.get(`/api/ride/userallride`);
            return fulfillWithValue (response?.data)
        } catch (error) {
             return rejectWithValue(error.response?.data.msg|| "falid to fetch Rides");
        }
    }
);

export const userProfileAction = createAsyncThunk(
    '/api/user/me',
    async (_, { fulfillWithValue,rejectWithValue }) => {
        
        try {
            const response = await api.get(`/api/user/me`);
            return fulfillWithValue (response?.data)
        } catch (error) {
             return rejectWithValue(error.response?.data.msg|| "falid to fetch profile");
        }
    }
);

export const userProfileUpdateAction = createAsyncThunk(
    '/api/user/profile',
    async (credentials, { fulfillWithValue,rejectWithValue }) => {
        
        try {
            const response = await api.put(`/api/user/profile`,credentials);
            return fulfillWithValue (response?.data)
        } catch (error) {
             return rejectWithValue(error.response?.data.msg|| "falid to update profile");
        }
    }
);

export const userReviewAction = createAsyncThunk(
    '/api/review/postreview',
    async (credentials, { fulfillWithValue,rejectWithValue }) => {
        
        try {
            const response = await api.post(`/api/review/postreview`,credentials);
            return fulfillWithValue (response?.data)
        } catch (error) {
             return rejectWithValue(error.response?.data.msg|| "falid to post reviews");
        }
    }
);
