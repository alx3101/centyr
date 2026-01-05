const { CognitoUserPool, CognitoUser, AuthenticationDetails } = require('amazon-cognito-identity-js');

const poolData = {
  UserPoolId: 'eu-west-3_lu0AYl9KC',
  ClientId: '4n19sh1jnq4a550e91vuvfdbr5',
};

const userPool = new CognitoUserPool(poolData);

// Test login con un utente esistente (se ce n'è)
const authenticationData = {
  Username: 'test@example.com',
  Password: 'TestPassword123!',
};

const authenticationDetails = new AuthenticationDetails(authenticationData);

const userData = {
  Username: 'test@example.com',
  Pool: userPool,
};

const cognitoUser = new CognitoUser(userData);

cognitoUser.authenticateUser(authenticationDetails, {
  onSuccess: (result) => {
    const idToken = result.getIdToken().getJwtToken();
    console.log('✅ Login successful!');
    console.log('ID Token:', idToken);
    process.exit(0);
  },
  onFailure: (err) => {
    console.log('❌ Login failed:', err.message);
    process.exit(1);
  },
});
