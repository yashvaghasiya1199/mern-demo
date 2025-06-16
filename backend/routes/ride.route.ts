import {Router} from "express"
const { createRide, findRide, userallRide, deleteRide } = require("../controllers/ride.controller")
const rideRoute = Router()

rideRoute.post("/create" , createRide)

//  find other driver who readius in 10 km accorrding to user latitude and longitude
rideRoute.post("/findride" , findRide )

rideRoute.delete("/delete/:rideid" , deleteRide )

rideRoute.get("/userallride" , userallRide)


module.exports = rideRoute