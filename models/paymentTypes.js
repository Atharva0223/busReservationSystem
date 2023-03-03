const mongoose = require("mongoose");

const paymentTypeSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    payment_types: { type: String },
    isDeleted: { default: false, type: Boolean },
  },
  {
    timestamps: true,
}
);

module.exports = mongoose.model("Payment_Type", paymentTypeSchema);
