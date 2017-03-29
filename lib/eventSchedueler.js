'use strict';
const moment = require('moment');
const ScheduledEvent = require('../models/ScheduledEvent');
module.exports = {
    scheduleEvent
};

function scheduleEvent(message) {
    var msg = message.content.substring(10);

    var date = msg.substring(0,10);
    var desc = msg.substring(12);

    //
    var year = '20' + date.substring(0,2);
    var month = date.substring(2,4)-1;
    var day = date.substring(4,6);
    var hour = date.substring(6,8);
    var minute = date.substring(8,10);

    var rebuildDate = new Date(year, month, day, hour, minute,0);

    date.setTime( rebuildDate.getTime() - new Date().getTimezoneOffset()*60*1000 );

    var newEvent = new ScheduledEvent({
        description: desc,
        date: rebuildDate
    });

    newEvent.save()
        .then(function() {
            console.log('Event saved.');
        })
}