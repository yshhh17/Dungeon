from app import models
from sqlalchemy.orm import Session
from datetime import datetime

def scan_file(file_path: str, db: Session, user_id: int, file_id: int):
    forbidden_exts = [".exe", ".bat", ".sh"]

    alert = None
    for ext in forbidden_exts:
        if file_path.endswith(ext):
            alert = models.Alert(
                    user_id=user_id,
                    file_id=file_id,
                    type="forbidden_extension",
                    description=f"File has forbidden extension: {ext}",
                    timestamp=datetime.utcnow()
            )
            db.add(alert)
            db.commit()
            break
        return alert
