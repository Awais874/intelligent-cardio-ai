import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.predict import router as predict_router

app = FastAPI(title="CardioSense AI API")

_default_origins = "http://localhost:5173,http://127.0.0.1:5173"
allowed_origins = os.environ.get("ALLOWED_ORIGINS", _default_origins).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.include_router(predict_router)


@app.get("/")
def home():
    return {"message": "Heart Disease Prediction API is running"}