from sqlalchemy import MetaData
from sqlalchemy.orm import DeclarativeBase

from app.core.config import settings

metadata_obj = MetaData(schema=settings.DATABASE_SCHEMA)


class Base(DeclarativeBase):
    metadata = metadata_obj
