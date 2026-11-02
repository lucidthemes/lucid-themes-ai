from collections.abc import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import AsyncReadSession, AsyncWriteSession


async def get_write_db() -> AsyncGenerator[AsyncSession]:
    async with AsyncWriteSession() as session:
        yield session


async def get_read_db() -> AsyncGenerator[AsyncSession]:
    async with AsyncReadSession() as session:
        yield session
