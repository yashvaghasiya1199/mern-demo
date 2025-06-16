import { Request, Response } from "express";

const Users = require("../models/user.model")
const jwt = require("jsonwebtoken")

const {Op} = require("sequelize")

async function findUserByEmailorUsername(emailorusername:string){
  

    return await Users.findOne({
        where: {
          [Op.or]: [{ email: emailorusername }, { username: emailorusername }],
        },
      });


}
function userIdFromRequest(req:any,res:Response){
  const userToken = req.user
  const jwtverify = jwt.verify(userToken,process.env.JWT_SECRET)
  const userId = jwtverify.userid
  return userId

}

module.exports  = {
  findUserByEmailorUsername,
  userIdFromRequest
}