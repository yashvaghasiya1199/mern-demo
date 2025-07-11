  
     var { DataTypes } = require('sequelize');
     var {sequelize} = require('../config/db');
     
     const Users = sequelize.define('users', {
       user_id: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4, // Generates UUID automatically
         primaryKey: true,
         allowNull: false,
       },
       first_name: {
         type: DataTypes.STRING(100),
         allowNull: false,
       },
       last_name: {
         type: DataTypes.STRING(100),
         allowNull: false,
       },
       username: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
      },
       email: {
         type: DataTypes.STRING(255),
         allowNull: false,
         unique: true,
       },
       password: {
         type: DataTypes.TEXT,
         allowNull: false,
       },
       phone: {
         type: DataTypes.INTEGER(20),
         allowNull: true,
       },
       otp:{
          type: DataTypes.INTEGER,
          defaultValue: null,
          allowNull:true
       },
       deleted_at: {
         type: DataTypes.DATE,
         defaultValue: DataTypes.NOW,
       },
     }, {
       tableName: 'users',
       timestamps: true, 
     });
     
     module.exports = Users;

