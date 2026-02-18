/**
 * AWS Cognito Authentication Utilities
 *
 * Setup Instructions:
 * 1. Install dependencies: npm install amazon-cognito-identity-js
 * 2. Set environment variables in .env.local:
 *    - NEXT_PUBLIC_COGNITO_USER_POOL_ID=your-pool-id
 *    - NEXT_PUBLIC_COGNITO_CLIENT_ID=your-client-id
 *    - NEXT_PUBLIC_COGNITO_REGION=your-region (e.g., eu-west-3)
 */

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
  CognitoUserSession,
} from 'amazon-cognito-identity-js'

// Cognito configuration from environment variables
const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || '',
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || '',
}

const userPool = new CognitoUserPool(poolData)

export interface CognitoAuthResult {
  success: boolean
  idToken?: string
  accessToken?: string
  refreshToken?: string
  error?: string
}

/**
 * Sign up a new user
 */
export function cognitoSignUp(
  email: string,
  password: string,
  attributes?: { name?: string; [key: string]: string | undefined }
): Promise<CognitoAuthResult> {
  return new Promise((resolve) => {
    const attributeList: CognitoUserAttribute[] = []

    // Email is required
    attributeList.push(
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      })
    )

    // Add optional attributes
    if (attributes?.name) {
      attributeList.push(
        new CognitoUserAttribute({
          Name: 'name',
          Value: attributes.name,
        })
      )
    }

    userPool.signUp(email, password, attributeList, [], (err, _result) => {
      if (err) {
        resolve({
          success: false,
          error: err.message || 'Sign up failed',
        })
        return
      }

      resolve({
        success: true,
      })
    })
  })
}

/**
 * Confirm user email with verification code
 */
export function cognitoConfirmSignUp(
  email: string,
  code: string
): Promise<CognitoAuthResult> {
  return new Promise((resolve) => {
    const userData = {
      Username: email,
      Pool: userPool,
    }

    const cognitoUser = new CognitoUser(userData)

    cognitoUser.confirmRegistration(code, true, (err) => {
      if (err) {
        resolve({
          success: false,
          error: err.message || 'Confirmation failed',
        })
        return
      }

      resolve({
        success: true,
      })
    })
  })
}

/**
 * Resend verification code
 */
export function cognitoResendCode(email: string): Promise<CognitoAuthResult> {
  return new Promise((resolve) => {
    const userData = {
      Username: email,
      Pool: userPool,
    }

    const cognitoUser = new CognitoUser(userData)

    cognitoUser.resendConfirmationCode((err) => {
      if (err) {
        resolve({
          success: false,
          error: err.message || 'Resend failed',
        })
        return
      }

      resolve({
        success: true,
      })
    })
  })
}

/**
 * Sign in a user
 */
export function cognitoSignIn(
  email: string,
  password: string
): Promise<CognitoAuthResult> {
  return new Promise((resolve) => {
    const authenticationData = {
      Username: email,
      Password: password,
    }

    const authenticationDetails = new AuthenticationDetails(authenticationData)

    const userData = {
      Username: email,
      Pool: userPool,
    }

    const cognitoUser = new CognitoUser(userData)

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session: CognitoUserSession) => {
        resolve({
          success: true,
          idToken: session.getIdToken().getJwtToken(),
          accessToken: session.getAccessToken().getJwtToken(),
          refreshToken: session.getRefreshToken().getToken(),
        })
      },
      onFailure: (err) => {
        resolve({
          success: false,
          error: err.message || 'Sign in failed',
        })
      },
    })
  })
}

/**
 * Get current user session
 */
export function cognitoGetSession(): Promise<CognitoUserSession | null> {
  return new Promise((resolve) => {
    const cognitoUser = userPool.getCurrentUser()

    if (!cognitoUser) {
      resolve(null)
      return
    }

    cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (err || !session) {
        resolve(null)
        return
      }

      if (!session.isValid()) {
        resolve(null)
        return
      }

      resolve(session)
    })
  })
}

/**
 * Get current ID token (for API calls)
 */
export async function cognitoGetIdToken(): Promise<string | null> {
  const session = await cognitoGetSession()
  if (!session) return null

  return session.getIdToken().getJwtToken()
}

/**
 * Sign out current user
 */
export function cognitoSignOut(): void {
  const cognitoUser = userPool.getCurrentUser()
  if (cognitoUser) {
    cognitoUser.signOut()
  }
}

/**
 * Forgot password - send reset code
 */
export function cognitoForgotPassword(email: string): Promise<CognitoAuthResult> {
  return new Promise((resolve) => {
    const userData = {
      Username: email,
      Pool: userPool,
    }

    const cognitoUser = new CognitoUser(userData)

    cognitoUser.forgotPassword({
      onSuccess: () => {
        resolve({
          success: true,
        })
      },
      onFailure: (err) => {
        resolve({
          success: false,
          error: err.message || 'Forgot password failed',
        })
      },
    })
  })
}

/**
 * Confirm password reset with code
 */
export function cognitoConfirmPassword(
  email: string,
  code: string,
  newPassword: string
): Promise<CognitoAuthResult> {
  return new Promise((resolve) => {
    const userData = {
      Username: email,
      Pool: userPool,
    }

    const cognitoUser = new CognitoUser(userData)

    cognitoUser.confirmPassword(code, newPassword, {
      onSuccess: () => {
        resolve({
          success: true,
        })
      },
      onFailure: (err) => {
        resolve({
          success: false,
          error: err.message || 'Password reset failed',
        })
      },
    })
  })
}

/**
 * Change password (for authenticated user)
 */
export function cognitoChangePassword(
  oldPassword: string,
  newPassword: string
): Promise<CognitoAuthResult> {
  return new Promise((resolve) => {
    const cognitoUser = userPool.getCurrentUser()

    if (!cognitoUser) {
      resolve({
        success: false,
        error: 'No user logged in',
      })
      return
    }

    cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (err || !session) {
        resolve({
          success: false,
          error: 'Session invalid',
        })
        return
      }

      cognitoUser.changePassword(oldPassword, newPassword, (err) => {
        if (err) {
          resolve({
            success: false,
            error: err.message || 'Password change failed',
          })
          return
        }

        resolve({
          success: true,
        })
      })
    })
  })
}

/**
 * OAuth Login with Social Providers
 *
 * Providers supportati: Google, Apple, GitHub
 *
 * IMPORTANTE: Richiede configurazione OAuth nel Cognito User Pool:
 * 1. Vai su AWS Console → Cognito → User Pool
 * 2. App integration → App client settings
 * 3. Abilita i provider desiderati
 * 4. Configura callback URLs:
 *    - Allowed callback URLs: http://localhost:3000/auth/callback, https://yourdomain.com/auth/callback
 *    - Allowed sign-out URLs: http://localhost:3000, https://yourdomain.com
 * 5. Configura OAuth flows: Authorization code grant
 * 6. Scopes: email, openid, profile
 */
export function cognitoOAuthSignIn(provider: 'Google' | 'Apple' | 'GitHub') {
  const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID
  const cognitoDomain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN // e.g. https://your-prefix.auth.eu-west-1.amazoncognito.com
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`

  const oauthUrl = `${cognitoDomain}/oauth2/authorize?` +
    `identity_provider=${provider}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `response_type=code&` +
    `client_id=${clientId}&` +
    `scope=email+openid+profile`

  // Redirect to Cognito Hosted UI
  window.location.href = oauthUrl
}
