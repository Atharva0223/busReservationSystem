const mongoose = require("mongoose");
const autopopulate = require('mongoose-autopopulate');

const bookingSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    customer: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
      autopopulate: true,
    },
    journey: {
      type: mongoose.Types.ObjectId,
      ref: "Journey",
      autopopulate: true,
    },
    passengers: [
      {
        passenger_name: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true },
      },
    ],
    bus: { type: mongoose.Types.ObjectId, ref: "Bus", autopopulate: true },
    fare: {type: Number},
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      select: false,
      immutable: true
    },
    isDeleted: {type:Boolean,select: false, default: false},
  },
  {
    timestamps: true
}
);

bookingSchema.plugin(autopopulate);

bookingSchema.set('toJSON', { 
  transform: function(doc, ret) {
    delete ret.createdAt;
    delete ret.updatedAt;
  },
  versionKey: false
});


module.exports = mongoose.model("Booking", bookingSchema);
