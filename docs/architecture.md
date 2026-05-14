# Architecture Overview

## High-level
- Frontend: React app (Vercel) — public landing + authenticated dashboard
- Backend: Node.js + Express (Render) — REST APIs, auth, business logic
- Database: PostgreSQL (Neon/Supabase) via Prisma
- Real-time: Socket.io for chat and notifications
- AI: Gemini/OpenAI for itinerary generation and assistant
- Storage: Cloudinary for images; backups to S3-compatible storage

## Key patterns
- Auth-first: all major endpoints protected; public landing is unauthenticated
- Background workers: use Redis + BullMQ for long-running tasks (AI generation, emails)
- Caching: Redis for sessions, rate-limits, and AI partial results
- Observability: Winston + Morgan + OpenTelemetry + PM2 logs

## Scalability
- Separate read replicas for analytics-heavy queries
- CDN/edge caching for static assets
- Partitioning and indexing for large trip/history tables

## Security
- JWT access + refresh tokens, refresh rotation
- RBAC: roles and permissions enforced at API layer
- Input validation and file sanitization

Refer to `docs/api.md` for endpoint design and `docs/mvp.md` for phased delivery.