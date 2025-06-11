import { createSlice } from "@reduxjs/toolkit";
import { bookRideAction, paymentAction, rideFindAction } from "../actions/ride.action";

const rideSlice = createSlice({
    name:'rideSlice',
    initialState: {
        isPending: false,
        message: '',
        isError: false,
    },
    reducers: {
        clearRidesData: (state) => {
            state.isPending = false;
            state.message = '';
            state.isError = false;
        },
    },

    extraReducers:(builder)=>{

         //  find ride
        builder.addCase(rideFindAction.pending,(state)=>{
            state.isPending =true
          }),
          builder.addCase(rideFindAction.fulfilled,(state,action)=>{
            state.isPending =false
            state.message = action.payload
          }),
          builder.addCase(rideFindAction.rejected,(state,action)=>{
            state.isPending = false
            state.isError=true
            state.message = action.payload
          })

          // book ride
          builder.addCase(bookRideAction.pending,(state)=>{
            state.isPending =true
          }),
          builder.addCase(bookRideAction.fulfilled,(state,action)=>{
            state.isPending =false
            state.message = action.payload
          }),
          builder.addCase(bookRideAction.rejected,(state,action)=>{
            state.isPending = false
            state.isError=true
            state.message = action.payload
          })

          //payment
          builder.addCase(paymentAction.pending,(state)=>{
            state.isPending =true
          }),
          builder.addCase(paymentAction.fulfilled,(state,action)=>{
            state.isPending =false
            state.message = action.payload
          }),
          builder.addCase(paymentAction.rejected,(state,action)=>{
            state.isError=true
            state.message = action.payload
          })
    }
})

export const {clearRidesData}= rideSlice.actions

export default rideSlice.reducer