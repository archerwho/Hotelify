const Hotel = require(`../models/hotelModel`);
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require(`../middleware/catchAsyncError`);

//Add a Hotel - Archer Tech
exports.addHotel = catchAsyncError(async (req, res, next) => {
  const hotel = await Hotel.create(req.body);
  res.status(201).json({
    success: true,
    hotel,
  });
});

// Update Hotel Details - Archer Tech / Logged In client
exports.updateHotelDetails = catchAsyncError(async (req, res, next) => {
  let hotel = await Hotel.findById(req.params.id);
  if (!hotel) {
    return next(new ErrorHandler(`Hotel Not Found.`, 404));
  }
  hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    hotel,
  });
});

// Delete Hotel - Archer Tech
exports.deleteHotel = catchAsyncError(async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id);
  if (!hotel) {
    return next(new ErrorHandler(`Hotel Not Found.`, 404));
  }
  await hotel.remove();
  res.status(200).json({
    success: true,
    message: `Hotel Deleted From the DB.`,
  });
});

// Get Hotel Details - Archer Tech / Admin
exports.getHotelDetails = catchAsyncError(async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id);
  if (!hotel) {
    return next(new ErrorHandler(`Hotel Not Found.`, 404));
  }
  res.status(200).json({
    success: true,
    hotel,
  });
});

// Get All Hotels - Archer Tech
exports.getAllHotels = catchAsyncError(async (req, res, next) => {
  const hotels = await Hotel.find();
  res.status(200).json({
    success: true,
    hotels,
  });
});
