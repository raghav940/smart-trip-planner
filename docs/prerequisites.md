# Prerequisites & Local Setup

## Prerequisites
- Node.js 18+ (or LTS)
- PostgreSQL (local or using Neon/Supabase)
- Redis (for local worker queues)
- Cloudinary account (for image uploads)
- Google Maps API key, OpenWeather key
- Gemini/OpenAI API key
- SMTP credentials for Nodemailer

## Local env
Create `.env` files for `backend` and `frontend`. Example variables (backend):
```
DATABASE_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
CLOUDINARY_URL=
OPENAI_API_KEY=
GOOGLE_MAPS_KEY=
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
```

Run backend and frontend in parallel during development.