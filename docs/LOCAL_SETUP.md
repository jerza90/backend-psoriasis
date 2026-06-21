# Local Setup

This repo has two environment modes:

- `.env` is the production deployment file.
- `.env.local` is the safe local development file.

## Start locally

1. Make sure Docker is running.
2. Use `.env.local` from the repo root.
3. Start the backend:

```bash
cd /Users/jerza/personal/psoriasis-backend
JAVA_HOME=/Library/Java/JavaVirtualMachines/openjdk-17.jdk/Contents/Home ./scripts/start-local.sh
```

4. In a second terminal, start the frontend:

```bash
cd /Users/jerza/personal/psoriasis-backend/frontend
npm run dev
```

## Local URLs

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`
- API proxy from Vite: `/api/* -> http://localhost:8080`
- Local database: `psoriasis_local`

## Notes

- Keep `.env` for prod only.
- Keep `.env.local` for localhost only.
- If you change the backend port or frontend URL, update both `.env.local` and the Vite proxy.
- Local startup creates `psoriasis_local` inside the running Postgres container so it does not touch the production-like `psoriasis_db` database.
