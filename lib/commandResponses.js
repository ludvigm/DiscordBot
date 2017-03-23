'use strict';
const Catfact = require('./externalAPIs/catfact');
const Commands = require('./listofcommands');
const TextChangers = require('./externalAPIs/textchangers');

module.exports = {
    ingame,
    avatar,
    catfact,
    listofcommands,
    yoda
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
