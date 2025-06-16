import {Router} from "express"
const {   allPayment, userProfileUpdate, myProfile } = require("../controllers/user.controller")
const userRoute = Router()

userRoute.put("/profile" , userProfileUpdate)

userRoute.get("/allpayment" ,allPayment )

userRoute.get("/me" , myProfile)

module.exports = userRoute