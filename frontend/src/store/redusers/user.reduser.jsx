import { createSlice } from "@reduxjs/toolkit";
import { userForgotPasswordAction, userLoginAction, userMeAction, userResetPasswordAction, userSignupAction } from "../actions/auth.action";
import { bookRideAction, findRideAction, paymentAction, userAllRidesAction, userProfileAction, userProfileUpdateAction } from "../actions/user.action";

const userSlice = createSlice({
    name: "userslice",
    initialState: {
        userLogin:false,
        userInformation:[],
        rideinformation:null,
        userPending:null,
        message:[],
        userError:null
    },
    reducers: {
     userlogin:(state,action)=>{
        state.userLogin=true
     },
    userlogout:(state,action)=>{
       state.userLogin=false
    },
    ridedata:(state,action)=>{
      state.rideinformation = action.payload
    },
    
    },
    extraReducers: (builder)=>{
      builder.addCase(userLoginAction.pending ,(state,action)=>{
        state.userPending =true
      }),
      builder.addCase(userLoginAction.fulfilled , (state,action)=>{
        state.userPending  = false,
        state.message = action.payload
      }),
      builder.addCase(userLoginAction.rejected,(state,action)=>{
        state.userError =true,
        state.message=action.payload
      })

      //user signup
      builder.addCase(userSignupAction.pending,(state)=>{
        state.userPending =true
      }),
      builder.addCase(userSignupAction.fulfilled,(state,action)=>{
        state.userPending =false
        state.message = action.payload
      }),
      builder.addCase(userSignupAction.rejected,(state,action)=>{
        state.userError=true
        state.message = action.payload
      })
      builder.addCase(findRideAction.pending,(state)=>{
        state.userPending =true
      }),
      builder.addCase(findRideAction.fulfilled,(state,action)=>{
        state.userPending =false
        state.userInformation = action.payload
      }),
      builder.addCase(findRideAction.rejected,(state,action)=>{
        state.userError=true
        state.userInformation = action.payload
      })
      builder.addCase(bookRideAction.pending,(state)=>{
        state.userPending =true
      }),
      builder.addCase(bookRideAction.fulfilled,(state,action)=>{
        state.userPending =false
        state.userInformation = action.payload
      }),
      builder.addCase(bookRideAction.rejected,(state,action)=>{
        state.userError=true
        state.userInformation = action.payload
      })
      builder.addCase(paymentAction.pending,(state)=>{
        state.userPending =true
      }),
      builder.addCase(paymentAction.fulfilled,(state,action)=>{
        state.userPending =false
        state.userInformation = action.payload
      }),
      builder.addCase(paymentAction.rejected,(state,action)=>{
        state.userError=true
        state.userInformation = action.payload
      })
      builder.addCase(userAllRidesAction.pending,(state)=>{
        state.userPending =true
      }),
      builder.addCase(userProfileAction.fulfilled,(state,action)=>{
        state.userPending =false
        state.userInformation = action.payload
      }),
      builder.addCase(userProfileAction.rejected,(state,action)=>{
        state.userError=true
        state.userInformation = action.payload
      })
      builder.addCase(userProfileUpdateAction.pending,(state)=>{
        state.userPending =true
      }),
      builder.addCase(userProfileUpdateAction.fulfilled,(state,action)=>{
        state.userPending =false
        state.userInformation = action.payload
      }),
      builder.addCase(userProfileUpdateAction.rejected,(state,action)=>{
        state.userError=true
        state.userInformation = action.payload
      })
      builder.addCase(userForgotPasswordAction.pending,(state)=>{
        state.userPending =true
      }),
      builder.addCase(userForgotPasswordAction.fulfilled,(state,action)=>{
        state.userPending =false
        state.userInformation = action.payload
      }),
      builder.addCase(userForgotPasswordAction.rejected,(state,action)=>{
        state.userError=true
        state.userInformation = action.payload
      })
      builder.addCase(userResetPasswordAction.pending,(state)=>{
        state.userPending =true
      }),
      builder.addCase(userResetPasswordAction.fulfilled,(state,action)=>{
        state.userPending =false
        state.userInformation = action.payload
      }),
      builder.addCase(userResetPasswordAction.rejected,(state,action)=>{
        state.userError=true
        state.userInformation = action.payload
      })
    }
});

export const {userlogin,userlogout,ridedata} = userSlice.actions

export default userSlice.reducer;



