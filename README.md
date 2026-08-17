# CardioSense (Front End + Backend + Machine learning)
Live Link: https://intelligent-cardio-ai.vercel.app/

**CardioSense is an end-to-end machine learning cardiovascular risk screening application that I built from data preparation and model training to API development, frontend integration, testing, and deployment.**

It uses **253,680 CDC BRFSS survey responses** and 21 health and lifestyle indicators to estimate cardiovascular risk. I compared Logistic Regression and Random Forest models, selected Logistic Regression based on cross-validation performance, and exposed the trained model through a FastAPI backend with a React frontend.

> **Note:** CardioSense is a screening tool, not a diagnostic system. It uses self-reported survey data and does not use ECG or laboratory results.

## Tech Stack

* **Frontend:** React, Vite, Tailwind CSS, Axios, Recharts, Framer Motion
* **Backend:** FastAPI, scikit-learn, pandas, joblib
* **Testing:** pytest, httpx
* **Deployment:** Vercel, Render

## ML Performance

| Model                   |        CV ROC-AUC |
| ----------------------- | ----------------: |
| **Logistic Regression** | **0.847 ± 0.004** |
| Random Forest           |     0.847 ± 0.003 |

Held-out test performance:

| Metric    |     Score |
| --------- | --------: |
| ROC-AUC   | **0.847** |
| Recall    | **0.797** |
| Accuracy  | **0.753** |
| Precision | **0.248** |
| F1        | **0.378** |

Recall was prioritized because this is a screening application where identifying potentially at-risk users is more important than minimizing false positives.

## Key Features

* 4-step health and lifestyle questionnaire
* ML-based cardiovascular risk estimation
* Contributing-factor explanation
* Model comparison and cross-validation
* Imbalanced dataset handling
* FastAPI prediction API
* Responsive React frontend
* Automated API and training tests
* Production deployment

## Project Structure

```text
frontend/     React + Vite application
backend/
  app/        FastAPI application
  data/       BRFSS dataset
  train_model.py
  model.pkl
  scaler.pkl
  metrics.json
  tests/
```

## Run Locally

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Tests

```bash
cd backend
pytest
```

### Retrain Model

```bash
cd backend
python train_model.py
```

## Deployment

**Frontend:** Vercel
**Backend:** Render

## Disclaimer

CardioSense is a screening and educational tool, not a medical diagnostic system. Results should not be used as a substitute for professional medical advice.
