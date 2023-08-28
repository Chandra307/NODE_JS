const http = require('http');

// function rqListener (req, res) {
//     console.log('Ravi Chandra');
// }

const server = http.createServer( (req,res) => console.log('Ravi Chandra') ) ;

server.listen(4000);