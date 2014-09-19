var notp = require('notp'),
    t2 = require('thirty-two'),
    key = 'JV6WOZR4EVIWCRL5KNKHARBXIA',
    K = t2.decode(key),
	b32 = t2.encode(K);

console.log('Click on this link to gennerate a QR code, and use Google Authenticator on your phone to read it:');
verify();

function verify() {
    ask('Enter a code to verify', function(code) {
        if(notp.totp.verify(code, K, {})) {
            console.log('Success!!!');
        }
        console.log(notp.totp.verify(code, K, {}));
        verify();
    });
}



function ask(question, callback) {
    var stdin = process.stdin, stdout = process.stdout;

    stdin.resume();
    stdout.write(question + ": ");

    stdin.once('data', function(data) {
        data = data.toString().trim();
        callback(data);
    });
}