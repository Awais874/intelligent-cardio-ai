export const initialState = {
  age: "",
  sex: "",
  cp: "",
  trestbps: "",
  chol: "",
  fbs: "",
  restecg: "",
  thalach: "",
  exang: "",
  oldpeak: "",
  slope: "",
  ca: "",
  thal: "",
};

export const labels = {
  age: "Age",
  sex: "Sex",
  cp: "Chest Pain Type",
  trestbps: "Resting Blood Pressure",
  chol: "Cholesterol",
  fbs: "Fasting Blood Sugar > 120 mg/dL",
  restecg: "Resting ECG Result",
  thalach: "Max Heart Rate Achieved",
  exang: "Exercise Induced Angina",
  oldpeak: "ST Depression (Oldpeak)",
  slope: "Slope of Peak Exercise ST Segment",
  ca: "Number of Major Vessels",
  thal: "Thalassemia",
};

export const tooltips = {
  age: "Age of the patient in years.",
  sex: "Biological sex used in the dataset.",
  cp: "Type of chest pain experienced by the patient.",
  trestbps: "Resting blood pressure measured in mm Hg.",
  chol: "Serum cholesterol level in mg/dL.",
  fbs: "Whether fasting blood sugar is greater than 120 mg/dL.",
  restecg: "Resting electrocardiographic result. 0 means normal, 1 means ST-T abnormality, 2 means left ventricular hypertrophy.",
  thalach: "Maximum heart rate achieved during exercise.",
  exang: "Whether exercise caused angina or chest pain.",
  oldpeak: "ST depression induced by exercise relative to rest.",
  slope: "Slope of the peak exercise ST segment. 0 upsloping, 1 flat, 2 downsloping.",
  ca: "Number of major blood vessels observed by fluoroscopy.",
  thal: "Thalassemia test result category used in the dataset.",
};

export const options = {
  sex: [
    { label: "Female", value: 0 },
    { label: "Male", value: 1 },
  ],
  cp: [
    { label: "Typical Angina", value: 0 },
    { label: "Atypical Angina", value: 1 },
    { label: "Non-anginal Pain", value: 2 },
    { label: "Asymptomatic", value: 3 },
  ],
  fbs: [
    { label: "No", value: 0 },
    { label: "Yes", value: 1 },
  ],
  restecg: [
    { label: "Normal", value: 0 },
    { label: "ST-T Wave Abnormality", value: 1 },
    { label: "Left Ventricular Hypertrophy", value: 2 },
  ],
  exang: [
    { label: "No", value: 0 },
    { label: "Yes", value: 1 },
  ],
  slope: [
    { label: "Upsloping", value: 0 },
    { label: "Flat", value: 1 },
    { label: "Downsloping", value: 2 },
  ],
  thal: [
    { label: "Normal", value: 1 },
    { label: "Fixed Defect", value: 2 },
    { label: "Reversible Defect", value: 3 },
  ],
};