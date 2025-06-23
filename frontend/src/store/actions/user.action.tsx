import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../libs/axios";

export const userProfileAction = createAsyncThunk(
    '/api/user/me',
    async (_, { fulfillWithValue,rejectWithValue }) => {
        
        try {
            const response = await api.get(`/api/user/me`);
            return fulfillWithValue (response?.data)
        } catch (error:any) {
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
        } catch (error:any) {
             return rejectWithValue(error.response?.data.msg|| "falid to update profile");
        }
    }
);


