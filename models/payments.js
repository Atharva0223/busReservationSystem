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
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
      required: true,
      select: false,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "Employee",
      select: false,
      immutable: true,
    },
    isDeleted: { default: false, type: Boolean, select: false },
  },
  {
    timestamps: true,
  }
);

paymentsSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.createdAt;
    delete ret.updatedAt;
  },
  versionKey: false,
});

module.exports = mongoose.model("Payments", paymentsSchema);
