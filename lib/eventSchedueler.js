'use strict';

module.exports = {
    scheduleEvent
};

function scheduleEvent(message) {
    var msg = message.content.substring(10);

    var date = msg.substring(0,10);
    var desc = msg.substring(12);

    var year = date.substring(0,2);
    var month = date.substring(2,4);
    var day = date.substring(4,6);
    var hour = date.substring(6,8);
    var minute = date.substring(8,10);

    console.log(msg);
    console.log(date);
    console.log(desc);
    console.log(year);
    console.log(month);
    console.log(day);
    console.log(hour);
    console.log(minute);
}