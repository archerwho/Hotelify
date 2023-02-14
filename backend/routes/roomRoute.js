const express = require(`express`);
const {
  getAllRooms,
  addRoom,
  updateRoomDetails,
  deleteRoom,
  getRoomDetails,
} = require("../controllers/roomController");

const router = express.Router();

router.route(`/room/new`).post(addRoom);
router.route(`/rooms`).get(getAllRooms);
router
  .route(`/room/:id`)
  .put(updateRoomDetails)
  .delete(deleteRoom)
  .get(getRoomDetails);

module.exports = router;
