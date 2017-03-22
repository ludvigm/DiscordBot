'use strict';
module.exports = {
    whoison,
    avatar,
};

function whoison(currUsers, message) {

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
                            user: user,
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
        console.log(offline.length, online.length, idle.length, dnd.length, ingame.length);

        var reply = "There are " + online.length + " users online.";
        if (ingame.length > 0) {
            reply = reply + "\n Ingame:"
        }
        if (idle.length > 0) {
            reply = reply + "\n" + idle.length + " slackers are AFK."
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
    return new Promise(function(resolve, reject) {
        message.reply(message.author.avatarURL);
    });
}
