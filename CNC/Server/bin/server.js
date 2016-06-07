#!/usr/bin/env node

PORT   = parseInt(process.argv[2] || '8080', 10);
server = require(__dirname + '/../source/server');//module.exports object from source/server.js
server.listen(PORT);
