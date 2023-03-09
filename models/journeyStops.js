const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const journeyStopsSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    journey: {
      type: mongoose.Types.ObjectId,
      ref: "Journey",
      autopopulate: true,
    },
    stops: {
      type: mongoose.Types.ObjectId,
      ref: "Stops",
      autopopulate: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Employee",
      select: false,
      required: true,
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

journeyStopsSchema.plugin(autopopulate);

journeyStopsSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.createdAt;
    delete ret.updatedAt;
  },
  versionKey: false,
});

module.exports = mongoose.model("JourneyStops", journeyStopsSchema);
