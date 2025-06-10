import { createSlice } from "@reduxjs/toolkit";
import {  addLocationAction, addVehicleAction, deleteVehiclesAction, driverMeAction, updateVehicleAction } from "../actions/driver.action";

const driverSlice = createSlice({
    name:"driver",
    initialState:{
        driverLogin:false,
        driverInformation:[],
        isPending:false,
        message:[],
        isError:false
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
        },
        messageClear:(state)=>{
            state.isError=false
            state.message=[]
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(addLocationAction.pending,(state)=>{
            state.isPending=true
        })
        builder.addCase(addLocationAction.fulfilled,(state,action)=>{
            state.isPending=false,
            state.message=action.payload
        })
        builder.addCase(addLocationAction.rejected,(state,action)=>{
            state.isError=true
            state.message=action.payload
            state.isPending = false
        })       
        builder.addCase(addVehicleAction.pending,(state)=>{
            state.isPending=true
        })
        builder.addCase(addVehicleAction.fulfilled,(state,action)=>{
            state.isPending = false
            state.message = action.payload
        })
        builder.addCase(addVehicleAction.rejected,(state,action)=>{
            state.isPending = false
            state.isError = true
            state.message = action.payload
        })
        builder.addCase(deleteVehiclesAction.pending,(state)=>{
            state.isPending=true
        })
        builder.addCase(deleteVehiclesAction.fulfilled,(state,action)=>{
            state.isPending = false
            state.message = action.payload
        })
        builder.addCase(deleteVehiclesAction.rejected,(state,action)=>{
            state.isError = true
            state.message = action.payload
            state.isPending = false
        })
        builder.addCase(updateVehicleAction.pending,(state)=>{
            state.isPending=true
        })
        builder.addCase(updateVehicleAction.fulfilled,(state,action)=>{
            state.isPending = false
            state.message = action.payload
        })
        builder.addCase(updateVehicleAction.rejected,(state,action)=>{
            state.isError = true
            state.message = action.payload
            state.isPending = false
        })
     
        builder.addCase(driverMeAction.pending,(state)=>{
            state.isPending=true
        })
        builder.addCase(driverMeAction.fulfilled,(state,action)=>{
            state.isPending = false
            state.message = action.payload
        })
        builder.addCase(driverMeAction.rejected,(state,action)=>{
            state.isError = true
            state.message = action.payload
            state.isPending = false
        })
        
    }
   
    
})

export const {driverLogins,driverLogout,driverDocument,messageClear} = driverSlice.actions

export default driverSlice.reducer

