const mongoose = require(`mongoose`);

const roomSchema = new mongoose.Schema({
  roomNum: {
    type: Number,
    required: [true, `Please enter Room number.`],
  },
  description: { type: String, required: [true, `Room Description Required.`] },
  //   bellBoyDetails: [
  //     {
  //       assignedTo: {
  //         type: mongoose.Schema.ObjectId,
  //         ref: `HotelStaff`,
  //         required: [true],
  //       },
  //       name: {
  //         type: String,
  //         required: true,
  //       },
  //     },
  //   ],
  price: {
    type: Number,
    required: [true, "Room price is Required."]
  },
  addOns: { type: String, required: [true] },
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
  type: {
    type: String,
    required: [true, `Please enter the Hotel Category.`],
  },
  hotel: {
    type: mongoose.Schema.ObjectId,
    ref: `Hotel`,
    required: [true],
  },
});

module.exports = new mongoose.model(`Room`, roomSchema);
