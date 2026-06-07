import secrets

from app.config import settings
from app.dependencies.auth import SESSION_COOKIE, create_access_token, get_current_user
from app.schemas.auth import LoginRequest, UserRead
from fastapi import APIRouter, Depends, HTTPException, Response, status

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login", response_model=UserRead)
def login(body: LoginRequest, response: Response) -> UserRead:
    username_valid = secrets.compare_digest(body.username, settings.auth_username)
    password_valid = secrets.compare_digest(body.password, settings.auth_password)

    if not username_valid or not password_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )

    token = create_access_token(body.username)
    response.set_cookie(
        key=SESSION_COOKIE,
        value=token,
        httponly=True,
        samesite="lax",
        secure=settings.cookie_secure,
        max_age=settings.jwt_expire_hours * 3600,
    )
    return UserRead(username=body.username)


@router.get("/me", response_model=UserRead)
def me(username: str = Depends(get_current_user)) -> UserRead:
    return UserRead(username=username)


@router.post("/logout")
def logout(response: Response) -> dict[str, str]:
    response.delete_cookie(key=SESSION_COOKIE)
    return {"status": "ok"}
