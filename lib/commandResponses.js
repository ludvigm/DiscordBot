'use strict';
const Catfact = require('./externalAPIs/catfact');
const Commands = require('./listofcommands');
const TextChangers = require('./externalAPIs/textchangers');
const schedule = require('./eventSchedueler');

module.exports = {
    ingame,
    avatar,
    catfact,
    listofcommands,
    yoda,
    scheduleEvent,
    listEvents
};


function ingame(currUsers, message) {

    var offline = [];
    var online = [];
    var idle = [];
    var dnd = [];
    var ingame = [];

    return new Promise(function (resolve, reject) {
        if (currUsers.size == 0) reject();
        currUsers.forEach(function (user) {
            switch (user.presence.status) {
                case 'online':
                    online.push(user);
                    if (user.presence.game) {
                        ingame.push({
                            username: user.username,
                            game: user.presence.game
                        })
                    }
                    break;
                case 'offline':
                    offline.push(user);
                    break;
                case 'idle':
                    idle.push(user);
                    break;
                case 'dnd':
                    dnd.push(user);
                    break;
            }
        });
        resolve();
    }).then(function () {

        var reply = "There are " + online.length + " users online.";
        if (ingame.length > 0) {
            reply = reply + "\nIngame:";
            ingame.forEach(function (gamer) {
                reply = reply + "\n" + gamer.username + " playing " + gamer.game.name;
                if (gamer.game.url) reply = reply + "Streaming: " + gamer.game.url;
            })

        }
        if (idle.length > 0) {
            reply = reply + "\nUsers AFK: " + idle.length;
        }
        if (dnd.length > 0) {
            reply = reply + "\n Users not to disturb: ";
            dnd.forEach(function (user) {
                reply = reply + user.username + "\n"
            })
        }
        if (!reply) reject();
        message.reply(reply);
    }).catch(function (err) {
        console.log(err)
    })
}

function avatar(message) {
    return new Promise(function (resolve, reject) {
        message.reply(message.author.avatarURL);
    });
}

function catfact(message) {
    Catfact.catfact()
        .then(function (catinfo) {
            message.reply(catinfo)
        })
}

function listofcommands(message) {
    Commands.getPrintableCommands()
        .then(function (printableformat) {
            message.reply(printableformat)
        })
}

function yoda(message, sentence) {
    TextChangers.yoda(sentence)
        .then(function (returnsentence) {
            message.reply(returnsentence);
        })
}

function scheduleEvent(message) {
    message.reply('Event saved!');
}
function listEvents(message) {
    var category = undefined;
    if (message.content.length > 12) {
        category = message.content.substr(12, message.content.length);
    } else if (message.content.length > 15) {
        //invalid category, !showevents lol = 15.
        //reply.error();
    }
    schedule.getEvents(category)
        .then(function (events) {
            makeEventListStr(events)
                .then(function (replystr) {
                    message.reply(replystr);
                })
        })
        .catch(function (err) {
            console.log(err);
        })
}

function makeEventListStr(events) {
    return new Promise(function (resolve, reject) {
        var replystr = '';
        if (events.length === 0) {
            replystr = 'No events scheduled! (Or i am bugged, sorry)'
        }
        events.forEach(function (event) {
            replystr = replystr + event.date + ' - ' + event.description + '\n';
        });
        resolve(replystr);
    })
}