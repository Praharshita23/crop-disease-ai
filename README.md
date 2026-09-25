# 🌱 CropCare AI

### AI-Powered Crop Disease Detection, Risk Assessment & Smart Agricultural Assistance

CropCare AI is an AI-powered web application designed to help farmers and agricultural users identify crop diseases from leaf images and receive additional information such as disease confidence, environmental conditions, risk assessment, treatment recommendations, preventive measures, and explainable AI visualizations.

The system combines **Deep Learning, Computer Vision, Explainable AI, Weather Data, and a Full-Stack Web Application** into a single platform.

---

## 🚀 Key Features

- 🌿 **AI-Based Crop Disease Detection**
  - Upload a crop leaf image.
  - The trained deep learning model identifies the disease.

- 🎯 **Prediction Confidence**
  - Displays the model's confidence percentage for the predicted disease.

- 🔥 **Explainable AI with Grad-CAM**
  - Generates a Grad-CAM visualization.
  - Highlights the regions of the leaf that influenced the model's prediction.

- 🌦️ **Weather Integration**
  - Accepts the crop location/city.
  - Retrieves weather information using a weather API.
  - Displays environmental conditions relevant to crop health.

- ⚠️ **Disease Risk Assessment**
  - Calculates a risk level using prediction information and environmental conditions.

- 💊 **Treatment Recommendations**
  - Provides disease-specific treatment information.

- 🛡️ **Prevention Measures**
  - Displays preventive steps that can help reduce disease spread.

- 📊 **Disease Analysis Dashboard**
  - Shows disease, confidence, weather, and risk level in a structured interface.

- 📈 **Disease Spread Forecast**
  - Provides an assessment related to possible disease spread based on the available environmental information.

- 👨‍🌾 **Recommended Actions**
  - Provides actionable steps based on the detected condition and risk.

- 📞 **Expert Support Section**
  - Provides guidance for seeking additional agricultural assistance.

- 📜 **Prediction History**
  - Stores previous disease analysis records.

- 📄 **PDF Report**
  - Allows users to generate/download a report containing analysis information.

- 🌐 **Multilingual Support**
  - Includes support for displaying information in Hindi.

- 🎨 **Modern Responsive UI**
  - Clean agricultural-themed interface.
  - Interactive cards, gradients, hover effects, visual indicators, and responsive layout.

---

# 🧠 How CropCare AI Works

The overall system follows this workflow:

