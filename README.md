# Retired · Railway Master Template

Retired on 2026-10-05 by Dusty's instruction. Do not use for new projects. The maintained replacement is [Mono starters](https://github.com/MonoByGit/mono-starters), with separate lightweight web and service profiles. Access to the private replacement repository is required.

This repository is preserved as recoverable history and is archived read-only. Existing applications are not changed by this retirement. The historical claims and instructions below are not current deployment guidance.

---

# Railway Master Template - Mono Foundation

> **Production-ready Next.js template voor Railway deployment**
>
> Gebaseerd op battle-tested patronen van WorkNet en Memortium

## 🎯 Wat Is Dit?

Dit is de **Mono Slug** - de standaard fundatie voor alle nieuwe Railway projecten. Het combineert de beste patronen uit WorkNet (Digital Signage) en Memortium (AI Photo Restoration) in één herbruikbare template.

## ✨ Features Out-of-the-Box

### 🔒 Security
- ✅ NextAuth 5.0 authentication
- ✅ Bcrypt password hashing
- ✅ Environment variable management
- ✅ Input validation (Zod)
- ✅ CSRF protection
- ✅ Rate limiting ready

### 🗄️ Database
- ✅ Drizzle ORM
- ✅ PostgreSQL (Railway)
- ✅ Migration system
- ✅ Seed scripts
- ✅ Type-safe queries

### 🛠️ Developer Experience
- ✅ TypeScript strict mode
- ✅ ESLint configured
- ✅ Tailwind CSS 4
- ✅ Hot reload
- ✅ Docker Compose (local dev)

### 🚀 Deployment
- ✅ Railway optimized
- ✅ Health check endpoint
- ✅ Error handling
- ✅ Structured logging ready
- ✅ One-command deploy

### 🧩 Integrations (Pre-configured)
- ✅ AI/LLM (OpenAI, Gemini)
- ✅ File uploads (UploadThing)
- ✅ Payments (Stripe, Mollie)
- ✅ Error tracking (Sentry)
- ✅ Communication (Telegram)

## 🚀 Quick Start

### 1. Create New Project
```bash
# Clone template
git clone <this-repo> my-new-app
cd my-new-app

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
```

### 2. Configure Environment
Edit `.env.local`:
```bash
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
NEXTAUTH_URL=http://localhost:3000
```

### 3. Start Database (Docker)
```bash
docker compose up -d
```

### 4. Initialize Database
```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

### 5. Start Development
```bash
npm run dev
```

Visit: http://localhost:3000

## 📁 Project Structure

```
railway-master-template/
├── app/
│   ├── (auth)/
│   │   ├── login/              # Login page
│   │   └── register/           # Registration page
│   ├── (dashboard)/
│   │   └── page.tsx            # Protected dashboard
│   ├── api/
│   │   ├── auth/[...nextauth]/ # NextAuth routes
│   │   ├── health/             # Health check
│   │   └── example/            # Example API route
│   ├── layout.tsx
│   └── page.tsx
│
├── lib/
│   ├── auth.ts                 # NextAuth config
│   ├── auth.config.ts          # Auth callbacks
│   ├── db.ts                   # Database client
│   ├── schemas.ts              # Zod validation
│   ├── errors.ts               # Error handling
│   └── logger.ts               # Structured logging (optional)
│
├── drizzle/
│   ├── schema.ts               # Database schema
│   ├── migrations/             # Migration files
│   └── seed.ts                 # Seed script
│
├── components/
│   ├── ui/                     # Shadcn components
│   └── layout/                 # Layout components
│
├── .env.example                # Environment template
├── docker-compose.yml          # Local PostgreSQL
├── railway.toml                # Railway config
├── middleware.ts               # Route protection
└── next.config.ts              # Next.js config
```

## 🔐 Authentication

### Default Admin Credentials (Development)
```
Email: admin@example.com
Password: Admin2026!Secure
```

⚠️ **IMPORTANT**: Change in production!

### Adding OAuth Providers
```typescript
// lib/auth.ts
import Google from 'next-auth/providers/google'

providers: [
  Credentials({ /* ... */ }),
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  })
]
```

## 🗄️ Database

### Schema Example
```typescript
// drizzle/schema.ts
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  passwordHash: text('password_hash'),
  role: roleEnum('role').default('user'),
  createdAt: timestamp('created_at').defaultNow(),
})
```

### Migrations
```bash
# Generate migration
npm run db:generate

# Apply migrations (local)
npm run db:migrate

# Apply migrations (production)
npm run db:deploy
```

## 🌐 API Routes

### With Validation
```typescript
// app/api/example/route.ts
import { exampleSchema } from '@/lib/schemas'
import { handleAPIError, ValidationError } from '@/lib/errors'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validated = exampleSchema.parse(body)

    // Your logic here

    return Response.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleAPIError(new ValidationError('Invalid input', error.errors))
    }
    return handleAPIError(error)
  }
}
```

## 🚀 Railway Deployment

### 1. Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Create Railway Project
1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub"
3. Select your repository

### 3. Add PostgreSQL
- Click "New" → "Database" → "PostgreSQL"
- DATABASE_URL is auto-provided

### 4. Set Environment Variables
```bash
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
NEXTAUTH_URL=https://your-app.railway.app
```

### 5. Deploy
Railway auto-detects and deploys!

### 6. Initialize Database
In Railway shell:
```bash
npm run db:deploy
npm run db:seed
```

## 🧩 Optional Integrations

### Sentry (Error Tracking)
```bash
npx @sentry/wizard@latest -i nextjs
```

Add to `.env`:
```bash
SENTRY_DSN=your-dsn
NEXT_PUBLIC_SENTRY_DSN=your-public-dsn
```

### Upstash Redis (Rate Limiting)
```bash
npm install @upstash/ratelimit @upstash/redis
```

```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export const apiRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(60, '1 m'),
})
```

### UploadThing (File Uploads)
```bash
npm install uploadthing
```

See: https://uploadthing.com/docs

## 📚 Documentation

- [Deployment Guide](./docs/deployment.md)
- [Development Setup](./docs/development.md)
- [API Services Integration](./docs/services.md)
- [Architecture Decisions](./docs/architecture.md)

## 🤝 Contributing

This template is based on production apps:
- **WorkNet** - Digital Signage Platform
- **Memortium** - AI Photo Restoration

Improvements welcome!

## 📄 License

MIT

## 🙏 Credits

Built with:
- Next.js 15+
- Drizzle ORM
- NextAuth
- Tailwind CSS
- Railway

---

**Ready to build something amazing?** 🚀

Start with: `npm install && npm run dev`

