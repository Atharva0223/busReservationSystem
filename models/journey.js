const mongoose = require("mongoose");

const journeySchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    From: { type: "string" },
    To: { type: "string" },
    bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus" },
    tax: { type: mongoose.Schema.Types.ObjectId, ref: "Tax" },
    coupon: { type: mongoose.Schema.Types.ObjectId, ref: "Coupons" },
    fare: { type: Number },
    isDeleted: { type: "boolean", default: false },
  },
  {
    timestamps: true,
}
);

module.exports = mongoose.model("Journey", journeySchema);
