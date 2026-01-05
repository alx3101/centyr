# Test API Connection - Guida Completa

## ✅ Configurazione Completata

### Cognito Pool Configurato
- **Pool ID**: `eu-west-3_lu0AYl9KC`
- **Pool Name**: `image-alignment-users`
- **Client ID**: `4n19sh1jnq4a550e91vuvfdbr5`
- **Region**: `eu-west-3`

### Backend API
- **URL**: `http://51.44.133.83`
- **Status**: ✅ Healthy
- **Services**: DynamoDB ✅ | S3 ✅ | Cognito ✅

### Utente Test Esistente
- **Email**: `test@example.com`
- **Status**: CONFIRMED
- **Password**: Devi conoscerla tu (o resettarla)

---

## 🧪 Test Manuale

### 1. Avvia il dev server

```bash
npm run dev
```

### 2. Apri il browser

Vai su: **http://localhost:3000**

### 3. Testa Login

1. Vai su `/login`
2. Email: `test@example.com`
3. Password: [la tua password]

Se non ricordi la password, resettala con:

```bash
# Opzione 1: Reset password via AWS CLI
aws cognito-idp admin-set-user-password \
  --user-pool-id eu-west-3_lu0AYl9KC \
  --username test@example.com \
  --password "NewPassword123!" \
  --permanent

# Opzione 2: Crea nuovo utente
aws cognito-idp admin-create-user \
  --user-pool-id eu-west-3_lu0AYl9KC \
  --username newuser@example.com \
  --user-attributes Name=email,Value=newuser@example.com Name=email_verified,Value=true \
  --temporary-password "TempPass123!" \
  --message-action SUPPRESS
```

---

## 🔬 Test API con cURL

### Test 1: Health Check

```bash
curl http://51.44.133.83/health | jq .
```

**Risposta attesa**:
```json
{
  "status": "healthy",
  "checks": {
    "dynamodb": true,
    "s3": true,
    "cognito": true
  }
}
```

### Test 2: Login Cognito + Call API

```bash
# 1. Prima ottieni un ID token (usa il frontend o uno script)
# Salva il token in una variabile
TOKEN="eyJraWQ..."

# 2. Testa l'endpoint /api/v1/me
curl -H "Authorization: Bearer $TOKEN" http://51.44.133.83/api/v1/me | jq .
```

**Risposta attesa**:
```json
{
  "user_id": "b149e05e-c0e1-7022-9861-f7c4103fd865",
  "email": "test@example.com",
  "email_verified": true,
  "username": "test@example.com",
  "subscription": {
    "plan": "free",
    "usage": 0,
    "quota": 10,
    "status": "active"
  }
}
```

---

## 📱 Test dal Frontend

### Metodo 1: Browser DevTools

1. Apri il frontend: `http://localhost:3000`
2. Fai login
3. Apri DevTools (F12) → Console
4. Esegui:

```javascript
// Ottieni il token
const token = localStorage.getItem('auth_token');
console.log('Token:', token);

// Test API call
fetch('http://51.44.133.83/api/v1/me', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(r => r.json())
.then(data => console.log('User data:', data));
```

### Metodo 2: Usa il Hook useAuth

Nel tuo componente React:

```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, login } = useAuth();

  const handleLogin = async () => {
    const result = await login('test@example.com', 'YourPassword');
    if (result.success) {
      console.log('User:', user);
    }
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

---

## 🎯 Prossimi Passi

1. ✅ **Configurazione completata** - Backend + Cognito pronti
2. ⏳ **Avvia frontend** - `npm run dev`
3. ⏳ **Test login** - Usa utente esistente o creane uno nuovo
4. ⏳ **Test upload** - Carica un'immagine di test
5. ⏳ **Verifica quota** - Controlla subscription info

---

## 🐛 Troubleshooting

### CORS Error

Se vedi errori CORS nel browser, il backend deve aggiungere:

```python
# Backend FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Token Expired

I token Cognito scadono dopo 1 ora. Ricarica la pagina per refreshare.

### Invalid Token

Verifica che:
1. Il backend validi token del pool `eu-west-3_lu0AYl9KC`
2. Il token sia nel formato: `Authorization: Bearer {token}`

---

**Tutto pronto per il test! 🚀**
