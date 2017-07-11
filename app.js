"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var oauthServer = require("oauth2-server");

var controllerOfEth = require("./api/controller/EthControllerOfIPC");
var controllerOfBtc = require("./api/controller/BtcControllerOfRPC");

var app = express();
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.oauth = oauthServer({
  model: require('./api/model/oauth2_model'),
  grants: ['password', 'refresh_token'],
  debug: true
});

app.get("/account/eth/:userIdentifier/:password", controllerOfEth.getAccountByUserIdentifier);
app.get("/account/btc/:userIdentifier/:password", controllerOfBtc.getAccountByUserIdentifier);
        

var port = process.env.PORT || 11010;
app.listen(port);

console.log(`> app is listening ${port}`);
module.exports = app;
