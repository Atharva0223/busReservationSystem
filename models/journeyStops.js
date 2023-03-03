const mongoose = require('mongoose');

const journeyStopsSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        journey: {type: mongoose.Types.ObjectId},
        stops: {type: mongoose.Types.ObjectId},
        isDeleted: { default: false, type: Boolean },
    },{
      timestamps: true,
  }
);

module.exports = mongoose.model('JourneyStops', journeyStopsSchema);