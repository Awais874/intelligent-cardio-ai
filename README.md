# 🫀 IntelligentCardio AI

An AI-powered cardiovascular risk prediction system that combines a modern **React (Vite)** frontend with a **FastAPI** backend.  
It analyzes clinical health indicators and provides a clear, structured estimate of heart disease risk.

---

##  What this project does

This project transforms raw clinical data into meaningful insights.

Instead of just returning numbers, it:
-  Uses a machine learning model to estimate heart disease risk  
-  Converts inputs into understandable results  
-  Classifies risk into **Low, Moderate, or High**  
-  Presents everything in a clean, professional UI  

---

##  Key Features

-  AI-based heart disease risk prediction  
-  FastAPI backend for real-time inference  
-  Modern UI built with React + Tailwind  
-  Risk percentage with clear categorization  
-  “Key Areas of Concern” visualization  
-  Based on the UCI Heart Disease dataset  

---

## Tech Stack

###  Frontend
- React (Vite)
- Tailwind CSS
- Axios
- Lucide Icons

###  Backend
- FastAPI
- NumPy
- Scikit-learn
- Joblib

###  Machine Learning
- Machine learning-based classification approach
- Feature scaling using StandardScaler
- Trained on clinical health indicators

---

## 🔬 Model Experiments & Selection

During development, multiple machine learning approaches were explored to identify an effective method for predicting heart disease risk.

###  Experimentation Approach

Different approaches were evaluated to understand how well they capture patterns in clinical data such as:

- Age  
- Cholesterol  
- Blood pressure  
- Heart rate  
- Exercise-related indicators  

The goal was to balance:

-  Predictive performance  
-  Speed for real-time inference  
-  Simplicity and interpretability  

---



###  Future Improvements

- Model optimization and tuning  
- Feature importance analysis  
- Integration of advanced models  
- Cross-validation for better evaluation  

---

## 📂 Project Structure
├── frontend/ # React UI
│ ├── src/
│ └── package.json
│
├── backend/ # FastAPI backend
│ ├── app/
│ │ ├── main.py
│ │ ├── routes/
│ │ ├── services/
│ │ └── schemas/
│ ├── model.pkl
│ ├── scaler.pkl
│ └── requirements.txt
│
└── README.md



---

##  Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Awais874/intelligent-cardio-ai.git
cd intelligent-cardio-ai


cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

Deployment
Frontend → Vercel
Backend → Render