from pydantic import BaseModel


class APIResponse[T](BaseModel):
    data: T


class APIErrorDetail(BaseModel):
    code: str
    message: str


class APIErrorResponse(BaseModel):
    detail: APIErrorDetail
