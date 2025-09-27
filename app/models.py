from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from .database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key = True, index = True)
    username = Column(String, unique = True, index = True, nullable = False)
    email = Column(String, unique = True, index = True, nullable = False)
    hashed_password = Column(String, nullable = False)
    created_at = Column(DateTime, default = datetime.utcnow)

    uploads = relationship("Upload", back_populates = "user")

class File(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key = True, index = True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    filename = Column(String, nullable = False)
    filepath = Column(String, nullable = False)
    uploaded_at = Column(DateTime, default = datetime.utcnow)

    uploads = relationship("Upload", back_populates="file")


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    file_id = Column(Integer, ForeignKey("files.id"))
    type = Column(String)
    description = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="uploads")
    file = relationship("File", back_populates="uploads")
