'use strict';

let mongoose = require('mongoose');
mongoose.Promise = Promise;

module.exports = {
    initialize : function () {

        let db = mongoose.connection;

        //Log on err/connect
        db.on('error', console.error.bind(console, "connection error:"));

        db.once('open', function() {
            console.log('Mongoose up')
        });

        //Close database connection if the node process ends for some reason.
        process.on("SIGINT", function() {
            db.close(function() {
                console.log("Mongoose connection disconnected through app termination.");
                process.exit(0);
            });
        });
        mongoose.connect('mongodb://127.0.0.1/scheduleDB');



    }
};
