const fs = require('fs');

const reqHandler = (req, res) => {
    if(req.url === '/'){

        return fs.readFile('message.txt', {encoding: 'utf-8'}, (err, data) => {
            if(err){
                console.log(err);
            }
            console.log(data);
            res.write(`<html>`);
            res.write(`<head><title>NODE</title></head>`)
            res.write(`<body>${data}<br>`);
            res.write(`<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></body>`);
            res.write('</html>');
            return res.end();
        });
    }
            
    if(req.url === '/message' && req.method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);            
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            fs.writeFile('message.txt', parsedBody.split('=')[1], (err) => {
                if(err){
                    console.log(err);
                }
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
}
// module.exports = reqHandler;

module.exports = {
    handler: reqHandler,
    text: 'some text'
}

// module.exports.handler = reqHandler;
// module.exports.text = 'some text';

// exports.handler = reqHandler;
// exports.text = 'some text'