# 🌿 CropCare AI

### AI-Powered Crop Disease Detection, Risk Assessment & Smart Advisory System

CropCare AI is an AI-powered web application designed to help farmers and agricultural users identify crop diseases from leaf images and receive intelligent, location-aware recommendations.

The system combines **Deep Learning, Computer Vision, Weather Intelligence, Risk Assessment, Explainable AI, and a Web Dashboard** into a single platform.

---

## 🚀 Overview

Crop diseases can significantly affect crop productivity and farmer income. Early identification of diseases can help users take appropriate preventive and corrective actions.

CropCare AI allows users to:

- 📸 Upload a crop leaf image
- 🤖 Detect the possible crop disease using a Deep Learning model
- 📊 View prediction confidence
- 🔥 Visualize important regions using Grad-CAM
- 🌦️ Retrieve weather information for the crop location
- ⚠️ Calculate disease risk level
- 💡 Receive recommended actions
- 🧪 View disease information and treatment suggestions
- 📜 Maintain analysis history
- 📄 Download analysis results as a PDF
- 🌐 Access everything through an interactive web dashboard

---

# ✨ Key Features

## 🖼️ 1. Crop Disease Detection

Users can upload an image of an affected crop leaf.

The uploaded image is processed and passed to a trained **MobileNetV2-based Deep Learning model**.

The system returns:

- Predicted disease
- Prediction confidence
- Disease information

---

## 🤖 2. MobileNetV2 Deep Learning Model

CropCare AI uses **MobileNetV2** as the primary Deep Learning architecture for image classification.

### Model Details

| Component | Details |
|---|---|
| Architecture | MobileNetV2 |
| Framework | TensorFlow / Keras |
| Input Size | 224 × 224 × 3 |
| Task | Crop Disease Classification |
| Image Processing | MobileNetV2 preprocessing |
| Output | Predicted disease class + confidence |

MobileNetV2 was selected because it provides a good balance between:

- Image classification performance
- Computational efficiency
- Model size
- Deployment suitability

---

# 📊 Dataset

CropCare AI uses the **PlantVillage Dataset** for crop disease classification.

The dataset contains images of healthy and diseased crop leaves belonging to multiple crop/disease categories.

### Dataset Pipeline

The dataset is organized into:

```text
PlantVillageDataset/
│
├── train/
├── validation/
└── test/
```

The dataset is used for:

- Model training
- Model validation
- Final model evaluation
- Disease classification testing

### Image Processing

Before being passed to the model, images are:

1. Loaded
2. Resized to **224 × 224 pixels**
3. Converted into numerical arrays
4. Preprocessed using MobileNetV2 preprocessing
5. Passed to the trained model

---

# 🔄 System Workflow

~~~mermaid
flowchart TD
    A[🌿 Upload Crop Image] --> B[🖼️ Image Preprocessing]
    B --> C[🤖 MobileNetV2 Model]
    C --> D[🔍 Disease Prediction]
    D --> E[📊 Confidence Score]
    E --> F[🌦️ Weather Analysis]
    F --> G[⚠️ Risk Assessment]
    G --> H[💡 Recommended Actions]
    H --> I[🌐 Web Dashboard]
    I --> J[📜 Analysis History]
~~~

---

# 🧠 AI Pipeline

```text
Crop Leaf Image
       │
       ▼
Image Preprocessing
       │
       ▼
224 × 224 × 3 Image
       │
       ▼
MobileNetV2
       │
       ▼
Disease Classification
       │
       ├──────────────► Confidence Score
       │
       ▼
Disease Information
       │
       ▼
Weather Data
       │
       ▼
Risk Assessment
       │
       ▼
Recommended Actions
       │
       ▼
Web Dashboard
```

---

# 🔥 Explainable AI with Grad-CAM

CropCare AI incorporates **Grad-CAM (Gradient-weighted Class Activation Mapping)** to provide a visual explanation of the model's prediction.

Instead of only showing the predicted disease, Grad-CAM highlights the regions of the leaf that contributed most strongly to the prediction.

### Grad-CAM Pipeline

```text
Input Leaf Image
       │
       ▼
MobileNetV2
       │
       ▼
Disease Prediction
       │
       ▼
Gradient Analysis
       │
       ▼
Activation Map
       │
       ▼
Grad-CAM Heatmap
       │
       ▼
Visual Explanation
```

This improves model interpretability by allowing users to understand which parts of the leaf influenced the prediction.

---

# 🌦️ Weather Intelligence

CropCare AI also considers weather conditions associated with the crop location.

The user can enter a city/location such as:

```text
Hyderabad
Delhi
Mumbai
Warangal
```

The system retrieves weather information through a weather API.

Weather information can include parameters such as:

- 🌡️ Temperature
- 💧 Humidity
- 🌧️ Weather conditions
- 📍 Location information

This information is incorporated into the application's risk assessment process.

---

# ⚠️ Disease Risk Assessment

CropCare AI combines disease prediction with environmental information to generate a risk assessment.

The system considers:

```text
Disease Prediction
        +
Confidence
        +
Weather Conditions
        ↓
Risk Assessment
        ↓
Risk Level
```

