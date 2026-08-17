from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

VALID_PAYLOAD = {
    "HighBP": 1,
    "HighChol": 1,
    "CholCheck": 1,
    "BMI": 31.0,
    "Smoker": 1,
    "Stroke": 0,
    "Diabetes": 0,
    "PhysActivity": 0,
    "Fruits": 0,
    "Veggies": 1,
    "HvyAlcoholConsump": 0,
    "AnyHealthcare": 1,
    "NoDocbcCost": 0,
    "GenHlth": 4,
    "MentHlth": 5,
    "PhysHlth": 10,
    "DiffWalk": 1,
    "Sex": 1,
    "Age": 9,
    "Education": 4,
    "Income": 5,
}


def test_home_route_ok():
    response = client.get("/")
    assert response.status_code == 200


def test_predict_returns_valid_shape():
    response = client.post("/predict", json=VALID_PAYLOAD)
    assert response.status_code == 200
    body = response.json()

    assert body["prediction"] in (0, 1)
    assert 0 <= body["risk_percent"] <= 100
    assert body["risk_level"] in ("Low", "Moderate", "High")
    assert isinstance(body["message"], str) and body["message"]
    assert isinstance(body["contributing_factors"], list)
    for factor in body["contributing_factors"]:
        assert set(factor.keys()) == {"feature", "label", "detail"}


def test_predict_rejects_out_of_range_field():
    bad_payload = {**VALID_PAYLOAD, "GenHlth": 9}
    response = client.post("/predict", json=bad_payload)
    assert response.status_code == 422


def test_predict_rejects_missing_field():
    bad_payload = dict(VALID_PAYLOAD)
    del bad_payload["BMI"]
    response = client.post("/predict", json=bad_payload)
    assert response.status_code == 422


def test_contributing_factors_exclude_demographics():
    response = client.post("/predict", json=VALID_PAYLOAD)
    factors = response.json()["contributing_factors"]
    flagged = {f["feature"] for f in factors}
    assert flagged.isdisjoint({"Sex", "Age", "Education", "Income"})
