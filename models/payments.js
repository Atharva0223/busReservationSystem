const mongoose = require("mongoose");

const paymentsSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    booking: {
      type: mongoose.Types.ObjectId,
      ref: "Journey",
      autopopulate: true,
    },
    fare: { type: Number },
    payment_types: {
      type: String,
      require: true,
    },
    isDeleted: { default: false, type: Boolean },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payments", paymentsSchema);