The application can display risk levels such as:

- 🟢 LOW
- 🟡 MEDIUM
- 🔴 HIGH

The risk assessment is intended as a decision-support feature and not as a replacement for professional agricultural advice.

---

# 💡 Recommended Actions

After detecting a disease, CropCare AI provides recommended actions based on the identified disease.

Recommendations can include:

- Crop management suggestions
- Preventive practices
- Treatment information
- Monitoring recommendations
- Environmental considerations

This allows the system to move beyond simple classification and provide actionable information.

---

# 🧪 Disease Information

The application provides additional information related to the detected disease.

Depending on the detected condition, users can view:

- Disease name
- Symptoms
- Possible causes
- Treatment information
- Prevention measures
- Recommended actions

Disease-related information is maintained using structured treatment data.

---

# 📜 Analysis History

CropCare AI maintains previous analysis results so that users can review earlier predictions.

The history feature can contain information such as:

- Uploaded image
- Predicted disease
- Confidence
- Risk level
- Location
- Weather information
- Analysis timestamp

This allows users to track previous crop health assessments.

---

# 📄 PDF Report

The application also supports generating a downloadable analysis report.

The report can contain:

```text
Crop Disease Analysis
        │
        ├── Disease Prediction
        ├── Confidence
        ├── Risk Level
        ├── Weather Information
        ├── Disease Information
        └── Recommended Actions
```

This makes it easier to save and share analysis results.

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │      USER            │
                    │  Crop Leaf Image     │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │   Web Dashboard      │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     FastAPI          │
                    │      Backend         │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       ┌─────────────┐  ┌─────────────┐  ┌──────────────┐
       │ MobileNetV2 │  │   Weather   │  │ Risk Engine  │
       │    Model    │  │     API     │  │              │
       └──────┬──────┘  └──────┬──────┘  └──────┬───────┘
              │                │                │
              └────────────────┼────────────────┘
                               ▼
                    ┌──────────────────────┐
                    │   Analysis Result    │
                    │ Disease + Risk +     │
                    │ Weather + Advice     │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Web Dashboard     │
                    │ Analysis + History   │
                    └──────────────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

- React.js
- JavaScript
- HTML
- CSS
- Axios

## Backend

- Python
- FastAPI
- Uvicorn
- REST APIs

## Artificial Intelligence / Machine Learning

- TensorFlow
- Keras
- MobileNetV2
- NumPy
- OpenCV
- Grad-CAM

## Dataset

- PlantVillage Dataset

## External Services

- Weather API

## Database / Storage

- SQLite / project database
- JSON-based treatment information

## Development Tools

- Visual Studio Code
- Git
- GitHub
- Python Virtual Environment

---

# 📁 Project Structure

```text
crop-disease-app/
│
├── backend/
│   │
│   ├── main.py
│   ├── risk.py
│   ├── weather.py
│   ├── gradcam.py
│   ├── database.py
│   ├── treatments.json
│   │
│   └── generated/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── ...
│   │
│   ├── public/
│   └── package.json
│
├── model/
│   │
│   ├── train.py
│   ├── predict.py
│   ├── evaluate.py
│   ├── confusion_matrix.png
│   ├── class_names.json
│   ├── crop_disease_model.keras
│   │
│   └── data/
│       └── PlantVillageDataset/
│
├── .env
├── .gitignore
└── README.md
```

---

# 🔌 Backend API

The backend is implemented using **FastAPI**.

The API handles:

- Image upload
- Disease prediction
- Risk assessment
- Weather retrieval
- Grad-CAM generation
- Analysis history
- Result processing

### Backend Flow

```text
Frontend
   │
   │ HTTP Request
   ▼
FastAPI
   │
   ├── Image Processing
   │
   ├── ML Prediction
   │
   ├── Grad-CAM
   │
   ├── Weather API
   │
   ├── Risk Calculation
   │
   └── Database / History
   │
   ▼
JSON Response
   │
   ▼
Frontend Dashboard
```

---

# 🌐 Frontend

The frontend is built using **React.js**.

The dashboard provides a user-friendly interface for:

- Image upload
- Location input
- Disease detection
- Prediction results
- Confidence visualization
- Weather information
- Risk level
- Grad-CAM visualization
- Recommended actions
- Disease information
- Analysis history
- PDF report generation

---

# 🔐 Environment Variables

Create a `.env` file for API keys and environment-specific configuration.

Example:

```env
OPENWEATHER_API_KEY=your_api_key_here
```

Do not commit real API keys or other secrets to GitHub.

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/Praharshita23/crop-disease-ai.git
```

```bash
cd crop-disease-ai
```

---

# 🐍 Backend Setup

Navigate to the project directory:

```bash
cd crop-disease-app
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment on Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

---

# ▶️ Run the FastAPI Backend

From the project directory:

```bash
uvicorn backend.main:app --reload
```

The backend will be available at:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

---

# ⚛️ Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd crop-disease-app/frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

The frontend will normally run at:

```text
http://localhost:3000
```

---

# 🧪 Model Prediction

The prediction pipeline performs the following steps:

