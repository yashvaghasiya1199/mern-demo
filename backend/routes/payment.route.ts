import {Router} from "express"
const { payPayment, cancelPayment } = require("../controllers/payment.controller")
const paymentRoute = Router()

paymentRoute.post("/pay/:rideid" , payPayment )

paymentRoute.put("/cancel/:paymentid" , cancelPayment)

module.exports = paymentRoute