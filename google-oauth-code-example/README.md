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
See the sequence diagram below to get a better picture of the flow of 
this application.

![Demo Sequence Diagram](./sequence%20diagram/sequence_diagram.png)





