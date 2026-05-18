import joblib
import numpy as np
from app.schemas.prediction import HeartInput

model = joblib.load("model.pkl")
scaler = joblib.load("scaler.pkl")


def predict_heart_risk(data: HeartInput):
    features = np.array([[
        data.age,
        data.sex,
        data.cp,
        data.trestbps,
        data.chol,
        data.fbs,
        data.restecg,
        data.thalach,
        data.exang,
        data.oldpeak,
        data.slope,
        data.ca,
        data.thal
    ]])

    if scaler is not None:
        features = scaler.transform(features)

    prediction = model.predict(features)[0]

    if hasattr(model, "predict_proba"):
        probability = model.predict_proba(features)[0][1]
    else:
        probability = 0.5

    risk_percent = round(probability * 100, 2)

    if risk_percent < 30:
        risk_level = "Low"
    elif risk_percent < 70:
        risk_level = "Moderate"
    else:
        risk_level = "High"

    return {
        "prediction": int(prediction),
        "risk_percent": risk_percent,
        "risk_level": risk_level,
        "message": "This is a screening estimate, not a medical diagnosis."
    }