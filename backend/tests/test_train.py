"""
Reruns the full training pipeline and checks it reproduces metrics within tolerance of the
committed metrics.json. Slower than the API tests since it trains on the full 253k-row dataset.
"""
import json
from pathlib import Path

import pytest

import train_model

BASE_DIR = Path(__file__).resolve().parent.parent
METRICS_PATH = BASE_DIR / "metrics.json"

pytestmark = pytest.mark.skipif(
    not (BASE_DIR / "data" / "brfss2015_full.csv").exists(),
    reason="brfss2015_full.csv not present",
)


def test_training_is_reproducible(tmp_path, monkeypatch):
    with open(METRICS_PATH) as f:
        committed = json.load(f)

    # Train into a scratch dir so this test doesn't clobber the committed model artifacts.
    monkeypatch.setattr(train_model, "BASE_DIR", tmp_path)
    monkeypatch.setattr(train_model, "DATA_PATH", BASE_DIR / "data" / "brfss2015_full.csv")

    train_model.main()

    with open(tmp_path / "metrics.json") as f:
        fresh = json.load(f)

    assert fresh["model"] == committed["model"]
    assert fresh["held_out_test_set"]["roc_auc"] == pytest.approx(
        committed["held_out_test_set"]["roc_auc"], abs=0.01
    )
