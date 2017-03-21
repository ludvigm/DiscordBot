'use strict';
const discord = require('discord.js');
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
    channels.forEach(function(channel) {
        if(channel.type === 'voice') {
            voicechannels.push(channel);
        } else if(channel.type === 'text') {
            textchannels.push(channel);
        }
    });
});

//Message listener
bot.on('message', message => {
    // if the message is "what is my avatar",
    console.log(message.channel.name);
    if (message.content === 'what is my avatar') {
        // send the user's avatar URL
        message.reply(message.author.avatarURL);
    }

    if(message.content === 'who is the man?') {
        message.reply()
    }
});

//login
bot.login(token);