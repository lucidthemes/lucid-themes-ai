from pydantic import BaseModel


class APIResponse[T](BaseModel):
    data: T


class APIResponseCount(APIResponse):
    count: int | None = None


class APIErrorDetail(BaseModel):
    code: str
    message: str


class APIErrorResponse(BaseModel):
    detail: APIErrorDetail
