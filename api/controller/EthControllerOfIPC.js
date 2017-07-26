const net = require('net');
const datadir = '/mnt/blockchain/ethereumdata/.ethereum';
module.exports = {
    getAccountByUserIdentifier
};

var accountMap = {
};

function getAccountByUserIdentifier(req, res){
    let userIdentifier = req.params.userIdentifier;
    let account = accountMap[userIdentifier];

    let client = net.connect(`${datadir}/geth.ipc`, ()=>{
        client.write(JSON.stringify({"jsonrpc":"2.0","method":"personal_newAccount","params":[userIdentifier],"id":1}));
    });

    let dataString = '';
    client.on('data', (data)=>{
        dataString += data.toString();
        client.end();
    });

    client.on('end',()=>{
        let data = JSON.parse(dataString);
        account = {
            account: data.result
        };
        accountMap[userIdentifier] = account;
        res.status(200)
        res.json(account);
    });
};
