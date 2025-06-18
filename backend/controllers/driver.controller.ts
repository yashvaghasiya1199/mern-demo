import { Request, Response } from "express"

//  models
const driverlocationModel = require("../models/driverlocation.model")
const drivers = require("../models/driver.model")
const driverDocumetModel = require("../models/driverdocument.model")
const VehicleModel = require("../models/vehicle.model")
const reviews = require("../models/review.model")
const cloudinary = require("cloudinary").v2
const { driverIdFromRequest, updateProfileImageService, uploadDriverDocumentsService, updateDriverDocumentsService } = require("../services/driver.services");
const { UploadedFile } = require("express-fileupload");



// for uploaddin profile image setup
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

async function driverProfilUpdate(req:Request, res:Response) {

    const driverId = driverIdFromRequest(req, res)

    if (!driverId) {
        return res.status(401).json({ msg: "driver id is not enter ", error: true })
    }

    // const { first_name, last_name, email, profile, phone } = req.body

    const {
        first_name,
        last_name,
        email,
        profile,
        phone
    } = req.body || {};


    if (!first_name && !last_name && !email && !profile && !phone ) {
        return res.status(401).json({ msg: "no fild for update atleast enter one fild for update", error: true })
    }

    let driver = await drivers.findOne({ where: { id: driverId } })

    if (!driver) {
        return res.status(401).json({ msg: "driver id not found", error: true })
    }

    let updatedriver = await driver.update({
        first_name: first_name || driver.first_name,
        last_name: last_name || driver.last_name,
        email: email || driver.email,
        profile: profile || driver.profile,
        phone: phone || driver.phone,

    })

    return res.json({ msg: "driver update successfull", updatedriver, error: false })
}


async function driverLocations(req:Request, res:Response) {

    const { latitude, longitude } = req.body;

    const driverId = driverIdFromRequest(req, res)


    if (!latitude || !longitude) {
        return res.json({ msg: "please enter both latitude and longitude", error: true })
    }

    const locationcreate = await driverlocationModel.create({
        driver_id: driverId,
        driverid: driverId,
        latitude,
        longitude
    })

    return res.json({ msg: "driver location add", locationcreate, error: false })

}

async function getDriverAllLocation(req:Request, res:Response) {


    const driverId = driverIdFromRequest(req, res)

    try {
        const driver = await drivers.findOne({
            where: { id: driverId },
            include: [{
                model: driverlocationModel,
                required: false,
            }]
        });

        if (!driver) {
            return { message: 'Driver not found', error: true };
        }

        return res.json({ driver, error: false });
    } catch (error) {
        console.error(error);
        return { message: 'Error fetching data', error: true };
    }
}

async function driverUpdateProfileImage(req:Request, res:Response) {
    try {
        const file = req?.files?.profileimage;
        const uploadedFile = Array.isArray(file) ? file[0] : file;

        const driverId = driverIdFromRequest(req, res);
        const maxSize = 1 * 1024 * 1024;

        if (!uploadedFile) {
            return res.status(400).json({ msg: "Please select an image", error: true });
        }
        
        if (uploadedFile.size > maxSize) {
            return res.status(400).json({ msg: "Your image is too large. Max allowed size is 1MB.", error: true });
        }

        const driver = await drivers.findOne({ where: { id: driverId } });

        if (!driver) {
            return res.status(404).json({ msg: "Driver not found", error: true });
        }

        const url = driver.profile_image || "";
        const parts = url.split("/");
        const fileWithExt = parts[parts.length - 1];
        const publicId = fileWithExt.split('.')[0];

        const uploadResult = await updateProfileImageService(file, publicId);

        const updateProfile = await driver.update({ profile_image: uploadResult.url });

        return res.json({ msg: "Image updated successfully", url: uploadResult.url, error: false });

    } catch (err) {
        console.error("Error updating profile image:", err);
        return res.status(500).json({ msg: "Something went wrong" });
    }
}

//  driver's document uploads
async function driverDocument(req:Request, res:Response) {
    try {
        const driverId = driverIdFromRequest(req, res);

        const pancardFile = req.files?.pancard || null;
        const aadharFrontFile = req.files?.aadharfront || null;
        const aadharBackFile = req.files?.aadharback || null;

        if (!pancardFile && (!aadharFrontFile || !aadharBackFile)) {
            return res.status(400).json({ msg: "Please upload required documents.", error: true });
        }

        const result = await uploadDriverDocumentsService(driverId, {
            pancardFile,
            aadharFrontFile,
            aadharBackFile
        },req,res);
        const dId = result.driver_id

        // const driverDocument = await drivers.findOne({where:{id:{dId}}})

        const updateStatus = await drivers.update(
            { document_uploaded: true },
            { where: { id: driverId } }
        )
        return res.json({ msg: "File upload successful", data: result, error: false });

    } catch (error) {
        console.error("Document Upload Error:", error);
        return res.status(500).json({ msg: "Internal Server Error", error: true });
    }
}

// update driver documents
async function updateDriverDocument(req:Request, res:Response) {
    try {
        const driverId = driverIdFromRequest(req, res);

        const pancardFile = req.files?.pancard || null;
        const aadharFrontFile = req.files?.aadharfront || null;
        const aadharBackFile = req.files?.aadharback || null;

        const updatedDocument = await updateDriverDocumentsService(driverId, {
            pancardFile,
            aadharFrontFile,
            aadharBackFile
        });

        return res.json({ msg: "Driver documents updated successfully", data: updatedDocument, error: false });
    } catch (error) {
        console.error("Update Document Error:", error);
        return res.status(500).json({ msg: "Failed to update documents", error: true });
    }
}


async function driverAllInformation(req:Request, res:Response) {
    const driverId = driverIdFromRequest(req);
  
    try {
      const driverData = await drivers.findOne({
        where: { id: driverId },
        include: [
          { model: driverDocumetModel },
          { model: VehicleModel },
        ],
      });
  
      if (!driverData) {
        return res.status(404).json({ message: 'Driver not found', error: true });
      }
  
      return res.json({ driverData, error: false });
    } catch (error) {
      console.error('Error fetching driver info:', error);
      return res.status(500).json({ message: 'Internal Server Error', error: true });
    }
  }
  

const Users = require("../models/user.model")

reviews.belongsTo(Users, { foreignKey: 'user_id' });

Users.hasMany(reviews, { foreignKey: 'user_id' });


async function AllDriverReviews(req:Request, res:Response) {
    try {
        const driverId = driverIdFromRequest(req, res);

        const findreview = await reviews.findAll({
            where: { driver_id: driverId },
            include: [{
                model: Users,
                attributes: ['user_id', 'first_name', 'last_name', 'username', 'email']
            }]
        });

        if (!findreview || findreview.length === 0) {
            return res.json({ msg: "Driver has no reviews", error: true });
        }

        return res.json({ reviews: findreview, error: false });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error", error: true });
    }
}
async function removeLocation(req:Request,res:Response) {

    const locationId = req.params.id

    const findLocation = await driverlocationModel.findOne({where:{location_id:locationId}})

    if(!findLocation){
        return res.json({msg:"location id not found" , error:true})
    }

    let del = await findLocation.destroy()

    return res.json({msg:'record delete successfully' , error:false})
}


module.exports = {
    driverProfilUpdate,
    driverUpdateProfileImage,
    driverLocations,
    getDriverAllLocation,
    driverDocument,
    updateDriverDocument,
    driverAllInformation,
    AllDriverReviews,
    removeLocation
}