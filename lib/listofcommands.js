'use strict';
const Promise = require('promise');


module.exports = {
    getPrintableCommands: getPrintableFormat
};

const listofcommands = {
    commands: [
        {
            command: '!ingame',
            description: 'Displays which users are currently playing, and what game.'
        }, {
            command: '!avatar',
            description: 'Gives you a URL to your avatar, and some image recognition info from Google\'s vision API'
        }, {
            command: '!catfact',
            description: '...'
        }, {
            command: '!listofcommands OR !help',
            description: 'Shows you this list of Commands.'
        }, {
            command: '!yoda \ <insert sentence>',
            description: 'Turns a sentence to yoda-speak.'
        }, {
            command: '!newevent\ <YYMMDDHHMM> <Optional Category>. ',
            description: 'Creates and saves a new event. Date is 10 numbers on the above format, followed by space then your description of the event.' +
            ' End the description with whitespace plus \"lol\" or \"cs\" to categorize it.'
        }, {
            command : '!showevents\ <Optional Category>',
            description: 'Shows events that has not yet occured in time. Follow the command up by whitespace and \"lol\" or \"cs\ to only get events from one category.'
        }
    ]

};

function getPrintableFormat() {
    return new Promise(function (resolve, reject) {
        var str = "\nCommand - Description";
        listofcommands.commands.forEach(function (command) {
            str = str + "\n" + command.command + " - " + command.description;
        });
        resolve(str);
    })

}
