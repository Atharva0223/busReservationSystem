const mongoose = require('mongoose');

const taxSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        state_cross_tax: {type: Number},
        cgst: {type: Number},
        sgst: {type: Number},
        tolls: {type: Number},
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
    },{
      timestamps: true,
    }
);

taxSchema.set('toJSON', { 
  transform: function(doc, ret) {
    delete ret.createdAt;
    delete ret.updatedAt;
  },
  versionKey: false
});

module.exports = mongoose.model('Tax', taxSchema);