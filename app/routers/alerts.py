from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessinLocal
from app import models, schemas
from typing import List
from app.routers.dependencies import get_current_user

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/alerts", response_model=List[schemas.AlertOut])
def get_alerts(
        current_user: models.User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    return db.query(models.Alert).filter(models.Alert.user_id == current_user.id).all()
