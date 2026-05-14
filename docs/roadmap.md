# Development Roadmap

This roadmap breaks the Smart Trip Planner into clear phases so the project can ship incrementally without adding paid dependencies.

## Phase 0 — Foundation and Setup
Goal: establish the technical base, repo conventions, and the free-only architecture.

Deliverables:
- Monorepo or structured app layout for frontend, backend, and docs
- Environment setup for PostgreSQL, Redis, Ollama, and local file storage
- Authentication flow skeleton with JWT and bcrypt
- Base UI shell, routing, and protected route guards
- OpenAPI starter and Prisma schema baseline

Exit criteria:
- A developer can clone the repo, configure the env file, and run the app locally.
- Public pages are accessible while protected pages require login.

## Phase 1 — MVP Core
Goal: deliver the first usable version of the trip planner.

Deliverables:
- User signup, login, forgot password, and reset password
- Trip CRUD: create, edit, delete, and list trips
- Manual itinerary builder with days, activities, notes, and reminders
- Destination search and basic place lookup with OpenStreetMap/Nominatim
- Weather cards with Open-Meteo
- Basic trip budget card and expense entries
- Saved trips and duplicate trip flow

Exit criteria:
- A user can create a trip, manually plan it, and save it.
- The dashboard shows trip details, weather, and budget summary.

## Phase 2 — AI Itinerary and Smart Assistance
Goal: add self-hosted AI to make the product useful without paid APIs.

Deliverables:
- Ollama integration for itinerary generation
- Regenerate itinerary flow with updated inputs
- AI assistant chat for trip planning questions
- Day-wise itinerary generation based on destination, dates, budget, and interests
- AI summary of existing itineraries

Exit criteria:
- A user can generate an itinerary from trip inputs and regenerate it on demand.
- AI calls are routed through the self-hosted AI service.

## Phase 3 — Booking, Chat, and Admin
Goal: expand the platform into a real travel operations tool.

Deliverables:
- Booking records for hotels and activities without live payment processing
- Socket.io chat between users and hotel owners
- Hotel owner dashboard for listings, pricing, and availability
- Admin dashboard for users, trips, bookings, and analytics
- Logging and monitoring for auth, booking, and chat events

Exit criteria:
- Users can create booking records and chat in real time.
- Admin can monitor platform activity and usage.

## Phase 4 — Hardening and Scale
Goal: improve stability, performance, and production readiness.

Deliverables:
- Rate limiting, request validation, and security headers
- Caching for place, weather, and repeated AI queries
- Background jobs for AI generation and email notifications
- Analytics reporting for destinations, bookings, and user activity
- Backup and restore strategy for PostgreSQL and uploads
- Automated tests and CI checks

Exit criteria:
- The app is stable enough for broader beta testing.
- Core flows have tests and deployment checks.

## Suggested Release Order
1. Phase 0
2. Phase 1
3. Phase 2
4. Phase 3
5. Phase 4

If you want, I can turn this roadmap into GitHub issues or a sprint-by-sprint plan next.