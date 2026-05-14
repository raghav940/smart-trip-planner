# GitHub Issue Backlog

This backlog turns the sprint plan into issue-sized work items. Each issue should be small enough to finish in one focused PR.

## Epic 1 — Project foundation
### Issue 1.1: Set up repo structure
- Create frontend, backend, and docs folders if missing
- Add shared conventions for naming and file placement
- Verify the repo layout supports incremental growth

### Issue 1.2: Configure local environment files
- Add `.env.example` for backend and frontend
- Document PostgreSQL, Redis, Ollama, and local storage variables
- Make setup instructions clear in docs

### Issue 1.3: Add auth skeleton
- Create JWT auth middleware
- Add password hashing helper with bcrypt
- Add protected route guard patterns

### Issue 1.4: Wire Prisma to PostgreSQL
- Verify datasource config
- Create the first migration
- Confirm the Prisma client can connect locally

### Issue 1.5: Build base UI shell
- Create navigation and layout components
- Add landing page and protected dashboard shell
- Ensure responsive behavior on mobile and desktop

## Epic 2 — User trip management
### Issue 2.1: Implement signup
- Build signup form
- Validate email and password inputs
- Persist user records securely

### Issue 2.2: Implement login
- Build login form
- Issue access and refresh tokens
- Redirect authenticated users to the dashboard

### Issue 2.3: Implement forgot and reset password
- Add password reset request flow
- Add reset token verification
- Update password securely in the database

### Issue 2.4: Build trip CRUD APIs
- Add create, read, update, and delete endpoints
- Validate trip dates, destination, and budget
- Restrict access to the authenticated owner

### Issue 2.5: Build trip dashboard cards
- Add trip summary cards
- Add list and detail views
- Show upcoming trips first

## Epic 3 — Manual itinerary builder
### Issue 3.1: Add itinerary day model
- Create itinerary day records in the schema
- Link days to a trip or itinerary
- Support day ordering

### Issue 3.2: Add activities and notes
- Allow adding manual activities
- Add notes and reminders
- Save changes without page refresh

### Issue 3.3: Add drag-and-drop ordering
- Enable reordering activities or days
- Persist the order in the backend
- Support mobile-friendly fallback controls

### Issue 3.4: Add calendar-style view
- Render a trip timeline or calendar
- Show time blocks and day labels
- Keep the view readable on small screens

## Epic 4 — Free API enrichment
### Issue 4.1: Integrate OpenStreetMap search
- Add destination and place search
- Normalize search responses
- Handle rate limits gracefully

### Issue 4.2: Add nearby places lookup
- Fetch nearby attractions and services
- Group places by type
- Cache repeated queries

### Issue 4.3: Integrate Open-Meteo weather
- Fetch weather by lat/lon
- Add current and forecast cards
- Handle empty or invalid coordinates

### Issue 4.4: Add destination-themed backgrounds
- Map destinations to watermark images or theme assets
- Support Goa, Jaipur, and Manali patterns
- Keep the effect lightweight

## Epic 5 — Self-hosted AI itinerary
### Issue 5.1: Connect Ollama backend client
- Add service wrapper for Ollama
- Configure model name and base URL
- Handle timeouts and errors

### Issue 5.2: Generate itinerary from trip inputs
- Build prompt template from destination, dates, budget, and interests
- Store generated output
- Return a structured day-wise plan

### Issue 5.3: Add regenerate flow
- Allow updating trip inputs
- Create a new itinerary version
- Preserve previous generated versions

### Issue 5.4: Add AI assistant chat
- Build a travel Q&A endpoint
- Support trip-context prompts
- Keep responses lightweight and useful

## Epic 6 — Booking, chat, and admin
### Issue 6.1: Add booking records
- Save hotel and activity booking data
- Support pending, confirmed, and cancelled states
- Keep it payment-free for MVP

### Issue 6.2: Add real-time chat
- Set up Socket.io namespaces and events
- Allow user to hotel-owner chat
- Save chat history

### Issue 6.3: Add hotel owner views
- Add listing management screens
- Add availability and pricing edits
- Restrict access to hotel owner role

### Issue 6.4: Add admin views
- Add user and trip lists
- Add booking summaries
- Add analytics dashboards

## Epic 7 — Hardening and release prep
### Issue 7.1: Add validation and security controls
- Add request validation middleware
- Add rate limiting
- Add safe file upload checks

### Issue 7.2: Add tests
- Add unit tests for core helpers
- Add integration tests for auth and trip APIs
- Add smoke tests for the dashboard flows

### Issue 7.3: Add logs and monitoring
- Log auth, booking, and chat events
- Add structured request IDs
- Prepare production log rotation

### Issue 7.4: Add deployment checklist
- Document environment and build steps
- Add backup and restore notes
- Prepare beta release checklist

If you want, I can convert these issue titles into a copy-paste GitHub issue list next.