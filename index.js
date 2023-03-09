const http = require("http");
const index = require("./app");
require("dotenv").config();

const port = process.env.PORT || 3000;

const server = http.createServer(index);

server.listen(port);
