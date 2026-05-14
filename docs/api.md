# API — Starter Contracts

This file lists core REST endpoints to implement for the MVP. Use OpenAPI/Swagger to formalize.

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
- `POST /api/trips/:id/generate` — AI-generate itinerary (background job)

## Hotels / Activities
- `GET /api/hotels` — search
- `GET /api/hotels/:id` — details
- `POST /api/hotels/:id/book` — create booking

## Booking
- `GET /api/bookings` — user bookings
- `POST /api/bookings` — create booking

## Chat
- Socket.io namespace: `/chat`
- REST: `GET /api/chats` — list conversations

## Admin
- `GET /api/admin/users` — list users
- `GET /api/admin/analytics` — metrics

Security: all routes under `/api/*` require `Authorization: Bearer <token>` except auth endpoints. Implement RBAC checks where appropriate.

Next: convert this into an OpenAPI spec for the MVP if you'd like.