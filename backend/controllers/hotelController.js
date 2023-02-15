const Hotel = require(`../models/hotelModel`);
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require(`../middleware/catchAsyncError`);
const ApiFeatures = require("../utils/apiFeatures");

//Add a Hotel - Archer Tech
exports.addHotel = catchAsyncError(async (req, res, next) => {
  req.body.hotelAddedBy = req.user.id;
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
  const resultsPerPage = 10;
  const hotelsCount = await Hotel.countDocuments();
  const apiFeature = new ApiFeatures(
    Hotel.find({}).populate(`hotelAddedBy`, `firstName lastName typeOfUser`),
    req.query
  )
    .search()
    .filter()
    .pagination(resultsPerPage);
  const hotels = await apiFeature.query;
  res.status(200).json({
    success: true,
    hotels,
    hotelsCount,
    resultsPerPage,
  });
});

// Post New Review
exports.hotelReview = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, rating, comment } = req.body;
  const review = {
    firstName: firstName,
    lastName: lastName,
    rating: Number(rating),
    comment: comment,
  };

  const hotel = await Hotel.findById({ _id: req.params.id });

  hotel.reviews.push(review);
  hotel.numberOfReviews = hotel.reviews.length;

  let avg = 0;
  hotel.reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });
  hotel.averageRating = avg / hotel.reviews.length;

  await hotel.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// View all reviews for a specific Hotel
exports.getAllHotelReviews = catchAsyncError(async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id);
  if (!hotel) {
    return next(new ErrorHandler(`Hotel Not Found`, 404));
  }

  res.status(200).json({
    success: true,
    reviews: hotel.reviews,
  });
});

// Delete Review for a Hotel
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id);
  if (!hotel) {
    return next(new ErrorHandler(`Hotel Not Found`, 404));
  }

  const reviews = hotel.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
  let avg = 0;
  reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });
  const averageRating = avg / reviews.length ? avg / reviews.length : 0;
  const numberOfReviews = reviews.length;
  await Hotel.findByIdAndUpdate(
    req.params.id,
    {
      reviews,
      averageRating,
      numberOfReviews,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: `Review deleted`,
  });
});
