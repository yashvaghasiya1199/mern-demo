import { Request, Response } from "express";
import { UploadedFile } from 'express-fileupload';
const Users = require('../models/user.model');
const bcrypt = require('bcrypt');
const drivers = require("../models/driver.model")
const cloudinary = require("cloudinary").v2
const { findUserByEmailorUsername } = require("../services/user.services");
const { jwtTokenCreate } = require('../utills/jwtToken.utill');
const { findDriverUsernameandEmail } = require("../services/driver.services");
const { emailService } = require('../services/email.service');
const { userSignUpValidation, driverSignupValidation } = require('../utills/validation.utill');
var jwt = require("jsonwebtoken")

// USER AUTH
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

async function signUp(req:any, res:Response) {
    try {

        const { error, value } = userSignUpValidation.validate(req.body, { abortEarly: false });
        console.log(error);


        if (error) {
            console.log(error);

            return res.status(400).json({
                msg: error.details ? error.details[0].message : "",
                error: true
            });
        }

        const { first_name, last_name, email, password, phone, username } = value

        // Validate input
        if (!first_name || !last_name || !email || !password || !phone || !username) {
            return res.status(400).json({ msg: "All required fields must be provided.", error: true });
        }

        const existingUser = await findUserByEmailorUsername(email);

        if (existingUser) {
            return res.status(409).json({ msg: "User already exists. Please change email or username.", error: true });
        }

        const checkUserName = await Users.findOne({
            where: { username:username }
        });


        if (checkUserName) {
            return res.status(400).json({ msg: "username already taken", error: true })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Users.create({
            first_name,
            last_name,
            username,
            email,
            password: hashedPassword,
            phone,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        });

        return res.status(201).json({
            msg: "User signed up successfully.",
            user: newUser,
            error: false
        });

    } catch (error:any) {
        console.error("Signup error:", error);
        return res.status(500).json({ msg: "Server error", error: true });
    }
}

async function logIn(req:Request, res:Response) {
    const { emailorusername, password } = req.body;

    try {
        // Find user by email or username
        const user = await findUserByEmailorUsername(emailorusername);

        if (!user) {
            return res.status(401).json({ msg: "Invalid email or username", error: true });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid password", error: true });
        }

        const payload = { userid: user.user_id };

        // Generate token 
        const token = jwtTokenCreate(payload);

        //cookie set
        res.cookie("usertoken", token);

        return res.json({ msg: "Login successful", error: false, user });

    } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({ msg: "Server error", error: true });
    }
}


// forgot password 

async function sendOtp(req:Request, res:Response) {

    const otp = Math.floor(Math.random() * 10000 + 10000)

    const { email } = req.body
    if (!email) {
        return res.status(401).json({ msg: "please enter email", error: true })
    }

    const findUser = await Users.findOne({ where: { email: email } })
    if (!findUser) {
        return res.status(401).json({ msg: "please enter valid email", error: true })
    }

    let updated = await Users.update(
        { otp: otp },
        { where: { email: email } }
    );

    const sendOtp = emailService(email, otp)


    return res.json({ msg: "Otp send on your email", error: false })
}

//   update password 
async function changePassword(req:Request, res:Response) {
    const { otp, newpassword } = req.body

    const otpFind = await Users.findOne({ where: { otp: otp } })

    if (!otpFind) {
        return res.status(401).json({ msg: "invalid otp", error: true })
    }
    const hasPsssword = await bcrypt.hash(newpassword, 10)
    const update = await Users.update(
        { password: hasPsssword },
        { where: { otp: otp } }
    )
    return res.json({ msg: "password update successfully", update, error: false })
}


// DRIVER AUTH
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// for uploaddin profile image setup

