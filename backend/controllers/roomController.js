const Room = require(`../models/roomModel`);
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require(`../middleware/catchAsyncError`);

//Add Rooms - Admin
exports.addRoom = catchAsyncError(async (req, res, next) => {
  const room = await Room.create(req.body);
  if (!room) {
    return next(new ErrorHandler(`No Rooms yet.`, 404));
  }
  res.status(201).json({
    success: true,
    room,
  });
});

// Update Room Details - Admin
exports.updateRoomDetails = catchAsyncError(async (req, res, next) => {
  let room = await Room.findById(req.params.id);
  if (!room) {
    return next(new ErrorHandler(`Room Not Found.`, 404));
  }
  room = await Room.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    room,
  });
});

// Delete Room - Archer Tech
exports.deleteRoom = catchAsyncError(async (req, res, next) => {
  const room = await Room.findById(req.params.id);
  if (!room) {
    return next(new ErrorHandler(`Room Not Found.`, 404));
  }
  await room.remove();
  res.status(200).json({
    success: true,
    message: `Room Deleted From the DB.`,
  });
});

// Get Room Details - Archer Tech / Admin
exports.getRoomDetails = catchAsyncError(async (req, res, next) => {
  const room = await Room.findById(req.params.id);
  if (!room) {
    return next(new ErrorHandler(`Room Not Found.`, 404));
  }
  res.status(200).json({
    success: true,
    room,
  });
});

// Get All Rooms of a Hotel- Admin
exports.getAllRooms = catchAsyncError(async (req, res, next) => {
  const rooms = await Room.find({ hotel: req.params.id }).populate(
    `hotel`,
    `name`
  );
  res.status(200).json({
    success: true,
    rooms,
  });
});
