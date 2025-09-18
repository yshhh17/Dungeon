from fastapi import FastAPI, Depends, HTTPException
from . import models, database, auth
from sqlalchemy.orm import Session
from app.routers import auth

app = FastAPI()

models.Base.metadata.create_all(bind=database.engine)

app.include_router(auth.router)

@app.get("/")
def root():
    return {"message": "Secure File App Backend is running"}
