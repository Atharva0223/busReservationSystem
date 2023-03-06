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
    createdBy: {type: mongoose.Types.ObjectId,
      ref: 'Employee',
      required: true,
      select: false
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      select: false,
      immutable: true
    },
    isDeleted: { type: "boolean", default: false, select: false },
  },
  {
    timestamps: true,
}
);

journeySchema.set('toJSON', { 
  transform: function(doc, ret) {
    delete ret.createdAt;
    delete ret.updatedAt;
  },
  versionKey: false
});

module.exports = mongoose.model("Journey", journeySchema);
