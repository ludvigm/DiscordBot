const rp = require('request-promise');
const Promise = require('promise');


module.exports = {
    requestLabels
};

function requestLabels(imageurl) {

    getbase64image(imageurl)
        .then(function (base64img) {
            //console.log(base64img);
            var payload = {
                "requests": [
                    {
                        "images": {
                            "content": base64img
                        },
                        "features": [
                            {
                                "type": "LABEL_DETECTION"
                            }
                        ]
                    }
                ]

            };

            var options = {
                method: 'POST',
                uri: 'https://vision.googleapis.com/v1/images:annotate?key=' + process.env.visionkey,
                body: payload,
                json: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': 'sv-SE,sv;q=0.8,en-US;q=0.5,en;q=0.3',
                    'Accept': 'application/json',
                    'Content-Length' : base64img.length
                }
            };

            rp(options)
                .then(function (response) {
                    console.log("in hier");
                    console.log(response);
                })
        });


}


function getbase64image(url) {
    return new Promise(function (resolve, reject) {
        rp({url: url, encoding: null })
            .then(function (res) {
                console.log(res);
                return resolve(new Buffer(res).toString('base64'));
            });
    })

}

