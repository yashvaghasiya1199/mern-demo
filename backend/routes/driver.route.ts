import { Router } from "express"

const driverRoute = Router()
const {    driverLocations, getDriverAllLocation, driverDocument, updateDriverDocument, driverAllInformation, AllDriverReviews, driverProfilUpdate, driverUpdateProfileImage, removeLocation } = require("../controllers/driver.controller")
const { driverAuth } = require("../middelweres/driverauth")

driverRoute.put("/profile" ,driverProfilUpdate)

driverRoute.put("/profile-image" , driverUpdateProfileImage)

driverRoute.post("/addlocation"  , driverLocations )

driverRoute.post("/adddocument" ,driverDocument )

driverRoute.put("/updatedocument"  , updateDriverDocument)

driverRoute.get("/me" , driverAllInformation )

driverRoute.get("/alllocation"  ,getDriverAllLocation )

driverRoute.get("/allreview" , AllDriverReviews)

driverRoute.delete('/delete/location/:id' , removeLocation)


module.exports = driverRoute