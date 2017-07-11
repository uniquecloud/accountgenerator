const bitcoin = require('bitcoin');

var client = new bitcoin.Client({
    port:8332,
    host:'localhost',
    user: 'bitcoinrpc',
    pass: 'xxxyyyxxxyyyxxxyyyxxxyyyaskasdjfksjfkj3291235',
    timeout: 30000
});

module.exports = {
    getAccountByUserIdentifier
};
var accountMap = {};

function getAccountByUserIdentifier(req, res){
    let userIdentifier = req.params.userIdentifier;
    let userPassword = req.params.password;
    let account = accountMap[userIdentifier];
    
    if(account) {
        if(account.password == userPassword){
            res.json(account);
            return;
        }else{
            res.status(500);
            res.json({
                message:"账号错误"
            });
            return;
        }
    };
    client.getNewAddress( userIdentifier, (err, address, resHeader)=>{
        account = {
            account: address,
            password: userPassword
        };
        accountMap[userIdentifier] = account;
        res.status(200);
        res.json(account);
    });
};

