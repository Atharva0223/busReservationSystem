const mongoose = require('mongoose');

const taxSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        state_cross_tax: {type: Number},
        cgst: {type: Number},
        sgst: {type: Number},
        tolls: {type: Number},
        isDeleted: { default: false, type: Boolean },
    },{
      timestamps: true,
    }
);

module.exports = mongoose.model('Tax', taxSchema);