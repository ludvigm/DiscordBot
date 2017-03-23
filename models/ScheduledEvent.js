'use strict';

let mongoose = require('mongoose');

let eventSchema = mongoose.Schema({
        title: {type: String, required: true},
        code: {type: String, required: true},
        description : {type: String, required: false},
        createdBy: {type: String}
    },
    {
        timestamps: true
    }
);

let Snippet = mongoose.model('ScheduledEvent', eventSchema);

module.exports = ScheduledEvent;
