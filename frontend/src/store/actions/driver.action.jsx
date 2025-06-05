import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../libs/axios";

export const addLocationAction = createAsyncThunk(
    'driver/location',
    async function (credentials,{rejectWithValue}) {
        try {
            const responce = await api.post('/api/driver/addlocation', credentials)
            return responce.data
        } catch (error) {
            const message =
        error.response?.data?.msg || 'Failed to fetch user details';
      return rejectWithValue({ error: true, msg: message });
        }
        
    }
)

export const getDriverLocations = createAsyncThunk(
    'driver/getLocation',
    async function (_,{rejectWithValue}) {
        try {
            const responce = await api.get('/api/driver/alllocation')
            return responce.data
        } catch (error) {
            const message =
        error.response?.data?.msg || 'Failed to fetch user details';
      return rejectWithValue({ error: true, msg: message });
        }
        
    }
)

export const deleteDriverLocation = createAsyncThunk(
    'driver/DeleteLocation',
    async function (credentials,{rejectWithValue}) {
        try {
            const responce = await api.delete(`/api/driver/delete/location/${credentials}` )
            return responce.data
        } catch (error) {
            const message =
        error.response?.data?.msg || 'Failed to fetch user details';
      return rejectWithValue({ error: true, msg: message });
        }
        
    }
)

export const getDriverReviews = createAsyncThunk(
    'driver/review',
    async function (_,{rejectWithValue}) {
        try {
            const responce = await api.get('/api/driver/allreview' )
            return responce.data
        } catch (error) {
            const message =
        error.response?.data?.msg || 'Failed to fetch user details';
      return rejectWithValue({ error: true, msg: message });
        }
        
    }
)

export const driverGetVehiclesAction = createAsyncThunk(
    'driver/getVehicles',
    async function (_,{rejectWithValue}) {
        try {
            const responce = await api.get('/api/vehicle/alldata')
            return responce.data
        } catch (error) {
            const message =
        error.response?.data?.msg || 'Failed to fetch user details';
      return rejectWithValue({ error: true, msg: message });
        }
        
    }
)

export const driverAddVehiclesAction = createAsyncThunk(
    'driver/addVehicles',
    async function (credentials,{rejectWithValue}) {
        try {
            const responce = await api.post('/api/vehicle/addvehicle', credentials )
            return responce.data
        } catch (error) {
            const message =
        error.response?.data?.msg || 'Failed to fetch user details';
      return rejectWithValue({ error: true, msg: message });
        }
        
    }
)

export const driverDeleteVehiclesAction = createAsyncThunk(
    'driver/deleteVehicles',
    async function (id,{rejectWithValue}) {
        try {
            const responce = await api.delete(`/api/vehicle/delete/${id}` )
            return responce.data
        } catch (error) {
            const message =
        error.response?.data?.msg || 'Failed to fetch user details';
      return rejectWithValue({ error: true, msg: message });
        }
        
    }
)

export const driverUpdateVehiclesAction = createAsyncThunk(
    'driver/updateVehicles',
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
    'driver/Mes',
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

export const driverImageUpdateAction = createAsyncThunk(
    'driver/ImageUpdate',
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

export const driverProfileUpdateAction = createAsyncThunk(
    'driver/profileUpdate',
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