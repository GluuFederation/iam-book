// Setup variables
var bodyParser = require('body-parser');
var express = require('express');
var request = require('request');
var settings = require("./settings");
var path = require('path');
var app = express();

var client_id = settings.client_id;
var client_secret = settings.client_secret;
var port = settings.port;
var host = settings.host;
var redirectURIPath =  settings.redirectURIPath;
var urlShortenScope = "https://www.googleapis.com/auth/urlshortener";
var redirectURI = settings.redirectURI;
var url = 'https://accounts.google.com/o/oauth2/v2/auth?' +
               'scope='+urlShortenScope+'&'+ // Scope corresponds to access requested.
               'redirect_uri='+redirectURI+'&'+ // URI of response sent by google. Must matched a pre-registered redirect_uri.
               'response_type=token&' + // Using the implicit flow the token is returned in the URI fragment
               'client_id='+client_id; // Required to identify application

// Setup the node application
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());

// Entry point for the application
app.get('/', function(req, res) {
    res.render('index'); // Renders views/index.ejs page
})

// Redirect to Google's authorization endpoint
app.post('/authRequest', function(req, res) {
    console.log('Redirect to : ', url);
    res.redirect(url);
});

// Callback from the Google urlshortener API
app.get(redirectURIPath, function(req, res) {
    res.render('demourlshorten', {
        oAuthurl:url
    });
});

// Start the server
app.set('port', process.env.PORT || port);
var server = app.listen(app.get('port'), function() {
    var port = server.address().port
    console.log("Server Started on port " + port);
});

