import {Router} from "express"
const { postReview, deleteReview } = require("../controllers/review.controller")
const reviewRoute = Router()

reviewRoute.post("/postreview" , postReview)

reviewRoute.delete("/delete/:reviewid" , deleteReview)


module.exports = reviewRoute