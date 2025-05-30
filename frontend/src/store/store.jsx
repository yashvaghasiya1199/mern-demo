import { configureStore } from '@reduxjs/toolkit'
import isLogin from "./redusers/userauth.reduser"
import driverLogin from './redusers/driver.reduser'

export const store = configureStore({
  reducer: {
    userlogin: isLogin,
    driverLogin:driverLogin
  }
})