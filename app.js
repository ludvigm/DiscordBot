'use strict';
const discord = require('discord.js');
const Promise = require('promise');

require('dotenv').config();

// import the discord.js module
const Discord = require('discord.js');

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();
// the token of your bot - https://discordapp.com/developers/applications/me
const token = process.env.token;

// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.

var textchannels = [];
var voicechannels = [];

//Setup
bot.on('ready', () => {
    console.log('I am ready!');
    var channels = bot.channels;
    channels.forEach(function (channel) {
        if (channel.type === 'voice') {
            voicechannels.push(channel);
        } else if (channel.type === 'text') {
            textchannels.push(channel);
        }
    });


});

function currentUsersStatus() {

    var currUsers = bot.users;
    var offline = [];
    var online = [];
    var idle = [];
    var dnd = [];
    var ingame = [];

    return new Promise(function (resolve, reject) {
        if(currUsers.size == 0) reject();
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
            reply = reply + "\n games games blabla"
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
        if(!reply) reject();
        return Promise.resolve(reply);
    }).catch(function(err) {
        console.log(err)
    })
}

//Message listener
bot.on('message', message => {
    // if the message is "what is my avatar",
    if (message.content === '!avatar') {
        // send the user's avatar URL
        message.reply(message.author.avatarURL);
    }

    if (message.content === '!test') {
        console.log(message.author.client.presences)
    }

    if (message.content === '!game') {
        currentUsersStatus().then(function(str) {
            console.log("THE DAMN STRING: " + str);
            if(!str) reject();
            message.reply(str);
        }).catch(function() {
            console.log("error")
        })
    }
});

//login
bot.login(token);