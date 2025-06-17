import { Request, Response } from "express";
import { ValidationError, DatabaseError } from "sequelize";

const Rides = require("../models/ride.model");
const Driver = require("../models/driver.model");
const Vehicle = require("../models/vehicle.model");
const User = require("../models/user.model");
const driverLocation = require("../models/driverlocation.model");
const reviews = require("../models/review.model");

const { userIdFromRequest } = require("../services/user.services");
const { calculateDistance, distanceCondition } = require("../services/ride.service");
const { findRideSchema, bookRide } = require("../utills/validation.utill");

const RATE_PER_KM = 30;
const SEARCH_RADIUS_KM = 10;

// Create a new ride
async function createRide(req: Request, res: Response) {
  try {
    const {
      driver_id,
      vehicle_id,
      pickup_latitude,
      pickup_longitude,
      drop_latitude,
      drop_longitude,
      status
    } = req.body;

    const userId = userIdFromRequest(req, res);
    if (!userId) {
      return res.status(401).json({ msg: "Unauthorized", error: true });
    }

    const distance = calculateDistance(
      parseFloat(pickup_latitude),
      parseFloat(pickup_longitude),
      parseFloat(drop_latitude),
      parseFloat(drop_longitude)
    );

    const fare = parseFloat((distance * RATE_PER_KM).toFixed(2));

    const rideCreate = await Rides.create({
      user_id: userId,
      driver_id,
      vehicle_id,
      pickup_latitude,
      pickup_longitude,
      drop_latitude,
      drop_longitude,
      status,
      fare_amount: fare,
      booked_at: new Date(),
      completed_at: null
    });

    return res.status(201).json({
      msg: "Ride created successfully",
      ride: rideCreate,
      error: false
    });
  } catch (error: any) {
    if (error instanceof ValidationError) {
      const messages = error.errors.map((e: any) => e.message);
      return res.status(400).json({ msg: "Validation error", errors: messages, error: true });
    }

    if (error instanceof DatabaseError) {
      return res.status(400).json({
        msg: "Database error",
        errors: [error.original?.message || "Unknown database issue"],
        error: true
      });
    }

    console.error("Unhandled error in createRide:", error);
    return res.status(500).json({ msg: "Internal server error", error: true });
  }
}

// Find nearby rides
async function findRide(req: Request, res: Response) {
  try {
    const { error, value } = findRideSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const validationMessages = error.details.map((detail: any) => detail.message);
      return res.status(400).json({
        msg: "Validation failed",
        errors: validationMessages,
        error: true
      });
    }

    const { pickup_latitude, pickup_longitude } = value;

    const drivers = await driverLocation.findAll({
      where: distanceCondition(pickup_latitude, pickup_longitude),
      include: [
        {
          model: Driver,
          include: [
            {
              model: Vehicle,
              where: { deleted_at: null }
            }
          ],
          where: { deleted_at: null }
        }
      ]
    });

    return res.json({
      msg: "Nearby drivers fetched successfully",
      drivers,
      error: false
    });
  } catch (error: any) {
    console.error("Error fetching nearby drivers:", error);
    return res.status(500).json({ msg: "Internal server error", error: true });
  }
}

// Get all rides of a user
async function userallRide(req: Request, res: Response) {
  const userId = userIdFromRequest(req, res);

  try {
    const rides = await Rides.findAll({
      where: { user_id: userId },
      include: [
        {
          model: User,
          attributes: ['user_id', 'first_name', 'last_name', 'email']
        },
        {
          model: Driver,
          attributes: ['id', 'first_name', 'last_name', 'email', 'phone']
        },
        {
          model: Vehicle,
          attributes: ['vehicle_id', 'type', 'model', 'registration_number', 'color']
        }
      ]
    });

    return res.json({ rides, error: false });
  } catch (error: any) {
    console.error("Error fetching user rides:", error);
    return res.status(500).json({ msg: "Error fetching rides", error: true, detail: error.message });
  }
}

// Delete a ride by ride_id
async function deleteRide(req: Request, res: Response) {
  const rideId = req.params.rideid;

  if (!rideId) {
    return res.json({ msg: "Please provide rideid", error: true });
  }

  try {
    const findRideId = await Rides.findOne({ where: { ride_id: rideId } });

    if (!findRideId) {
      return res.json({ msg: "Ride ID not found", error: true });
    }

    await Rides.destroy({ where: { ride_id: rideId } });

    return res.json({ msg: "Ride is deleted", error: false });
  } catch (err: any) {
    console.error("Delete ride error:", err);
    return res.status(500).json({ msg: "Error deleting ride", error: true, detail: err.message });
  }
}

export {
  createRide,
  findRide,
  userallRide,
  deleteRide
};

