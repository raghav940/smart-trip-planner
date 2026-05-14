# Smart Trip Planner

Open-source travel planning platform for creating, customizing, and reusing itineraries with free-to-use APIs and self-hosted services.

## Highlights
- AI itinerary generation with self-hosted Ollama models
- Manual itinerary builder with drag-and-drop planning
- Real-time chat with Socket.io
- Secure auth with JWT, bcrypt, and RBAC
- PostgreSQL + Prisma ORM
- Free maps, weather, and geocoding APIs
- Analytics with Chart.js / Recharts

## Free and Open-Source Stack
- Frontend: React, Tailwind CSS, Framer Motion, Redux Toolkit
- Backend: Node.js, Express, Prisma, Socket.io
- Database: PostgreSQL
- AI: Ollama with open models such as Llama, Mistral, or Qwen
- Maps: OpenStreetMap, Leaflet, Nominatim
- Weather: Open-Meteo
- Storage: local uploads or self-hosted MinIO
- Payments: mock flow for MVP, no paid gateway required

## Getting Started (developer)
1. Clone the repo

```bash
git clone <your-repo-url>
cd smart\ trip\ planner
```

2. Create `.env` files for frontend and backend with required keys. Keep secrets only for your own backend services.

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
- [docs/roadmap.md](docs/roadmap.md)
- [docs/api.md](docs/api.md)

## Contributing
- Follow the GitHub flow: feature branches, PRs, and code reviews.
- Add unit and integration tests for backend and frontend changes.

## License
MIT License. See [LICENSE](LICENSE).

---

If you want, I can expand any docs page into more detail (DB schema, OpenAPI, CI, or deployment guides).