```text
1. Load image
       ↓
2. Resize image to 224 × 224
       ↓
3. Convert image to array
       ↓
4. Add batch dimension
       ↓
5. Apply MobileNetV2 preprocessing
       ↓
6. Pass image to trained model
       ↓
7. Find highest probability class
       ↓
8. Calculate confidence
       ↓
9. Map class index to disease name
       ↓
10. Return prediction
```

---

# 📈 Model Evaluation

The project includes model evaluation utilities for analyzing classification performance.

Evaluation can include:

- Accuracy
- Loss
- Confusion Matrix
- Class-wise predictions

A confusion matrix is generated to visualize the model's classification performance across different disease classes.

---

# 🔍 Explainability

Grad-CAM is used to provide visual explanations for predictions.

Example concept:

```text
Original Leaf
      +
Model Prediction
      ↓
Grad-CAM
      ↓
Highlighted Disease-Affected Region
```

This helps users understand where the model is focusing when making a prediction.

---

# 🎯 Problem Solved

Traditional crop disease identification can involve:

- Manual inspection
- Delayed diagnosis
- Limited access to agricultural experts
- Difficulty identifying early symptoms
- Lack of location-specific environmental information

CropCare AI attempts to address these challenges by combining:

```text
Computer Vision
       +
Deep Learning
       +
Weather Intelligence
       +
Risk Assessment
       +
Explainable AI
       +
Actionable Recommendations
```

into a single platform.

---

# 🌱 Why CropCare AI?

CropCare AI is designed not just as a disease classification model, but as an integrated crop-health decision-support platform.

Instead of stopping at:

> "This leaf looks like Disease X."

the system attempts to provide:

```text
Disease
   ↓
Confidence
   ↓
Visual Explanation
   ↓
Weather Context
   ↓
Risk Level
   ↓
Recommended Actions
```

This creates a more complete crop-health analysis workflow.

---

# 🚀 Future Enhancements

Potential future improvements include:

- 📱 Mobile application
- 🌾 More crop and disease classes
- 🛰️ Satellite-based crop monitoring
- 📍 GPS-based automatic location detection
- 📡 IoT-based soil and environmental sensors
- 🧠 Improved Deep Learning architectures
- 🌐 Multilingual farmer interface
- 🗣️ Voice-based interaction
- 📊 Long-term crop health analytics
- 🔔 Disease-risk alerts
- ☁️ Cloud deployment
- 👨‍🌾 Farmer-specific recommendations
- 📈 Historical crop health trends

---

# 📌 Use Cases

CropCare AI can be useful for:

- 👨‍🌾 Farmers
- 🌱 Agricultural students
- 🧑‍🔬 Researchers
- 🏫 Educational institutions
- 🌾 Agricultural extension services
- 🤖 AI/ML research projects
- 🏆 Hackathons and innovation competitions

---

# 🏆 Project Highlights

### 🌿 Crop Disease Detection
Deep Learning-based crop disease classification using MobileNetV2.

### 🔥 Explainable AI
Grad-CAM visualization helps explain model predictions.

### 🌦️ Weather-Aware Analysis
Weather information is incorporated into the crop-risk analysis.

### ⚠️ Risk Assessment
Disease and environmental information are used to provide a risk level.

### 💡 Smart Recommendations
The system provides actionable disease-management information.

### 📜 Analysis History
Previous crop-health analyses can be reviewed.

### 📄 PDF Reports
Analysis results can be saved as reports.

### 🌐 Full-Stack Application
React frontend + FastAPI backend + Deep Learning model.

---

# 🧑‍💻 Development Workflow

```text
Dataset
   ↓
Data Preprocessing
   ↓
Model Training
   ↓
Model Evaluation
   ↓
Model Saving
   ↓
FastAPI Integration
   ↓
Grad-CAM Integration
   ↓
Weather Integration
   ↓
Risk Assessment
   ↓
React Frontend
   ↓
Testing
   ↓
GitHub Deployment
```

---

# 📚 Technologies Used

```text
Python
TensorFlow
Keras
MobileNetV2
NumPy
OpenCV
Grad-CAM
FastAPI
Uvicorn
React.js
JavaScript
HTML
CSS
Axios
PlantVillage Dataset
Weather API
SQLite / Database
Git
GitHub
VS Code
```

---

# ⚠️ Disclaimer

CropCare AI is an AI-based decision-support and educational system.

Predictions and recommendations should not be considered a substitute for professional agricultural diagnosis or expert advice.

Users should consult qualified agricultural professionals before taking significant treatment or crop-management decisions.

---

# 👥 Project

**CropCare AI**

AI-powered crop disease detection and intelligent crop-health assessment platform.

Built using:

**Artificial Intelligence + Computer Vision + Deep Learning + Weather Intelligence + Explainable AI + Full-Stack Development**

---

## 🌿 CropCare AI

### Detect. Understand. Assess. Act.

```text
🌿 Image
   ↓
🤖 AI Detection
   ↓
🔍 Explainable Prediction
   ↓
🌦️ Weather Context
   ↓
⚠️ Risk Assessment
   ↓
💡 Smart Recommendations
```
