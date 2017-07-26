const bitcoin = require('bitcoin');

var client = new bitcoin.Client({
    port:8332,
    host:'localhost',
    user: 'bitcoin',
    pass: 'password',
    timeout: 30000
});

module.exports = {
    getAccountByUserIdentifier
};
var accountMap = {};

function getAccountByUserIdentifier(req, res){
    let userIdentifier = req.params.userIdentifier;
    let account = accountMap[userIdentifier];

    client.getNewAddress( userIdentifier, (err, address, resHeader)=>{
        account = {
            account: address
        };
        accountMap[userIdentifier] = account;
        res.status(200);
        res.json(account);
    });
};
