# 🌿 CropCare AI

### AI-Powered Crop Disease Detection, Risk Assessment & Smart Agricultural Assistance

CropCare AI is an AI-powered crop health analysis platform that helps farmers and agricultural users identify crop diseases from leaf images and understand the associated environmental risk.

The system combines **Deep Learning, Explainable AI, Weather Intelligence, Risk Assessment, Treatment Recommendations, and a Web Application** into one integrated solution.

---

## 🚀 Project Overview

CropCare AI allows a user to:

1. Upload an image of an affected crop leaf.
2. Select/enter the crop location.
3. Use a trained **MobileNetV2 Deep Learning model** to identify the disease.
4. Display the prediction confidence.
5. Analyze the local weather conditions.
6. Calculate a disease risk level based on environmental conditions.
7. Generate treatment and prevention recommendations.
8. Visualize the model's decision using **Grad-CAM Explainable AI**.
9. View disease analysis history.
10. Download the analysis/report for further reference.
11. Access agricultural assistance and recommended actions through the web interface.

---

# ✨ Key Features

### 🌱 1. AI Crop Disease Detection
Users can upload crop leaf images and receive an AI-based disease prediction.

- Deep Learning based classification
- MobileNetV2 architecture
- 224 × 224 image input
- Confidence score for predictions
- Multiple crop/disease classes supported by the trained dataset

---

### 🧠 2. Explainable AI with Grad-CAM

CropCare AI uses **Grad-CAM (Gradient-weighted Class Activation Mapping)** to visualize the regions of the leaf that influenced the model's prediction.

This makes the prediction more understandable instead of treating the model as a complete black box.

The Grad-CAM visualization highlights the important regions associated with the predicted disease.

---

### 🌦️ 3. Weather-Based Risk Assessment

The application retrieves weather information for the entered crop location.

Weather information can include:

- 🌡️ Temperature
- 💧 Humidity
- 🌧️ Weather conditions
- 📍 Location
- 🌤️ Environmental conditions

This information is combined with the detected disease to estimate the associated crop disease risk.

---

### ⚠️ 4. Disease Risk Assessment

CropCare AI provides an easy-to-understand risk level such as:

- LOW
- MEDIUM
- HIGH

The risk assessment considers environmental conditions along with the detected disease.

---

### 💊 5. Treatment Recommendations

After disease detection, the application provides:

- Disease information
- Treatment recommendations
- Prevention measures
- Recommended actions

This helps convert an AI prediction into practical agricultural guidance.

---

### 📊 6. Analysis Dashboard

The result dashboard displays:

- Disease
- Confidence
- Weather
- Risk level
- Disease information
- Treatment
- Prevention
- Grad-CAM visualization
- Recommended actions

---

### 🗂️ 7. Analysis History

Previous analyses can be stored and accessed through the application's history functionality.

Users can review previous:

- Crop images
- Disease predictions
- Confidence values
- Risk levels
- Analysis information

---

### 📄 8. Report Generation

The application supports generating/downloading a report containing the crop disease analysis and relevant results.

---

### 🌐 9. Web-Based Interface

CropCare AI provides an interactive web interface where users can perform the complete workflow without directly interacting with the ML model.

---

# 🏗️ System Architecture

```text
                    ┌───────────────────────┐
                    │       USER            │
                    │                       │
                    │ Upload Crop Leaf      │
                    │ Enter Location        │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │    React Frontend     │
                    │                       │
                    │ Image Upload          │
                    │ Location Input        │
                    │ Results Dashboard     │
                    └───────────┬───────────┘
                                │
                                │ API Request
                                ▼
                    ┌───────────────────────┐
                    │     FastAPI Backend   │
                    │                       │
                    │ Prediction API        │
                    │ Weather API            │
                    │ Risk Assessment        │
                    │ Grad-CAM               │
                    │ History                │
                    └───────┬───────┬───────┘
                            │       │
              ┌─────────────┘       └──────────────┐
              ▼                                    ▼
   ┌──────────────────────┐             ┌──────────────────────┐
   │ MobileNetV2 Model    │             │ Weather Service      │
   │                      │             │                      │
   │ Image Classification │             │ Temperature          │
   │ Disease Prediction   │             │ Humidity             │
   └──────────┬───────────┘             │ Weather Conditions   │
              │                         └──────────────────────┘
              ▼
   ┌──────────────────────┐
   │ Disease Information  │
   │ & Treatment Data     │
   └──────────┬───────────┘
              │
              ▼
   ┌──────────────────────┐
   │ Risk Assessment      │
   │                      │
   │ LOW / MEDIUM / HIGH  │
   └──────────┬───────────┘
              │
              ▼
   ┌──────────────────────┐
   │ Grad-CAM             │
   │ Explainability       │
   └──────────┬───────────┘
              │
              ▼
   ┌──────────────────────┐
   │ Final Analysis       │
   │ Dashboard            │
   └──────────────────────┘
