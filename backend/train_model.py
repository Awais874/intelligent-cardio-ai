"""
Trains the heart-disease-risk model on the BRFSS 2015 lifestyle/health-indicator dataset.
See DATA.md for dataset provenance and column meanings.

Run from backend/: python train_model.py
"""
import json
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
    roc_auc_score,
)
from sklearn.model_selection import StratifiedKFold, cross_val_score, train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.utils import resample

BASE_DIR = Path(__file__).resolve().parent
DATA_PATH = BASE_DIR / "data" / "brfss2015_full.csv"
TARGET = "HeartDiseaseorAttack"

FEATURE_ORDER = [
    "HighBP", "HighChol", "CholCheck", "BMI", "Smoker", "Stroke", "Diabetes",
    "PhysActivity", "Fruits", "Veggies", "HvyAlcoholConsump", "AnyHealthcare",
    "NoDocbcCost", "GenHlth", "MentHlth", "PhysHlth", "DiffWalk", "Sex", "Age",
    "Education", "Income",
]


def load_data():
    df = pd.read_csv(DATA_PATH)
    dup_count = int(df.duplicated().sum())
    print(f"Loaded {len(df)} rows, {dup_count} duplicate rows (kept — see DATA.md)")
    X = df[FEATURE_ORDER]
    y = df[TARGET].astype(int)
    return X, y, dup_count


def balance_training_set(X_train, y_train, random_state=42):
    train = X_train.copy()
    train[TARGET] = y_train.values
    minority = train[train[TARGET] == 1]
    majority = train[train[TARGET] == 0]
    majority_down = resample(
        majority, replace=False, n_samples=len(minority), random_state=random_state
    )
    balanced = pd.concat([minority, majority_down]).sample(frac=1, random_state=random_state)
    return balanced[FEATURE_ORDER], balanced[TARGET]


def evaluate(model, X_test, y_test):
    preds = model.predict(X_test)
    probs = model.predict_proba(X_test)[:, 1]
    return {
        "accuracy": round(accuracy_score(y_test, preds), 4),
        "precision": round(precision_score(y_test, preds), 4),
        "recall": round(recall_score(y_test, preds), 4),
        "f1": round(f1_score(y_test, preds), 4),
        "roc_auc": round(roc_auc_score(y_test, probs), 4),
        "confusion_matrix": confusion_matrix(y_test, preds).tolist(),
    }


def main():
    X, y, dup_count = load_data()

    # Split BEFORE any balancing/resampling so the test set reflects real-world class distribution.
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    X_train_bal, y_train_bal = balance_training_set(X_train, y_train)
    print(f"Balanced training set: {len(X_train_bal)} rows "
          f"({y_train_bal.sum()} positive / {(y_train_bal == 0).sum()} negative)")

    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

    # Logistic Regression (scaled)
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train_bal)
    lr_model = LogisticRegression(max_iter=2000, random_state=42)
    lr_cv_scores = cross_val_score(lr_model, X_train_scaled, y_train_bal, cv=cv, scoring="roc_auc")
    lr_model.fit(X_train_scaled, y_train_bal)
    lr_test_metrics = evaluate(lr_model, scaler.transform(X_test), y_test)

    # Random Forest (unscaled)
    rf_model = RandomForestClassifier(n_estimators=300, max_depth=12, random_state=42, n_jobs=-1)
    rf_cv_scores = cross_val_score(rf_model, X_train_bal, y_train_bal, cv=cv, scoring="roc_auc")
    rf_model.fit(X_train_bal, y_train_bal)
    rf_test_metrics = evaluate(rf_model, X_test, y_test)

    print(f"Logistic Regression CV ROC-AUC: {lr_cv_scores.mean():.4f} (+/- {lr_cv_scores.std():.4f})")
    print(f"Random Forest CV ROC-AUC:       {rf_cv_scores.mean():.4f} (+/- {rf_cv_scores.std():.4f})")

    lr_wins = lr_cv_scores.mean() >= rf_cv_scores.mean()
    chosen_name = "logistic_regression" if lr_wins else "random_forest"
    chosen_model = lr_model if lr_wins else rf_model
    chosen_scaler = scaler if lr_wins else None
    chosen_cv = lr_cv_scores if lr_wins else rf_cv_scores
    chosen_test_metrics = lr_test_metrics if lr_wins else rf_test_metrics

    # Global feature importance, for the API's "top contributing factors" explanation.
    if lr_wins:
        importance = np.abs(chosen_model.coef_[0])
    else:
        importance = chosen_model.feature_importances_
    ranked = sorted(zip(FEATURE_ORDER, importance.tolist()), key=lambda t: t[1], reverse=True)

    joblib.dump(chosen_model, BASE_DIR / "model.pkl")
    joblib.dump(chosen_scaler, BASE_DIR / "scaler.pkl")

    metrics = {
        "model": chosen_name,
        "feature_order": FEATURE_ORDER,
        "dataset": {
            "source": "BRFSS 2015 (Kaggle: alexteboul/heart-disease-health-indicators-dataset)",
            "total_rows": int(len(X) + 0),
            "duplicate_rows_kept": dup_count,
            "train_rows_before_balancing": int(len(X_train)),
            "train_rows_after_balancing": int(len(X_train_bal)),
            "test_rows": int(len(X_test)),
        },
        "cross_validation": {
            "folds": 5,
            "scoring": "roc_auc",
            "logistic_regression_mean": round(lr_cv_scores.mean(), 4),
            "logistic_regression_std": round(lr_cv_scores.std(), 4),
            "random_forest_mean": round(rf_cv_scores.mean(), 4),
            "random_forest_std": round(rf_cv_scores.std(), 4),
        },
        "held_out_test_set": chosen_test_metrics,
        "feature_importance_rank": ranked,
    }
    with open(BASE_DIR / "metrics.json", "w") as f:
        json.dump(metrics, f, indent=2)

    print(f"\nSaved {chosen_name} as model.pkl (scaler.pkl {'set' if chosen_scaler else 'None'})")
    print(f"Held-out test metrics: {chosen_test_metrics}")
    print("Full report written to metrics.json")


if __name__ == "__main__":
    main()
