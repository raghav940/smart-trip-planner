# Prerequisites & Local Setup

## Prerequisites
- Node.js 18+ (or LTS)
- PostgreSQL (local or using Neon/Supabase)
- Redis (for local worker queues)
- Ollama installed locally or available on your server
- OpenStreetMap / Nominatim access for geocoding and place search
- Open-Meteo for weather lookups
- MinIO or local storage for images and uploads

## Local env
Create `.env` files for `backend` and `frontend`. Example variables (backend):
```
DATABASE_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.1
NOMINATIM_BASE_URL=https://nominatim.openstreetmap.org
OPEN_METEO_BASE_URL=https://api.open-meteo.com
MINIO_ENDPOINT=
MINIO_ACCESS_KEY=
MINIO_SECRET_KEY=
REDIS_URL=
```

Run backend and frontend in parallel during development.