const express = require(`express`);
const {
  getAllHotels,
  addHotel,
  updateHotelDetails,
  deleteHotel,
  getHotelDetails,
  hotelReview,
  getAllHotelReviews,
  deleteReview,
} = require("../controllers/hotelController");
const {
  isAuthenticatedUser,
  authorizedUser,
} = require("../middleware/authentication");

const router = express.Router();

router
  .route(`/hotels`)
  .get(isAuthenticatedUser, authorizedUser(`admin`), getAllHotels);
router.route(`/hotel/new`).post(isAuthenticatedUser, addHotel);
router
  .route(`/hotel/:id`)
  .put(isAuthenticatedUser, updateHotelDetails)
  .delete(isAuthenticatedUser, authorizedUser(`admin`), deleteHotel)
  .get(isAuthenticatedUser, authorizedUser(`admin`), getHotelDetails);
router.route(`/hotel/:id/review`).put(hotelReview);
router
  .route(`/hotel/:id/reviews`)
  .get(isAuthenticatedUser, getAllHotelReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
