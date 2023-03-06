const mongoose = require("mongoose");
const autopopulate = require('mongoose-autopopulate');

const busSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, immutable: true },
    plate: { type: String, required: true, unique: true, immutable: true },
    type_of_bus: { type: String, required: true },
    capacity: { type: Number, required: true },
    available_seats: { type: Number },
    seats: {
      type: mongoose.Types.ObjectId,
      ref: "Seats",
      autopopulate: true,
    },
    working_days: [
      {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
    ],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Employee",
      required: true,
      select: false,
      immutable: true,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "Employee",
      select: false,
    },
    isDeleted: { default: false, type: Boolean, select: false },
  },
  {
    timestamps: true,
  }
);

busSchema.plugin(autopopulate);

busSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.createdAt;
    delete ret.updatedAt;
  },
  versionKey: false,
});

module.exports = mongoose.model("Bus", busSchema);
