var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var app = express();
var notp = require('notp');
var t2 = require('thirty-two');
var key = 'JV6WOZR4EVIWCRL5KNKHARBXIA';
var secret = t2.decode(key);
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

app.post('/login',function(req,res){
    if(req.body){
        var key = 'JV6WOZR4EVIWCRL5KNKHARBXIA';
        var secret = t2.decode(key);
        var data = req.body;
        console.log(data);
        var otp = data.otp;
        var tenantId = data.tenant;
        var auth = data.auth;
        var check = notp.totp.verify(otp, secret, {});
        var options = {
            method: 'POST',
            url: 'https://site.hkt-cloud.com/api/sessions',
            headers: {
                'Authorization' :   'Basic '+ auth,
                'Accept'        :   'application/*+xml;version=5.5'
            },
            strictSSL : false
        };
        request(options, function (err, resp, body){
            if(!err){
                var cookie = JSON.stringify(resp.caseless.dict);
                if(cookie.split(',').length > 6){
                    var cookie = JSON.stringify(resp.caseless.dict);
                    cookie = cookie.split('[')[1].split(']')[0];
                    cookie = cookie.split(';')[0];
                    cookie = cookie.split('"')[1];
                    cookie = cookie.split('=')[1];
                    cookie = 'vcloud_session_id=' + cookie + '=; domain=abc.com; Secure';
                    res.setHeader("set-cookie", cookie);
                    console.log(cookie);
                    if(check){
                        res.redirect('https://site.abc.com/cloud/org/'+tenantId);
                        console.log('OK!');
                    } else {
                        res.status(404).send('Not found');
                    }
                } else {
                    res.status(404).send('Not found');
                }
            } else {
                console.log(err);
                
            }
        })
        
        
    }
    
    
})

app.listen(80);