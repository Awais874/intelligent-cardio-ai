import json
from pathlib import Path

import joblib
import pandas as pd

from app.schemas.prediction import HeartInput

BASE_DIR = Path(__file__).resolve().parent.parent.parent

model = joblib.load(BASE_DIR / "model.pkl")
scaler = joblib.load(BASE_DIR / "scaler.pkl")

with open(BASE_DIR / "metrics.json") as f:
    _metrics = json.load(f)

FEATURE_ORDER = _metrics["feature_order"]
_IMPORTANCE_RANK = [f for f, _ in _metrics["feature_importance_rank"]]

# Demographic context, not modifiable lifestyle/health factors — never flagged as "concerns."
NON_MODIFIABLE = {"Sex", "Age", "Education", "Income"}

# (label, detail template, is_adverse(value)) for each modifiable feature.
_FACTOR_RULES = {
    "HighBP": ("High blood pressure", "You reported having high blood pressure.", lambda v: v == 1),
    "HighChol": ("High cholesterol", "You reported having high cholesterol.", lambda v: v == 1),
    "CholCheck": ("No recent cholesterol check", "No cholesterol check reported in the last 5 years.", lambda v: v == 0),
    "BMI": ("Elevated BMI", "Your BMI is in the overweight/obese range.", lambda v: v >= 25),
    "Smoker": ("Smoking history", "You reported a history of smoking.", lambda v: v == 1),
    "Stroke": ("History of stroke", "You reported a prior stroke.", lambda v: v == 1),
    "Diabetes": ("Diabetes or prediabetes", "You reported diabetes or prediabetes.", lambda v: v >= 1),
    "PhysActivity": ("Low physical activity", "No physical activity reported in the past 30 days.", lambda v: v == 0),
    "Fruits": ("Low fruit intake", "Less than one serving of fruit per day reported.", lambda v: v == 0),
    "Veggies": ("Low vegetable intake", "Less than one serving of vegetables per day reported.", lambda v: v == 0),
    "HvyAlcoholConsump": ("Heavy alcohol use", "You reported heavy alcohol consumption.", lambda v: v == 1),
    "AnyHealthcare": ("No healthcare coverage", "No healthcare coverage reported.", lambda v: v == 0),
    "NoDocbcCost": ("Cost-limited access to care", "You reported skipping care due to cost.", lambda v: v == 1),
    "GenHlth": ("Fair/poor self-rated health", "You rated your general health as fair or poor.", lambda v: v >= 4),
    "MentHlth": ("Frequent poor mental health", "14+ days of poor mental health in the past 30 days.", lambda v: v >= 14),
    "PhysHlth": ("Frequent poor physical health", "14+ days of poor physical health in the past 30 days.", lambda v: v >= 14),
    "DiffWalk": ("Difficulty walking", "You reported serious difficulty walking or climbing stairs.", lambda v: v == 1),
}


def _contributing_factors(data: dict, limit: int = 5) -> list[dict]:
    candidates = [f for f in _IMPORTANCE_RANK if f not in NON_MODIFIABLE]
    factors = []
    for feature in candidates:
        label, detail, is_adverse = _FACTOR_RULES[feature]
        if is_adverse(data[feature]):
            factors.append({"feature": feature, "label": label, "detail": detail})
        if len(factors) >= limit:
            break
    return factors


def predict_heart_risk(data: HeartInput):
    values = data.model_dump()
    features = pd.DataFrame([[values[f] for f in FEATURE_ORDER]], columns=FEATURE_ORDER)

    if scaler is not None:
        features = scaler.transform(features)

    prediction = int(model.predict(features)[0])
    probability = model.predict_proba(features)[0][1]
    risk_percent = round(probability * 100, 2)

    if risk_percent < 30:
        risk_level = "Low"
    elif risk_percent < 70:
        risk_level = "Moderate"
    else:
        risk_level = "High"

    return {
        "prediction": prediction,
        "risk_percent": risk_percent,
        "risk_level": risk_level,
        "message": "This is a lifestyle-based screening estimate from self-reported survey data, "
                   "not a clinical diagnosis. Discuss any concerns with a healthcare provider.",
        "contributing_factors": _contributing_factors(values),
    }
