from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class FileOut(BaseModel):
    id: int
    filename: str
    filepath: str
    owner_id: int
    uploaded_at: datetime

class AlertOut(BaseModel):
    id: int
    user_id: int
    file_id: int
    type: str
    description: str
    timestamp: datetime
