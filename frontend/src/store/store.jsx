import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./redusers/user.reduser"
import driverSlice from './redusers/driver.reduser'
import authSlice from './redusers/auth.reduser'
import rideSlice from './redusers/ride.reduser'
import vehicleSlice from './redusers/vehicle.reduser'

export const store = configureStore({
  reducer: {
    auth:authSlice,
    user:userSlice,
    driver:driverSlice,
    rides:rideSlice,
    vehicle:vehicleSlice,
  }
})