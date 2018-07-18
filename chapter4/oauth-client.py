#!/usr/bin/python

import requests, json

# Get access token
client_id = '12345676890abcdefg'
client_secret = "secret"
token_endpoint = "https://idp.example.com/token"
scope = "myScope"
payload = {"grant_type":"client_credentials", "scope":scope}
response = requests.post(token_endpoint, data=payload, verify=False, auth=(client_id, client_secret))
j = json.loads(response.text)
access_token = j['access_token']
# Call API
api_endpoint = "http://api.example.com/cgi-bin/oauth-rs.cgi"
h = {'Authorization': 'Bearer %s' % access_token}
response = requests.post(api_endpoint, headers=h)
print response.text
