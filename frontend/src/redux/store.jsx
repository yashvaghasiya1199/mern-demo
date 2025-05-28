import { configureStore } from '@reduxjs/toolkit'
import isLogin from "./slices/user.slice"
import driverLogin from './slices/driver.slice'

export const store = configureStore({
  reducer: {
    userlogin: isLogin,
    driverLogin:driverLogin
  }
})