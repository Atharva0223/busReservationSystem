const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const busSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    plate: { type: String, required: true, unique: true },
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
    isDeleted: { default: false, type: Boolean },
  },
  {
    timestamps: true,
}
  
);

busSchema.plugin(autopopulate);

module.exports = mongoose.model("Bus", busSchema);
