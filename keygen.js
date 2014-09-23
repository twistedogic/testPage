var speakeasy = require('speakeasy');
var t2 = require('thirty-two');
var key = speakeasy.generate_key({length: 20, google_auth_qr: true});
console.log(key);
var key32 = key.base32;
console.log(t2.decode(key32));