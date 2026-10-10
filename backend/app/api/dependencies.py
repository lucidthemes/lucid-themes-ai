import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from app.core.config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_current_user(token: str = Depends(oauth2_scheme)):
    token_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate token",
        headers={"WWW-Authenticate": "Bearer"},
    )

    # development env - bypass verifying jwt and return dummy user id
    if settings.DEVELOPMENT_MODE:
        user_id = 123456789
        return user_id

    # not development env - require jwt to be verified
    if settings.JWKS_URL is None:
        raise token_exception

    jwks_client = jwt.PyJWKClient(settings.JWKS_URL)

    try:
        signing_key = jwks_client.get_signing_key_from_jwt(token)

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
