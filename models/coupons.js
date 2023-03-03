const mongoose = require('mongoose');

const couponsSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        name: {type: String},
        details: {type: String},
        code: {type: String},
        value: {type: Number},
        validity_start: {type: Date},
        validity_end: {type: Date},
        isDeleted: { default: false, type: Boolean },
    },{
      timestamps: true,
  }
);

module.exports = mongoose.model('Coupons', couponsSchema);