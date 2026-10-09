from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

write_engine = create_engine(
    settings.WRITE_DATABASE_URL,
    pool_pre_ping=True,
    connect_args={
        "prepare_threshold": None,
    },
)
read_engine = create_engine(
    settings.READ_DATABASE_URL,
    pool_pre_ping=True,
    connect_args={
        "prepare_threshold": None,
    },
)

WriteSessionLocal = sessionmaker(bind=write_engine, autoflush=False, expire_on_commit=False)
ReadSessionLocal = sessionmaker(bind=read_engine, autoflush=False, expire_on_commit=False)
