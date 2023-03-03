const mongoose = require("mongoose");
const autopopulate = require('mongoose-autopopulate');

const bookingSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    customer: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
      autopopulate: true,
    },
    journey: {
      type: mongoose.Types.ObjectId,
      ref: "Journey",
      autopopulate: true,
    },
    passengers: [
      {
        passenger_name: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true },
      },
    ],
    bus: { type: mongoose.Types.ObjectId, ref: "Bus", autopopulate: true },
    fare: {type: Number},
    isDeleted: { default: false, type: Boolean },
  },
  {
    timestamps: true
}
);

bookingSchema.plugin(autopopulate);

module.exports = mongoose.model("Booking", bookingSchema);
