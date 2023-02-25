const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "employee" },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", employeeSchema);
