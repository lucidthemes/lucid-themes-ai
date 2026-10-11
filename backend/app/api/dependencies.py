import jwt
from fastapi import Depends, HTTPException, status
from fastapi.concurrency import run_in_threadpool
from fastapi.security import OAuth2PasswordBearer

from app.core.config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


jwks_client: jwt.PyJWKClient | None = None


async def get_current_user(token: str = Depends(oauth2_scheme)):
    # development env - bypass verifying JWT and return dummy user id
    if settings.DEVELOPMENT_MODE:
        user_id = 123456789
        return user_id

    token_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate token",
        headers={"WWW-Authenticate": "Bearer"},
    )

    # not development env - require JWKS URL to be specified to use for verification
    if settings.JWKS_URL is None:
        raise token_exception

    global jwks_client

    if jwks_client is None:
        jwks_client = jwt.PyJWKClient(settings.JWKS_URL, cache_jwk_set=True, lifespan=300)

    try:
        signing_key = await run_in_threadpool(jwks_client.get_signing_key_from_jwt, token)

        payload = jwt.decode(
            token,
            signing_key.key,
            algorithms=[settings.JWT_ALGORITHM],
            audience=settings.JWT_AUDIENCE,
        )

        user_id = payload.get("sub")

        if not user_id:
            raise token_exception

        return user_id

    except jwt.PyJWTError:
        raise token_exception from jwt.PyJWTError
