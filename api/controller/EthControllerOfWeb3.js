var Web3Module = require("web3");
var web3 = new Web3Module();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

module.exports = {
    getAccountByUserIdentifier
};

var accountMap = {
};

function getAccountByUserIdentifier(req, res){
    let userIdentifier = req.params.userIdentifier;
    let userPassword = req.params.password;
    let account = accountMap[userIdentifier];
    console.log(`userIdentifier: ${userIdentifier}`);
    console.log(`userPassword:${userPassword}`);
    console.log(`account:${account}`);
    if(account) {
        if(account.password == userPassword){
            res.json({
                account
            });
            return;
        }else{
            res.status(500);
            res.json({
                message:"账号错误"
            });
            return;
        }
    };
    let accountAddress = web3.eth.coinbase;
    console.log(`accountAddress:${accountAddress}`);
    res.json({
        account: {
            account: accountAddress,
            password: userPassword
        }
    });
};
