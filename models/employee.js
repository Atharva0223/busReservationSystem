const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, immutable: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: { type: Number, required: true },
    password: { type: String, required: true, immutable: true},
    role: { type: String, required: true },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      select: false,
      immutable: true
    },
    isDeleted: { type: Boolean, default: false, select: false },
  },
  {
    timestamps: true,
}
);

employeeSchema.set('toJSON', { 
  transform: function(doc, ret) {
    delete ret.createdAt;
    delete ret.updatedAt;
  },
  versionKey: false
});

module.exports = mongoose.model("Employee", employeeSchema);
