#!/usr/bin/python

import requests, json, os
from sets import Set

result = None 
client_token = None
required_scopes = Set(['myScope'])
 
try:
    client_token = os.environ['HTTP_AUTHORIZATION'].split('Bearer')[-1].strip()
except:
    print "HTTP/1.0 200 OK"
    print "Content-type: text/html\n\n"
    print 'Access token not found'
# First get access token to call introspection endpoint
client_id = '1234567890abcdefg'
client_secret = 'secret'
token_endpoint = 'https://idp.example.com/token'
payload = {'grant_type':'client_credentials', 'scope':'uma_protection'}
response = requests.post(token_endpoint,
                         data=payload, 
                         verify=False, 
                         auth=(client_id, client_secret))
j = json.loads(response.text)
introspection_token = j['access_token']

# Introspect token
introspection_endpoint = 'https://idp.example.com/introspection'
h = {'Authorization': 'Bearer %s' % introspection_token}
token = {'token': client_token}
response = requests.post(introspection_endpoint, 
                        verify=False, 
                        headers=h,
                        data=token)
result = response.text
j = response.json()
try:
    scopes = Set(j['scopes'][0].strip().split(' '))
except:
    print "HTTP/1.0 200 OK"
    print "Content-type: text/html\n\n"
    print "No scopes found"
    print "Result:\n" + result

missing_scopes = required_scopes - scopes
if len(missing_scopes):
    print "HTTP/1.0 200 OK"
    print "Content-type: text/html\n\n"
    print "Missing scopes: %s" % `list(missing_scopes)`  
elif len(missing_scopes)==0:
    print "HTTP/1.0 200 OK"
    print "Content-type: text/html\n\n"
    print "Scopes %s all found" % `list(required_scopes)`

