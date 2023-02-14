const express = require(`express`);
const {
  getAllHotels,
  addHotel,
  updateHotelDetails,
  deleteHotel,
  getHotelDetails,
} = require("../controllers/hotelController");

const router = express.Router();

router.route(`/hotels`).get(getAllHotels);
router.route(`/hotel/new`).post(addHotel);
router
  .route(`/hotel/:id`)
  .put(updateHotelDetails)
  .delete(deleteHotel)
  .get(getHotelDetails);

module.exports = router;
