var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var path = require('path');
var settings = require("./settings");

var client_id = settings.client_id;
var client_secret = settings.client_secret;
var port = settings.port;
var redirectURI = settings.baseURI + settings.redirectURIPath;
var redirectURIPath =  settings.redirectURIPath;
var urlShortenScope = "https://www.googleapis.com/auth/urlshortener";
var request = require('request');


app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());

/* Define the scope */

var scopes = [urlShortenScope];


var url = 'https://accounts.google.com/o/oauth2/v2/auth?' +
               'state=urlshortenapicall&' +// Provides any state that might be useful to your application upon receipt of the response. The Google Authorization Server round-trips this parameter, so your application receives the same value it sent. Possible uses include redirecting the user to the correct resource in your site, and cross-site-request-forgery mitigations. 
               'scope='+urlShortenScope+'&'+ // Identifies the Google API access that your application is requesting. The values passed in this parameter inform the consent screen that is shown to the user. There is an inverse relationship between the number of permissions requested and the likelihood of obtaining user consent. 
               'redirect_uri='+redirectURI+'&'+ //Determines where the response is sent. The value of this parameter must exactly match one of the values listed for this project in the Google API Console
               'response_type=token&' + // 	JavaScript applications should use token. This tells the Google Authorization Server to return the access token in the fragment.
               'client_id='+client_id; // Identifies the client that is making the request. The value passed in this parameter must exactly match the value shown in the Google API Console.



// This method will be called when you visit site  
app.get('/', function(req, res) {
    res.render('index'); // This will render views/index.ejs page to the user
})

// This method will call when google redirect after generating the code
app.get(redirectURIPath, function(req, res) {
    res.render('demourlshorten', {
        oAuthurl:url 
    }); // This will render views/demourlshorten.ejs to the user along with code which required to get the access token to call the google API
});

// This method will be called from views/index.ejs as form submit action to intiate the authentication process with google.
app.post('/requestoAuth', function(req, res) {
    console.log('Redirect to : ', url);
    res.redirect(url);
});

app.set('port', process.env.PORT || port);
var server = app.listen(app.get('port'), function() {
    var port = server.address().port
    console.log("Server Started on port " + port);
});