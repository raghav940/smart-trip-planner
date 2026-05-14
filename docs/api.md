# API — Starter Contracts

This file lists core REST endpoints to implement for the MVP using only open-source and free-to-use services. Use OpenAPI/Swagger to formalize.

## Auth
- `POST /api/auth/signup` — register
- `POST /api/auth/login` — login (returns access + refresh)
- `POST /api/auth/refresh` — refresh tokens
- `POST /api/auth/forgot` — request password reset
- `POST /api/auth/reset` — reset password

## Users
- `GET /api/users/me` — profile
- `PUT /api/users/me` — update profile

## Trips / Itineraries
- `GET /api/trips` — list user trips
- `POST /api/trips` — create trip (manual)
- `GET /api/trips/:id` — get trip
- `PUT /api/trips/:id` — update trip
- `DELETE /api/trips/:id` — delete trip
- `POST /api/trips/:id/generate` — AI-generate itinerary using Ollama (background job)
- `POST /api/trips/:id/regenerate` — regenerate itinerary with updated inputs

## Places / Weather / Activities
- `GET /api/places/search` — search places using OpenStreetMap/Nominatim
- `GET /api/places/nearby` — nearby attractions, restaurants, and hotels from local data or free sources
- `GET /api/weather` — weather lookup using Open-Meteo
- `GET /api/activities` — list activities for a destination
- `POST /api/activities` — add an activity to a trip

## Hotels / Bookings
- `GET /api/hotels` — search hotels from your own database or imported free listings
- `GET /api/hotels/:id` — details
- `POST /api/hotels/:id/book` — create booking record

## Booking
- `GET /api/bookings` — user bookings
- `POST /api/bookings` — create booking
- `POST /api/bookings/:id/cancel` — cancel booking

## Chat
- Socket.io namespace: `/chat`
- REST: `GET /api/chats` — list conversations

## AI Assistant
- `POST /api/assistant/chat` — trip-planning assistant using self-hosted AI
- `POST /api/assistant/summarize` — summarize trip or itinerary

## Admin
- `GET /api/admin/users` — list users
- `GET /api/admin/analytics` — metrics

Security: all routes under `/api/*` require `Authorization: Bearer <token>` except auth endpoints. Implement RBAC checks where appropriate.

Next: convert this into an OpenAPI spec for the MVP if you'd like.