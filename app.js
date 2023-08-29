const http = require('http');

const server = http.createServer( (req,res) => {

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>NODEMON</title></head>');
    if(req.url === '/'){
        res.write(`<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></body>`);
        res.write('</html>');
        return res.end();
    }
    if(req.url === '/home'){
        res.write(`<body><h2>Welcome home</h2></body>`);
    }
    else if(req.url === '/about'){
        res.write(`<body><h2>Welcome to About Us page</h2></body>`);
    }
    else {        
        res.write(`<body><h2>Welcome to my Node Js project</h2></body>`);
    }
    res.write('</html>');
    res.end();
    // process.exit();
 } ) ;

server.listen(4000);