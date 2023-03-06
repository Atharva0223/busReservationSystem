const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true, immutable: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true, immutable: true },
  phone: { type: String, required: true },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    select: false,
    immutable: true
  },
  isDeleted: {type: Boolean, default: false, select: false}
},{
  timestamps: true,
});

customerSchema.set('toJSON', { 
  transform: function(doc, ret) {
    delete ret.createdAt;
    delete ret.updatedAt;
  },
  versionKey: false
});

module.exports = mongoose.model("Customer", customerSchema);
