# CardioSense

A lifestyle-based cardiovascular risk screening tool. A React (Vite) frontend collects 21 behavioral
and health-history indicators through a 4-step questionnaire; a FastAPI backend runs them through a
trained scikit-learn model and returns a risk estimate along with the specific factors driving it.

This is a **screening tool, not a diagnostic one** — it's trained on self-reported survey data, not
lab results or ECG readings.

## Tech stack

| Layer | Tools |
|---|---|
| Frontend | React (Vite), Tailwind CSS v4, Axios, Recharts, Framer Motion, Lucide Icons |
| Backend | FastAPI, scikit-learn, pandas, joblib |
| Testing | pytest, httpx |

## Dataset

CDC Behavioral Risk Factor Surveillance System (BRFSS), 2015 survey — distributed as the
["Heart Disease Health Indicators Dataset"](https://www.kaggle.com/datasets/alexteboul/heart-disease-health-indicators-dataset)
on Kaggle.

- **253,680 respondents**, 21 features + target (`HeartDiseaseorAttack`), no missing values.
- Raw class balance is ~9.4% positive (heavily imbalanced) — the majority class is undersampled to
  balance the *training* split only, so the held-out test set still reflects the real-world rate.
- 23,899 duplicate rows, kept intentionally: every feature is a low-cardinality survey answer (binary
  flags, 5-year age bands, 1–5 health ratings), so identical answer combinations across 253k
  respondents are expected, not a data-pipeline defect.
- All 21 features are self-reported: health history (high BP, high cholesterol, stroke, diabetes),
  daily habits (smoking, diet, exercise, alcohol), general/mental/physical wellbeing, healthcare
  access, and demographics (sex, age band, education, income).

Full column dictionary and provenance: [backend/DATA.md](backend/DATA.md).

## Model

`train_model.py` trains and compares two candidates, each evaluated with 5-fold stratified
cross-validation (ROC-AUC) on the balanced training split:

| Model | CV ROC-AUC |
|---|---|
| **Logistic Regression** (scaled) — selected | 0.847 ± 0.004 |
| Random Forest (300 trees, depth 12) | 0.847 ± 0.003 |

The winner is refit and scored once on the untouched, real-world-imbalanced held-out test set
(50,736 rows):

| Metric | Score |
|---|---|
| ROC-AUC | 0.847 |
| Recall | 0.797 |
| Accuracy | 0.753 |
| Precision | 0.248 |
| F1 | 0.378 |

Recall is prioritized over precision by design — for a screening tool, missing a real at-risk
respondent is worse than an extra false alarm. Full numbers, confusion matrix, and dataset split
sizes are in [backend/metrics.json](backend/metrics.json), regenerated fresh every time
`train_model.py` runs.

### Feature importance

Ranked by absolute standardized logistic regression coefficient (i.e. how much weight the model
places on each factor, independent of its raw scale):

| Rank | Factor | Weight | Modifiable |
|---|---|---|---|
| 1 | Age | 0.799 | No |
| 2 | General health (self-rated) | 0.558 | Indirectly |
| 3 | Sex | 0.419 | No |
| 4 | Stroke history | 0.334 | No (past event) |
| 5 | High cholesterol | 0.333 | Yes |
| 6 | High blood pressure | 0.272 | Yes |
| 7 | Smoking history | 0.186 | Yes |
| 8 | Income | 0.140 | No |
| 9 | Difficulty walking | 0.139 | Indirectly |
| 10 | Diabetes / prediabetes | 0.118 | Partially |
| 11–21 | Cholesterol-check recency, cost-limited care access, heavy alcohol use, physical/mental health days, healthcare coverage, diet, BMI, physical activity, education | 0.013–0.100 | Mostly yes |

Age, general health, sex, and stroke history dominate the model and aren't things a person can act
on. Of the modifiable factors, high cholesterol and high blood pressure are by far the biggest
levers. This is *global* importance (average weight across the dataset), not a per-patient causal
claim — a statistical association from survey data, not a clinical study.

The API's `contributing_factors` response uses this same ranking, filtered to the fields where the
submitted answer falls on the higher-risk side, and deliberately excludes sex/age/education/income —
they're shown as context, never as "concerns" to flag.

## Project structure

```
frontend/                  React UI
  src/components/          Form steps, result panel, shared field components
  src/constants/           Field labels, tooltips, and BRFSS scale mappings

backend/
  app/
    main.py                FastAPI app, CORS config
    routes/predict.py      POST /predict
    schemas/prediction.py  Request/response models
    services/predictor.py  Model inference + contributing-factor explanation
  data/brfss2015_full.csv  Raw dataset (see DATA.md)
  train_model.py           Training pipeline (cross-validated model selection)
  model.pkl / scaler.pkl   Trained artifacts
  metrics.json             Model provenance: CV scores, held-out test metrics, feature importance
  tests/                   pytest suite (API contract + training reproducibility)
```

## Running locally

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Runs on `http://127.0.0.1:8000`. To retrain the model from scratch: `python train_model.py`
(takes ~15-20s, regenerates `model.pkl`, `scaler.pkl`, and `metrics.json`).

Run tests: `pytest`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`. `frontend/.env` holds `VITE_API_BASE_URL` — point it at
`http://127.0.0.1:8000` for local development, or the deployed backend URL for production builds.

### CORS

The backend only allows the origins listed in the `ALLOWED_ORIGINS` env var (comma-separated),
defaulting to `http://localhost:5173,http://127.0.0.1:5173`. Set it to your deployed frontend's URL
in production.

## Deployment

Frontend → Vercel · Backend → Render
