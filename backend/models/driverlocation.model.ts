var { DataTypes, UUID, DECIMAL } = require("sequelize")
var {sequelize} = require("../config/db")

const driverlocation = sequelize.define('driverlocation', {
    location_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    driver_id: {
        type: DataTypes.UUID,
        allowNull:false,
        references: {
         model:'drivers',
         key: 'id'
        }
    },
    latitude: {
        type: DECIMAL(9,6),
        allowNull:false
    },
    longitude: {
        type: DECIMAL(9,6),
        allowNull: false
    },
    deleted_at: {
        type: DataTypes.DATE,
        defaultValue: null
    }
},{
    tableName:"driverlocation",
    timestamps:true,
})

module.exports = driverlocation

