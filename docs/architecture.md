# Architecture Overview

## High-level
- Frontend: React app for public landing and authenticated dashboard
- Backend: Node.js + Express for REST APIs, auth, and business logic
- Database: PostgreSQL via Prisma
- Real-time: Socket.io for chat and notifications
- AI: Ollama running locally or on your own server
- Maps: OpenStreetMap, Leaflet, and Nominatim
- Weather: Open-Meteo
- Storage: local uploads or self-hosted MinIO

## Key patterns
- Auth-first: all major endpoints protected; public landing is unauthenticated
- Background workers: use Redis + BullMQ for long-running tasks such as itinerary generation and email jobs
- Caching: Redis for sessions, rate-limits, and repeated AI or place lookups
- Observability: Winston + Morgan logs with structured request IDs

## Scalability
- Add read replicas for analytics-heavy queries when needed
- Cache place and weather responses to reduce external requests
- Partition and index large trip/history tables

## Security
- JWT access + refresh tokens, refresh rotation
- RBAC: roles and permissions enforced at API layer
- Input validation and file sanitization

## Free API Policy
- Prefer self-hosted AI over paid third-party AI APIs
- Use open geocoding and map data rather than paid map providers
- Use free weather APIs with rate-limit awareness
- Keep payments mocked in MVP unless a real gateway is explicitly added later

Refer to `docs/api.md` for endpoint design and `docs/mvp.md` for phased delivery.