const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    customer: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
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
    payment: {
      payment_type: { type: String, required: true },
      fare: { type: Number },
      amount: { type: Number },
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.set("toObject", { autopopulate: true });
bookingSchema.set("toJSON", { autopopulate: true });

bookingSchema.plugin(require("mongoose-autopopulate"));

bookingSchema.pre("save", async function (next) {
  try {
    const bus = await mongoose.model("Bus").findById(this.bus);

    // if (bus && bus.available_seats >= this.passengers.length) {
    //   bus.available_seats -= this.passengers.length;
      await bus.save();
    // } else {
      // throw new Error("Bus not found or insufficient seats available.");
    // }   
    this.payment.fare = bus.fare;
    this.payment.amount = this.payment.fare * this.passengers.length;

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
