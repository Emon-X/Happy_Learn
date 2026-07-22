from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class ParentBase(BaseModel):
    email: EmailStr

class ParentCreate(ParentBase):
    password: str

class Parent(ParentBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class UserBase(BaseModel):
    name: str
    avatar: str
    stats: dict = {}

class UserCreate(UserBase):
    pass

class UserStatsUpdate(BaseModel):
    stats: dict

class User(UserBase):
    id: int
    parent_id: Optional[int] = None
    created_at: datetime
    class Config:
        from_attributes = True

class GameBase(BaseModel):
    title: str
    category: str
    description: str

class Game(GameBase):
    id: int
    class Config:
        from_attributes = True

class ScoreBase(BaseModel):
    game_id: int
    stars_earned: int
    duration_seconds: int

class ScoreCreate(ScoreBase):
    pass

class Score(ScoreBase):
    id: int
    user_id: int
    created_at: datetime
    class Config:
        from_attributes = True

class ProgressBase(BaseModel):
    category: str
    level: int
    total_stars: int

class Progress(ProgressBase):
    id: int
    user_id: int
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
