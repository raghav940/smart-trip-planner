# Smart Trip Planner

AI-powered travel planning platform: create, customize, and book itineraries with AI recommendations, manual tools, and historical reuse.

## Highlights
- AI-generated itineraries (Gemini/OpenAI)
- Manual itinerary builder (React DnD, FullCalendar)
- Real-time chat (Socket.io)
- Secure auth (JWT, bcrypt) with RBAC
- PostgreSQL + Prisma ORM
- Cloud media storage (Cloudinary)
- Analytics (Chart.js / Recharts)

## Tech Stack
- Frontend: React, Tailwind CSS, Framer Motion, Redux Toolkit
- Backend: Node.js, Express, Prisma, Socket.io
- Database: PostgreSQL (Neon or Supabase)
- AI: Gemini API / OpenAI API
- Storage: Cloudinary (images), S3-compatible for backups
- Deployment: Vercel (frontend), Render (backend), Neon/Supabase (DB)

## Getting Started (developer)
1. Clone the repo

```bash
git clone <your-repo-url>
cd smart\ trip\ planner
```

2. Create `.env` files for frontend and backend with required keys (DB, AI keys, Cloudinary, SMTP, JWT secrets).

3. Install and run backend & frontend locally (example)

```bash
# backend
cd backend
npm install
npm run dev

# frontend
cd ../frontend
npm install
npm run dev
```

## Docs
See the documentation folder for architecture, API contracts, and MVP scope:
- [docs/index.md](docs/index.md)
- [docs/architecture.md](docs/architecture.md)
- [docs/mvp.md](docs/mvp.md)
- [docs/api.md](docs/api.md)

## Contributing
- Follow the GitHub flow: feature branches, PRs, and code reviews.
- Add unit and integration tests for backend and frontend changes.

## License
Add your preferred license here.

---

If you want, I can expand any docs page into more detail (DB schema, OpenAPI, CI, or deploy guides).