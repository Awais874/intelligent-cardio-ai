from fastapi import APIRouter
from app.schemas.prediction import HeartInput, PredictionResponse
from app.services.predictor import predict_heart_risk

router = APIRouter()


@router.post("/predict", response_model=PredictionResponse)
def predict(data: HeartInput):
    return predict_heart_risk(data)