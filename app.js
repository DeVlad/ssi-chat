var express = require('express'),
    app = express(),
    port = process.env.PORT || 8000;
var socket = require('socket.io');

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

// Redirect to main page
app.get('/api', function (req, res) {
    res.redirect('/');
});

// Return 404 on missing pages
app.get('*', function (req, res) {
    res.status(404).send('Error: 404. Page not found !');
});

// Error handler
app.use(function (err, req, res, next) {
    // if URIError occurs
    if (err instanceof URIError) {
        err.message = 'Failed to decode param at: ' + req.url;
        err.status = err.statusCode = 400;
        return res.send('Error: ' + err.status + '<br>' + err.message);
    } else {
        // More errors...
    }
    next();
});

var server = app.listen(port, console.log('Listening on port:', port));
// Socket.io
var io = socket(server);

io.on('connection', function(socket){
    console.log('Established socket connection');
});
