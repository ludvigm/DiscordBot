'use strict';
const Promise = require('promise');


module.exports = {
    getPrintableCommands: getPrintableFormat
};

const listofcommands = {
    commands: [
        {'command': '!ingame', 'description': 'Displays which users are currently playing, and what game.'},
        {
            'command': '!avatar',
            'description': 'Gives you a URL to your avatar, and some image recognition info from Google\'s vision API'
        },
        {
            'command': '!catfact',
            'description': '...'
        },
        {
            'command': '!listofcommands OR !help',
            'description': 'Shows you this list of Commands.'
        },
        {
            'command': '!yoda \ <insert sentence>',
            'description': 'Turns a sentence to yoda-speak.'
        }
    ]
};

function getPrintableFormat() {
    return new Promise(function(resolve, reject) {
        var str = "\nCommand - Description";
        listofcommands.commands.forEach(function(command) {
            str = str +"\n"+ command.command + " - " + command.description;
        });
        resolve(str);
    })

}
