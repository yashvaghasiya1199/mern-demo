import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axios/axios";

export const driverLocationAction = createAsyncThunk(
    'driverLocationAction',
    async function (credentials,{rejectWithValue}) {
        try {
            const responce = await api.post('/api/driver/addlocation', credentials,{
                withCredentials:true,
                headers:{
                    'Content-Type':'application/json'
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

export const driverGetLocationAction = createAsyncThunk(
    'driverGetLocationAction',
    async function (_,{rejectWithValue}) {
        try {
            const responce = await api.get('/api/driver/alllocation',{
                withCredentials:true,
                headers:{
                    'Content-Type':'application/json'
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

export const driverDeleteLocationAction = createAsyncThunk(
    'driverDeleteLocationAction',
    async function (credentials,{rejectWithValue}) {
        try {
            const responce = await api.delete(`/api/driver/delete/location/${credentials}` ,{
                withCredentials:true,
                headers:{
                    'Content-Type':'application/json'
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

export const driverGetReviewsAction = createAsyncThunk(
    'driverDeleteLocationAction',
    async function (_,{rejectWithValue}) {
        try {
            const responce = await api.get('/api/driver/allreview' ,{
                withCredentials:true,
                headers:{
                    'Content-Type':'application/json'
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

export const driverGetVehiclesAction = createAsyncThunk(
    'driverGetVehiclesAction',
    async function (_,{rejectWithValue}) {
        try {
            const responce = await api.get('/api/vehicle/alldata',{
                withCredentials:true,
                headers:{
                    'Content-Type':'application/json'
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

export const driverAddVehiclesAction = createAsyncThunk(
    'driverAddVehiclesAction',
    async function (credentials,{rejectWithValue}) {
        try {
            const responce = await api.post('/api/vehicle/addvehicle', credentials ,{
                withCredentials:true,
                headers:{
                    'Content-Type':'application/json'
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

export const driverDeleteVehiclesAction = createAsyncThunk(
    'driverDeleteVehiclesAction',
    async function (id,{rejectWithValue}) {
        try {
            const responce = await api.delete(`/api/vehicle/delete/${id}` ,{
                withCredentials:true,
                headers:{
                    'Content-Type':'application/json'
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

// export const driverUpdateVehiclesAction = createAsyncThunk(
//     'driverUpdateVehiclesAction',
//     async function ({id,credentials},{rejectWithValue}) {
//         try {
//             const responce = await api.put(`/api/vehicle/updatevehicle/${id}` , credentials ,{
//                 withCredentials:true,
//                 headers:{
//                     'Content-Type':'application/json'
//                 }
//             })
//             return responce.data
//         } catch (error) {
//             const message =
//         error.response?.data?.msg || 'Failed to fetch user details';
//       return rejectWithValue({ error: true, msg: message });
//         }
        
//     }
// )

export const driverUpdateVehiclesAction = createAsyncThunk(
    'driverUpdateVehiclesAction',
    async ({ id, credentials }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/api/vehicle/updatevehicle/${id}`, credentials, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            const message = error.response?.data?.msg || 'Failed to update vehicle';
            return rejectWithValue({ error: true, msg: message });
        }
    }
);
