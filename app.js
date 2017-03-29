'use strict';
const discord = require('discord.js');
const Promise = require('promise');
const reply = require('./lib/commandResponses');
const schedule = require('./lib/eventSchedueler');
const vision = require('./lib/externalAPIs/visionapi');

require('dotenv').config();

// Connect to mongo
require('./lib/mongoHelper').initialize();

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

   // vision.requestLabels('https://s-media-cache-ak0.pinimg.com/736x/07/c3/45/07c345d0eca11d0bc97c894751ba1b46.jpg');
});


//Message listener
bot.on('message', message => {
    //Case insensetive Commands
    if (message.content.charAt(0) === '!') {
        message.content = message.content.toLowerCase();
    }

    if (message.content === '!avatar') {
        reply.avatar(message);
    }

    if (message.content === '!ingame') {
        reply.ingame(bot.users, message);
    }

    if(message.content === '!catfact') {
        reply.catfact(message);
    }

    if(message.content === '!listofcommands' || message.content === '!help') {
        reply.listofcommands(message);
    }

    if(message.content.startsWith('!yoda ')) {
        var sentence = message.content.substr(5);
        reply.yoda(message,sentence);
    }

    if(message.content.startsWith('!newevent') || message.content.startsWith('!createevent')) {
        schedule.scheduleEvent(message)
            .then(function() {
               reply.scheduleEvent(message);
            })
            .catch(function(err) {
                console.log(err);
            });
        //Reply with "Event scheduled for YYDD..." etc.
    }

    if(message.content.startsWith('!showevents')) {
        reply.listEvents(message)
    }

});

//login
bot.login(token);


