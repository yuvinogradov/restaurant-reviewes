import express from "express"
import restaurantsCtrl from './restaurants.controller.js'
import ReviewsCtrl from './reviews.controller.js'

const router = express.Router()

router.route("/").get(restaurantsCtrl.apiGetRestaurants)

router
    .route("/review")                       // для такого пути,
    .post(ReviewsCtrl.apiPostReview)        // если это пост запрос, то будет использоваться метод apiPostReview и т.д.
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)


export default router