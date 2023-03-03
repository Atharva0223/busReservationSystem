const mongoose = require("mongoose");

const seatsSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    seat_type: { type: String },
    seat_fare: { type: Number },
    isDeleted: { default: false, type: Boolean },
  },
  {
    timestamps: true,
}
);

module.exports = mongoose.model("Seats", seatsSchema);
