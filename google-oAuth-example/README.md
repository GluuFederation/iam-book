# Google oAuth Example
### How to run the Server
##### Steps :
* Clone the project 
* Open Settings.js and change the configuration to your Project
```
exports.client_id =  /* Client ID from Google Console Project */;
exports.client_secret =  /* Client Secret from Google Console Project */;
exports.port = /**/;
exports.redirectURIPath = /**/;
exports.baseURI = /*Host*/

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
               'state=urlshortenapicall&' +// Provides any state that might be useful to your application upon receipt of the response. The Google Authorization Server round-trips this parameter, so your application receives the same value it sent. Possible uses include redirecting the user to the correct resource in your site, and cross-site-request-forgery mitigations. 
               'scope='+urlShortenScope+'&'+ // Identifies the Google API access that your application is requesting. The values passed in this parameter inform the consent screen that is shown to the user. There is an inverse relationship between the number of permissions requested and the likelihood of obtaining user consent. 
               'redirect_uri='+redirectURI+'&'+ //Determines where the response is sent. The value of this parameter must exactly match one of the values listed for this project in the Google API Console
               'response_type=token&' + // 	JavaScript applications should use token. This tells the Google Authorization Server to return the access token in the fragment.
               'client_id='+client_id; // Identifies the client that is making the request. The value passed in this parameter must exactly match the value shown in the Google API Console.

```

See the sequence diagram below to get a better picture of the flow of 
this application.

![Demo Sequence Diagram](https://raw.githubusercontent.com/GluuFederation/iam-book/master/google-oAuth-example/sequence%20diagram/Sequence%20Diagram%20.png)





