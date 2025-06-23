import { createSlice } from "@reduxjs/toolkit";
import {
    driverForgotPasswordAction,
    driverLoginAction,
    driverResetPasswordAction,
    driverSignupAction,
    userForgotPasswordAction,
    userLoginAction,
    userResetPasswordAction,
    userSignupAction,
} from "../actions/auth.action";


const authSlice = createSlice({
    name: "authslice",
    initialState: {
        driverLogin: false,
        userLogin: false,
        isPending: false,
        message: '',
        isError: false,
    },
    reducers: {
        clearAuthData: (state) => {
            state.isPending = false;
            state.message = '';
            state.isError = false;
        },
    },
    extraReducers: (builder) => {
        //  Driver Login
        builder.addCase(driverLoginAction.pending, (state) => {
            state.isPending = true;
        });
        builder.addCase(driverLoginAction.fulfilled, (state, action) => {
            state.isError = false
            state.isPending = false;
            state.message = action.payload || "driver login";
        });
        builder.addCase(driverLoginAction.rejected, (state, action) => {
            state.isPending = false;
            state.isError = true;
            state.message = action.payload;
        });

        //  Driver Signup
        builder.addCase(driverSignupAction.pending, (state) => {
            state.isPending = true;
        });
        builder.addCase(driverSignupAction.fulfilled, (state, action) => {
            state.isError = false
            state.isPending = false;
            state.message = action.payload;
        });
        builder.addCase(driverSignupAction.rejected, (state, action) => {
            state.isError = true;
            state.message = action.payload;
            state.isPending = false;
        });

        // User Login
        builder.addCase(userLoginAction.pending, (state) => {
            state.isPending = true;
        });
        builder.addCase(userLoginAction.fulfilled, (state, action) => {
            state.isPending = false;
            state.isError = false
            state.message = action.payload;
        });
        builder.addCase(userLoginAction.rejected, (state, action) => {
            state.isError = true;
            state.message = action.payload;
            state.isPending = false;
        });

        //  Driver Forgot Password
        builder.addCase(driverForgotPasswordAction.pending, (state) => {
            state.isPending = true;
            state.isError = false;
        });
        builder.addCase(driverForgotPasswordAction.fulfilled, (state, action) => {
            state.isPending = false;
            state.message = action.payload;
            state.isError = false;
        });
        builder.addCase(driverForgotPasswordAction.rejected, (state, action) => {
            state.message = action.payload;
            state.isError = true;
            state.isPending = false;
        });

        //  Driver Reset Password
        builder.addCase(driverResetPasswordAction.pending, (state) => {
            state.isPending = true;
        });
        builder.addCase(driverResetPasswordAction.fulfilled, (state, action) => {
            state.isError = false
            state.isPending = false;
            state.message = action.payload;
        });
        builder.addCase(driverResetPasswordAction.rejected, (state, action) => {
            state.isError = true;
            state.message = action.payload;
            state.isPending = false;
        });

        // User Signup
        builder.addCase(userSignupAction.pending, (state) => {
            state.isPending = true;
        });
        builder.addCase(userSignupAction.fulfilled, (state, action) => {
            state.isError = false
            state.isPending = false;
            state.message = action.payload;
        });
        builder.addCase(userSignupAction.rejected, (state, action) => {
            state.isPending = false;
            state.isError = true;
            state.message = action.payload;
        });

        // User Forgot Password
        builder.addCase(userForgotPasswordAction.pending, (state) => {
            state.isPending = true;
        });
        builder.addCase(userForgotPasswordAction.fulfilled, (state, action) => {
            state.isError = false
            state.isPending = false;
            state.message = action.payload;
        });
        builder.addCase(userForgotPasswordAction.rejected, (state, action) => {
            state.isPending = false;
            state.message = action.payload;
            state.isError = true;
        });

        // User Reset Password
        builder.addCase(userResetPasswordAction.pending, (state) => {
            state.isPending = true;
        });
        builder.addCase(userResetPasswordAction.fulfilled, (state, action) => {
            state.isError = false
            state.isPending = false;
            state.message = action.payload;
        });
        builder.addCase(userResetPasswordAction.rejected, (state, action) => {
            state.isPending = false;
            state.message = action.payload;
            state.isError = true;
        });
    },
});

export default authSlice.reducer;
export const { clearAuthData } = authSlice.actions;
