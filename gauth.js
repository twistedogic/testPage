var speakeasy = require('speakeasy');
var fs = require('fs');
var key = speakeasy.generate_key({length: 20});
console.log(key.base32);
fs.writeFileSync(__dirname+'/key', key.base32);