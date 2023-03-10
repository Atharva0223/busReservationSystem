const http = require("http");
const index = require("./app");
require("dotenv").config();

const port = 3000;

const server = http.createServer(index);

server.listen(port);
