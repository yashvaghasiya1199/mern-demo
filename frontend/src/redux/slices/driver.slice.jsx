import { createSlice } from "@reduxjs/toolkit";

const driverSlice = createSlice({
    name:"driver",
    initialState:{
        driverLogin:false,
        driverDocument:false
    },
    reducers:{
        driverLogins:(state)=>{
         state.driverLogin = true
        },
        driverLogout:(state)=>{
            state.driverLogin = false
        },
        driverDocument:(state)=>{
            state.driverDocument = true
        }
    }
})

export const {driverLogins,driverLogout,driverDocument} = driverSlice.actions

export default driverSlice.reducer