import { Response,NextFunction } from "express"

function driverAuth(req: any, res: Response, next: NextFunction) {

    const token = req.cookies?.drivertoken;
    if (!token) {
        return res.json({ msg: "please first login", error: true })
    }
    req.driver = token
    next()

}

module.exports = {
    driverAuth
}

