import { Request, Response } from "express"

const vehicals = require("../models/vehicle.model")
const Driver = require("../models/driver.model")
const Vehicle = require("../models/vehicle.model")
const rideModel = require("../models/ride.model")
const { driverIdFromRequest } = require("../services/driver.services")

async function addVehicle(req:Request, res:Response) {

  const { type, model, registration_number, color } = req.body

  if (!type || !model || !registration_number) {
    return res.json({msg:"all fild must require" ,error:true})
  }

  if (type !== 'car' && type !== 'bike') {
    return res.status(401).json({ msg: "vehicle must be car or bike" ,error:true});
  }

  const driverId = driverIdFromRequest(req,res)

  const create = await vehicals.create({
    type,
    model,
    registration_number,
    color,
    driver_id: driverId
  })


  return res.json({ msg: "add vehicle", create ,error:false})
  
}

async function updateVehicle(req:Request, res:Response) {

  const vehicleId = req.params.vehicleid

  const { type, model, registration_number, color } = req.body

  let findVehical = await vehicals.findOne({ where: { vehicle_id: vehicleId } })

  if (!findVehical) {
    return res.json({ msg: "vehical not found" ,error:true})
  }

  const updateVehicles = await findVehical.update({
    type: type || findVehical.type,
    model: model || findVehical.model,
    registration_number: registration_number || findVehical.registration_number,
    color: color || findVehical.color
  })

  return res.json({ updateVehicles,error:false })

}

async function getDriverAllVehicles(req:Request, res:Response) {

  const driverId = driverIdFromRequest(req,res)
  
  try {
    const driver = await Driver.findOne({
      where: { id: driverId },
      include: [{
        model: Vehicle,  
        required: false, 
      }]
    });

    if (!driver) {
      return { message: 'Driver not found' ,error:true};
    }

    return res.json({driver,error:false});  
  } catch (error:any) {
    console.error(error);
    return { message: 'Error fetching data' ,error:true};
  }
}

async function findSingleVahicle(req:Request, res:Response){

  let vehicleId = req.params.vehicleid

  if (!vehicleId){
    return res.json({msg:"vehicleid roungh or vehicals not found",error:true})
  }

  let findvehicle = await Vehicle.findOne({where:{vehicle_id:vehicleId}})
  
  if(!findvehicle){
    return res.json({msg:"vehicle not found",error:true})
  }

  return res.json({msg:findvehicle,error:false})
  
}

async function deleteVehicle(req:Request, res:Response) {
  const vehicleId = req.params.vehicleid;
  const driverId = driverIdFromRequest(req, res);

  try {
    const vehicle = await Vehicle.findOne({ where: { vehicle_id: vehicleId } });

    if (!vehicle) {
      return res.status(404).json({ msg: "Vehicle ID not found", error: true });
    }

    if (vehicle.driver_id !== driverId) {
      return res.status(403).json({ msg: "Unauthorized: You cannot delete this vehicle", error: true });
    }
    const rideDelte =  await rideModel.destroy({where:{vehicle_id:vehicleId}})

    const deletedCount = await Vehicle.destroy({ where: { vehicle_id: vehicleId } });

    return res.json({ msg: "Vehicle deleted successfully", deleted: deletedCount, error: false });
  } catch (err:any) {
    console.error(err);
    return res.status(500).json({ msg: "Server error", error: true });
  }
}

module.exports = {
  addVehicle,
  updateVehicle,
  getDriverAllVehicles,
  findSingleVahicle,
  deleteVehicle
}
