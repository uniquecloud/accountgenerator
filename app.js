"use strict";

var express = require("express");
var bodyParser = require("body-parser");

var controllerOfEth = require("./api/controller/EthControllerOfIPC");
var controllerOfBtc = require("./api/controller/BtcControllerOfRPC");

var app = express();
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.get("/account/eth/:userIdentifier", controllerOfEth.getAccountByUserIdentifier);
app.get("/account/btc/:userIdentifier", controllerOfBtc.getAccountByUserIdentifier);

var port = process.env.PORT || 8108;
app.listen(port);

console.log(`> app is listening ${port}`);
module.exports = app;
