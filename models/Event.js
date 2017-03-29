'use strict';

let mongoose = require('mongoose');

let eventSchema = mongoose.Schema({
        description: {type: String, required: true},
        date: {type: Date, required: true},
        category: {type: String, required: false}
    },
    {
        timestamps: true
    }
);

let ScheduledEvent = mongoose.model('ScheduledEvent', eventSchema);

module.exports = ScheduledEvent;
