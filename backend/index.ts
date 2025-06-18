import { Request, Response } from "express";
import { where } from "sequelize";
const express = require("express");
const { sequelize } = require("./config/db");
const cookieparser = require("cookie-parser")
const app = express()
const fileUpload = require("express-fileupload")
const cors = require("cors")
const port = 8011
require("dotenv").config()
const db = require("./config/associate")
 const driverModel = require("./models/driver.model")


const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

// routes
const userRoute = require("./routes/user.route")
const driverRoute = require("./routes/driver.route")
const vehicleRoute = require("./routes/vehicle.route")
const rideRoute = require("./routes/ride.route")
const reviewRoute = require("./routes/review.route")
const paymentRoute = require("./routes/payment.route")
const authRoute = require("./routes/auth.route")

// middelwere 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const { driverAuth } = require("./middelweres/driverauth");
const { userAuth } = require("./middelweres/userauth");
app.use(cookieparser())
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    await sequelize.sync({ alter: false });
    console.log("DB synced");

  } catch (error: any) {
    console.error("Unable to connect to the database:", error);
  }
};


startServer();


//  route
app.use("/api/auth", authRoute)

app.use("/api/user", userAuth, userRoute)

app.use("/api/driver", driverAuth, driverRoute)

app.use("/api/vehicle", driverAuth, vehicleRoute)

app.use("/api/ride", userAuth, rideRoute)

app.use("/api/review", userAuth, reviewRoute)

app.use("/api/payment", userAuth, paymentRoute)

const jwt = require('jsonwebtoken')

app.listen(port, () => console.log(`run on ${port}`))




