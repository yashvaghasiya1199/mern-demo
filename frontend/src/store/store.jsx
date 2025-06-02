import { configureStore } from '@reduxjs/toolkit'
import isLogin from "./redusers/user.reduser"
import driverLogin from './redusers/driver.reduser'

export const store = configureStore({
  reducer: {
    userlogin: isLogin,
    driverLogin:driverLogin
  }
})