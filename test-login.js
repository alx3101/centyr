// Test script per verificare il login Cognito e il token generato
const { CognitoUserPool, CognitoUser, AuthenticationDetails } = require('amazon-cognito-identity-js');

const poolData = {
  UserPoolId: 'eu-west-3_lu0AYl9KC',
  ClientId: '4n19sh1jnq4a550e91vuvfdbr5'
};

const userPool = new CognitoUserPool(poolData);

const authenticationData = {
  Username: 'alexpopa3131112@gmail.com',
  Password: 'ALEXalex3131!' // Usa la password corretta
};

const authenticationDetails = new AuthenticationDetails(authenticationData);

const userData = {
  Username: 'alexpopa3131112@gmail.com',
  Pool: userPool
};

const cognitoUser = new CognitoUser(userData);

console.log('🔐 Tentativo di login...\n');

cognitoUser.authenticateUser(authenticationDetails, {
  onSuccess: (result) => {
    const idToken = result.getIdToken().getJwtToken();

    console.log('✅ Login riuscito!\n');
    console.log('📋 ID Token:');
    console.log(idToken);
    console.log('\n');

    // Decodifica il payload del token
    const payload = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString());
    console.log('📦 Token Payload:');
    console.log(JSON.stringify(payload, null, 2));
    console.log('\n');

    // Test chiamata API
    console.log('🌐 Test chiamata API /api/v1/me...\n');

    fetch('http://51.44.133.83/api/v1/me', {
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log(`Status: ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then(data => {
        console.log('Response:', JSON.stringify(data, null, 2));
      })
      .catch(err => {
        console.error('❌ Errore API:', err.message);
      });
  },
  onFailure: (err) => {
    console.error('❌ Login fallito:', err.message);
    console.error('Dettagli:', err);
  },
  newPasswordRequired: (userAttributes, requiredAttributes) => {
    console.log('⚠️  Nuova password richiesta');
    console.log('Attributi utente:', userAttributes);
  }
});
