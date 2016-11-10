var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var path = require('path');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var settings = require("./settings");

var client_id = settings.client_id;
var client_secret = settings.client_secret;
var port = settings.port;
var redirectURI = settings.baseURI + settings.redirectURIPath;
var redirectURIPath =  settings.redirectURIPath;
var urlShortenScope = "https://www.googleapis.com/auth/urlshortener";

var oauth2Client = new OAuth2(
    client_id,
    client_secret,
    redirectURI/* This should match the Redirect URL you have set in the google api console project*/
);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());

// This method will be called when you visit site  
app.get('/', function(req, res) {
    res.render('index'); // This will render views/index.ejs page to the user
})

// This method will call when google redirect after generating the code
app.get(redirectURIPath, function(req, res) {
    res.render('demourlshorten', {
        access_code: req.query.code
    }); // This will render views/demourlshorten.ejs to the user along with code which required to get the access token to call the google API
});

// This method will be called from views/index.ejs as form submit action to intiate the authentication process with google.
app.post('/requestoAuth', function(req, res) {
    var scopes = [urlShortenScope];
    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
    });
    console.log('Redirect to : ', url);
    res.redirect(url);
});

// This method is called from the views/demourlshorten.ejs as ajax request for the user to create the shortenURL 
app.post('/shortenURL', function(req, res) {
    console.log("Creating client");
    var oauth2Client1 = new OAuth2(
        client_id,
        client_secret,
        redirectURI
    );

    // This will request google OAuth2 server for the tokens for calling URLShorten API
    oauth2Client.getToken(req.body.token, function(err, tokens) {
        
        if (!err) {
            console.log("Token Obtained setting it to called the URL shorten API");
            oauth2Client.setCredentials(tokens);
            
            // Creating client for URL shortenURL API Call
            var urlshortener = google.urlshortener({
                version: 'v1',
                auth: oauth2Client
            });
            urlshortener.url.insert({
                resource: {
                    longUrl: req.body.url
                }
            }, function(err, data) {
                if (err) {
                    console.log("Error occur while obtaining the shorten url");
                    res.status(500).json({
                        "err": err
                    });
                } else {
                    console.log("Shorten URL recieved");
                    res.status(200).json({
                        "data": data
                    });
                }
            });
        } else {
            console.log("Error occur while obtaining the token");
            res.status(500).json({
                "err": err
            });
        }
    });

});

app.set('port', process.env.PORT || port);
var server = app.listen(app.get('port'), function() {
    var port = server.address().port
    console.log("Server Started on port " + port);
});