let http = require("http"); //importing a model (the http library)
let port = 3000 //making a port
const callBack = (req, res) => {
    console.log('Client Request: ' + req)
    // Send the HTTP header 
    // HTTP Status: 200 : OK
    // Content Type: text/html
    res.writeHead(200, {'Content-Type': 'text/html'});
    let content = "<h1>Hello World</h1>"
    res.end(content);
}

http.createServer(callBack).listen(port);
console.log('Server running at http://localhost:3000');