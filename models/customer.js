const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  isDeleted: {type: Boolean, default: false}
},{
  timestamps: true,
});

module.exports = mongoose.model("Customer", customerSchema);
