const express = require(`express`);
const {
  getAllRooms,
  addRoom,
  updateRoomDetails,
  deleteRoom,
  getRoomDetails,
} = require("../controllers/roomController");

const {
  isAuthenticatedUser,
  authorizedUser,
} = require("../middleware/authentication");

const router = express.Router();

router.route(`/room/new`).post(isAuthenticatedUser, addRoom);
router.route(`/:id/rooms`).get(isAuthenticatedUser, getAllRooms);
router
  .route(`/room/:id`)
  .put(isAuthenticatedUser, authorizedUser(`user`), updateRoomDetails)
  .delete(isAuthenticatedUser, authorizedUser(`user`), deleteRoom)
  .get(isAuthenticatedUser, authorizedUser(`user`), getRoomDetails);

module.exports = router;
