const mongoose = require("mongoose");

const busSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    plate: { type: String, required: true },
    capacity: { type: Number, required: true },
    route: { type: String, required: true },
    fare: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    stops: { type: String, required: true },
    isDeleted: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bus", busSchema);
