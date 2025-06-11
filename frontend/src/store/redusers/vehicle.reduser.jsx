import { createSlice } from "@reduxjs/toolkit";
import { addVehicleAction, deleteVehiclesAction, updateVehicleAction } from "../actions/vehicle.action";

const vehicleSlice = createSlice({
    name: "vehicle",
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
    extraReducers: (builder) => {
        builder.addCase(addVehicleAction.pending, (state) => {
            state.isPending = true
        })
        builder.addCase(addVehicleAction.fulfilled, (state, action) => {
            state.isPending = false
            state.message = action.payload
        })
        builder.addCase(addVehicleAction.rejected, (state, action) => {
            state.isPending = false
            state.isError = true
            state.message = action.payload
        })
        builder.addCase(deleteVehiclesAction.pending, (state) => {
            state.isPending = true
        })
        builder.addCase(deleteVehiclesAction.fulfilled, (state, action) => {
            state.isPending = false
            state.message = action.payload
        })
        builder.addCase(deleteVehiclesAction.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
            state.isPending = false
        })
        builder.addCase(updateVehicleAction.pending, (state) => {
            state.isPending = true
        })
        builder.addCase(updateVehicleAction.fulfilled, (state, action) => {
            state.isPending = false
            state.message = action.payload
        })
        builder.addCase(updateVehicleAction.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
            state.isPending = false
        })

    }
})

export default vehicleSlice.reducer