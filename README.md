# 📚 PeerTutor Platform — Complete Software Engineering Plan
### A Peer-to-Peer Tutoring Platform for College Teams

> **Document Type:** Software Engineering Master Plan  
> **Team Size:** 6 College Students (2 Frontend, 4 Backend/ML)  
> **Target:** Web + Mobile Platform  
> **Version:** 1.0

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Tech Stack](#2-tech-stack)
3. [High-Level Architecture](#3-high-level-architecture)
4. [Team Division & Sprint Plan](#4-team-division--sprint-plan)
5. [Feature Implementation Guide](#5-feature-implementation-guide)
6. [ML Integration Details](#6-ml-integration-details)
7. [Documentation Structure](#7-documentation-structure)
8. [DevOps & CI/CD](#8-devops--cicd)
9. [Security Strategy](#9-security-strategy)
10. [Scalability & Future-Proofing](#10-scalability--future-proofing)

---

## 1. System Overview

### 1.1 Platform Purpose

PeerTutor is a web and mobile platform that connects students with peer mentors for paid 1:1 and group tutoring sessions. It also provides a community Q&A layer for doubt resolution, ML-driven learning recommendations, and gamified engagement via a points and rewards system.

---

### 1.2 Core Features by Role

#### 👨‍🎓 Student Features
| Feature | Description |
|---|---|
| Registration & Login | Email/OAuth signup, profile creation with subjects of interest |
| Browse Mentors | Filter by subject, rating, price, availability |
| Book Sessions | 1:1 or group paid sessions, calendar integration |
| Post Doubts | Tag-based doubt posting with subject/topic classification |
| Answer Doubts | Students can also answer each other's doubts |
| Messaging | Secure in-app messaging with mentors |
| Points & Rewards | Earn points for activity; redeem in points shop |
| Learning Path | Personalized ML-recommended study path |
| Session History | View past sessions, recordings, notes |

#### 🧑‍🏫 Mentor Features
| Feature | Description |
|---|---|
| Mentor Profile | Bio, subjects, pricing, availability calendar |
| Session Management | Accept/decline bookings, set recurring slots |
| Broadcast Messages | Send announcements to all enrolled students |
| Doubt Dashboard | View and answer tagged doubts in their subject area |
| Earnings Dashboard | Track payments, withdrawal requests |
| Review & Rating | View student ratings and feedback |
| ML Insights | See trending topics students are struggling with |

#### 🔐 Admin Features
| Feature | Description |
|---|---|
| User Management | Suspend/verify accounts |
| Content Moderation | Review flagged doubts and messages |
| Analytics Dashboard | Platform-wide usage, revenue, engagement metrics |
| Points Shop Management | Add/edit reward items |

---

### 1.3 Functional Requirements

**Authentication & Authorization**
- Email/password and OAuth (Google, GitHub) login
- JWT-based session management with refresh tokens
- Role-based access: Student, Mentor, Admin
- Email verification and password reset

**Session Management**
- Real-time availability calendar for mentors
- Stripe-powered payment for booking
- Session reminders via email/push notifications
- Group session support (up to 10 students per session)
- Session recording links (Zoom/Google Meet integration)

**Doubt System**
- Rich-text doubt posting with image attachments
- ML auto-tagging of subject/topic
- ML duplicate detection before submission
- Upvote/downvote answers
- Mark answer as accepted

**Messaging**
- Real-time 1:1 and group chat via WebSockets
- End-to-end encrypted messages
- File and image sharing (limited)
- Message read receipts

**Gamification**
- Points earned for: answering doubts, attending sessions, login streaks, referrals
- Points redeemable in shop (discount coupons, merchandise, free session credits)
- Leaderboard of top contributors per subject

**ML Features**
- Auto-tagging doubts (multi-label classification)
- Duplicate doubt detection (semantic similarity)
- Learning path recommendations (collaborative + content-based filtering)
- Mentor-student matching score
- Struggling topic detection for mentors

---

### 1.4 Non-Functional Requirements

| Category | Requirement |
|---|---|
| Performance | API response < 300ms for 95th percentile |
| Scalability | Support 10,000 concurrent users in future |
| Availability | 99.5% uptime SLA |
| Security | OWASP Top 10 compliance, data encryption at rest and in transit |
| Accessibility | WCAG 2.1 AA compliance on frontend |
| Mobile | Responsive PWA + React Native mobile app |
| Data Privacy | GDPR-compliant data handling, user data export/delete |
| Observability | Centralized logging, error tracking, performance monitoring |

---

### 1.5 User Roles & Permissions Matrix

| Permission | Student | Mentor | Admin |
|---|---|---|---|
| Browse mentors | ✅ | ✅ | ✅ |
| Book sessions | ✅ | ❌ | ✅ |
| Post doubts | ✅ | ✅ | ✅ |
| Answer doubts | ✅ | ✅ | ✅ |
| Create sessions | ❌ | ✅ | ✅ |
| Broadcast messages | ❌ | ✅ | ✅ |
| Access earnings | ❌ | ✅ | ✅ |
| Manage users | ❌ | ❌ | ✅ |
| View all analytics | ❌ | ❌ | ✅ |
| Redeem points | ✅ | ✅ | ❌ |
| Moderate content | ❌ | ❌ | ✅ |

---

## 2. Tech Stack

### 2.1 Frontend (Web)

```
Framework:        React 18 + TypeScript
Routing:          React Router v6
State Management: Zustand (lightweight, simpler than Redux for college team)
UI Component Lib: shadcn/ui + Tailwind CSS
Forms:            React Hook Form + Zod validation
HTTP Client:      Axios with interceptors
Real-time:        Socket.io-client
Rich Text Editor: Tiptap (for doubt posting)
Calendar:         FullCalendar
Charts:           Recharts
PWA:              Vite PWA plugin
Testing:          Vitest + React Testing Library
```

**Why this stack?** React is widely known to college students. Zustand avoids Redux boilerplate. Tailwind + shadcn/ui produces professional UI fast.

---

### 2.2 Mobile

```
Framework:        React Native (Expo SDK)
Navigation:       React Navigation v6
State:            Zustand (shared logic with web where possible)
Real-time:        Socket.io-client
Push Notifications: Expo Notifications + Firebase Cloud Messaging (FCM)
Payment:          Stripe React Native SDK
```

**Strategy:** Start with a PWA for MVP (responsive web). Build React Native app in parallel or as Phase 2. Share business logic and API calls between web and mobile using a shared `api/` directory.

---

### 2.3 Backend

```
Runtime:          Node.js 20 LTS
Framework:        Express.js + TypeScript
  (Alternative:   Fastify for higher performance if needed)
API Style:        REST (primary) + WebSocket (real-time)
Authentication:   Passport.js + JWT (jsonwebtoken)
Validation:       Zod
ORM:              Prisma (PostgreSQL) + Mongoose (MongoDB)
Job Queue:        BullMQ + Redis
Email:            Nodemailer + SendGrid
File Uploads:     Multer + AWS S3 / Cloudinary
API Docs:         Swagger (swagger-jsdoc + swagger-ui-express)
```

**Why Express?** Most college students know it. TypeScript adds safety. Prisma has excellent DX and auto-generates types.

---

### 2.4 Databases

```
Primary DB:       PostgreSQL 15
  - Users, sessions, payments, points, roles
  - Hosted on: Supabase (free tier generous, includes auth helpers)

Document Store:   MongoDB Atlas (free tier)
  - Doubt posts, answers, tags, ML metadata

Cache:            Redis (Upstash — serverless Redis, free tier)
  - Sessions, rate limiting, real-time leaderboards, job queues

Search:           Elasticsearch or Typesense (self-hosted)
  - Full-text search on doubts and mentors
  - Typesense recommended (easier to self-host, MIT license)
```

---

### 2.5 ML Stack

```
Language:         Python 3.11
Framework:        FastAPI (ML microservice)
NLP:              Hugging Face Transformers, sentence-transformers
ML Libraries:     scikit-learn, pandas, numpy
Deep Learning:    PyTorch (optional, for fine-tuning)
Recommendation:   Surprise library (collaborative filtering), 
                  LightFM (hybrid recommendations)
Similarity:       FAISS (Facebook AI Similarity Search) for fast vector search
Experiment Track: MLflow (optional, for tracking model experiments)
Serving:          FastAPI + Uvicorn
Containerize:     Docker
```

---

### 2.6 Payment Gateway

```
Provider:         Stripe
  - Stripe Checkout (sessions booking)
  - Stripe Connect (mentor payouts — marketplace model)
  - Stripe Webhooks (payment event handling)
Libraries:        stripe (Node.js SDK), @stripe/stripe-js (frontend)
```

---

### 2.7 Hosting & Deployment

```
Frontend (Web):   Vercel (free tier, GitHub integration, previews)
Mobile (Expo):    Expo EAS Build + App Store / Play Store
Backend API:      Railway.app (free tier, Dockerized deploys) 
                  OR Render.com
ML Service:       Hugging Face Spaces (free GPU tier) 
                  OR Railway with CPU
Database:         Supabase (PostgreSQL), MongoDB Atlas, Upstash (Redis)
File Storage:     Cloudinary (free tier — 25GB)
CDN:              Cloudflare (free tier)
Domain:           Namecheap / Google Domains
```

**Note for college team:** These services all have generous free tiers suitable for development and initial deployment. Total infra cost at start: ~$0–$20/month.

---

### 2.8 DevOps & CI/CD

```
Version Control:  GitHub
CI/CD:            GitHub Actions
Containerization: Docker + Docker Compose (local dev)
Environment Mgmt: dotenv + GitHub Secrets
Monitoring:       Sentry (error tracking, free tier)
Logging:          Winston (Node.js) + Logflare or Logtail
API Testing:      Postman / Insomnia + automated with Jest
Load Testing:     k6 (optional, for stress testing)
```

---

### 2.9 GitHub Branching Strategy

```
main              ← Production-ready code only. Protected branch.
                     Requires PR + 1 reviewer approval + CI pass.

develop           ← Integration branch. All features merge here first.
                     Auto-deploys to staging environment.

feature/<name>    ← Individual feature branches.
                     Branch from: develop
                     Example: feature/payment-integration
                              feature/ml-doubt-tagger
                              feature/mentor-profile

fix/<name>        ← Bug fix branches.
                     Example: fix/session-booking-null-error

hotfix/<name>     ← Critical production fixes only.
                     Branch from: main, merge to main + develop.

release/<version> ← Release preparation branch.
                     Example: release/v1.0.0
```

**Branch Protection Rules for `main`:**
- Require pull request before merging
- Require at least 1 approving review
- Require status checks (CI) to pass
- No direct pushes

**Commit Message Convention (Conventional Commits):**
```
feat: add mentor availability calendar
fix: resolve duplicate doubt detection edge case
docs: update API documentation for sessions endpoint
test: add unit tests for points calculation
chore: upgrade dependencies
refactor: extract auth middleware to separate module
```

---

## 3. High-Level Architecture

### 3.1 System Components Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│  ┌──────────────────┐          ┌──────────────────────────┐    │
│  │   React Web App   │          │  React Native Mobile App  │    │
│  │   (Vercel)        │          │  (Expo / App Stores)      │    │
│  └────────┬─────────┘          └───────────┬──────────────┘    │
└───────────┼────────────────────────────────┼───────────────────┘
            │ HTTPS / WSS                    │ HTTPS / WSS
┌───────────┼────────────────────────────────┼───────────────────┐
│           │         API GATEWAY LAYER       │                   │
│           └────────────────┬───────────────┘                   │
│                   ┌────────▼────────┐                          │
│                   │  Nginx / Vercel  │  (Rate Limiting, TLS)   │
│                   │  Edge Functions  │                          │
│                   └────────┬────────┘                          │
└────────────────────────────┼───────────────────────────────────┘
                              │
┌────────────────────────────┼───────────────────────────────────┐
│                   BACKEND SERVICES LAYER                        │
│                             │                                   │
│          ┌──────────────────┼───────────────────┐              │
│          │                  │                   │              │
│  ┌───────▼──────┐  ┌────────▼──────┐  ┌────────▼──────┐      │
│  │  Main API    │  │  WebSocket    │  │  ML Service   │      │
│  │  (Express)   │  │  Server       │  │  (FastAPI)    │      │
│  │  Railway     │  │  (Socket.io)  │  │  HF Spaces    │      │
│  └───────┬──────┘  └────────┬──────┘  └────────┬──────┘      │
│          │                  │                   │              │
└──────────┼──────────────────┼───────────────────┼─────────────┘
           │                  │                   │
┌──────────┼──────────────────┼───────────────────┼─────────────┐
│                       DATA LAYER                                │
│          │                  │                   │              │
│  ┌───────▼──────┐  ┌────────▼──────┐  ┌────────▼──────┐      │
│  │  PostgreSQL  │  │    Redis       │  │   MongoDB     │      │
│  │  (Supabase)  │  │  (Upstash)    │  │   (Atlas)     │      │
│  └──────────────┘  └───────────────┘  └───────────────┘      │
│                                                                 │
│  ┌───────────────┐  ┌────────────────┐                         │
│  │  Typesense    │  │  Cloudinary    │                         │
│  │  (Search)     │  │  (Files/CDN)   │                         │
│  └───────────────┘  └────────────────┘                         │
└─────────────────────────────────────────────────────────────────┘
           │
┌──────────▼──────────────────────────────────────────────────────┐
│                  EXTERNAL SERVICES                               │
│  Stripe (Payments) │ SendGrid (Email) │ FCM (Push) │ Zoom API   │
└─────────────────────────────────────────────────────────────────┘
```

---

### 3.2 API Layer Design

**REST API Base URL:** `https://api.peertutor.app/v1`

**Endpoint Groups:**
```
/auth          → Login, signup, refresh token, OAuth callbacks
/users         → Profile CRUD, avatar upload
/mentors       → Mentor listing, profile, availability
/sessions      → Booking, management, history
/doubts        → Post, answer, vote, tag, search
/messages      → Conversation list, send message
/payments      → Create checkout, webhook handler, payouts
/points        → Balance, earn history, redeem
/shop          → Shop items, purchase
/broadcasts    → Mentor broadcasts
/admin         → User management, analytics
/ml            → Internal ML endpoints (not public)
/notifications → User notifications
```

**WebSocket Namespaces:**
```
/chat          → Real-time messaging
/notifications → Push notification events
/session       → Live session updates (join/leave/end)
```

---

### 3.3 Authentication Flow

```
                    STUDENT/MENTOR LOGIN FLOW
                    
1. Client → POST /auth/login { email, password }
2. Server validates credentials against PostgreSQL
3. Server issues:
   - Access Token (JWT, 15-minute expiry)
   - Refresh Token (opaque, 7-day expiry, stored in Redis + HTTP-only cookie)
4. Client stores Access Token in memory (NOT localStorage)
5. On API request: Authorization: Bearer <access_token>
6. On 401: Client auto-calls POST /auth/refresh
7. Server validates refresh token from cookie, issues new access token
8. On logout: DELETE /auth/logout → invalidate refresh token in Redis

                    OAUTH FLOW (Google)
                    
1. Client → GET /auth/google
2. Redirect to Google consent screen
3. Google callback → GET /auth/google/callback?code=xxx
4. Server exchanges code for profile
5. Upsert user in DB, issue JWT pair
6. Redirect to frontend with tokens
```

---

### 3.4 Database Schema Strategy

**PostgreSQL (via Prisma) — Core Relational Data**

```prisma
// Core entities — abbreviated for readability

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String?
  role          Role      @default(STUDENT)
  profile       Profile?
  sessions      Session[]
  points        Int       @default(0)
  createdAt     DateTime  @default(now())
}

model Profile {
  id          String   @id @default(cuid())
  userId      String   @unique
  user        User     @relation(...)
  name        String
  bio         String?
  avatarUrl   String?
  subjects    String[]  // array of subject strings
  hourlyRate  Decimal?  // for mentors
  stripeId    String?   // Stripe Connect account ID
}

model Session {
  id           String        @id @default(cuid())
  mentorId     String
  type         SessionType   // ONE_ON_ONE | GROUP
  status       SessionStatus // PENDING | CONFIRMED | COMPLETED | CANCELLED
  startTime    DateTime
  endTime      DateTime
  priceTotal   Decimal
  meetingUrl   String?
  bookings     Booking[]
}

model Booking {
  id         String  @id @default(cuid())
  sessionId  String
  studentId  String
  paymentId  String?
  status     BookingStatus
}

model Payment {
  id              String        @id @default(cuid())
  stripeSessionId String        @unique
  bookingId       String
  amount          Decimal
  status          PaymentStatus
  createdAt       DateTime      @default(now())
}

model Points {
  id        String          @id @default(cuid())
  userId    String
  amount    Int
  type      PointsEventType // EARNED | REDEEMED
  reason    String
  createdAt DateTime        @default(now())
}

enum Role { STUDENT MENTOR ADMIN }
enum SessionType { ONE_ON_ONE GROUP }
enum SessionStatus { PENDING CONFIRMED COMPLETED CANCELLED }
enum BookingStatus { PENDING PAID CANCELLED REFUNDED }
enum PaymentStatus { PENDING SUCCEEDED FAILED REFUNDED }
enum PointsEventType { EARNED REDEEMED }
```

**MongoDB — Doubt & Messaging Data**

```javascript
// Doubt Collection
{
  _id: ObjectId,
  authorId: String,       // ref to PostgreSQL User.id
  title: String,
  body: String,           // HTML rich text
  images: [String],       // Cloudinary URLs
  tags: [String],         // ML-generated subject tags
  manualTags: [String],   // user-added tags
  subject: String,
  status: "open" | "answered" | "closed",
  duplicateOf: ObjectId,  // null if not duplicate
  votes: { up: Number, down: Number },
  viewCount: Number,
  answers: [AnswerRef],
  mlVector: [Number],     // 384-dim embedding for similarity search
  createdAt: Date,
  updatedAt: Date
}

// Answer Collection
{
  _id: ObjectId,
  doubtId: ObjectId,
  authorId: String,
  body: String,
  isAccepted: Boolean,
  votes: { up: Number, down: Number },
  createdAt: Date
}

// Message Collection
{
  _id: ObjectId,
  conversationId: String,
  senderId: String,
  encryptedContent: String,  // AES-256 encrypted
  iv: String,
  type: "text" | "image" | "file",
  readBy: [{ userId: String, readAt: Date }],
  createdAt: Date
}

// Conversation Collection
{
  _id: ObjectId,
  participants: [String],   // User IDs
  type: "direct" | "group",
  lastMessage: { ... },
  updatedAt: Date
}
```

---

### 3.5 Real-Time Messaging Architecture

```
Client A → Socket.io Client → WebSocket Connection → Socket.io Server
                                                          │
                                              ┌───────────▼────────────┐
                                              │    Redis Pub/Sub        │
                                              │  (horizontal scaling)  │
                                              └───────────┬────────────┘
                                                          │
                                              ┌───────────▼────────────┐
                                              │   MongoDB (persist)    │
                                              └────────────────────────┘
                                                          │
Client B ← Socket.io Client ← WebSocket Connection ← emit to room

Message Flow:
1. Client A sends message via socket.emit('message:send', payload)
2. Server validates sender identity (JWT middleware on socket)
3. Server encrypts message content (AES-256-GCM)
4. Server persists to MongoDB
5. Server publishes to Redis channel: `conversation:<id>`
6. All server instances subscribed to that channel emit to recipients
7. Client B receives via socket.on('message:receive', payload)
8. Read receipt: socket.emit('message:read', { messageId }) → update MongoDB
```

---

### 3.6 ML Service Integration

```
Main API Server → HTTP POST /ml/tag-doubt → ML FastAPI Service
                                                │
                                    ┌───────────▼────────────┐
                                    │  Load pre-trained      │
                                    │  transformer model     │
                                    │  (distilbert-base)     │
                                    └───────────┬────────────┘
                                                │
                                    Returns: { tags: [...], confidence: [...] }
                                                │
                               ┌────────────────▼──────────────────┐
                               │  Main API stores tags in MongoDB   │
                               │  and updates Typesense index       │
                               └────────────────────────────────────┘
```

**ML Service Endpoints (Internal, not public):**
```
POST /ml/tag-doubt          → Returns subject/topic tags
POST /ml/check-duplicate    → Returns { isDuplicate: bool, similarDoubtId: str, score: float }
POST /ml/recommend-path     → Returns ordered list of recommended topics
POST /ml/mentor-match       → Returns mentor ranking for a student
POST /ml/struggling-topics  → Returns topics a student group is struggling with
```

---

### 3.7 Security Layers

```
Layer 1 — Transport:      TLS 1.3 everywhere (HTTPS + WSS)
Layer 2 — Authentication: JWT with short expiry + HTTP-only cookie refresh tokens
Layer 3 — Authorization:  RBAC middleware on every protected route
Layer 4 — Input:          Zod schema validation on all API inputs
Layer 5 — Injection:      Parameterized queries via Prisma ORM; no raw SQL
Layer 6 — Rate Limiting:  Redis-backed rate limiter (express-rate-limit + rate-limit-redis)
Layer 7 — CORS:           Strict allowlist of frontend origins
Layer 8 — Headers:        Helmet.js (sets security headers)
Layer 9 — Content:        DOMPurify on rich text before storage (XSS prevention)
Layer 10 — Messaging:     AES-256-GCM encryption for message content
Layer 11 — Files:         Validate MIME type + file size; virus scan via ClamAV or Cloudinary
Layer 12 — Secrets:       All secrets in environment variables, never in code
```

---

## 4. Team Division & Sprint Plan

### 4.1 Team Roles

| Member | Role | Primary Responsibilities |
|---|---|---|
| **FE-1** | Frontend Lead | React web app, component library, routing, auth UI |
| **FE-2** | Frontend Dev | Mobile (React Native/Expo), PWA, notifications |
| **BE-1** | Backend Lead | API architecture, auth, CI/CD, code reviews |
| **BE-2** | Backend Dev | Sessions, booking, payments (Stripe) |
| **BE-3** | Backend Dev | Doubts, messaging, real-time (Socket.io) |
| **BE-4** | ML Engineer | ML service (FastAPI), NLP models, recommendations |

---

### 4.2 Sprint Plan (12-Week / 6 Sprints × 2 Weeks)

#### 🏁 Sprint 0 — Project Setup (Week 0, Pre-Sprint)
**Everyone:**
- Set up GitHub repo with branch strategy and protections
- Create project boards (GitHub Projects) with swim lanes
- Set up shared `.env.example` with all required keys
- Configure ESLint + Prettier + Husky pre-commit hooks
- Deploy skeleton apps to Vercel + Railway (empty hello-world)
- Create Postman workspace and share with team
- Set up Sentry project for error tracking
- Write SRS draft and HLD document
- **Deliverable:** Repo with CI pipeline green, deployed skeleton

---

#### 🚀 Sprint 1 — Foundation (Weeks 1–2)

**FE-1:**
- Set up React app with routing (React Router v6)
- Implement login/register pages with React Hook Form + Zod
- Build shared component library (Button, Input, Modal, Toast)
- Implement protected routes with auth guard

**FE-2:**
- Set up Expo project, link to same GitHub repo
- Implement login/register screens (React Navigation)
- Configure push notification setup (FCM + Expo)
- Build shared `api/` service layer (Axios) usable by both web and mobile

**BE-1:**
- Set up Express + TypeScript + Prisma boilerplate
- Implement `/auth` routes: register, login, refresh, logout
- Set up PostgreSQL schema (User, Profile, Role)
- Configure JWT middleware and RBAC middleware
- Set up Redis for token blacklist and rate limiting

**BE-2:**
- Set up Stripe account and test keys
- Implement basic `/users` CRUD endpoints
- Set up Prisma migrations workflow
- Write unit tests for auth endpoints

**BE-3:**
- Set up MongoDB with Mongoose
- Design Message and Conversation schemas
- Set up Socket.io server with JWT auth middleware
- Implement basic connection and room join/leave events

**BE-4:**
- Set up FastAPI ML service scaffold
- Set up Python environment with sentence-transformers
- Download and cache `all-MiniLM-L6-v2` model locally
- Implement `/ml/health` and test endpoint
- Deploy ML service to Hugging Face Spaces (basic)

**Sprint 1 Deliverable:** Working auth system (web + mobile), users can register/login, sockets connect, ML service responds.

---

#### 🛒 Sprint 2 — Core Features (Weeks 3–4)

**FE-1:**
- Build mentor listing page with filters
- Build mentor profile page
- Build session booking flow UI (calendar + payment form)
- Integrate Stripe Checkout frontend

**FE-2:**
- Build mobile mentor listing and profile screens
- Implement session booking flow on mobile
- Implement Stripe payment sheet on mobile

**BE-1:**
- Implement `/mentors` endpoints (list, profile, availability)
- Build availability calendar logic (slot generation, conflict detection)
- Set up Typesense and implement mentor search with filters
- Code review Sprint 1 work

**BE-2:**
- Implement full `/sessions` and `/bookings` endpoints
- Integrate Stripe: create checkout session, handle webhooks
- Implement Stripe Connect for mentor payouts
- Implement session confirmation emails via SendGrid

**BE-3:**
- Implement `/messages` endpoints (conversation list, message history)
- Build real-time messaging (send, receive, read receipts)
- Implement message AES-256-GCM encryption
- Implement mentor broadcast endpoints

**BE-4:**
- Build `/ml/tag-doubt` endpoint with DistilBERT
- Train initial subject classifier on sample education dataset
- Build `/ml/check-duplicate` with FAISS cosine similarity
- Write Python unit tests for ML endpoints

**Sprint 2 Deliverable:** Mentors can be browsed, sessions can be booked and paid, messages work in real-time, ML tagging works.

---

#### 📝 Sprint 3 — Doubt System & Gamification (Weeks 5–6)

**FE-1:**
- Build doubt posting form (Tiptap rich text editor + image upload)
- Build doubt feed with search, filters, tags
- Build individual doubt page with answers and voting

**FE-2:**
- Build mobile doubt feed and posting screens
- Implement push notifications for doubt answers
- Build points balance and history screen

**BE-1:**
- Implement `/doubts` endpoints (CRUD, vote, accept answer)
- Integrate ML tagging on doubt creation (async job via BullMQ)
- Integrate ML duplicate check (sync, before creation)
- Set up Typesense doubt search index

**BE-2:**
- Build full points system: earn events, balance calculation
- Implement `/points` endpoints
- Build `/shop` endpoints (list items, redeem item)
- Handle edge cases: concurrent redemption, insufficient balance

**BE-3:**
- Implement file upload to Cloudinary for doubt images
- Build notification system (DB + real-time + email)
- Build push notification sending via FCM

**BE-4:**
- Refine duplicate detection: tune similarity threshold (0.85)
- Begin building learning path recommendation dataset
- Implement collaborative filtering baseline with Surprise library
- Begin content-based filtering using subject-tag embeddings

**Sprint 3 Deliverable:** Full doubt system with ML, points system, gamification layer working.

---

#### 🤖 Sprint 4 — ML Recommendations & Dashboard (Weeks 7–8)

**FE-1:**
- Build student learning path dashboard (ML-powered)
- Build personalized doubt feed (based on subjects of interest)
- Build leaderboard component
- Build mentor analytics dashboard (earnings, sessions)

**FE-2:**
- Build mobile learning path screen
- Build mobile leaderboard
- Build mobile session history and management screens

**BE-1:**
- Build admin dashboard API endpoints (user stats, revenue, engagement)
- Implement content moderation endpoints
- Performance audit: add database indexes, query optimization
- Set up APM / logging pipeline (Winston + Logtail)

**BE-2:**
- Implement refund flow via Stripe
- Build earnings withdrawal endpoint (Stripe payouts)
- Implement group session seat-limit logic
- Implement session cancellation and rescheduling

**BE-3:**
- Implement mentor broadcast system (send to all enrolled students)
- Build notification preferences (email, push, in-app toggles)
- Implement socket room management for group sessions

**BE-4:**
- Complete hybrid recommendation system (collaborative + content-based)
- Implement `/ml/recommend-path` endpoint
- Implement `/ml/struggling-topics` endpoint for mentors
- Build mentor-student compatibility score
- Create admin ML dashboard data (trending topics, model confidence)

**Sprint 4 Deliverable:** ML recommendations live, admin dashboards, full mentor workflow complete.

---

#### 🔒 Sprint 5 — Security, Testing & Polish (Weeks 9–10)

**FE-1:**
- Accessibility audit (WCAG 2.1 AA)
- Cross-browser testing (Chrome, Firefox, Safari)
- UI polish pass: loading states, error states, empty states
- Write Vitest component tests for critical UI flows

**FE-2:**
- PWA offline capability (Service Worker, cache strategy)
- iOS + Android build via Expo EAS
- App store asset preparation (icons, screenshots)
- Push notification testing on real devices

**BE-1:**
- Full security audit against OWASP Top 10
- Penetration testing (basic: auth bypass, injection, XSS, CSRF)
- Implement GDPR endpoints: data export, account deletion
- Rate limiting audit and tuning

**BE-2:**
- Write integration tests for payment flows
- Implement idempotency keys for payment endpoints
- Load test booking system with k6 (simulate 100 concurrent bookings)

**BE-3:**
- Write integration tests for messaging and sockets
- Stress test WebSocket connections (simulate 500 concurrent users)
- Implement message retention policy (auto-delete after 1 year)

**BE-4:**
- ML model evaluation: precision, recall, F1 on test doubts
- A/B test recommendation strategies: log user engagement metrics
- Implement model versioning with MLflow
- Write tests for all ML endpoints

**Sprint 5 Deliverable:** Platform is secure, tested, mobile-ready, GDPR-compliant.

---

#### 🚢 Sprint 6 — Launch Prep & Documentation (Weeks 11–12)

**Everyone:**
- Write/finalize all documentation (SRS, HLD, LLD, API docs)
- Final QA and bug bash (each person tests another's feature)
- Set up production environment (separate from staging)
- Configure Sentry alerts, uptime monitoring (Better Uptime — free)
- Write README with setup guide, architecture diagram
- Record demo video
- Prepare presentation slides

**FE-1 + FE-2:**
- Final UI/UX review with 3–5 test users (classmates)
- Fix feedback from user testing

**BE-1:**
- Set up production database backups (pg_dump scheduled job)
- Finalize CI/CD pipelines for all services
- Write runbook (how to deploy, rollback, restart services)

**BE-4:**
- Document ML models: training data, performance metrics, limitations
- Set up model retraining pipeline (weekly cron job)

**Sprint 6 Deliverable:** Platform launched on production URL, all docs complete.

---

### 4.3 Daily Progress Workflow

```
📅 DAILY STANDUP (15 min async — GitHub Discussions or Discord)
Each team member posts:

✅ Yesterday: What I completed (link to PR/commit if applicable)
🔨 Today: What I'm working on (link to GitHub Issue)
🚧 Blocked: Any blockers (tag relevant teammate for help)
📊 Progress: % complete on current sprint task

GitHub Project Board Columns:
│ Backlog │ → │ This Sprint │ → │ In Progress │ → │ Review │ → │ Done │

Rules:
- Every task has a linked GitHub Issue
- Every PR links to its Issue ("Closes #42" in PR description)
- PRs must have at least 1 reviewer assigned
- No PR sits unreviewed for more than 24 hours
- Merges to develop happen after CI passes + review approval
- Weekly sync call (60 min, Sunday evening): demo progress, plan next week
```

---

## 5. Feature Implementation Guide

### 5.1 Payment Gateway (Stripe)

**Architecture: Stripe Marketplace Model**

```
Student pays → Stripe holds funds → Session completes → 
Stripe pays Mentor (minus platform fee) → Platform earns commission
```

**Step-by-Step Implementation:**

**Step 1: Stripe Connect Setup (for Mentors)**
```javascript
// BE-2: When mentor registers, create Stripe Connect account
const account = await stripe.accounts.create({
  type: 'express',          // Simplified onboarding
  country: 'US',
  email: mentor.email,
  capabilities: { transfers: { requested: true } }
});
// Save account.id to Profile.stripeId in PostgreSQL
```

**Step 2: Create Checkout Session (on Booking)**
```javascript
// BE-2: POST /sessions/:id/book
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [{
    price_data: {
      currency: 'usd',
      product_data: { name: `Session with ${mentor.name}` },
      unit_amount: sessionPrice * 100,  // cents
    },
    quantity: 1,
  }],
  mode: 'payment',
  payment_intent_data: {
    application_fee_amount: platformFee * 100,  // 15% platform fee
    transfer_data: { destination: mentor.stripeId }
  },
  success_url: `${FRONTEND_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${FRONTEND_URL}/booking/cancel`,
  metadata: { bookingId, studentId, sessionId }
});
return { checkoutUrl: session.url };
```

**Step 3: Handle Webhooks**
```javascript
// BE-2: POST /payments/webhook
// CRITICAL: Use raw body for Stripe signature verification
app.post('/payments/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(req.body, sig, WEBHOOK_SECRET);
  
  switch (event.type) {
    case 'checkout.session.completed':
      // Mark booking as PAID in PostgreSQL
      // Award points to student
      // Send confirmation email
      // Create calendar event / meeting link
      break;
    case 'payment_intent.payment_failed':
      // Mark booking as FAILED
      // Notify student
      break;
  }
  res.json({ received: true });
});
```

---

### 5.2 Points & Rewards System

**Points Earning Events:**
```
Answer a doubt (accepted): +50 points
Answer a doubt (upvoted 5+): +20 points
Post a doubt: +5 points
Attend a session: +30 points
First session of week: +20 bonus points
Login streak (7 days): +100 points
Refer a friend who signs up: +200 points
Complete profile 100%: +50 points (one-time)
```

**Implementation:**
```javascript
// BE-2: points.service.ts
export async function awardPoints(
  userId: string, 
  reason: PointsEventType, 
  amount: number, 
  metadata?: object
) {
  // Use a database transaction to ensure atomicity
  await prisma.$transaction([
    prisma.points.create({ 
      data: { userId, amount, type: 'EARNED', reason, metadata }
    }),
    prisma.user.update({ 
      where: { id: userId },
      data: { points: { increment: amount } }
    })
  ]);
  
  // Update Redis leaderboard (sorted set)
  await redis.zincrby('leaderboard:weekly', amount, userId);
  await redis.zincrby('leaderboard:alltime', amount, userId);
  
  // Emit real-time notification
  io.to(`user:${userId}`).emit('points:awarded', { amount, reason });
}

// Redeeming: always check balance first, use transaction
export async function redeemPoints(userId: string, itemId: string) {
  const item = await prisma.shopItem.findUnique({ where: { id: itemId } });
  const user = await prisma.user.findUnique({ where: { id: userId } });
  
  if (user.points < item.cost) throw new AppError('Insufficient points', 400);
  
  await prisma.$transaction([
    prisma.points.create({
      data: { userId, amount: -item.cost, type: 'REDEEMED', reason: `Redeemed: ${item.name}` }
    }),
    prisma.user.update({
      where: { id: userId },
      data: { points: { decrement: item.cost } }
    }),
    prisma.redemption.create({
      data: { userId, itemId, status: 'PENDING' }
    })
  ]);
}
```

---

### 5.3 Doubt Posting & Tagging Flow

```
User submits doubt (title + body + manual tags)
         │
         ▼
FE: Validate with Zod (min 20 chars title, min 50 chars body)
         │
         ▼
POST /doubts → BE-3 receives request
         │
         ▼
STEP 1: Sanitize HTML (DOMPurify server-side with jsdom)
         │
         ▼
STEP 2: Sync call to ML service → POST /ml/check-duplicate
        { text: title + " " + body }
        Returns: { isDuplicate: true, similarDoubtId: "abc", score: 0.91 }
         │
         ├─── isDuplicate: true, score > 0.85 →
         │    Return 409 with similar doubt link
         │    "A similar question exists: [link]. Is yours different?"
         │
         └─── isDuplicate: false →
              Save doubt to MongoDB (status: "open")
                     │
                     ▼
              STEP 3: Async BullMQ job → ML tagging
              POST /ml/tag-doubt → returns { tags: ["calculus", "derivatives"] }
              Update doubt document with ML tags
              Update Typesense search index
                     │
                     ▼
              STEP 4: Notify subscribed mentors
              (mentors who teach that subject get a notification)
```

---

### 5.4 Role-Based Access Control Implementation

```javascript
// BE-1: middleware/rbac.ts

type Role = 'STUDENT' | 'MENTOR' | 'ADMIN';

export function requireRole(...allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: Insufficient role' });
    }
    next();
  };
}

// Usage in routes:
router.post('/sessions', requireAuth, requireRole('MENTOR'), createSession);
router.post('/bookings', requireAuth, requireRole('STUDENT'), bookSession);
router.get('/admin/users', requireAuth, requireRole('ADMIN'), listUsers);
router.post('/doubts', requireAuth, requireRole('STUDENT', 'MENTOR'), postDoubt);

// Resource ownership check (for updating own data):
export async function requireOwnership(
  req: Request, res: Response, next: NextFunction
) {
  const resource = await getResourceById(req.params.id);
  if (resource.ownerId !== req.user.id && req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden: Not your resource' });
  }
  next();
}
```

---

### 5.5 Data Privacy Measures

```
GDPR Compliance Checklist:

✅ User consent on registration (checkboxes for terms + privacy policy)
✅ Privacy policy page explaining data usage
✅ GET /user/data-export  → generates JSON of all user data (async, emailed)
✅ DELETE /user/account   → soft delete (anonymize PII, keep stats)
✅ Data minimization: only collect what is needed
✅ Passwords: bcrypt with salt factor 12 (never stored plain)
✅ Payment data: never stored on our servers (Stripe handles it)
✅ Message content: AES-256 encrypted, keys derived per-conversation
✅ IP addresses: hashed before logging
✅ Analytics: anonymized user IDs only
✅ Third-party data sharing: documented in privacy policy
✅ Cookie consent banner on web
✅ Data retention policy: inactve accounts purged after 2 years
```

---

## 6. ML Integration Details

### 6.1 Doubt Auto-Tagging

**Model:** `distilbert-base-uncased` fine-tuned on education Q&A classification

**Training Data Strategy:**
- Collect 500+ sample doubts from team members across subjects
- Scrape StackExchange education questions (with permission)
- Label with subject + topic tags (manual labeling by team for first batch)
- Multi-label classification (a doubt can have 3+ tags)

```python
# BE-4: ml_service/routers/tagging.py
from fastapi import APIRouter
from sentence_transformers import SentenceTransformer
from sklearn.preprocessing import MultiLabelBinarizer
import joblib, numpy as np

router = APIRouter()
embedder = SentenceTransformer('all-MiniLM-L6-v2')  # 80MB, fast
classifier = joblib.load('models/tag_classifier.pkl')  # sklearn MultiOutputClassifier
mlb = joblib.load('models/mlb.pkl')  # label binarizer

@router.post("/tag-doubt")
async def tag_doubt(payload: TagRequest):
    text = f"{payload.title} {payload.body}"
    embedding = embedder.encode([text])
    predictions = classifier.predict_proba(embedding)
    
    # Get tags with confidence > 0.5
    tags = []
    for i, prob in enumerate(predictions[0]):
        if prob > 0.5:
            tags.append({
                "tag": mlb.classes_[i],
                "confidence": float(prob)
            })
    
    return {"tags": tags, "embedding": embedding[0].tolist()}
```

---

### 6.2 Duplicate Detection

**Algorithm:** Cosine similarity using sentence embeddings + FAISS index

```python
# BE-4: ml_service/routers/duplicate.py
import faiss, numpy as np
from pymongo import MongoClient

# On startup: build FAISS index from all existing doubt embeddings
index = faiss.IndexFlatIP(384)  # 384-dim inner product (= cosine with normalized vecs)

@router.post("/check-duplicate")
async def check_duplicate(payload: DuplicateRequest):
    text = f"{payload.title} {payload.body}"
    query_vec = embedder.encode([text])
    
    # Normalize for cosine similarity
    faiss.normalize_L2(query_vec)
    
    # Search top 3 most similar
    scores, indices = index.search(query_vec, k=3)
    
    top_score = float(scores[0][0])
    
    if top_score > 0.85:
        similar_doubt_id = doubt_ids[indices[0][0]]
        return {
            "isDuplicate": True,
            "similarDoubtId": similar_doubt_id,
            "score": top_score
        }
    
    return { "isDuplicate": False, "score": top_score }

# After a new doubt is added (webhook from main API):
@router.post("/index-doubt")
async def index_doubt(payload: IndexRequest):
    vec = np.array([payload.embedding], dtype='float32')
    faiss.normalize_L2(vec)
    index.add(vec)
    doubt_ids.append(payload.doubtId)
    # Persist index to disk (save every N additions)
    faiss.write_index(index, 'faiss_index.bin')
```

---

### 6.3 Learning Path Recommendation System

**Hybrid Approach: Collaborative Filtering + Content-Based Filtering**

```
Phase 1 — Cold Start (new user, no history):
→ Use content-based: recommend popular topics in user's registered subjects

Phase 2 — Warm Start (some history):
→ Collaborative filtering: "Users like you also studied..."
→ Based on: session history, doubts posted, doubts viewed, answers liked

Phase 3 — Full History:
→ Hybrid: weighted combination of collaborative (60%) + content-based (40%)
→ Factor in struggling topics (from doubt patterns)
→ Factor in mentor expertise areas

Output: Ordered list of topics → maps to available sessions and doubt categories
```

```python
# BE-4: Collaborative filtering with LightFM
from lightfm import LightFM
from lightfm.data import Dataset

# Build interaction matrix
# Rows = users, Cols = topics/subjects
# Values = engagement score (views × 0.1 + doubts_posted × 1.0 + sessions × 2.0)

model = LightFM(no_components=64, loss='warp')
model.fit(interactions, epochs=30, num_threads=4)

def get_recommendations(user_id, n=10):
    user_idx = user_id_map[user_id]
    scores = model.predict(user_idx, np.arange(n_topics))
    top_items = np.argsort(-scores)[:n]
    return [topic_list[i] for i in top_items]
```

---

### 6.4 Additional ML Ideas

**Mentor-Student Compatibility Score**
- Input: student's learning style, preferred explanation style, subject, past session ratings
- Output: compatibility score (0–1) shown next to mentor in search results
- Algorithm: Logistic regression on features from both profiles + past engagement data

**Smart Session Pricing Suggestion**
- Input: mentor's subject, experience level, competitor pricing
- Output: suggested hourly rate range for new mentors
- Algorithm: Regression on existing mentor profiles

**Automatic Difficulty Labeling**
- Tag doubts as Beginner / Intermediate / Advanced
- Input: vocabulary complexity, concept depth, prerequisite topics
- Algorithm: Readability features + embedding-based classifier

**Churn Prediction**
- Identify students at risk of leaving the platform
- Trigger: send personalized re-engagement notification
- Algorithm: Gradient boosting on activity features (login frequency, session recency, doubts activity)

---

## 7. Documentation Structure

### 7.1 SRS — Software Requirements Specification

```
SRS Document Structure (store in /docs/SRS.md):

1. Introduction
   1.1 Purpose
   1.2 Scope
   1.3 Definitions & Acronyms
   1.4 References

2. Overall Description
   2.1 Product Perspective
   2.2 Product Functions (feature list)
   2.3 User Classes and Characteristics
   2.4 Operating Environment
   2.5 Design and Implementation Constraints
   2.6 Assumptions and Dependencies

3. Functional Requirements (per module)
   3.1 Authentication Module
   3.2 Session Booking Module
   3.3 Doubt Management Module
   3.4 Messaging Module
   3.5 Points & Gamification Module
   3.6 ML Services Module
   3.7 Admin Module

4. Non-Functional Requirements
   4.1 Performance Requirements
   4.2 Security Requirements
   4.3 Availability Requirements
   4.4 Scalability Requirements
   4.5 Usability Requirements

5. External Interface Requirements
   5.1 User Interfaces
   5.2 Hardware Interfaces
   5.3 Software Interfaces (Stripe, SendGrid, etc.)

6. Appendix (Diagrams, Mockups)
```

---

### 7.2 HLD — High-Level Design

```
HLD Document Structure (store in /docs/HLD.md):

1. System Architecture Overview
   - Architecture diagram (draw.io or Excalidraw link)
   - Component descriptions

2. Technology Choices & Justification
   - Why each technology was chosen

3. Data Flow Diagrams
   - User registration flow
   - Session booking flow
   - Doubt posting flow with ML
   - Payment flow

4. API Layer Design
   - Endpoint groups
   - Authentication strategy

5. Database Design Overview
   - Choice of databases and rationale
   - High-level entity relationships

6. ML System Design
   - ML components and integration points
   - Training data strategy

7. Security Architecture

8. Deployment Architecture
```

---

### 7.3 LLD — Low-Level Design

```
LLD Document Structure (store in /docs/LLD/):
Split by module:

/docs/LLD/
  auth.md          → Detailed auth flows, token lifecycle, edge cases
  sessions.md      → Booking state machine, conflict resolution algorithm
  payments.md      → Stripe integration sequence diagrams
  doubts.md        → Doubt lifecycle, ML pipeline, indexing strategy
  messaging.md     → Socket.io event contracts, encryption key management
  points.md        → Points calculation logic, concurrent access handling
  ml-service.md    → Model architecture, training pipeline, serving strategy

Each LLD file includes:
- Component diagram
- Sequence diagrams for key flows
- Class/interface definitions
- Algorithm explanations
- Edge case handling
- Error scenarios
```

---

### 7.4 API Documentation

**Tool: Swagger UI via swagger-jsdoc**

```javascript
// BE-1: Each route annotated with JSDoc swagger comments
/**
 * @swagger
 * /doubts:
 *   post:
 *     summary: Post a new doubt
 *     tags: [Doubts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, body, subject]
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 20
 *                 example: "How do I solve differential equations?"
 *               body:
 *                 type: string
 *                 minLength: 50
 *               subject:
 *                 type: string
 *                 example: "Mathematics"
 *     responses:
 *       201:
 *         description: Doubt created successfully
 *       409:
 *         description: Duplicate doubt detected
 *       400:
 *         description: Validation error
 */
```

**Access at:** `https://api.peertutor.app/docs`

---

### 7.5 Database Schema Documentation

```
/docs/database/
  postgres-schema.md    → Prisma schema with explanations for each model
  mongodb-schema.md     → MongoDB document structures with field descriptions
  redis-keys.md         → Redis key naming conventions and TTLs
  indexes.md            → List of all database indexes and why they exist
  migrations.md         → Migration history and rollback procedures
  er-diagram.png        → Entity-relationship diagram (use dbdiagram.io)
```

---

### 7.6 Testing Plan

**Testing Pyramid:**
```
       /\
      /  \   E2E Tests (Playwright)
     /────\  ← 10% of tests — full user flows
    /      \
   /────────\ Integration Tests (Jest + Supertest)
  /          \ ← 30% — API endpoint tests, DB interactions
 /────────────\
/  Unit Tests  \ ← 60% — Pure functions, services, ML logic
────────────────
```

**Unit Tests (each developer writes for their own code):**
```
BE: Jest + ts-jest
  - Auth service: token generation, validation, refresh
  - Points service: calculation, concurrent deduction
  - Payment service: amount calculation, fee splitting
  - ML: tag confidence thresholds, duplicate score logic

FE: Vitest + React Testing Library
  - Form validation logic
  - Route protection (redirects unauthenticated user)
  - Points display component
  - Doubt card component
```

**Integration Tests:**
```
API Integration (Jest + Supertest):
  - POST /auth/login → returns JWT
  - POST /doubts → creates doubt, triggers ML job
  - POST /sessions/:id/book → creates booking, calls Stripe
  - WebSocket: connect → authenticate → join room → send message → receive message

Payment Integration (Stripe test mode):
  - Successful payment flow end-to-end
  - Failed payment handling
  - Webhook processing
  - Refund flow
```

**E2E Tests (Playwright):**
```
Critical User Flows:
  1. Student registers → verifies email → logs in
  2. Student browses mentors → books session → completes payment
  3. Student posts doubt → receives ML tags → gets answer
  4. Mentor creates availability → receives booking → manages session
  5. Student earns points → redeems in shop

Run on: every PR to develop branch (GitHub Actions)
```

---

### 7.7 Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Stripe integration bugs | Medium | High | Use Stripe test mode extensively; handle all webhook events defensively |
| ML model poor accuracy | Medium | Medium | Start with rule-based fallback tagging; ML is enhancement, not critical path |
| WebSocket scalability | Low (at start) | High | Use Redis adapter for Socket.io from day 1 |
| Payment double-charge | Low | Very High | Idempotency keys on all Stripe requests; webhook deduplication |
| Database data loss | Low | Very High | Supabase auto-backups; set up pg_dump cron job to S3 |
| Team member dropout | Medium | High | Every feature has 2 people aware of it; document all work thoroughly |
| Scope creep | High | Medium | Stick to sprint plan; new ideas go to backlog, never mid-sprint |
| FAISS index corruption | Low | Medium | Persist to disk after each N additions; rebuild from MongoDB if corrupted |
| Merge conflicts | High | Low | Small, frequent PRs; communicate in daily standup |
| Expo build failures | Medium | Medium | Test on real devices weekly, not just simulator |

---

## 8. DevOps & CI/CD

### 8.1 GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI Pipeline

on:
  push:
    branches: [develop, main]
  pull_request:
    branches: [develop, main]

jobs:
  test-backend:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env: { POSTGRES_PASSWORD: test }
      redis:
        image: redis:7
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: cd backend && npm ci
      - run: cd backend && npm run lint
      - run: cd backend && npm run type-check
      - run: cd backend && npm test -- --coverage
      - uses: codecov/codecov-action@v3

  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: cd frontend && npm ci
      - run: cd frontend && npm run lint
      - run: cd frontend && npm run type-check
      - run: cd frontend && npm test

  test-ml:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v4
        with: { python-version: '3.11' }
      - run: cd ml-service && pip install -r requirements.txt
      - run: cd ml-service && pytest tests/ -v

  deploy-staging:
    needs: [test-backend, test-frontend, test-ml]
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Railway (staging)
        run: railway up --service backend-staging
        env: { RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }} }
      - name: Deploy to Vercel (staging)
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

### 8.2 Docker Compose (Local Development)

```yaml
# docker-compose.yml
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: peertutor_dev
      POSTGRES_PASSWORD: devpassword
    ports: ["5432:5432"]
    volumes: [postgres_data:/var/lib/postgresql/data]

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]

  mongodb:
    image: mongo:7
    ports: ["27017:27017"]
    volumes: [mongo_data:/data/db]

  typesense:
    image: typesense/typesense:0.25.1
    ports: ["8108:8108"]
    volumes: [typesense_data:/data]
    command: --data-dir /data --api-key=dev_key

  ml-service:
    build: ./ml-service
    ports: ["8000:8000"]
    volumes: [./ml-service/models:/app/models]
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/peertutor

volumes:
  postgres_data:
  mongo_data:
  typesense_data:
```

**Start local env:** `docker-compose up -d` then run `npm run dev` for backend and frontend.

---

### 8.3 Environment Configuration

```bash
# .env.example (commit this; never commit .env)

# App
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000

# PostgreSQL
DATABASE_URL=postgresql://postgres:devpassword@localhost:5432/peertutor_dev

# MongoDB
MONGODB_URI=mongodb://localhost:27017/peertutor_dev

# Redis
REDIS_URL=redis://localhost:6379

# Auth
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# SendGrid
SENDGRID_API_KEY=SG.xxx
EMAIL_FROM=noreply@peertutor.app

# Cloudinary
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

# ML Service
ML_SERVICE_URL=http://localhost:8000

# Typesense
TYPESENSE_HOST=localhost
TYPESENSE_PORT=8108
TYPESENSE_API_KEY=dev_key

# Sentry
SENTRY_DSN=https://xxx@sentry.io/xxx
```

---

## 9. Security Strategy

### 9.1 OWASP Top 10 Mitigations

| OWASP Risk | Mitigation |
|---|---|
| A01 Broken Access Control | RBAC middleware on all routes, ownership checks |
| A02 Cryptographic Failures | HTTPS everywhere, bcrypt passwords, AES messages, no PII in logs |
| A03 Injection | Prisma ORM (parameterized), Mongoose (typed), Zod validation |
| A04 Insecure Design | Threat model documented, principle of least privilege |
| A05 Security Misconfiguration | Helmet.js, strict CORS, no default credentials, env vars |
| A06 Vulnerable Components | `npm audit` in CI pipeline, Dependabot alerts enabled |
| A07 Auth Failures | Short JWT TTL, refresh token rotation, account lockout after 5 failed logins |
| A08 Software Integrity Failures | GitHub verified commits, signed releases |
| A09 Logging Failures | Winston structured logging, Sentry error tracking, audit log for sensitive actions |
| A10 SSRF | Whitelist outbound URLs, validate user-provided URLs |

---

### 9.2 API Security Checklist

```
Per-Endpoint:
✅ Authentication required (JWT)
✅ Role authorization checked
✅ Rate limiting applied (per IP and per user)
✅ Input validated with Zod schema
✅ Response doesn't leak sensitive fields (use DTOs/select)
✅ Pagination enforced (max 50 items per page)
✅ SQL/NoSQL injection impossible (ORM + typed queries)

Global:
✅ HTTPS only (redirect HTTP → HTTPS)
✅ CORS allowlist (only frontend origins)
✅ Helmet.js security headers
✅ Request size limit (1MB default, 10MB for file uploads)
✅ Error responses don't expose stack traces in production
✅ No API keys in response bodies
```

---

## 10. Scalability & Future-Proofing

### 10.1 Near-Term Scaling (0–10K Users)

The current architecture handles this comfortably. Key things to watch:
- Add PostgreSQL connection pooling via PgBouncer if connection count spikes
- Enable Supabase read replicas for heavy read traffic
- Scale Socket.io horizontally using Redis adapter (already configured)
- Add CDN caching for Typesense search results (common queries)

### 10.2 Medium-Term Scaling (10K–100K Users)

```
Backend:       Break into microservices gradually:
               - Extract ML Service (already done)
               - Extract Notification Service
               - Extract Payment Service
               API Gateway: Kong or AWS API Gateway

Database:      PostgreSQL read replicas
               MongoDB sharding (Atlas handles automatically)
               Redis Cluster

Search:        Elasticsearch instead of Typesense (better at scale)

Files:         Move from Cloudinary to AWS S3 + CloudFront

Hosting:       Move from Railway to AWS ECS / Google Cloud Run
               Kubernetes for orchestration (overkill for college project, good to know)
```

### 10.3 Future Feature Roadmap (Post-MVP)

```
V2 Features:
→ Live video sessions (native WebRTC, replacing Zoom links)
→ AI-powered tutoring assistant (ChatGPT API integration)
→ Collaborative whiteboard during sessions
→ Study groups (self-organized peer groups by topic)
→ Certificate of completion for structured courses
→ Mobile app monetization (in-app purchases via Apple/Google)

V3 Features:
→ Institution partnerships (colleges paying for bulk access)
→ Mentor credentialing system (verified degrees/skills)
→ Multi-language support (i18n)
→ Offline mode for mobile (download notes, study materials)
→ Integration with LMS platforms (Canvas, Moodle)
```

### 10.4 Technical Debt Prevention Rules

```
✅ Write tests before marking a feature done
✅ No hardcoded values — use constants or env vars
✅ Every new endpoint has Swagger documentation before merge
✅ Database migrations always reversible (down migration)
✅ No console.log in production code — use logger
✅ All TODO comments must have a linked GitHub Issue
✅ Dependency upgrades monthly (use Dependabot)
✅ Code review with checklist (security, tests, docs, types)
✅ Architectural decisions recorded in /docs/ADR/ (Architecture Decision Records)
```

---

## Quick Reference Card

```
📦 Repo Structure:
/
├── frontend/          # React web app (Vite + TypeScript)
├── mobile/            # React Native app (Expo)
├── backend/           # Express API (Node.js + TypeScript)
├── ml-service/        # FastAPI ML service (Python)
├── docs/              # All documentation (SRS, HLD, LLD, ADRs)
│   ├── SRS.md
│   ├── HLD.md
│   ├── LLD/
│   ├── database/
│   └── ADR/
├── .github/
│   ├── workflows/     # CI/CD pipelines
│   └── PULL_REQUEST_TEMPLATE.md
├── docker-compose.yml
└── README.md

🛠 Key Commands:
docker-compose up -d              # Start local DBs
cd backend && npm run dev         # Start API (port 3001)
cd frontend && npm run dev        # Start web app (port 3000)
cd ml-service && uvicorn main:app # Start ML service (port 8000)
cd mobile && npx expo start       # Start mobile (Expo Go)
npm run test                      # Run tests
npm run type-check                # TypeScript validation
npm run lint                      # ESLint check

📊 GitHub Project Board Columns:
Backlog → Sprint Planned → In Progress → Review → Testing → Done
```

---

*Document maintained by the PeerTutor dev team. Update this plan as architecture decisions evolve.*  
*Last Updated: Sprint 0 | Version 1.0*
