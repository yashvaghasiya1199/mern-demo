import { NextFunction, Response } from "express"

async function userAuth(req:any,res:Response,next:NextFunction){

    let token = req.cookies?.usertoken
    
    if(!token){
        return res.json({msg:"please first login",error:true})
    }

    req.user = token
    next()
}

module.exports = {
    userAuth
}