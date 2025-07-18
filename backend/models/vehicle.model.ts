var { DataTypes } = require('sequelize');
var {sequelize} = require('../config/db');

var Vehicles = sequelize.define('Vehicle', {
  vehicle_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  driver_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'drivers',
      key: 'id',
    },
  },
  type: {
    type: DataTypes.ENUM('car', 'bike'),
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  registration_number: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  deleted_at: {
    type: DataTypes.DATE,
    defaultValue:null
  },
}, {

  tableName: 'vehicles',
  timestamps: true,

});

module.exports = Vehicles;
