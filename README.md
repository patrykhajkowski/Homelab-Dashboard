# Homelab Dashboard

Full-stack homelab monitoring dashboard built with **React**, **Python (FastAPI)**, and **PostgreSQL**.

## Repository

- GitHub: [patrykhajkowski/Homelab-Dashboard](https://github.com/patrykhajkowski/Homelab-Dashboard)

## Tech stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Frontend   | React 19, TypeScript, Vite          |
| Backend    | Python 3.11+, FastAPI, SQLAlchemy   |
| Database   | PostgreSQL 16                       |
| Tooling    | ESLint, Prettier, Ruff              |

## Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [Python](https://www.python.org/) 3.11+
- [Docker](https://www.docker.com/) (for PostgreSQL)

## Quick start

### 1. Clone and configure

```bash
git clone https://github.com/patrykhajkowski/Homelab-Dashboard.git
cd Homelab-Dashboard
cp .env.example .env
```

### 2. Start PostgreSQL

```bash
docker compose up -d
```

### 3. Backend

```bash
cd backend
python -m venv .venv

# Windows (PowerShell)
.\.venv\Scripts\Activate.ps1

# macOS / Linux
# source .venv/bin/activate

pip install -r requirements-dev.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API docs: [http://localhost:8000/docs](http://localhost:8000/docs)

### 4. Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

App: [http://localhost:5173](http://localhost:5173)

## Project structure

```
Homelab-Dashboard/
├── backend/           # FastAPI application
│   ├── app/
│   └── tests/
├── frontend/          # React + Vite application
│   └── src/
├── docker-compose.yml # PostgreSQL for local development
└── .env.example       # Environment variable template
```

## Linting and formatting

### Backend (Ruff)

```bash
cd backend
ruff check .
ruff format .
```

### Frontend (ESLint + Prettier)

```bash
cd frontend
npm run lint
npm run format
```

## Tests

```bash
cd backend
pytest
```

## Environment variables

Copy `.env.example` to `.env` at the project root. The backend reads `DATABASE_URL`, `CORS_ORIGINS`, and related settings from this file.

## License

Private homelab project — add a license when you are ready to open-source.
