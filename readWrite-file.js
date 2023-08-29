const http = require('http');
const fs = require('fs');



const server = http.createServer( (req,res) => {
    
    if(req.url === '/'){
        res.write('<html>');
        res.write('<head><title>NODEMON</title></head>');
        res.write(`<body>`);
        if(fs.existsSync('message.txt')){

            res.write(`${Buffer.concat( [fs.readFileSync('message.txt' )] ).toString()}<br>`);
        } else {
            res.write(`undefined<br>`);
        }

        
        res.write(`<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></body>`);
        res.write('</html>');
        return res.end();
    }
    if(req.url === '/message' && req.method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);            
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            fs.writeFile('message.txt', parsedBody.split('=')[1], (err) => {

                res.statusCode = 302;
                res.setHeader('Location', '/');                
                return res.end();
            });
        })
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