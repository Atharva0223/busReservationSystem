const mongoose = require("mongoose");

const seatsSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    seat_type: { type: String },
    seat_fare: { type: Number },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Employee",
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
seatsSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.createdAt;
    delete ret.updatedAt;
  },
  versionKey: false,
});

module.exports = mongoose.model("Seats", seatsSchema);
