
var request = require('request');

var options = {
    method: 'POST',
    url: 'https://site.hkt-cloud.com/api/sessions',
    headers: {
        'Authorization' :   'Basic YWRtaW5pc3RyYXRvckBzeXN0ZW06Um9vdDEyMyM=',
        'Accept'        :   'application/*+xml;version=5.5'
    },
    strictSSL : false
};
request(options, function (err, res, body){
    if(!err){
        var cookie = JSON.stringify(res.caseless.dict);
        cookie = cookie.split('[')[1].split(']')[0];
        console.log(cookie);
    } else {
        console.log(err);
    }
})
