'use strict';
const moment = require('moment');
const ScheduledEvent = require('../models/Event');
const Promise = require('promise');

module.exports = {
    scheduleEvent,
    getEvents
};

function scheduleEvent(message) {
    return new Promise(function (resolve, reject) {
        var msg = message.content.substring(10);

        var date = msg.substring(0, 10);
        var desc = msg.substring(12);

        //
        var year = '20' + date.substring(0, 2);
        var month = date.substring(2, 4) - 1;
        var day = date.substring(4, 6);
        var hour = date.substring(6, 8);
        var minute = date.substring(8, 10);

        try {
            var rebuildDate = new Date(year, month, day, hour, minute, 0);
        } catch (err) {
            reject(err);
        }

        var category;
        if (desc.endsWith('lol')) {
            category = 'lol';
            desc = desc.substring(0, desc.length - 3)
        } else if (desc.endsWith('cs')) {
            category = 'cs';
            desc = desc.substring(0, desc.length - 2)
        }

        rebuildDate.setTime(rebuildDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000);

        var newEvent = new ScheduledEvent({
            description: desc,
            date: rebuildDate,
            category: category
        });
        console.log('cat: ' + category);

        newEvent.save()
            .then(function () {
                console.log('Event saved.');
                resolve();
            })
    })
}

function getEvents(category) {
    console.log('requested category: ' + category)
    return new Promise(function (resolve, reject) {
        if (!category) {
            //Get all events
            ScheduledEvent.find({}, function (err, res) {
                if (err) reject(err);
                resolve(res);
            })
        } else {
            //Get by category
            ScheduledEvent.find({
                category: category,
            }, function (err, res) {
                if (err) reject(err);
                console.log(res);
                resolve(res);
            })
        }
    })
}