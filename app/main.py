from fastapi import FastAPI, Depends, HTTPException
from . import models, database, auth
from sqlalchemy.orm import Session
from app.routers import auth, files, alerts
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["http://localhost:5173",]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=database.engine)

app.include_router(auth.router)
app.include_router(files.router)
app.include_router(alerts.router)

@app.get("/")
def root():
    return {"message": "Secure File App Backend is running"}
