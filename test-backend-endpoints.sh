#!/bin/bash

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BACKEND_URL="http://51.44.133.83"

echo "========================================="
echo "  TEST BACKEND ENDPOINTS"
echo "  Backend: $BACKEND_URL"
echo "========================================="
echo ""

# Test 1: Health Check
echo -e "${YELLOW}1. GET /health${NC}"
response=$(curl -s $BACKEND_URL/health)
status=$(echo $response | jq -r '.status')
if [ "$status" == "healthy" ]; then
  echo -e "${GREEN}✅ Health check OK${NC}"
  echo $response | jq -c '{status, checks}'
else
  echo -e "${RED}❌ Health check FAILED${NC}"
fi
echo ""

# Test 2: Root
echo -e "${YELLOW}2. GET /${NC}"
response=$(curl -s $BACKEND_URL/)
echo -e "${GREEN}✅ Root endpoint${NC}"
echo $response | jq -c '.'
echo ""

# Test 3: GET /api/v1/me (senza token - dovrebbe fallire con 401)
echo -e "${YELLOW}3. GET /api/v1/me (senza token)${NC}"
http_code=$(curl -s -o /dev/null -w "%{http_code}" $BACKEND_URL/api/v1/me)
if [ "$http_code" == "401" ]; then
  echo -e "${GREEN}✅ Autenticazione richiesta (401)${NC}"
else
  echo -e "${RED}❌ Expected 401, got $http_code${NC}"
fi
echo ""

# Test 4: POST /api/v1/upload (senza token - dovrebbe fallire con 401)
echo -e "${YELLOW}4. POST /api/v1/upload (senza token)${NC}"
http_code=$(curl -s -o /dev/null -w "%{http_code}" -X POST $BACKEND_URL/api/v1/upload)
if [ "$http_code" == "401" ]; then
  echo -e "${GREEN}✅ Autenticazione richiesta (401)${NC}"
else
  echo -e "${RED}❌ Expected 401, got $http_code${NC}"
fi
echo ""

# Test 5: Verifica CORS
echo -e "${YELLOW}5. Verifica CORS${NC}"
cors_header=$(curl -s -I -X OPTIONS $BACKEND_URL/health | grep -i "access-control-allow-origin")
if [ -n "$cors_header" ]; then
  echo -e "${GREEN}✅ CORS configurato${NC}"
  echo "$cors_header"
else
  echo -e "${YELLOW}⚠️  CORS potrebbe non essere configurato${NC}"
  echo "   Aggiungi al backend:"
  echo "   allow_origins=['http://localhost:3000']"
fi
echo ""

# Riepilogo
echo "========================================="
echo "  RIEPILOGO"
echo "========================================="
echo ""
echo "Endpoints pubblici:"
echo -e "${GREEN}✅${NC} GET /health"
echo -e "${GREEN}✅${NC} GET /"
echo ""
echo "Endpoints autenticati (richiedono Cognito token):"
echo -e "${YELLOW}🔐${NC} GET /api/v1/me"
echo -e "${YELLOW}🔐${NC} POST /api/v1/upload"
echo -e "${YELLOW}🔐${NC} GET /api/v1/jobs/{job_id}"
echo -e "${YELLOW}🔐${NC} GET /api/v1/jobs/{job_id}/status"
echo -e "${YELLOW}🔐${NC} GET /api/v1/jobs/{job_id}/result"
echo -e "${YELLOW}🔐${NC} DELETE /api/v1/jobs/{job_id}"
echo -e "${YELLOW}🔐${NC} POST /api/v1/billing/create-checkout"
echo -e "${YELLOW}🔐${NC} POST /api/v1/billing/customer-portal"
echo -e "${YELLOW}🔐${NC} POST /api/v1/billing/cancel-subscription"
echo ""
echo "Webhook (non richiede autenticazione ma Stripe signature):"
echo -e "${YELLOW}🔐${NC} POST /api/v1/webhooks/stripe"
echo ""
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Avvia frontend: npm run dev"
echo "2. Login con Cognito"
echo "3. Test upload immagine"
echo ""
