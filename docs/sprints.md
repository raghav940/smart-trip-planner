# Sprint Plan

This plan breaks the roadmap into small execution steps that can be delivered in order.

## Sprint 1 — Project foundation
Goal: make the repository runnable and ready for feature work.

Tasks:
- Finalize folder structure for frontend, backend, and docs
- Set up environment variable examples and local dev instructions
- Add authentication skeleton and protected route helpers
- Connect Prisma schema to PostgreSQL and verify migrations
- Add base UI shell and navigation

Outcome:
- A developer can run the app locally and reach the public landing page and auth screens.

## Sprint 2 — User trip management
Goal: let users create and manage trips manually.

Tasks:
- Build signup, login, forgot password, and reset password flows
- Implement trip CRUD
- Add trip details view with destination, dates, budget, and travelers
- Create trip cards and list views on the dashboard
- Add saved trips and duplicate trip action

Outcome:
- A user can sign in and manage trip records end to end.

## Sprint 3 — Manual itinerary builder
Goal: let users plan trip days without AI first.

Tasks:
- Add itinerary day creation and deletion
- Add activities, notes, reminders, and time blocks
- Support drag-and-drop ordering
- Add calendar-style display for trip days
- Save itinerary edits back to the database

Outcome:
- A user can manually build and reorder a trip itinerary.

## Sprint 4 — Free API enrichment
Goal: make trips more useful with open-source and free APIs.

Tasks:
- Wire OpenStreetMap/Nominatim search
- Show nearby places and attractions
- Wire Open-Meteo weather widgets
- Add place and weather caching
- Add destination-themed background/watermark logic

Outcome:
- The trip view becomes context-aware without paid third-party services.

## Sprint 5 — Self-hosted AI itinerary generation
Goal: add AI without paid APIs.

Tasks:
- Connect Ollama to the backend
- Generate day-wise itineraries from trip inputs
- Add regenerate and edit flows
- Add AI chat assistant for travel questions
- Store AI-generated itinerary versions

Outcome:
- A user can generate and refine an itinerary with a self-hosted model.

## Sprint 6 — Booking, chat, and admin basics
Goal: add operational workflows.

Tasks:
- Create booking records for hotels and activities
- Add Socket.io chat between users and hotel owners
- Build basic hotel owner views for listings and availability
- Add admin views for users, trips, and bookings
- Add request and event logging

Outcome:
- The platform supports booking records, messaging, and oversight.

## Sprint 7 — Hardening and release prep
Goal: stabilize the product for beta use.

Tasks:
- Add rate limiting and input validation
- Add tests for core flows
- Improve error handling and monitoring
- Add analytics and dashboard charts
- Prepare deployment checklists and backups

Outcome:
- The app is ready for a controlled beta release.

## Suggested order
1. Sprint 1
2. Sprint 2
3. Sprint 3
4. Sprint 4
5. Sprint 5
6. Sprint 6
7. Sprint 7

If you want, I can turn this into GitHub issue titles next.