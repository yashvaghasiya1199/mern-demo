import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../libs/axios";

export const getVehicleAction = createAsyncThunk(
    '/api/vehicle/alldata',
    async function (_,{fulfillWithValue,rejectWithValue}) {
        try {
            const response = await api.get('/api/vehicle/alldata')
            return fulfillWithValue (response?.data)
        } catch (error) {
      return rejectWithValue(error.response?.data.msg|| "falid to fetch vehicle");
        }
        
    }
)

export const addVehicleAction = createAsyncThunk(
    '/api/vehicle/addvehicle',
    async function (credentials,{fulfillWithValue,rejectWithValue}) {
        try {
            const response = await api.post('/api/vehicle/addvehicle', credentials )
            return fulfillWithValue (response?.data)
        } catch (error) {
      return rejectWithValue(error.response?.data.msg|| "falid to add vehicle");
        }
        
    }
)

export const deleteVehiclesAction = createAsyncThunk(
    '/api/vehicle/delete',
    async function (id,{fulfillWithValue,rejectWithValue}) {
        try {
            const response = await api.delete(`/api/vehicle/delete/${id}` )
            return fulfillWithValue (response?.data)
        } catch (error) {
      return rejectWithValue(error.response?.data.msg|| "falid to delete vehicle");
        }
        
    }
)

export const updateVehicleAction = createAsyncThunk(
    '/api/vehicle/updatevehicle/',
    async ({ id, credentials }, {fulfillWithValue, rejectWithValue }) => {
        try {
            const response = await api.put(`/api/vehicle/updatevehicle/${id}`, credentials);
            return fulfillWithValue (response?.data);
        }
        catch(error){
            return rejectWithValue(error.response?.data.msg|| "falid to update vehicle");

        }
    }
);
