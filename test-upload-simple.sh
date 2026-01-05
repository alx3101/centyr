#!/bin/bash

# Get token from login
TOKEN=$(node -e "
const { CognitoUserPool, CognitoUser, AuthenticationDetails } = require('amazon-cognito-identity-js');
const poolData = { UserPoolId: 'eu-west-3_lu0AYl9KC', ClientId: '4n19sh1jnq4a550e91vuvfdbr5' };
const userPool = new CognitoUserPool(poolData);
const authenticationData = { Username: 'alexpopa3131112@gmail.com', Password: 'ALEXalex3131!' };
const authenticationDetails = new AuthenticationDetails(authenticationData);
const userData = { Username: 'alexpopa3131112@gmail.com', Pool: userPool };
const cognitoUser = new CognitoUser(userData);
cognitoUser.authenticateUser(authenticationDetails, {
  onSuccess: (result) => { console.log(result.getIdToken().getJwtToken()); process.exit(0); },
  onFailure: (err) => { console.error('Login failed'); process.exit(1); }
});
")

echo "Token: ${TOKEN:0:50}..."

# Create a test 1x1 PNG image
echo "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==" | base64 -d > /tmp/test.png

echo ""
echo "Testing upload with curl..."

curl -X POST "http://51.44.133.83/api/v1/upload" \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@/tmp/test.png" \
  -v

echo ""
