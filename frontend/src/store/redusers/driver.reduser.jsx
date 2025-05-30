import { createSlice } from "@reduxjs/toolkit";
import { driverLoginAction, DriverMeAction, driverSignupAction } from "../actions/auth.action";
import { driverAddVehiclesAction, driverDeleteVehiclesAction, driverGetLocationAction, driverGetReviewsAction, driverGetVehiclesAction, driverLocationAction, driverUpdateVehiclesAction } from "../actions/driver.action";

const driverSlice = createSlice({
    name:"driver",
    initialState:{
        driverLogin:false,
        driverDocument:false,
        driverInformation:[],
        isPending:null,
        message:[],
        isError:null
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
    },
    extraReducers:(builder)=>{
        builder.addCase(driverLoginAction.pending,(state,action)=>{
            state.isPending=true
        })
        builder.addCase(driverLoginAction.fulfilled,(state,action)=>{
            state.isPending=false,
            state.message=action.payload
        })
        builder.addCase(driverLoginAction.rejected,(state,action)=>{
            state.isError=true
            state.message=action.payload
        })
        builder.addCase(DriverMeAction.pending,(state,action)=>{
            state.isPending=true
        })
        builder.addCase(DriverMeAction.fulfilled,(state,action)=>{
            state.isPending=false,
            state.driverInformation=action.payload
        })
        builder.addCase(DriverMeAction.rejected,(state,action)=>{
            state.isError=true
            state.message=action.payload
        })      
        builder.addCase(driverSignupAction.pending,(state,action)=>{
            state.isPending=true
        })
        builder.addCase(driverSignupAction.fulfilled,(state,action)=>{
            state.isPending=false,
            state.message=action.payload
        })
        builder.addCase(driverSignupAction.rejected,(state,action)=>{
            state.isError=true
            state.message=action.payload
        })   
        builder.addCase(driverLocationAction.pending,(state,action)=>{
            state.isPending=true
        })
        builder.addCase(driverLocationAction.fulfilled,(state,action)=>{
            state.isPending=false,
            state.message=action.payload
        })
        builder.addCase(driverLocationAction.rejected,(state,action)=>{
            state.isError=true
            state.message=action.payload
        })       
        builder.addCase(driverGetLocationAction.pending,(state,action)=>{
            state.isPending=true
        })
        builder.addCase(driverGetLocationAction.fulfilled,(state,action)=>{
            state.isPending = false
            state.message = action.payload
        })
        builder.addCase(driverGetLocationAction.rejected,(state)=>{
            state.isError = true
        })
        builder.addCase(driverGetReviewsAction.pending,(state,action)=>{
            state.isPending=true
        })
        builder.addCase(driverGetReviewsAction.fulfilled,(state,action)=>{
            state.isPending = false
            state.message = action.payload
        })
        builder.addCase(driverGetReviewsAction.rejected,(state,action)=>{
            state.isError = true
            state.message = action.payload
        })
        builder.addCase(driverGetVehiclesAction.pending,(state,action)=>{
            state.isPending=true
        })
        builder.addCase(driverGetVehiclesAction.fulfilled,(state,action)=>{
            state.isPending = false
            state.message = action.payload
        })
        builder.addCase(driverGetVehiclesAction.rejected,(state,action)=>{
            state.isError = true
            state.message = action.payload
        })
        builder.addCase(driverAddVehiclesAction.pending,(state,action)=>{
            state.isPending=true
        })
        builder.addCase(driverAddVehiclesAction.fulfilled,(state,action)=>{
            state.isPending = false
            state.message = action.payload
        })
        builder.addCase(driverAddVehiclesAction.rejected,(state,action)=>{
            state.isError = true
            state.message = action.payload
        })
        builder.addCase(driverDeleteVehiclesAction.pending,(state,action)=>{
            state.isPending=true
        })
        builder.addCase(driverDeleteVehiclesAction.fulfilled,(state,action)=>{
            state.isPending = false
            state.message = action.payload
        })
        builder.addCase(driverDeleteVehiclesAction.rejected,(state,action)=>{
            state.isError = true
            state.message = action.payload
        })
        builder.addCase(driverUpdateVehiclesAction.pending,(state,action)=>{
            state.isPending=true
        })
        builder.addCase(driverUpdateVehiclesAction.fulfilled,(state,action)=>{
            state.isPending = false
            state.message = action.payload
        })
        builder.addCase(driverUpdateVehiclesAction.rejected,(state,action)=>{
            state.isError = true
            state.message = action.payload
        })
    }
   
    
})

export const {driverLogins,driverLogout,driverDocument} = driverSlice.actions

export default driverSlice.reducer
