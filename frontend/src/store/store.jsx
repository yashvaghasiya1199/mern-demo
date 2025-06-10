import { configureStore } from '@reduxjs/toolkit'
import isLogin from "./redusers/user.reduser"
import driverLogin from './redusers/driver.reduser'
import authSlice from './redusers/auth.reduser'

export const store = configureStore({
  reducer: {
    auth:authSlice,
    userlogin: isLogin,
    driverLogin:driverLogin
  }
})