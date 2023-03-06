const mongoose = require("mongoose");

const stopsSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    stop_name: { type: "string" },
    stop_state: { type: "string" },
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
    isDeleted: { type: "boolean", default: false, select: false },
  },
  {
    timestamps: true,
}
);

stopsSchema.set('toJSON', { 
  transform: function(doc, ret) {
    delete ret.createdAt;
    delete ret.updatedAt;
  },
  versionKey: false
});

module.exports = mongoose.model("Stops", stopsSchema);
