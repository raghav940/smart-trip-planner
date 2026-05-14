# MVP Scope & Roadmap

## Phase 0 — Foundations
- Auth: signup/login/forgot/reset (JWT + refresh tokens)
- DB: users, trips, hotels basic schemas
- Basic frontend shell and protected routes
- Open-source service wiring: Ollama, OpenStreetMap, Open-Meteo, local storage

## Phase 1 — Core
- Manual trip CRUD
- Hotel listing + basic booking (no payments)
- Save/share trips
- Basic budget view (Chart.js)
- Destination search and weather cards using free APIs

## Phase 2 — AI & Analytics
- AI itinerary generation with Ollama (queued jobs)
- Regenerate & edit flow
- Analytics dashboard (popular destinations, bookings)

## Phase 3 — Real-time & Owners
- Socket.io chat between users and hotel owners
- Hotel owner panel for listings and bookings
- Admin dashboard

## Acceptance criteria (MVP)
- Users can auth and create/manual trips
- Users can generate one AI itinerary per trip and save it
- Basic booking flow without payments
- Admin can view platform analytics

## Free API rules
- No paid AI API keys
- No paid map API keys
- No paid weather API keys
- No live payment provider required for MVP

Adjust timelines per team size; I can convert this into issues/PR-ready task cards.