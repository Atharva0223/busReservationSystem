const mongoose = require('mongoose');

const couponsSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        name: {type: String, immutable: true},
        details: {type: String},
        code: {type: String},
        value: {type: Number},
        validity_start: {type: Date},
        validity_end: {type: Date},
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

couponsSchema.set('toJSON', { 
  transform: function(doc, ret) {
    delete ret.createdAt;
    delete ret.updatedAt;
  },
  versionKey: false
});

module.exports = mongoose.model('Coupons', couponsSchema);