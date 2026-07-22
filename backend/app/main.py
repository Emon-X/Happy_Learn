from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth
from app.database.connection import engine, Base

app = FastAPI(title="Happy Learn API", description="Backend for the Happy Learn educational game")

@app.on_event("startup")
async def create_tables() -> None:
    # Automatically creates database tables on startup
    Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost:5173",
    "https://happy-learn-omega.vercel.app",
]

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api", tags=["auth"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Happy Learn API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
