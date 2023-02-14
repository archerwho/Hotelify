const mongoose = require(`mongoose`);

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Hotel must have a Name.`],
    trim: true,
  },
  description: [
    {
      keyPoints: { type: String, required: [true] },
      amenities: { type: String, required: [true] },
    },
  ],
  address: {
    type: String,
    required: [true, `Please enter Hotel Address.`],
  },
  contactDetails: [
    {
      phoneNo: {
        type: Number,
        required: [true, `Please enter contact number.`],
      },
      email: {
        type: String,
        required: [true, `Please enter Email ID.`],
      },
    },
  ],
  numOfRooms: {
    type: Number,
    required: [true],
  },
  dineInAvailability: { type: String, required: [true] },
  averageRating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: [true],
      },
      url: {
        type: String,
        required: [true],
      },
    },
  ],
  category: {
    type: String,
    required: [true, `Please enter the Hotel Category.`],
  },
  class: {
    type: String,
    required: [true, `Class of the Hotel is Required.`],
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      reviewedBy: {
        type: mongoose.Schema.ObjectId,
        ref: `User`,
        required: [true],
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  //   createdBy: {
  //     type: mongoose.Schema.ObjectId,
  //     ref: `User`,
  //     required: [true],
  //   },
  clientSince: {
    type: Date,
    default: Date.now,
  },
});

module.exports = new mongoose.model(`Hotel`, hotelSchema);
