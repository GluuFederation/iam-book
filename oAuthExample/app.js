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
var redirectURI = settings.redirectURI;
var urlShortenScope = "https://www.googleapis.com/auth/urlshortener";

var oauth2Client = new OAuth2(
    client_id,
    client_secret,
    redirectURI
);

app.use(bodyParser.urlencoded({There
    extended: true
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.render('index');
})

app.get('/processredirect', function(req, res) {
    res.render('demourlshorten', {
        access_token: req.query.code
    });
});

app.get('/urlshorten', function(req, res) {
    console.log('Req ' + req.getHeader("access_token"));
    res.json("recieved Data" + req.getHeader("access_token"));
})

app.post('/requestoAuth', function(req, res) {
    var scopes = [urlShortenScope];5
    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
    });
    console.log('Redirect to : ', url);
    res.redirect(url);
});

app.post('/shortenURL', function(req, res) {
    console.log("Creating client");
    var oauth2Client1 = new OAuth2(
        client_id,
        client_secret,
        redirectURI
    );

    oauth2Client.getToken(req.body.token, function(err, tokens) {
        console.log("Obtaining token");
        if (!err) {
            oauth2Client.setCredentials(tokens);
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
                    res.status(500).json({
                        "err": err
                    });
                } else {
                    res.json({
                        "data": data
                    });
                }
            });
        } else {
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