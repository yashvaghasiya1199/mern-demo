import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userProfileUpdateAction } from "../actions/user.action";

interface IUserState {
    userLogin: boolean;
    userMessage: string | null;
    rideinformation: any; 
    userPending: boolean | null;
    userError: boolean | null;
}

const initialState: IUserState = {
    userLogin: false,
    userMessage: null,
    rideinformation: null,
    userPending: null,
    userError: null
};

const userSlice = createSlice({
    name: "userslice",
    initialState,
    reducers: {
        userlogin: (state) => {
            state.userLogin = true;
        },
        userlogout: (state) => {
            state.userLogin = false;
        },
        ridedata: (state, action: PayloadAction<any>) => {
            state.rideinformation = action.payload;
        },
        clearUserData: (state) => {
            state.userError = false;
            state.userMessage = null;
        }
    },
    extraReducers: (builder) => {
        // user profile update
        builder.addCase(userProfileUpdateAction.pending, (state) => {
            state.userPending = true;
        });
        builder.addCase(userProfileUpdateAction.fulfilled, (state, action: PayloadAction<string>) => {
            state.userPending = false;
            state.userMessage = action.payload;
        });
        builder.addCase(userProfileUpdateAction.rejected, (state, action: PayloadAction<any>) => {
            state.userError = true;
            state.userMessage = action.payload.message || "An error occurred";
        });
    }
});

export const { userlogin, userlogout, ridedata, clearUserData } = userSlice.actions;

export default userSlice.reducer;
