import { createSlice } from "@reduxjs/toolkit";
import {  addLocationAction,  documentUploadAction,  driverMeAction, imageUpdateAction } from "../actions/driver.action";

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
        builder.addCase(imageUpdateAction.pending,(state)=>{
            state.isPending=true
        })
        builder.addCase(imageUpdateAction.fulfilled,(state,action)=>{
            state.isPending = false
            state.isError =false
            state.message = action.payload
        })
        builder.addCase(imageUpdateAction.rejected,(state,action)=>{
            state.isError = true
            state.message = action.payload
            state.isPending = false
        })
        builder.addCase(documentUploadAction.pending,(state)=>{
            state.isPending=true
        })
        builder.addCase(documentUploadAction.fulfilled,(state,action)=>{
            state.isPending = false
            state.isError =false
            state.message = action.payload
        })
        builder.addCase(documentUploadAction.rejected,(state,action)=>{
            state.isError = true
            state.message = action.payload
            state.isPending = false
        })
    }
   
    
})

export const {driverLogins,driverLogout,driverDocument,messageClear} = driverSlice.actions

export default driverSlice.reducer

