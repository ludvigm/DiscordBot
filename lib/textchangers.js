'use strict';
const Promise = require('promise');
const rp = require('request-promise');

module.exports = {
    yoda,
};


function yoda(sentence) {
    var endpoint = 'https://yoda.p.mashape.com/yoda?sentence=';
    var url = endpoint+sentence;

    return new Promise(function(resolve, reject) {
        rp(url, {
            'headers': {
                'X-Mashape-Key': process.env.mashapekey
            }
        })
            .then(function(yodasentence) {
                console.log(yodasentence);
                resolve(yodasentence)
            })
    });
}