from app.db.session import ReadSessionLocal, WriteSessionLocal


def get_write_db():
    db = WriteSessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_read_db():
    db = ReadSessionLocal()
    try:
        yield db
    finally:
        db.close()
