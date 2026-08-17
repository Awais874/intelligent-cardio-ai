from pydantic import BaseModel, Field


class HeartInput(BaseModel):
    HighBP: int = Field(ge=0, le=1)
    HighChol: int = Field(ge=0, le=1)
    CholCheck: int = Field(ge=0, le=1)
    BMI: float = Field(ge=10, le=100)
    Smoker: int = Field(ge=0, le=1)
    Stroke: int = Field(ge=0, le=1)
    Diabetes: int = Field(ge=0, le=2)
    PhysActivity: int = Field(ge=0, le=1)
    Fruits: int = Field(ge=0, le=1)
    Veggies: int = Field(ge=0, le=1)
    HvyAlcoholConsump: int = Field(ge=0, le=1)
    AnyHealthcare: int = Field(ge=0, le=1)
    NoDocbcCost: int = Field(ge=0, le=1)
    GenHlth: int = Field(ge=1, le=5)
    MentHlth: int = Field(ge=0, le=30)
    PhysHlth: int = Field(ge=0, le=30)
    DiffWalk: int = Field(ge=0, le=1)
    Sex: int = Field(ge=0, le=1)
    Age: int = Field(ge=1, le=13)
    Education: int = Field(ge=1, le=6)
    Income: int = Field(ge=1, le=8)


class ContributingFactor(BaseModel):
    feature: str
    label: str
    detail: str


class PredictionResponse(BaseModel):
    prediction: int
    risk_percent: float
    risk_level: str
    message: str
    contributing_factors: list[ContributingFactor]
