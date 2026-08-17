# Dataset

**Source**: CDC Behavioral Risk Factor Surveillance System (BRFSS), 2015 survey year.
Distributed as "Heart Disease Health Indicators Dataset" (Kaggle: `alexteboul/heart-disease-health-indicators-dataset`).
Mirror used for this project: `backend/data/brfss2015_full.csv` (253,680 rows, 22 columns, downloaded from a
public GitHub mirror of the same Kaggle file — verified column names/values match the published codebook).

This is **self-reported survey data**, not clinical lab measurements or ECG data. It predicts a *lifestyle/
behavioral risk profile*, not a diagnosis. Treat outputs as a screening nudge, not a medical result.

## Shape & quality
- 253,680 rows × 22 columns (21 features + `HeartDiseaseorAttack` target), no missing values.
- Class balance (raw): 229,787 negative / 23,893 positive (~9.4% positive) — heavily imbalanced.
- 23,899 duplicate rows. **Not treated as a data defect**: every feature is a low-cardinality
  categorical/binned survey answer (e.g. `Age` is a 13-band scale, `BMI` is often a whole number,
  most others are binary), so two different respondents legitimately landing on an identical answer
  combination is expected at this scale. Rows were not deduplicated for that reason. (Contrast with
  the previous dataset used in this project, where 70% duplication came from the file itself being a
  multiply-concatenated copy of a 303-row source — a real defect.)
- Balancing strategy: random undersampling of the majority class to match the minority class count
  (23,893 each → 47,786 rows), done in `train_model.py` at training time so it's reproducible from the
  raw file rather than depending on a separately-sourced "pre-balanced" CSV. Undersampling happens
  only on the training split, after the train/test split, so the held-out test set still reflects the
  real-world class distribution.

## Column dictionary

| Column | Type | Meaning |
|---|---|---|
| HeartDiseaseorAttack | 0/1 | Target: ever told had coronary heart disease or MI |
| HighBP | 0/1 | Told has high blood pressure |
| HighChol | 0/1 | Told has high cholesterol |
| CholCheck | 0/1 | Had cholesterol checked in last 5 years |
| BMI | number | Body mass index |
| Smoker | 0/1 | Smoked ≥100 cigarettes in lifetime |
| Stroke | 0/1 | Ever told had a stroke |
| Diabetes | 0/1/2 | 0 = no, 1 = prediabetes/borderline, 2 = diabetes |
| PhysActivity | 0/1 | Physical activity in past 30 days (excludes job) |
| Fruits | 0/1 | Consumes fruit ≥1×/day |
| Veggies | 0/1 | Consumes vegetables ≥1×/day |
| HvyAlcoholConsump | 0/1 | Heavy drinker (adult men >14 drinks/wk, women >7) |
| AnyHealthcare | 0/1 | Has any kind of healthcare coverage |
| NoDocbcCost | 0/1 | Needed a doctor in past 12mo but couldn't afford it |
| GenHlth | 1–5 | Self-rated general health, 1=excellent … 5=poor |
| MentHlth | 0–30 | Days of poor mental health in past 30 days |
| PhysHlth | 0–30 | Days of poor physical health in past 30 days |
| DiffWalk | 0/1 | Serious difficulty walking/climbing stairs |
| Sex | 0/1 | 0 = female, 1 = male |
| Age | 1–13 | 13 five-year bands, 1 = 18-24 … 13 = 80+ |
| Education | 1–6 | 1 = none/kindergarten … 6 = college graduate |
| Income | 1–8 | 1 = <$10k … 8 = ≥$75k |

`Sex`, `Age`, `Education`, and `Income` are demographic context, not modifiable lifestyle factors —
the frontend and the "contributing factors" explanation intentionally do not present them as
"concerns" to flag, only as context.

## Model
Trained in `train_model.py`: Logistic Regression (scaled) and Random Forest, both evaluated with
5-fold stratified cross-validation on the training split (ROC-AUC), then the winner is refit and
scored once on the untouched held-out test set. Metrics are written to `metrics.json` alongside
`model.pkl`/`scaler.pkl` so the current model's provenance is always inspectable — see that file for
the actual numbers instead of trusting stale claims in this doc.
