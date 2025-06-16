import {Router} from "express"
const authRoute = Router()
const { signUp, logIn, driverSignup, driverLogin, sendOtp, changePassword, driverSendOtp, driverChangePassword } = require("../controllers/auth.controller")


authRoute.post("/user/signup" , signUp)

authRoute.post("/user/login" ,logIn)

authRoute.put("/user/forgot-password" , sendOtp )

authRoute.put("/user/change-password" , changePassword)

authRoute.post("/driver/signup" , driverSignup )

authRoute.post("/driver/login" , driverLogin )

authRoute.put("/driver/forgot-password" , driverSendOtp)

authRoute.put("/driver/change-password" , driverChangePassword)

module.exports = authRoute