const http = require('http');
const index = require('./index');

const port = 3000;

const server = http.createServer(index);

server.listen(port);