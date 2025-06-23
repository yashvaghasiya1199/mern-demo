const Driver = require('../models/driver.model');
const Vehicle = require('../models/vehicle.model');
const DriverDocuments = require("../models/driverdocument.model");
const DriverLocation = require("../models/driverlocation.model");
const Rides = require("../models/ride.model");
const User = require("../models/user.model");
const Review = require("../models/review.model");

// Driver and Vehicle associations
Driver.hasMany(Vehicle, {
  foreignKey: 'driver_id',
  onDelete: 'CASCADE',
});
Vehicle.belongsTo(Driver, {
  foreignKey: 'driver_id',
});

// Driver and DriverDocument associations
Driver.hasOne(DriverDocuments, {
  foreignKey: 'driver_id',
  onDelete: 'CASCADE',
});
DriverDocuments.belongsTo(Driver, {
  foreignKey: 'driver_id',
});

// Driver and DriverLocation associations
Driver.hasMany(DriverLocation, {
  foreignKey: 'driver_id',
  onDelete: 'CASCADE',
});
DriverLocation.belongsTo(Driver, {
  foreignKey: 'driver_id',
});

// Rides and User association
Rides.belongsTo(User, {
  foreignKey: 'user_id',
});

// Rides and Driver association
Rides.belongsTo(Driver, {
  foreignKey: 'driver_id',
});

// Rides and Vehicle association
Rides.belongsTo(Vehicle, {
  foreignKey: 'vehicle_id',
});

// Rides and Review associations
Rides.hasMany(Review, {
  foreignKey: 'ride_id',
  onDelete: 'CASCADE',
});
Review.belongsTo(Rides, {
  foreignKey: 'ride_id',
});
