from enum import StrEnum

from pydantic import BaseModel, ConfigDict, Field


class LoginRequest(BaseModel):
    username: str = Field(min_length=1, max_length=128)
    password: str = Field(min_length=1, max_length=128)


class UserRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    username: str


class AuthErrorCode(StrEnum):
    INVALID_CREDENTIALS = "invalid_credentials"
    VALIDATION_ERROR = "validation_error"