```text
                    ┌─────────────────────┐
                    │   User Uploads      │
                    │   Crop Leaf Image   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Image Preprocessing │
                    │ Resize → 224 × 224  │
                    │ MobileNetV2         │
                    │ Preprocessing       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   MobileNetV2       │
                    │   Deep Learning     │
                    │      Model          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Disease Prediction  │
                    │ + Confidence Score  │
                    └──────────┬──────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
                ▼              ▼              ▼
        ┌─────────────┐ ┌─────────────┐ ┌──────────────┐
        │  Grad-CAM   │ │   Weather   │ │  Treatment   │
        │ Explanation │ │     API     │ │ & Prevention │
        └──────┬──────┘ └──────┬──────┘ └───────┬──────┘
               │               │                │
               └───────────────┼────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │   Risk Assessment   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Recommended Actions │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Web Dashboard     │
                    │ Analysis + History  │
                    └─────────────────────┘
🧬 Machine Learning Model

CropCare AI uses MobileNetV2 as the primary deep learning architecture for crop disease classification.

Model Details
Architecture: MobileNetV2
Framework: TensorFlow / Keras
Input Image Size: 224 × 224 × 3
Task: Multi-class image classification
Transfer Learning: MobileNetV2-based architecture
Image preprocessing: MobileNetV2 preprocess_input
Output: Predicted disease class and confidence score

MobileNetV2 was selected because it provides a good balance between:

Image classification performance
Computational efficiency
Model size
Deployment suitability
Faster inference

This makes it suitable for an application where predictions need to be generated through a web backend.

📚 Dataset

The project uses the PlantVillage Dataset for crop disease image classification.

The dataset contains images of healthy and diseased crop leaves belonging to multiple crop/disease classes.

The project uses the dataset through a structured:

PlantVillageDataset/
└── train_val_test/
    ├── train/
    ├── val/
    └── test/

The dataset is divided into:

Training Set – used to train the deep learning model.
Validation Set – used during training to monitor model performance and tune the model.
Testing Set – used to evaluate the trained model on unseen images.

The exact division is defined by the dataset preparation used during model training.

🔬 Image Processing Pipeline

Before an image is passed to the model:

Input Leaf Image
       ↓
Load Image
       ↓
Resize to 224 × 224
       ↓
Convert Image → NumPy Array
       ↓
Add Batch Dimension
       ↓
MobileNetV2 preprocess_input()
       ↓
MobileNetV2 Model
       ↓
Prediction Probabilities
       ↓
Highest Probability Class
       ↓
Disease + Confidence
🔥 Explainable AI – Grad-CAM

CropCare AI uses Grad-CAM (Gradient-weighted Class Activation Mapping) to make the model's prediction more understandable.

Instead of only displaying:

Disease: Bacterial Spot
Confidence: 96%

the system also generates a visualization showing the areas of the leaf that contributed to the prediction.

Grad-CAM Workflow
Leaf Image
     ↓
MobileNetV2
     ↓
Predicted Disease
     ↓
Calculate Gradients
     ↓
Generate Activation Map
     ↓
Apply Heatmap
     ↓
Overlay on Original Image
     ↓
Grad-CAM Visualization

This helps users understand where the model is focusing while making its prediction.

🌦️ Weather Integration

CropCare AI integrates weather information using a weather API.

The user provides a location/city such as:

Hyderabad
Delhi
Mumbai
Warangal

The application retrieves available weather information and uses it as an additional environmental factor for the analysis.

Weather information can include parameters such as:

🌡️ Temperature
💧 Humidity
🌧️ Weather condition
📍 Location

The environmental information is displayed alongside the disease prediction.

⚠️ Risk Assessment

CropCare AI provides a risk assessment based on the available disease prediction and environmental information.

The system categorizes the risk into levels such as:

LOW
MEDIUM
HIGH

The purpose of the risk assessment is to provide an easy-to-understand indication of the situation and help users decide what actions should be considered.

💊 Treatment & Prevention

After detecting a disease, the application provides disease-specific information.

Treatment

Provides suggested measures that can be considered for managing the detected disease.

Prevention

Provides preventive practices such as:

Maintaining field hygiene
Removing infected plant material
Monitoring crop health
Avoiding unnecessary moisture
Following appropriate agricultural practices
Regularly checking surrounding plants

The treatment and prevention information is maintained through the project's treatment data.

🏗️ System Architecture
                    ┌──────────────────────┐
                    │      React.js        │
                    │     Frontend         │
                    └──────────┬───────────┘
                               │
                               │ HTTP Requests
                               ▼
                    ┌──────────────────────┐
                    │      FastAPI         │
                    │       Backend        │
                    └──────────┬───────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
      ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
      │ ML Model    │   │ Weather API │   │ Risk Engine │
      │ MobileNetV2 │   │             │   │             │
      └──────┬──────┘   └─────────────┘   └─────────────┘
             │
             ▼
      ┌─────────────┐
      │ Grad-CAM    │
      │ Explainable │
      │ AI          │
      └─────────────┘

                    ┌──────────────────────┐
                    │ Treatment / History │
                    │      Database       │
                    └──────────────────────┘
💻 Technology Stack
Frontend
React.js
JavaScript
HTML
CSS
Axios
Backend
Python
FastAPI
Uvicorn
REST APIs
Artificial Intelligence / Machine Learning
TensorFlow
Keras
MobileNetV2
NumPy
OpenCV
Grad-CAM
Dataset
PlantVillage Dataset
APIs
Weather API
Database
SQLite / project database
Development Tools
Visual Studio Code
Git
GitHub
Python Virtual Environment
📁 Project Structure
crop-disease-app/
│
├── backend/
│   ├── main.py
│   ├── risk.py
│   ├── weather.py
│   ├── gradcam.py
│   ├── database.py
│   ├── treatments.json
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── ...
│   │
│   ├── public/
│   ├── package.json
│   └── ...
│
├── model/
│   ├── train.py
│   ├── predict.py
│   ├── evaluate.py
│   ├── crop_disease_model.keras
│   ├── class_names.json
│   ├── confusion_matrix.png
│   └── data/
│       └── PlantVillageDataset/
│
├── .env
├── .gitignore
└── README.md
🔌 Backend API

The backend is implemented using FastAPI.

The frontend communicates with the backend through REST API endpoints.

The backend handles:

Image upload
Disease prediction
Confidence calculation
Risk assessment
Weather retrieval
Grad-CAM generation
Treatment information
Analysis history
Report generation
Example API Flow
React Frontend
      ↓
Upload Image
      ↓
FastAPI Endpoint
      ↓
Save Uploaded Image
      ↓
predict_disease()
      ↓
MobileNetV2
      ↓
Prediction
      ↓
Risk Calculation
      ↓
Weather Information
      ↓
Grad-CAM
      ↓
Response JSON
      ↓
React Dashboard
🧪 Model Prediction

The prediction function performs the following steps:

image = load_img(
    image_path,
    target_size=(224, 224)
)

image_array = img_to_array(image)

image_array = np.expand_dims(
    image_array,
    axis=0
)

image_array = preprocess_input(
    image_array
)

predictions = model.predict(
    image_array,
    verbose=0
)

predicted_index = int(
    np.argmax(predictions[0])
)

The predicted class is obtained from:

class_names.json

The final response contains:

{
    "disease": "Predicted Disease",
    "confidence": 95.42
}
📊 Model Evaluation

The project includes evaluation utilities for analysing model performance.

Evaluation can include:

Accuracy
Classification results
Confusion Matrix
Test-set predictions

A confusion matrix is generated to visualize how the model performs across different disease classes.

⚙️ Installation
1. Clone the Repository
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
cd crop-disease-app
🐍 Backend Setup

Create a Python virtual environment:

python -m venv venv

Activate it on Windows:

venv\Scripts\activate

Install the required dependencies:

pip install -r requirements.txt
🔑 Environment Variables

Create a .env file in the project according to the backend configuration.

Example:

WEATHER_API_KEY=your_api_key_here

Do not commit API keys or other sensitive credentials to GitHub.

🚀 Run the Backend

From the project directory:

uvicorn backend.main:app --reload

The FastAPI server will start locally.

Typical development address:

http://127.0.0.1:8000

FastAPI documentation can be accessed through:

/docs
⚛️ Run the Frontend

Open another terminal:

cd frontend

Install dependencies:

npm install

Start the React application:

npm start

The frontend will run on the local React development server.

🧠 Running the Model Directly

The prediction module can also be tested independently.

From the project environment:

python model/predict.py

The model loads:

crop_disease_model.keras

and:

class_names.json

It then processes a test leaf image and prints:

CROP DISEASE PREDICTION

Image: <image-name>

Predicted Class: <disease>
Confidence: <percentage>%
🖥️ Application Workflow
Step 1 – Upload Crop Image

The user uploads an image of the affected crop leaf.

Step 2 – Select Crop Location

The user enters the city/location where the crop is located.

Step 3 – Disease Detection

The image is sent to the FastAPI backend.

Step 4 – AI Prediction

MobileNetV2 processes the image and predicts the disease.

Step 5 – Confidence Score

The application displays the model's prediction confidence.

Step 6 – Environmental Analysis

Weather information is retrieved for the selected location.

Step 7 – Risk Assessment

The application calculates a disease risk level.

Step 8 – Explainable AI

Grad-CAM generates a heatmap showing important regions of the leaf.

Step 9 – Treatment & Prevention

The application displays relevant treatment and prevention information.

Step 10 – Recommended Actions

The user receives practical next steps based on the analysis.

Step 11 – History & Report

The analysis can be stored and included in a downloadable report.

🌟 User Interface

The application provides a dashboard containing:

┌─────────────────────────────────────────┐
│              CropCare AI                │
│ AI-powered crop disease detection       │
└─────────────────────────────────────────┘

          Upload Crop Image
                  ↓
          Enter Crop Location
                  ↓
            Detect Disease
                  ↓

┌──────────┬──────────┬──────────┬──────────┐
│ Disease  │Confidence│ Weather  │   Risk   │
└──────────┴──────────┴──────────┴──────────┘

              ↓

        Disease Information
              ↓
        Grad-CAM Analysis
              ↓
        Weather Analysis
              ↓
       Spread Forecast
              ↓
     Treatment & Prevention
              ↓
      Recommended Actions
              ↓
        Expert Support
              ↓
          History
🔐 Security Considerations
API keys are stored using environment variables.
Sensitive credentials should not be committed to GitHub.
Uploaded files should be validated before processing.
Backend endpoints should validate incoming requests.
File types and file sizes should be restricted in production.
Authentication can be added for production deployments.
🎯 Problem Addressed

Crop diseases can significantly affect agricultural productivity when they are not identified early.

Traditional identification often depends on:

Manual observation
Expert availability
Physical inspection
Delayed diagnosis

CropCare AI aims to provide a faster preliminary analysis by combining:

Computer Vision
       +
Deep Learning
       +
Explainable AI
       +
Weather Information
       +
Risk Assessment
       +
Treatment Guidance

This creates a unified digital assistant for preliminary crop health analysis.

💡 What Makes CropCare AI Different?

Instead of providing only a disease classification, CropCare AI combines multiple components:

Traditional AI Prediction
Image
  ↓
Model
  ↓
Disease
CropCare AI
Image
  ↓
AI Disease Detection
  ↓
Confidence
  ↓
Grad-CAM Explanation
  ↓
Weather Information
  ↓
Risk Assessment
  ↓
Treatment
  ↓
Prevention
  ↓
Recommended Actions
  ↓
History & Report

The goal is to move from "What disease is this?" to "What is happening, why did the model identify it, what environmental conditions are present, and what actions can be considered?"

🔮 Future Scope

Future versions of CropCare AI can include:

📱 Android/iOS mobile application
🌾 More crop and disease classes
🌍 Regional language support
🛰️ Satellite-based crop monitoring
📡 IoT-based field sensors
🌡️ Real-time soil and environmental monitoring
🤖 AI-powered agricultural chatbot
📍 GPS-based field monitoring
📈 Historical disease trend analysis
☁️ Cloud-based model deployment
🔄 Continuous model improvement
🧑‍🌾 Personalized farmer recommendations
📊 Large-scale agricultural analytics
🌐 Production deployment for real-world users
🏆 Project Highlights
✅ Deep Learning based disease classification
✅ MobileNetV2 transfer-learning architecture
✅ PlantVillage Dataset
✅ FastAPI REST backend
✅ React.js frontend
✅ Weather API integration
✅ Risk assessment engine
✅ Grad-CAM Explainable AI
✅ Disease treatment recommendations
✅ Prevention guidance
✅ Prediction history
✅ PDF report generation
✅ Multilingual interface
✅ Responsive and interactive UI
📌 Limitations

CropCare AI is intended as an AI-assisted preliminary crop disease analysis system.

Model predictions may be affected by:

Image quality
Lighting conditions
Leaf orientation
Background noise
Disease similarity
Diseases not represented in the training dataset
Environmental differences between dataset images and real-world field conditions

Therefore, predictions should be treated as AI-assisted guidance rather than a replacement for professional agricultural diagnosis.

👥 Team

CropCare AI

Developed as an AI-based agricultural technology project.

Areas Covered
Artificial Intelligence
Machine Learning
Computer Vision
Explainable AI
Full-Stack Development
REST API Development
Data Analysis
Agricultural Technology
📜 License

This project is developed for educational, research, and hackathon purposes.

🌱 CropCare AI
Detect. Understand. Act.
        🌱
       /  \
      / AI \
     /______\
        │
        ▼
   Crop Health
   Intelligence

CropCare AI — AI-powered crop disease detection and smart agricultural assistance.
