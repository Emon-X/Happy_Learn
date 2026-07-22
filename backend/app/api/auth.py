from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from app.database.connection import get_db
from app.models import models
from app.schemas import schemas
from app.core.security import verify_password, get_password_hash, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter()

@router.post("/register", response_model=schemas.Parent)
def register(parent: schemas.ParentCreate, db: Session = Depends(get_db)):
    db_parent = db.query(models.Parent).filter(models.Parent.email == parent.email).first()
    if db_parent:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(parent.password)
    new_parent = models.Parent(email=parent.email, hashed_password=hashed_password)
    db.add(new_parent)
    db.commit()
    db.refresh(new_parent)
    return new_parent

@router.post("/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    parent = db.query(models.Parent).filter(models.Parent.email == form_data.username).first()
    if not parent or not verify_password(form_data.password, parent.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": parent.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/users", response_model=schemas.User)
def create_user(user: schemas.UserCreate, parent_id: int, db: Session = Depends(get_db)):
    db_user = models.User(**user.dict(), parent_id=parent_id)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/users/{parent_id}", response_model=list[schemas.User])
def get_users_by_parent(parent_id: int, db: Session = Depends(get_db)):
    return db.query(models.User).filter(models.User.parent_id == parent_id).all()
