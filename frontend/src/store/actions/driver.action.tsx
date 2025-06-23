import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../libs/axios";

export const addLocationAction = createAsyncThunk(
    '/api/driver/addlocation',
    async function (credentials,{fulfillWithValue,rejectWithValue}) {
        try {
            const response = await api.post('/api/driver/addlocation', credentials)
            return fulfillWithValue (response?.data)
        } catch (error) {
      return rejectWithValue(error.response?.data.msg|| "falid to add location");
        }
        
    }
)

export const getDriverLocationsAction = createAsyncThunk(
    '/api/driver/alllocation',
    async function (_,{fulfillWithValue,rejectWithValue}) {
        try {
            const response = await api.get('/api/driver/alllocation')
            return fulfillWithValue (response?.data)
        } catch (error) {
      return rejectWithValue(error.response?.data.msg|| "falid to get location");
        }
        
    }
)

export const deleteDriverLocationAction = createAsyncThunk(
    '/api/driver/delete/location/',
    async function (credentials,{fulfillWithValue,rejectWithValue}) {
        try {
            const response = await api.delete(`/api/driver/delete/location/${credentials}` )
            return fulfillWithValue (response?.data)
        } catch (error) {
      return rejectWithValue(error.response?.data.msg|| "falid to delete location");
        }
        
    }
)

export const getDriverReviewsAction = createAsyncThunk(
    '/api/driver/allreview',
    async function (_,{fulfillWithValue,rejectWithValue}) {
        try {
            const response = await api.get('/api/driver/allreview' )
            return fulfillWithValue (response?.data)
        } catch (error) {
      return rejectWithValue(error.response?.data.msg|| "falid to fetch review ");
        }
        
    }
)

export const driverMeAction = createAsyncThunk(
    '/api/driver/me/d',
    async (_, { fulfillWithValue,rejectWithValue }) => {
        try {
            const response = await api.get('/api/driver/me');
            return fulfillWithValue (response?.data);
        }
        catch(error){
            return rejectWithValue(error.response?.data.msg|| "falid to fetch profile");
        }
    }
);

export const imageUpdateAction = createAsyncThunk(
    '/api/driver/profile-image',
    async (credentials, { fulfillWithValue,rejectWithValue }) => {
        try {
            const response = await api.put('/api/driver/profile-image', credentials,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return fulfillWithValue (response?.data);
        }
        catch(error){
            return rejectWithValue(error.response?.data|| "falid to update iprofile image");
        }
    }
);

export const profileUpdateDriverAction = createAsyncThunk(
    '/api/driver/profile',
    async (credentials, { fulfillWithValue,rejectWithValue }) => {
        try {
            const response = await api.put('/api/driver/profile', credentials);
            return fulfillWithValue (response?.data);
        }
        catch(error){
            return rejectWithValue(error.response?.data.msg|| "falid to update driver profiles");
       
        }
    }
);

export const documentUploadAction = createAsyncThunk(
    "/api/driver/adddocument",
    async (credentials, { fulfillWithValue, rejectWithValue }) => {
      try {
        const response = await api.post("/api/driver/adddocument", credentials, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        return fulfillWithValue(response?.data);
      } catch (error) {
        console.log(error);
        
        return rejectWithValue(
          error.response?.data.msg || "Failed to add driver documents"
        );
      }
    }
  );
  