import { createSlice } from "@reduxjs/toolkit";
import { driverForgotPasswordAction, driverLoginAction,driverResetPasswordAction,driverSignupAction } from "../actions/auth.action";
import {  addLocationAction, driverAddVehiclesAction, driverDeleteVehiclesAction, driverMeAction, driverUpdateVehiclesAction } from "../actions/driver.action";

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
        builder.addCase(driverLoginAction.pending,(state)=>{
            state.isPending=true
        })
        builder.addCase(driverLoginAction.fulfilled,(state,action)=>{
            state.isPending=false,
            state.message=action.payload
        })
        builder.addCase(driverLoginAction.rejected,(state,action)=>{
            state.isError=true
            state.message=action.payload
            state.isPending = false
        })
        builder.addCase(driverSignupAction.pending,(state)=>{
            state.isPending=true
        })
        builder.addCase(driverSignupAction.fulfilled,(state,action)=>{
            state.isPending=false,
            state.message=action.payload
        })
        builder.addCase(driverSignupAction.rejected,(state,action)=>{
            state.isError=true
            state.message=action.payload
            state.isPending = false
        })   
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
        builder.addCase(driverAddVehiclesAction.pending,(state)=>{
            state.isPending=true
        })
        builder.addCase(driverAddVehiclesAction.fulfilled,(state,action)=>{
            state.isPending = false
            state.message = action.payload
        })
        builder.addCase(driverAddVehiclesAction.rejected,(state,action)=>{
            state.isPending = false
            state.isError = true
            state.message = action.payload
        })
        builder.addCase(driverDeleteVehiclesAction.pending,(state)=>{
            state.isPending=true
        })
        builder.addCase(driverDeleteVehiclesAction.fulfilled,(state,action)=>{
            state.isPending = false
            state.message = action.payload
        })
        builder.addCase(driverDeleteVehiclesAction.rejected,(state,action)=>{
            state.isError = true
            state.message = action.payload
            state.isPending = false
        })
        builder.addCase(driverUpdateVehiclesAction.pending,(state)=>{
            state.isPending=true
        })
        builder.addCase(driverUpdateVehiclesAction.fulfilled,(state,action)=>{
            state.isPending = false
            state.message = action.payload
        })
        builder.addCase(driverUpdateVehiclesAction.rejected,(state,action)=>{
            state.isError = true
            state.message = action.payload
            state.isPending = false
        })
        builder.addCase(driverForgotPasswordAction.pending,(state)=>{
            state.isPending=true
            state.isError=false
        })
        builder.addCase(driverForgotPasswordAction.fulfilled,(state,action)=>{
            state.isPending = false
            state.message = action.payload
            state.isError=false
        })
        builder.addCase(driverForgotPasswordAction.rejected,(state,action)=>{
            state.message = action.payload 
            state.isError = true
            state.isPending = false
        })
        builder.addCase(driverResetPasswordAction.pending,(state)=>{
            state.isPending=true
        })
        builder.addCase(driverResetPasswordAction.fulfilled,(state,action)=>{
            state.isPending = false
            state.message = action.payload
        })
        builder.addCase(driverResetPasswordAction.rejected,(state,action)=>{
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


