'use strict';

let mongoose = require('mongoose');

let eventSchema = mongoose.Schema({
        description: {type: String, required: true},
        date: {type: Date, required: true},
    },
    {
        timestamps: true
    }
);

let ScheduledEvent = mongoose.model('ScheduledEvent', eventSchema);

module.exports = ScheduledEvent;
