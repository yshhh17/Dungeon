from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from app import models 
from app.database import SessionLocal
from sqlalchemy.orm import Session

SECRET_KEY = "welcomeback"
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl = "/login")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail = "Could not validate credentials"
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms = [ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception


    user = db.query(models.User).filter(models.User.email == email).first()
    if user is None:
        raise credentials_exception
    return user
