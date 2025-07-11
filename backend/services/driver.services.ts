import { Request,Response } from "express";
import { UploadedFile } from "express-fileupload";
const driver = require("../models/driver.model")
const {Op} = require("sequelize")
const driverDocumetModel = require("../models/driverdocument.model")
const jwtToken = require("jsonwebtoken")
const cloudinary = require("cloudinary").v2

// for uploading profile image setup
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

interface IDriverDocumentFiles {
    pancardFile?: UploadedFile;
    aadharFrontFile?: UploadedFile;
    aadharBackFile?: UploadedFile;
}

async function findDriverUsernameandEmail(emailorusername:string){
  
    return await driver.findOne({
        where: {
          [Op.or]: [{ email: emailorusername }, { username: emailorusername }],
        },
      });
  
}

function driverIdFromRequest(req:any,res:Response){
  const driverToken = req.driver
  const tokenVerify = jwtToken.verify(driverToken , process.env.JWT_SECRET)
  const driverId = tokenVerify.driverid
  return driverId
}

async function updateProfileImageService(file:UploadedFile, publicId?:string) {
    try {
        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }

        const uploadResult = await cloudinary.uploader.upload(file.tempFilePath);
        return uploadResult;

    } catch (err) {
        console.error("Cloudinary Upload Error:", err);
        throw new Error("Image upload failed.");
    }
}

async function uploadDriverDocumentsService(driverId: string, files: IDriverDocumentFiles,req:Request,res:Response) {
    const { pancardFile, aadharFrontFile, aadharBackFile } = files;
  
    const maxSize = 1 * 1024 * 1024; // 1MB
    let pancardUrl: string | null = null;
    let aadharFrontUrl: string | null = null;
    let aadharBackUrl: string | null = null;
  
    // Upload Pancard
    if (pancardFile) {
      if (pancardFile.size > maxSize) {
        return res.status(401).json({msg:"please upload less then 1 mb image"})
      }
      const uploadResult = await cloudinary.uploader.upload(pancardFile.tempFilePath);
      pancardUrl = uploadResult.secure_url;
    }
  
    // Upload Aadhar Front & Back
    if (aadharFrontFile && aadharBackFile) {
      if (aadharFrontFile.size > maxSize || aadharBackFile.size > maxSize) {
        return res.status(401).json({msg:"please upload less then 1 mb image"})
      }
  
      const frontResult = await cloudinary.uploader.upload(aadharFrontFile.tempFilePath);
      aadharFrontUrl = frontResult.secure_url;
  
      const backResult = await cloudinary.uploader.upload(aadharBackFile.tempFilePath);
      aadharBackUrl = backResult.secure_url;
    } else if (aadharFrontFile || aadharBackFile) {
      return res.status(401).json({msg:"please upload less then 1 mb image"})
    }
  
    // Save to database
    const newDocument = await driverDocumetModel.create({
      driver_id: driverId,
      pancard: pancardUrl,
      aadharcard_front: aadharFrontUrl,
      aadharcard_back: aadharBackUrl,
    });
  
    return newDocument;
  }

// update driver document services 

async function updateDriverDocumentsService(driverId:string, files:IDriverDocumentFiles) {
    const { pancardFile, aadharFrontFile, aadharBackFile } = files;
    const maxSize = 1 * 1024 * 1024;

    const driver = await driverDocumetModel.findOne({ where: { driver_id: driverId } });
    if (!driver) throw new Error("Driver document not found");

    let pancardUrl = driver.pancard;
    let aadharFrontUrl = driver.aadharcard_front;
    let aadharBackUrl = driver.aadharcard_back;

    // Upload and replace pancard
    if (pancardFile) {
        if (pancardFile.size > maxSize) {
            throw new Error("Pancard image is too large. Max size is 1MB.");
        }

        // Delete old file
        if (pancardUrl) {
            const oldPublicId = extractPublicId(pancardUrl);
            if (oldPublicId) {
                await cloudinary.uploader.destroy(oldPublicId);
            }
        }

        const uploadResult = await cloudinary.uploader.upload(pancardFile.tempFilePath);
        pancardUrl = uploadResult.url;
    }

    // Upload and replace Aadhar front/back
    if (aadharFrontFile && aadharBackFile) {
        const frontResult = await cloudinary.uploader.upload(aadharFrontFile.tempFilePath);
        aadharFrontUrl = frontResult.url;

        const backResult = await cloudinary.uploader.upload(aadharBackFile.tempFilePath);
        aadharBackUrl = backResult.url;
    } else if (aadharFrontFile || aadharBackFile) {
        throw new Error("Both front and back Aadhar images must be uploaded together.");
    }

    // Update database
    const updatedDocument = await driver.update({
        pancard: pancardUrl || driver.pancard,
        aadharcard_front: aadharFrontUrl || driver.aadharcard_front,
        aadharcard_back: aadharBackUrl || driver.aadharcard_back,
    });

    return updatedDocument;
}

function extractPublicId(fileUrl:string) {
    try {
        const parts = fileUrl.split('/');
        const fileName = parts[parts.length - 1];
        return fileName.split('.')[0];
    } catch {
        return null;
    }
}




module.exports = {
  findDriverUsernameandEmail,
  driverIdFromRequest,
  updateProfileImageService,
  uploadDriverDocumentsService,
  updateDriverDocumentsService,
}
