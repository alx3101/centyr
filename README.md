# Centyr - AI Product Photo Alignment

> Automatically align and center thousands of product photos in seconds

[![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.1-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Run development server
npm run dev

# Open http://localhost:3000
```

## ✨ Features

- 🎯 **Smart Visual Centering** - Centers the product, not the image
- 🌟 **Shadow & Reflection Removal** - AI-powered cleanup
- 📦 **Bulk Processing** - Upload 1,000+ images at once
- 💳 **Stripe Integration** - Subscription payments
- 🌍 **i18n Support** - English & Italian
- 🎨 **Beautiful UI** - Purple/Fuchsia gradient design with animations
- 🔐 **JWT Authentication** - Secure user management
- 📊 **Dashboard** - Real-time processing status & analytics

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- React Context API
- React Hot Toast
- React Dropzone

**Backend (to be implemented):**
- FastAPI (Python)
- PostgreSQL
- AWS S3
- Stripe
- JWT Auth

## 📁 Project Structure

```
centyr-web/
├── app/                    # Next.js pages & routes
│   ├── (auth)/            # Login, Signup
│   ├── (marketing)/       # Landing, Pricing
│   ├── dashboard/         # User dashboard
│   └── upload/            # Upload interface
├── components/            # React components
├── contexts/              # React contexts (i18n)
├── hooks/                 # Custom hooks (useAuth, useUpload)
├── i18n/                  # Translations (EN, IT)
├── lib/                   # Utils (API client, Auth)
└── public/                # Static assets
```

## 🌍 Internationalization

Centyr supports **English** and **Italiano** with automatic browser detection.

```typescript
import { useTranslations } from '@/contexts/LanguageContext'

const t = useTranslations()

<h1>{t.dashboard.welcomeBack}</h1>
<button>{t.common.save}</button>
```

See [i18n/README.md](i18n/README.md) for full documentation.

## 🔐 Authentication Flow

1. User logs in → Backend returns JWT token
2. Token stored in localStorage
3. Every API request includes: `Authorization: Bearer {token}`
4. Protected routes check authentication

```typescript
// hooks/useAuth.ts
const { user, login, logout, isAuthenticated } = useAuth()

await login(email, password)
```

## 🔌 API Integration

All backend calls go through a centralized API client:

```typescript
// lib/api.ts
const api = {
  login(email, password),
  signup(email, password, fullName),
  processImages(files),
  getProcessingStatus(jobId),
  downloadProcessedImages(jobId),
  // ... more
}
```

## 💳 Pricing Plans

| Plan   | Price  | jobs/month |
|--------|--------|--------------|
| Free   | $0     | 100          |
| Basic  | $19    | 1,000        |
| Growth | $39    | 5,000        |
| Scale  | $99    | 20,000       |

## 🎨 Design System

**Colors:**
- Primary: Purple (`#8B5CF6`) → Fuchsia (`#D946EF`)
- Gradients, glassmorphism, smooth animations

**Components:**
- Animated cards with hover effects
- Toast notifications (purple theme)
- Gradient buttons
- Progress bars
- Loading states

## 📚 Documentation

- **Full Documentation**: [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)
- **i18n Guide**: [i18n/README.md](i18n/README.md)
- **Environment Variables**: [.env.example](.env.example)

## 🔧 Environment Variables

```bash
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Backend (Python/FastAPI)
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret_here
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=centyr-images
```

## 🚀 Deployment

### Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Backend (Railway/AWS)

```bash
# Railway
railway login
railway up

# Or Docker
docker build -t centyr-api .
docker push your-registry/centyr-api
```

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Build test
npm run build

# Run tests (to be implemented)
npm run test
```

## 📊 Performance

- ⚡ **First Load JS**: ~100KB (gzipped)
- 🎯 **Lighthouse Score**: 95+ (to be measured)
- 🚀 **Build Time**: ~30s
- 📦 **Bundle Size**: Optimized with Next.js code splitting

## 🗺️ Roadmap

- [ ] v1.1: Quota management & validation
- [ ] v1.2: Dark mode, PWA, offline support
- [ ] v1.3: Batch templates, before/after slider
- [ ] v2.0: Public API, Shopify/WooCommerce plugins
- [ ] v2.1: Team accounts, white-label
- [ ] v3.0: Background removal, AI enhancements

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m 'Add: my feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 💬 Support

- 📧 Email: support@centyr.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/centyr-web/issues)
- 📖 Docs: [Full Documentation](PROJECT_DOCUMENTATION.md)

## ⭐ Show Your Support

If you like this project, please give it a ⭐ on GitHub!

---

**Built with ❤️ using Next.js, TypeScript & TailwindCSS**
