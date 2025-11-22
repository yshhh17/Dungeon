# Dungeon Cloud 🔐

Live Demo: https://dungeon-cloud.vercel.app/

A secure file management application with user authentication, file upload/download capabilities, and security scanning features. Built with FastAPI backend and React frontend.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **File Management**: Upload, download, and delete files
- **Security Scanning**: Automated scanning of uploaded files for threats
- **Alert System**: Real-time security alerts and notifications
- **Database Management**: PostgreSQL with PgAdmin interface
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **PostgreSQL**: Robust relational database
- **SQLAlchemy**: SQL toolkit and ORM
- **JWT Authentication**: Secure token-based authentication
- **Bcrypt**: Password hashing
- **Uvicorn**: ASGI server

### Frontend
- **React 19**: Latest React with modern features
- **Vite**: Fast build tool and dev server
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework

### DevOps
- **Docker & Docker Compose**: Containerization for easy deployment
- **PgAdmin**: Database administration tool

## 📋 Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local frontend development)
- Python 3.11+ (for local backend development)

## 🚀 Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone https://github.com/yshhh17/Dungeon.git
   cd Dungeon
   ```

2. **Set up environment variables**
   
   Create a `.env` file in the `backend` directory with the following:
   ```env
   DATABASE_URL=postgresql://postgres:postgres@db:5432/dungeon_db
   KEY=your-secret-key-change-in-production
   ALGO=HS256
   Expiry=30
   PGADMIN_DEFAULT_EMAIL=admin@admin.com
   PGADMIN_DEFAULT_PASSWORD=admin
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DB=dungeon_db
   ```

3. **Start the backend services**
   ```bash
   docker compose up -d
   ```

4. **Access the services**
   - **Backend API**: http://localhost:8000
   - **API Documentation**: http://localhost:8000/docs
   - **PgAdmin**: http://localhost:5050
   - **PostgreSQL**: localhost:5432

5. **Start the frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   
   Access the frontend at http://localhost:5173

## 💻 Local Development

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

```
Dungeon/
├── backend/
│   ├── app/
│   │   ├── routers/        # API endpoints
│   │   ├── auth.py         # Authentication logic
│   │   ├── database.py     # Database configuration
│   │   ├── main.py         # FastAPI application
│   │   ├── models.py       # Database models
│   │   ├── scanner.py      # File scanning logic
│   │   └── schemas.py      # Pydantic schemas
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/          # React pages
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   └── package.json
└── docker-compose.yml
```

## 🔌 API Endpoints

### Authentication
- `POST /register` - Register a new user
- `POST /login` - Login and receive JWT token

### User
- `GET /me` - Get current user information

### Files
- `GET /files` - List all user's files
- `POST /upload-async` - Upload a file
- `GET /download/{file_id}` - Download a file
- `DELETE /delete/{file_id}` - Delete a file

### Alerts
- `GET /alerts` - Get user's security alerts

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS middleware configuration
- Secure file storage
- File scanning capabilities
- Security alert system

## 🎨 Frontend Pages

- **Landing Page**: Welcome screen with login/register options
- **Register**: User registration form
- **Login**: User authentication
- **Dashboard**: File management interface with upload, download, and delete functionality

## 📝 Database Schema

### Users Table
- id, username, email, hashed_password, created_at

### Files Table
- id, owner_id, filename, filepath, uploaded_at

### Alerts Table
- id, user_id, file_id, type, description, timestamp

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**yshhh17**
- GitHub: [@yshhh17](https://github.com/yshhh17)

## 🙏 Acknowledgments

- FastAPI for the excellent backend framework
- React team for the amazing frontend library
- Tailwind CSS for the beautiful styling utilities
