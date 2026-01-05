// Test script per verificare l'upload di un'immagine
const { CognitoUserPool, CognitoUser, AuthenticationDetails } = require('amazon-cognito-identity-js');
const fs = require('fs');
const FormData = require('form-data');
const fetch = require('node-fetch');

const poolData = {
  UserPoolId: 'eu-west-3_lu0AYl9KC',
  ClientId: '4n19sh1jnq4a550e91vuvfdbr5'
};

const userPool = new CognitoUserPool(poolData);

const authenticationData = {
  Username: 'alexpopa3131112@gmail.com',
  Password: 'ALEXalex3131!'
};

const authenticationDetails = new AuthenticationDetails(authenticationData);

const userData = {
  Username: 'alexpopa3131112@gmail.com',
  Pool: userPool
};

const cognitoUser = new CognitoUser(userData);

console.log('🔐 Login...\n');

cognitoUser.authenticateUser(authenticationDetails, {
  onSuccess: async (result) => {
    const idToken = result.getIdToken().getJwtToken();

    console.log('✅ Login riuscito!\n');

    // Create a test image (1x1 red pixel PNG)
    const testImage = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==',
      'base64'
    );

    console.log('📤 Testing upload...\n');

    // Test 1: Upload with FormData
    const formData = new FormData();
    formData.append('file', testImage, {
      filename: 'test-image.png',
      contentType: 'image/png'
    });

    try {
      const response = await fetch('http://51.44.133.83/api/v1/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          ...formData.getHeaders()
        },
        body: formData
      });

      console.log(`Status: ${response.status} ${response.statusText}`);

      const contentType = response.headers.get('content-type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      console.log('Response:', JSON.stringify(data, null, 2));

      if (response.ok) {
        console.log('\n✅ Upload successful!');
        console.log('Job ID:', data.job_id);
      } else {
        console.log('\n❌ Upload failed');
      }

    } catch (err) {
      console.error('❌ Errore upload:', err.message);
      console.error('Stack:', err.stack);
    }
  },
  onFailure: (err) => {
    console.error('❌ Login fallito:', err.message);
  }
});
