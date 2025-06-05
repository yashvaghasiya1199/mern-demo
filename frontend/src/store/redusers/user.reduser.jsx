import { createSlice } from "@reduxjs/toolkit";
import { userForgotPasswordAction, userLoginAction, userMeAction, userResetPasswordAction, userSignupAction } from "../actions/auth.action";
import { bookRideAction, findRideAction, paymentAction, userAllRidesAction, userProfileAction, userProfileUpdateAction } from "../actions/user.action";

const userSlice = createSlice({
    name: "userslice",
    initialState: {
        userLogin:false,
        userMessage:[],
        rideinformation:null,
        userPending:null,
        userMessage:[],
        userError:null
    },
    reducers: {
     userlogin:(state)=>{
        state.userLogin=true
     },
    userlogout:(state)=>{
       state.userLogin=false
    },
    ridedata:(state,action)=>{
      state.rideinformation = action.payload
    },
    clearUserData:(state)=>{
      state.userError = false
      state.userMessage = []
    }
    },
    extraReducers: (builder)=>{
      builder.addCase(userLoginAction.pending ,(state)=>{
        state.userPending =true
      }),
      builder.addCase(userLoginAction.fulfilled , (state,action)=>{
        state.userPending  = false,
        state.userMessage = action.payload
      }),
      builder.addCase(userLoginAction.rejected,(state,action)=>{
        state.userError =true,
        state.userMessage=action.payload,
        state.userPending = false
      })

      //user signup
      builder.addCase(userSignupAction.pending,(state)=>{
        state.userPending =true
      }),
      builder.addCase(userSignupAction.fulfilled,(state,action)=>{
        state.userPending =false
        state.userMessage = action.payload
      }),
      builder.addCase(userSignupAction.rejected,(state,action)=>{
        state.userError=true
        state.userMessage = action.payload
      })
      builder.addCase(findRideAction.pending,(state)=>{
        state.userPending =true
      }),
      builder.addCase(findRideAction.fulfilled,(state,action)=>{
        state.userPending =false
        state.userMessage = action.payload
      }),
      builder.addCase(findRideAction.rejected,(state,action)=>{
        state.userError=true
        state.userMessage = action.payload
      })
      builder.addCase(bookRideAction.pending,(state)=>{
        state.userPending =true
      }),
      builder.addCase(bookRideAction.fulfilled,(state,action)=>{
        state.userPending =false
        state.userMessage = action.payload
      }),
      builder.addCase(bookRideAction.rejected,(state,action)=>{
        state.userError=true
        state.userMessage = action.payload
      })
      builder.addCase(paymentAction.pending,(state)=>{
        state.userPending =true
      }),
      builder.addCase(paymentAction.fulfilled,(state,action)=>{
        state.userPending =false
        state.userMessage = action.payload
      }),
      builder.addCase(paymentAction.rejected,(state,action)=>{
        state.userError=true
        state.userMessage = action.payload
      })

      builder.addCase(userProfileUpdateAction.pending,(state)=>{
        state.userPending =true
      }),
      builder.addCase(userProfileUpdateAction.fulfilled,(state,action)=>{
        state.userPending =false
        state.userMessage = action.payload
      })
      builder.addCase(userProfileUpdateAction.rejected,(state,action)=>{
        state.userError=true
        state.userMessage = action.payload
      })
      builder.addCase(userForgotPasswordAction.pending,(state)=>{
        state.userPending =true
      }),
      builder.addCase(userForgotPasswordAction.fulfilled,(state,action)=>{
        state.userPending =false
        state.userMessage = action.payload
      }),
      builder.addCase(userForgotPasswordAction.rejected,(state,action)=>{
        state.userPending=false
        state.userMessage = action.payload
        state.userError=true
      })
      builder.addCase(userResetPasswordAction.pending,(state)=>{
        state.userPending =true
      }),
      builder.addCase(userResetPasswordAction.fulfilled,(state,action)=>{
        state.userPending =false
        state.userMessage = action.payload
      }),
      builder.addCase(userResetPasswordAction.rejected,(state,action)=>{
        state.userPending=false
        state.userMessage = action.payload
        state.userError=true
      })
    
    }
});

export const {userlogin,userlogout,ridedata,clearUserData} = userSlice.actions

export default userSlice.reducer;



