const http = require('http');

const server = http.createServer((request, response) => {
  response.end('Whoaw putaing ça marche !!! :)');
});

server.listen(process.env.PORT || 3000);