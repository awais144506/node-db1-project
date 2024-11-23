const express = require("express");
const routerAccounts = require('./accounts/accounts-router')
const server = express();

server.use(express.json());
server.use('/api/accounts', routerAccounts)
module.exports = server;
