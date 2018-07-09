# Google OAuth Example
## How to run the Server
### Steps :
* Clone the project 
* Open Settings.js and change the configuration to your Project
```
exports.client_id =  /* Client ID from Google Console Project */;
exports.client_secret =  /* Client Secret from Google Console Project */;
exports.port = /*Port on which this node server will run*/;
exports.redirectURIPath = /* The redirect endpoint, for example, /cb */;
exports.redirectURI = /* The URL that Google will use to send back a token */;
```
* Open command line tool navigate to your folder path
* Install node modules
```
npm install
```
* Run project 
```
node app
```

* OAuth Client URL generation and field explaination
```
var url = 'https://accounts.google.com/o/oauth2/v2/auth?' +
               'scope='+urlShortenScope+'&'+ // Scope corresponds to access requested.
               'redirect_uri='+redirectURI+'&'+ // URI of response sent by google. Must matched a pre-registered redirect_uri.
               'response_type=token&' + // Using the implicit flow the token is returned in the URI fragment
               'client_id='+client_id; // Required to identify application

```

See the sequence diagram below to get a better picture of the flow of 
this application.

![Demo Sequence Diagram](../sequence%20diagram/Sequence%20Diagram%20.png)





