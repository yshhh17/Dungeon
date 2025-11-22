# Dungeon

A secure file management application with FastAPI backend and React frontend.

## Features

- User authentication with JWT
- Secure file upload and download
- File scanning capabilities
- PostgreSQL database
- PgAdmin for database management

## Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Dungeon
   ```

2. **Set up environment variables**
   
   Backend:
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env and update the values as needed
   ```
   
   Frontend:
   ```bash
   cp frontend/.env.example frontend/.env
   # Edit frontend/.env if needed (default: http://localhost:8000)
   ```

3. **Start the application**
   ```bash
   docker compose up --build
   ```

   This will start:
   - Backend API: http://localhost:8000
   - Frontend: http://localhost:5173
   - PostgreSQL: localhost:5432
   - PgAdmin: http://localhost:5050

4. **Access the application**
   - Open http://localhost:5173 in your browser
   - Register a new account or login

## Development

### Frontend
The frontend is a React application built with Vite and Tailwind CSS.

```bash
cd frontend
npm install
npm run dev
```

### Backend
The backend is a FastAPI application with SQLAlchemy ORM.

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Architecture

- **Frontend**: React 19, Vite, Tailwind CSS, React Router
- **Backend**: FastAPI, SQLAlchemy, PostgreSQL
- **Authentication**: JWT tokens with bcrypt password hashing
- **Database**: PostgreSQL 15

## API Endpoints

- `POST /register` - Register a new user
- `POST /login` - Login and get access token
- `GET /me` - Get current user info
- `GET /files` - List user's files
- `POST /upload-async` - Upload a file
- `GET /download/{id}` - Download a file
- `DELETE /delete/{id}` - Delete a file

