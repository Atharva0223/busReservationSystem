const mongoose = require("mongoose");

const stopsSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    stop_name: { type: "string" },
    stop_state: { type: "string" },
    isDeleted: { type: "boolean", default: false, select: false },
  },
  {
    timestamps: true,
}
);

module.exports = mongoose.model("Stops", stopsSchema);
