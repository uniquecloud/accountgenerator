const net = require('net');
const datadir = '/Users/liuhr/data/blockdata/ethereum/prod';
module.exports = {
    getAccountByUserIdentifier
};

var accountMap = {
};

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
    let client = net.connect(`${datadir}/geth.ipc`, ()=>{
        console.log("connect to server geth.ipc");
        client.write(JSON.stringify({"jsonrpc":"2.0","method":"personal_newAccount","params":[userPassword],"id":1}));
    });
    let dataString = '';
    client.on('data', (data)=>{
        dataString += data.toString();
        console.log(dataString);
        client.end();
    });
    client.on('end',()=>{
        let data = JSON.parse(dataString);
        account = {
            account: data.result,
            password: userPassword
        };
        accountMap[userIdentifier] = account;
        res.json(account);
        console.log("disconnect from server");
    });
};
