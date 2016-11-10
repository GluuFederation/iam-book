# Google oAuth Example
### How to run the Server
##### Steps :
* Clone the project 
* Open Settings.js and change the configuration to your Project
```
exports.client_id =  /* Client ID from Google Console Project */
exports.client_secret =  /* Client Secret from Google Console Project */
exports.port = /*Port on which this node server will run*/
exports.host = /*Internet accessible hostname*/
exports.baseURI = /*Host*/
exports.redirectURIPath = /* The redirect endpoint, for example, /cb */
exports.explicitRedirectURI = /* Leave blank unless you map URI from router */

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

* oAuth Client URL generation and field explaination
```
var url = 'https://accounts.google.com/o/oauth2/v2/auth?' +
               'state=urlshortenapicall&' + // Prevent unsolicited callbacks.
               'scope='+urlShortenScope+'&'+ // Scope corresponds to access requested.
               'redirect_uri='+redirectURI+'&'+ // URI of response sent by google. Must matched a pre-registered redirect_uri.
               'response_type=token&' + // Using the implicit flow the token is returned in the URI fragment
               'client_id='+client_id; // Required to identify application

```

See the sequence diagram below to get a better picture of the flow of 
this application.

![Demo Sequence Diagram](https://raw.githubusercontent.com/GluuFederation/iam-book/master/google-oAuth-example/sequence%20diagram/Sequence%20Diagram%20.png)





