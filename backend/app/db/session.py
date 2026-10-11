from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlalchemy.pool import NullPool

from app.core.config import settings

write_engine = create_async_engine(
    settings.WRITE_DATABASE_URL,
    poolclass=NullPool,  # Let Supabase handle the pooling, disable SQLAlchemy's pool
    connect_args={
        "statement_cache_size": 0,  # Disables statement caching
        "prepared_statement_cache_size": 0,  # Explicitly tells asyncpg not to cache prepared plans
    },
)
read_engine = create_async_engine(
    settings.READ_DATABASE_URL,
    poolclass=NullPool,
    connect_args={
        "statement_cache_size": 0,
        "prepared_statement_cache_size": 0,
    },
)

AsyncWriteSession = async_sessionmaker(bind=write_engine, autoflush=False, expire_on_commit=False)
AsyncReadSession = async_sessionmaker(bind=read_engine, autoflush=False, expire_on_commit=False)
