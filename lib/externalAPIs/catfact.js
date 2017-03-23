'use strict';
const Promise = require('promise');

const rp = require('request-promise');
const singleCatFactUrl = 'http://catfacts-api.appspot.com/api/facts?number=1'
module.exports = {
    catfact
};

function catfact() {
    return new Promise(function(resolve,reject) {
        rp(singleCatFactUrl)
            .then(function(response) {
                response = JSON.parse(response);
                if(!response.success) reject();
                resolve(response.facts[0]);
            })
            .catch(function() {
                console.log('catfact api failed.')
            })
    })

}