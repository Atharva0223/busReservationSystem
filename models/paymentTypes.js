const mongoose = require("mongoose");

const paymentTypeSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    payment_types: { type: String },
    createdBy: {type: mongoose.Schema.Types.ObjectId,
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
    isDeleted: { default: false, type: Boolean, select: false },
  },
  {
    timestamps: true,
}
);

paymentTypeSchema.set('toJSON', { 
  transform: function(doc, ret) {
    delete ret.createdAt;
    delete ret.updatedAt;
  },
  versionKey: false
});

module.exports = mongoose.model("Payment_Type", paymentTypeSchema);
