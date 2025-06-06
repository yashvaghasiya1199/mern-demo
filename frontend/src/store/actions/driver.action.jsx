import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../libs/axios";

export const addLocationAction = createAsyncThunk(
    '/api/driver/addlocation',
    async function (credentials,{rejectWithValue}) {
        try {
            const response = await api.post('/api/driver/addlocation', credentials)
            return response.data
        } catch (error) {
            const message =
        error.response?.data?.msg || 'Failed to fetch user details';
      return rejectWithValue({ error: true, msg: message });
        }
        
    }
)

export const getDriverLocationsAction = createAsyncThunk(
    '/api/driver/alllocation',
    async function (_,{rejectWithValue}) {
        try {
            const response = await api.get('/api/driver/alllocation')
            return response.data
        } catch (error) {
            const message =
        error.response?.data?.msg || 'Failed to fetch user details';
      return rejectWithValue({ error: true, msg: message });
        }
        
    }
)

export const deleteDriverLocationAction = createAsyncThunk(
    '/api/driver/delete/location/',
    async function (credentials,{rejectWithValue}) {
        try {
            const response = await api.delete(`/api/driver/delete/location/${credentials}` )
            return response.data
        } catch (error) {
            const message =
        error.response?.data?.msg || 'Failed to fetch user details';
      return rejectWithValue({ error: true, msg: message });
        }
        
    }
)

export const getDriverReviewsAction = createAsyncThunk(
    '/api/driver/allreview',
    async function (_,{rejectWithValue}) {
        try {
            const response = await api.get('/api/driver/allreview' )
            return response.data
        } catch (error) {
            const message =
        error.response?.data?.msg || 'Failed to fetch user details';
      return rejectWithValue({ error: true, msg: message });
        }
        
    }
)

export const getVehicleAction = createAsyncThunk(
    '/api/vehicle/alldata',
    async function (_,{rejectWithValue}) {
        try {
            const response = await api.get('/api/vehicle/alldata')
            return response.data
        } catch (error) {
            const message =
        error.response?.data?.msg || 'Failed to fetch user details';
      return rejectWithValue({ error: true, msg: message });
        }
        
    }
)

export const addVehicleAction = createAsyncThunk(
    '/api/vehicle/addvehicle',
    async function (credentials,{rejectWithValue}) {
        try {
            const response = await api.post('/api/vehicle/addvehicle', credentials )
            return response.data
        } catch (error) {
            const message =
        error.response?.data?.msg || 'Failed to fetch user details';
      return rejectWithValue({ error: true, msg: message });
        }
        
    }
)

export const deleteVehiclesAction = createAsyncThunk(
    '/api/vehicle/delete',
    async function (id,{rejectWithValue}) {
        try {
            const response = await api.delete(`/api/vehicle/delete/${id}` )
            return response.data
        } catch (error) {
            const message =
        error.response?.data?.msg || 'Failed to fetch user details';
      return rejectWithValue({ error: true, msg: message });
        }
        
    }
)

export const updateVehicleAction = createAsyncThunk(
    '/api/vehicle/updatevehicle/',
    async ({ id, credentials }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/api/vehicle/updatevehicle/${id}`, credentials);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.msg || 'Failed to update vehicle';
            return rejectWithValue({ error: true, msg: message });
        }
    }
);

export const driverMeAction = createAsyncThunk(
    '/api/driver/me/d',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/api/driver/me');
            return response.data;
        } catch (error) {
            const message = error.response?.data?.msg || 'Failed to fetch profile';
            return rejectWithValue({ error: true, msg: message });
        }
    }
);

export const imageUpdateAction = createAsyncThunk(
    '/api/driver/profile-image',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await api.put('/api/driver/profile-image', credentials,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response.data;
        } catch (error) {
            const message = error.response?.data?.msg || 'Failed to update profile image';
            return rejectWithValue({ error: true, msg: message });
        }
    }
);

export const profileUpdateDriverAction = createAsyncThunk(
    '/api/driver/profile',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await api.put('/api/driver/profile', credentials);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.msg || 'Failed to update profile';
            return rejectWithValue({ error: true, msg: message });
        }
    }
);