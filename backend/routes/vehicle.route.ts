import {Router} from "express"
const { addVehicle, updateVehicle, getDriverAllVehicles, findSingleVahicle, deleteVehicle } = require("../controllers/vehicle.controller")
const vehicleRoute = Router()

vehicleRoute.post("/addvehicle" , addVehicle)

vehicleRoute.put("/updatevehicle/:vehicleid" , updateVehicle )

vehicleRoute.delete("/delete/:vehicleid" , deleteVehicle)

//  all vehicle of driver
vehicleRoute.get("/alldata" , getDriverAllVehicles)

vehicleRoute.get("/singlevahicle/:vehicleid" , findSingleVahicle )

module.exports = vehicleRoute


