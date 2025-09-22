from fastapi import APIRouter, Depends, UploadFile, File as FastAPIFile, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import models, schemas
import shutil
import os

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

UPLOAD_DIR = "uploads/"

@router.post("/upload", response_model = schemas.FileOut)
def upload_file(
        file: UploadFile = FastAPIFile(...),
        owner_id = 1,
        db: Session = Depends(get_db)
):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)


    db_file = models.File(
            owner_id = owner_id,
            filename = file.filename,
            filepath = file_path
    )
    db.add(db_file)
    db.commit()
    db.refresh(db_file)

    return db_file
