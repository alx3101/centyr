# OAuth Authentication Setup - Complete

## ✅ Implementation Status

OAuth authentication has been successfully integrated for **Google, GitHub, and Apple** (Facebook excluded per user request).

---

## 📁 Files Modified/Created

### 1. **Updated: `/app/(auth)/signup/page.tsx`**
Added OAuth buttons matching the login page:
- Google OAuth button
- GitHub OAuth button
- Apple OAuth button
- Divider section ("Or continue with")

### 2. **Updated: `/app/(auth)/login/page.tsx`** ✅ (Already completed)
OAuth buttons already implemented.

### 3. **Created: `/app/auth/callback/page.tsx`** ✨ NEW
Handles OAuth redirect from Cognito Hosted UI:
- Extracts authorization code from URL
- Exchanges code for JWT tokens
- Stores ID token in localStorage
- Fetches user data from backend API
- Redirects to dashboard on success
- Shows error page on failure

---

## 🔧 How OAuth Works

### User Flow:
1. User clicks "Continue with Google/GitHub/Apple" on login or signup page
2. `cognitoOAuthSignIn(provider)` redirects to Cognito Hosted UI
3. User authenticates with chosen provider
4. Cognito redirects back to `/auth/callback?code=...`
5. Callback page exchanges code for tokens
6. ID token stored in localStorage
7. User data fetched from backend
8. Redirect to dashboard

### Technical Details:
```typescript
// OAuth URL format
https://{POOL_ID}.auth.{REGION}.amazoncognito.com/oauth2/authorize?
  identity_provider={Google|GitHub|Apple}&
  redirect_uri=http://localhost:3000/auth/callback&
  response_type=code&
  client_id={CLIENT_ID}&
  scope=email openid profile
```

---

## ⚙️ AWS Cognito Configuration Required

### IMPORTANT: You must configure OAuth in AWS Console

1. **Go to AWS Console** → Cognito → User Pools → `image-alignment-users`

2. **App integration** → App client settings (for client `4n19sh1jnq4a550e91vuvfdbr5`)

3. **Enable Identity Providers**:
   - ✅ Google
   - ✅ GitHub
   - ✅ Apple
   - ❌ Facebook (excluded)

4. **Configure Callback URLs**:
   ```
   Allowed callback URLs:
   - http://localhost:3000/auth/callback
   - https://yourdomain.com/auth/callback

   Allowed sign-out URLs:
   - http://localhost:3000
   - https://yourdomain.com
   ```

5. **OAuth 2.0 Grant Types**:
   - ✅ Authorization code grant

6. **OAuth Scopes**:
   - ✅ email
   - ✅ openid
   - ✅ profile

7. **Domain Name** (if not set):
   - Create a domain prefix (e.g., `centyr-auth`)
   - Full domain: `centyr-auth.auth.eu-west-3.amazoncognito.com`

---

## 🔐 Provider-Specific Setup

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 Client ID
3. Add authorized redirect URI: `https://{COGNITO_DOMAIN}/oauth2/idpresponse`
4. Copy Client ID and Client Secret to Cognito

### GitHub OAuth
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create new OAuth App
3. Authorization callback URL: `https://{COGNITO_DOMAIN}/oauth2/idpresponse`
4. Copy Client ID and Client Secret to Cognito

### Apple Sign In
1. Go to [Apple Developer Portal](https://developer.apple.com)
2. Create Services ID
3. Configure redirect URI: `https://{COGNITO_DOMAIN}/oauth2/idpresponse`
4. Generate private key and configure in Cognito

---

## 🧪 Testing OAuth

### Test Flow:
1. Start dev server: `npm run dev`
2. Go to `http://localhost:3000/login`
3. Click "Continue with Google/GitHub/Apple"
4. Authenticate with provider
5. Should redirect to `/auth/callback`
6. Should then redirect to `/dashboard`

### Debug Checklist:
- [ ] Cognito domain is configured
- [ ] OAuth providers are enabled in Cognito
- [ ] Callback URLs match exactly (http://localhost:3000/auth/callback)
- [ ] Provider credentials (Client ID/Secret) are set in Cognito
- [ ] OAuth scopes include: email, openid, profile
- [ ] Authorization code grant is enabled

---

## 🐛 Common Issues

### Error: "invalid_request" or "redirect_uri_mismatch"
**Solution**: Ensure callback URL in Cognito exactly matches:
- Local: `http://localhost:3000/auth/callback`
- Production: `https://yourdomain.com/auth/callback`

### Error: "User pool client does not exist"
**Solution**: Verify `NEXT_PUBLIC_COGNITO_CLIENT_ID` matches the app client ID in Cognito

### Error: "Identity provider not found"
**Solution**: Enable the provider in Cognito User Pool → App integration → Identity providers

### Token Exchange Fails
**Solution**: Check that the client is configured for "Authorization code grant" flow

---

## 📝 Environment Variables

Already configured in `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://51.44.133.83
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_COGNITO_USER_POOL_ID=eu-west-3_lu0AYl9KC
NEXT_PUBLIC_COGNITO_CLIENT_ID=4n19sh1jnq4a550e91vuvfdbr5
NEXT_PUBLIC_COGNITO_REGION=eu-west-3
```

---

## ✨ What's Been Implemented

### Authentication Pages ✅
- [x] Login page with email/password + OAuth
- [x] Signup page with email/password + OAuth
- [x] OAuth callback handler
- [x] Error handling and loading states

### Subscription Management ✅
- [x] Pricing page with plan comparison
- [x] Billing page with subscription management
- [x] Stripe integration (checkout + customer portal)
- [x] Cancel subscription functionality

### API Integration ✅
- [x] Complete API client matching OpenAPI spec
- [x] AWS Cognito authentication utilities
- [x] React hooks (useAuth, useUpload)
- [x] JWT token management

---

**Next Step**: Configure OAuth providers in AWS Cognito Console 🚀
