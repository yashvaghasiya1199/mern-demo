const jwt = require("jsonwebtoken")

function jwtTokenCreate(payload:object){
    const jwtcreate = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"48h"})
    return jwtcreate
   }

module.exports = { 
    jwtTokenCreate
}