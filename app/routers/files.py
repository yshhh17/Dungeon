from fastapi import APIRouter, Depends, UploadFile, File as FastAPIFile, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import models, schemas
import shutil
import os
from app.routers.dependencies import get_current_user
from fastapi.responses import FileResponse
import asyncio
import threading
from app.scanner import scan_file

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

UPLOAD_DIR = "uploads/"

async def save_file(file: UploadFile, file_path: str):
    data = await file.read()
    await asyncio.to_thread(lambda: open(file_path, "wb").write(data))

@router.post("/upload-async", response_model = schemas.FileOut)
async def upload_file(
        file: UploadFile = FastAPIFile(...),
        current_user: models.User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    await save_file(file, file_path)

    db_file = models.File(
            owner_id = current_user.id,
            filename = file.filename,
            filepath = file_path
    )
    db.add(db_file)
    db.commit()
    db.refresh(db_file)

    threading.Thread(
            target=scan_file, args=(file_path, db, current_user.id, db_file.id)).start()

    return db_file

@router.get("/download/{file_id}")
def download_file(file_id: int, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):

    db_file = db.query(models.File).filter(models.File.id == file_id).first()
    if not db_file:
        raise HTTPException(status_code = 404, detail = "File not Found")

    if db_file.owner_id != current_user.id:
        raise HTTPException(status_code = 403, detail = "Not authorized to access this file")

    if not os.path.exists(db_file.filepath):
        raise HTTPException(status_code = 404, detail = "File missing on Server")

    return FileResponse(
            path = db_file.filepath,
            filename = db_file.filename,
            media_type = "application/octet-stream"
    )


@router.get("/files")
def list_files(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(models.File).filter(models.File.owner_id == current_user.id).all()

@router.delete("/delete/{file_id}")
def delete_file(
    file_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_file = db.query(models.File).filter(models.File.id == file_id).first()

    if not db_file:
        raise HTTPException(status_code=404, detail="File not found")

    if db_file.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this file")

    if os.path.exists(db_file.filepath):
        try:
            os.remove(db_file.filepath)
        except exception as e:
            raise HTTPException(status_code=500, detail=f"Error deleting file: {str(e)}")

    db.delete(db_file)
    db.commit()

    return {"message": f"file '{db_file.filename}' deleted successfully"}
