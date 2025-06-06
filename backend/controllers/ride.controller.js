const Rides = require("../models/ride.model")
const Driver = require("../models/driver.model");
const Vehicle = require("../models/vehicle.model");
const User = require("../models/user.model");
const driverLocation = require("../models/driverlocation.model")
const reviews = require("../models/review.model")
const { ValidationError, DatabaseError } = require("sequelize");
const { Op, literal } = require("sequelize");
const { userIdFromRequest } = require("../services/user.services");
const { calculateDistance, distanceCondition } = require("../services/ride.service");
const { findRideSchema, bookRide } = require("../utills/validation.utill");

const RATE_PER_KM = 30;


async function createRide(req, res) {
  try {
    // const { error, value } = bookRide.validate(req.body, { abortEarly: false });

    // if (error) {
    //   const validationMessages = error.details.map(detail => detail.message);
    //   return res.status(400).json({
    //     msg: "Validation failed",
    //     errors: validationMessages,
    //     error: true
    //   });
    // }

    const {
      driver_id,
      vehicle_id,
      pickup_latitude,
      pickup_longitude,
      drop_latitude,
      drop_longitude,
      status
    } = req.body;

    // ✅ Extract user ID from token/session
    const userId = userIdFromRequest(req, res); // assume this decodes token
    if (!userId) {
      return res.status(401).json({ msg: "Unauthorized", error: true });
    }

    // ✅ Calculate fare
    const distance = calculateDistance(
      parseFloat(pickup_latitude),
      parseFloat(pickup_longitude),
      parseFloat(drop_latitude),
      parseFloat(drop_longitude)
    );

    const fare = parseFloat((distance * RATE_PER_KM).toFixed(2));

    // ✅ Save to database
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

  } catch (error) {
    // ✅ Sequelize Validation Error (e.g., not-null constraint)
    if (error instanceof ValidationError) {
      const messages = error.errors.map(e => e.message);
      return res.status(400).json({ msg: "Validation error", errors: messages, error: true });
    }

    // ✅ Sequelize Database Error (e.g., type mismatch or constraint)
    if (error instanceof DatabaseError) {
      return res.status(400).json({
        msg: "Database error",
        errors: [error.original?.message || "Unknown database issue"],
        error: true
      });
    }

    // ✅ Unhandled or internal error
    console.error("Unhandled error in createRide:", error);
    return res.status(500).json({ msg: "Internal server error", error: true });
  }
}

const SEARCH_RADIUS_KM = 10;

async function findRide(req, res) {
  try {
    const { error, value } = findRideSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const validationMessages = error.details.map(detail => detail.message);
      return res.status(400).json({
        msg: "Validation failed",
        errors: validationMessages,
        error: true
      });
    }

    const { pickup_latitude, pickup_longitude } = value;

    // Query database for nearby drivers
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
  } catch (error) {
    console.error("Error fetching nearby drivers:", error);
    return res.status(500).json({ msg: "Internal server error", error: true });
  }
}



// user allrides

async function userallRide(req, res) {
  const userId = userIdFromRequest(req, res)
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
  } catch (error) {
    console.error("Error fetching user rides:", error);
    return res.json({ error, error: true })
  }
}

async function deleteRide(req, res) {
  const rideId = req.params.rideid;

  if (!rideId) {
    return res.json({ msg: "please provide rideid", error: true });
  }

  try {
    const findRideId = await Rides.findOne({ where: { ride_id: rideId } });

    if (!findRideId) {
      return res.json({ msg: "ride id not found", error: true });
    }
    // const reviewRemove = await reviews.destroy({ where: { ride_id: rideId } })
    const RideRemove = await Rides.destroy({ where: { ride_id: rideId } })


    return res.json({ msg: "ride is deleted", error: false });
  } catch (err) {
    console.error("Delete ride error:", err);
    return res.status(500).json({ msg: "Error deleting ride", error: true, detail: err.message });
  }
}



module.exports = {
  createRide,
  findRide,
  userallRide,
  deleteRide
}