async function driverSignup(req:Request, res:Response) {

    const { error, value } = driverSignupValidation.validate(req.body, { abortEarly: false });
    console.log(error);


    if (error) {
        console.log(error);

        return res.status(400).json({
            msg: error.details?error.details[0].message : "",
            error: true
        });
    }
    
    const { first_name, last_name, email, username, password, phone, } = value;

    // const { first_name, last_name, email, username, password, phone, } = req.body;

    if (!first_name || !last_name || !email || !password || !phone || !username) {
        return res.status(400).json({ msg: "All required fields must be provided.", error: true });
    }

    const file = req.files?.profileimage as UploadedFile
    console.log(file);

    const FindUserName = await drivers.findOne({ where: { username: username } })

    if (FindUserName) {
        return res.status(400).json({ msg: "username already exists", error: true })
    }

    // if file > 1 mb then user can't upload image

    const maxSize = 1 * 1024 * 1024;

    if (file.size > maxSize) {
        return res.status(400).json({ msg: "Your image is too large. Max allowed size is 1MB.", error: true });
    }

    if (!req.files || !req.files.profileimage) {
        return res.status(400).json({ msg: "Profile image is required.", error: true });
    }

    let uploadResult;
    try {
        uploadResult = await cloudinary.uploader.upload(file.tempFilePath);
        // console.log(uploadResult);

    } catch (err:any) {
        console.error("Cloudinary Upload Error:", err);
        if (err.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({ msg: "Username or email already exists.", error: true });
        }
        
        return res.status(500).json({ msg: "Image upload failed.", error: true });
    }

    const existingDriver = await findDriverUsernameandEmail(email);
    if (existingDriver) {
        return res.status(401).json({ msg: "Email or username already exists.", error: true });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

    let create = await drivers.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        phone,
        username,
        deleted_at: null,
        profile_image: uploadResult.url,
    });

    return res.json({ msg: "Driver signup success", create, error: false });
}


async function driverLogin(req:Request, res:Response) {
    const { emailorusername, password } = req.body;
    if (!emailorusername || !password) {
        return res.status(401).json({ msg: "Please enter both fields", error: true });
    }

    let driver = await findDriverUsernameandEmail(emailorusername);

    if (!driver) {
        return res.status(401).json({ msg: "Invalid username or password", error: true });
    }

    const isMatch = await bcrypt.compare(password, driver.password);

    if (!isMatch) {
        return res.status(401).json({ msg: "Invalid password", error: true });
    }

    const payload = { driverid: driver.id };

    const jwtCreate = jwtTokenCreate(payload);

    res.cookie("drivertoken", jwtCreate);

    return res.json({ msg: "Driver login success", driver, error: false });

}

//  driver forgot password
async function driverSendOtp(req:Request, res:Response) {

    const otp = Math.floor(Math.random() * 10000 + 10000)

    const { email, duplicate } = req.body
    if (!email) {
        return res.status(401).json({ msg: "please enter email", error: true })
    }

    const findUser = await drivers.findOne({ where: { email: email } })
    if (!findUser) {
        return res.status(401).json({ msg: "please enter valid email", error: true })
    }

    let updated = await drivers.update(
        { otp: otp },
        { where: { email: email } }
    );

    let num = Math.floor(Math.random() * 10000 + 10000)

    const sendOtp = emailService(email, otp)

    return res.status(200).json({ msg: "otp has been send", error: false })
    
}

async function driverChangePassword(req:Request, res:Response) {
    const { otp, newpassword } = req.body

    const otpFind = await drivers.findOne({ where: { otp: otp } })

    if (!otpFind) {
        return res.status(401).json({ msg: "invalid otp", error: true })
    }
    const hasPsssword = await bcrypt.hash(newpassword, 10)
    const update = await drivers.update(
        { password: hasPsssword },
        { where: { otp: otp } }
    )
    return res.json({ msg: "password update successfully", update, error: false })
}

async function driverVerify(req: Request, res: Response){
    const token = req.cookies.drivertoken
  
    if (!token) {
      return res.status(401).json({ error: "No token provided" })
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      var driverId = decoded.driverid
      const find = await drivers.findOne({where:{id:driverId}})
      return res.json({ driver: find })
  
    } catch (err) {
      console.log(err);
      return res.status(401).json({ error: "Invalid token" })
    }
  }

  async function userVerify(req: any, res: Response) {
    const token = req.cookies.usertoken
  
    if (!token) {
      return res.status(401).json({ error: "No token provided" })
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      return res.json({ user: decoded })
  
    } catch (err) {
      console.log(err);
      return res.status(401).json({ error: "Invalid token" })
    }
  }

module.exports = {
    signUp,
    logIn,
    sendOtp,
    changePassword,
    driverSignup,
    driverLogin,
    driverSendOtp,
    driverVerify,
    userVerify,
    driverChangePassword,
}