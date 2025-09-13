from fastapi import FastAPI, Depends, HTTPException
from . import models, database, auth
from sqlalchemy.orm import Session

app = FastAPI()

models.Base.metadata.create_all(bind=database.engine)

@app.get("/")
def root():
    return {"message": "Secure File App Backend is running"}
