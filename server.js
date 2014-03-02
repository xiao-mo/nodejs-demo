var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    server;
 
server = http.createServer(function(req, res){
    // your normal server code
    var path = url.parse(req.url).pathname;
    switch (path){
    case '/':
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>Hello! Try the <a href="/index.html">Socket.io Test</a></h1>');
        res.end();
        break;
    case '/index.html':
        fs.readFile(__dirname + path, function(err, data){
        if (err) return send404(res);
        res.writeHead(200, {'Content-Type': path == 'json.js' ? 'text/javascript' : 'text/html'})
        res.write(data, 'utf8');
        res.end();
        });
        break;
    default: send404(res);
    }
}),
 
send404 = function(res){
    res.writeHead(404);
    res.write('404');
    res.end();
};
 
server.listen(8088);
 
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
    console.log("Connection " + socket.id + " accepted.");
    socket.on('message', function(message){
        console.log("Received message: " + message + " - from client " + socket.id);
    });
    socket.on('disconnect', function(){
        console.log("Connection " + socket.id + " terminated.");
    });
});