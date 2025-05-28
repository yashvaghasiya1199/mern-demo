const express = require("express")
const {   allPayment, userProfileUpdate, myProfile } = require("../controllers/user.controller")
const route = express.Router()

route.put("/profile" , userProfileUpdate)

route.get("/allpayment" ,allPayment )

route.get("/me" , myProfile)

module.exports = route