from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key = True, index = True)
    username = Column(String, unique = True, index = True, nullable = False)
    email = Column(String, unique = True, index = True, nullable = False)
    hashed_password = Column(String, nullable = False)
    created_at = Column(DateTime, default = datetime.utcnow)

class File(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key = True, index = True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    filename = Column(String, nullable = False)
    filepath = Column(String, nullable = False)
    uploaded_at = Column(DateTime, default = datetime.utcnow)
