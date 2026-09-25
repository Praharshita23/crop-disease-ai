import os
import json
import tempfile
import uuid

from fastapi import (
    FastAPI,
    UploadFile,
    File,
    Form,
    HTTPException
)

from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from model.predict import predict_disease
from backend.risk import calculate_risk
from backend.weather import get_weather
from backend.gradcam import create_gradcam_image
from backend.database import get_connection


# ============================================================
# BASE DIRECTORY
# ============================================================

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)


# ============================================================
# APP CONFIGURATION
# ============================================================

app = FastAPI(
    title="Crop Disease Detection API",
    description="AI-powered crop disease detection and risk assessment system",
    version="1.0.0"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# LOAD TREATMENT / DISEASE INFORMATION
# ============================================================

TREATMENTS_PATH = os.path.join(
    BASE_DIR,
    "treatments.json"
)


try:

    with open(
        TREATMENTS_PATH,
        "r",
        encoding="utf-8"
    ) as file:

        treatments = json.load(file)

    print(
        "Treatment information loaded successfully!"
    )

except Exception as e:

    print(
        f"Could not load treatments.json: {e}"
    )

    treatments = {}


# ============================================================
# GENERATED FILES DIRECTORY
# ============================================================

GENERATED_DIR = os.path.join(
    BASE_DIR,
    "generated"
)


os.makedirs(
    GENERATED_DIR,
    exist_ok=True
)


# ============================================================
# SERVE GENERATED FILES
# ============================================================

app.mount(
    "/generated",
    StaticFiles(
        directory=GENERATED_DIR
    ),
    name="generated"
)


# ============================================================
# DISEASE TYPE
# ============================================================

def get_disease_type(disease_name):
    """
    Classify the detected disease as:

    Fungal
    Bacterial
    Viral
    Pest
    Healthy
    Unknown
    """

    name = disease_name.lower()

    # --------------------------------------------------------
    # HEALTHY
    # --------------------------------------------------------

    if "healthy" in name:
        return "Healthy"

    # --------------------------------------------------------
    # BACTERIAL
    # --------------------------------------------------------

    if any(
        word in name
        for word in [
            "bacterial",
            "bacteria",
            "bacterial_spot"
        ]
    ):

        return "Bacterial"

    # --------------------------------------------------------
    # VIRAL
    # --------------------------------------------------------

    if any(
        word in name
        for word in [
            "virus",
            "viral",
            "yellowleaf",
            "yellow_leaf",
            "mosaic"
        ]
    ):

        return "Viral"

    # --------------------------------------------------------
    # PEST
    # --------------------------------------------------------

    if any(
        word in name
        for word in [
            "spider_mites",
            "mite",
            "pest"
        ]
    ):

        return "Pest"

    # --------------------------------------------------------
    # FUNGAL
    # --------------------------------------------------------

    if any(
        word in name
        for word in [
            "blight",
            "mold",
            "mildew",
            "septoria",
            "target_spot",
            "leaf_spot"
        ]
    ):

        return "Fungal"

    # --------------------------------------------------------
    # UNKNOWN
    # --------------------------------------------------------

    return "Unknown"


# ============================================================
# DISEASE INFORMATION LOOKUP
# ============================================================

def get_disease_information(disease_name):
    """
    Get complete disease information from treatments.json.

    Includes:

    - Crop
    - Disease name
    - Severity
    - Symptoms
    - Cause
    - Spread
    - Treatment
    - Prevention
    """

    if disease_name in treatments:

        return treatments[disease_name]

    # --------------------------------------------------------
    # DEFAULT INFORMATION
    # --------------------------------------------------------

    return {

        "disease_type": "Unknown",

        "crop": {
            "english": "Unknown",
            "hindi": "अज्ञात"
        },

        "disease_name": {
            "english": disease_name,
            "hindi": disease_name
        },

        "severity": "Unknown",

        "symptoms": {
            "english": "Disease-specific information is not available.",
            "hindi": "इस रोग की विशेष जानकारी उपलब्ध नहीं है।"
        },

        "cause": {
            "english": "Consult a local agricultural expert for confirmation.",
            "hindi": "पुष्टि के लिए स्थानीय कृषि विशेषज्ञ से सलाह लें।"
        },

        "spread": {
            "english": "Consult a local agricultural expert for disease-specific guidance.",
            "hindi": "रोग के बारे में विशेष सलाह के लिए स्थानीय कृषि विशेषज्ञ से संपर्क करें।"
        },

        "treatment": {
            "english": "Consult a local agricultural expert for appropriate treatment.",
            "hindi": "उचित उपचार के लिए स्थानीय कृषि विशेषज्ञ से सलाह लें।"
        },

        "prevention": {
            "english": "Maintain good field hygiene and monitor plants regularly.",
            "hindi": "खेत की स्वच्छता बनाए रखें और पौधों की नियमित निगरानी करें।"
        }

    }


# ============================================================
# DISEASE SPREAD FORECAST
# ============================================================

def calculate_spread_forecast(
    disease_type,
    temperature,
    humidity,
    rainfall,
    current_risk
):
    """
    Estimate short-term disease spread outlook using
    detected disease type and current environmental
    conditions.

    This is an environmental spread outlook based on
    current conditions. It is not a direct weather forecast.
    """

    # --------------------------------------------------------
    # HEALTHY CROP
    # --------------------------------------------------------

    if disease_type == "Healthy":

        return {

            "level": "LOW",

            "score": 0,

            "period": "Next 3–5 days",

            "message": (
                "No disease was detected. Continue regular "
                "monitoring and maintain good crop hygiene."
            ),

            "factors": [
                "No active disease detected",
                "Regular crop monitoring is recommended"
            ],

            "recommendation": (
                "Continue routine monitoring and maintain "
                "proper irrigation and field hygiene."
            )

        }

    # --------------------------------------------------------
    # START WITH CURRENT RISK SCORE
    # --------------------------------------------------------

    try:

        risk_score = float(
            current_risk.get(
                "score",
                0
            )
        )

    except Exception:

        risk_score = 0

    # --------------------------------------------------------
    # ENVIRONMENTAL SCORE
    # --------------------------------------------------------

    environmental_score = 0

    factors = []

    # ========================================================
    # HUMIDITY
    # ========================================================

    try:

        humidity_value = float(
            humidity
        )

    except Exception:

        humidity_value = 0

    if humidity_value >= 80:

        environmental_score += 30

        factors.append(
            "High humidity may favor disease development"
        )

    elif humidity_value >= 65:

        environmental_score += 20

        factors.append(
            "Moderately high humidity may support disease spread"
        )

    elif humidity_value >= 50:

        environmental_score += 10

        factors.append(
            "Humidity provides some favorable conditions"
        )

    else:

        factors.append(
            "Lower humidity reduces favorable conditions"
        )

    # ========================================================
    # TEMPERATURE
    # ========================================================

    try:

        temperature_value = float(
            temperature
        )

    except Exception:

        temperature_value = 0

    if 20 <= temperature_value <= 30:

        environmental_score += 25

        factors.append(
            "Temperature is within a generally favorable range"
        )

    elif 15 <= temperature_value <= 35:

        environmental_score += 15

        factors.append(
            "Temperature may support disease activity"
        )

    else:

        environmental_score += 5

        factors.append(
            "Temperature is less favorable for disease activity"
        )

    # ========================================================
    # RAINFALL
    # ========================================================

    try:

        rainfall_value = float(
            rainfall
        )

    except Exception:

        rainfall_value = 0

    if rainfall_value >= 10:

        environmental_score += 25

        factors.append(
            "Recent rainfall can increase moisture-related disease risk"
        )

    elif rainfall_value > 0:

        environmental_score += 15

        factors.append(
            "Some rainfall may increase leaf and field moisture"
        )

    else:

        factors.append(
            "No significant rainfall reported"
        )

    # ========================================================
    # DISEASE TYPE ADJUSTMENT
    # ========================================================

    disease_adjustment = {

        "Fungal": 10,

        "Bacterial": 8,

        "Viral": 4,

        "Pest": 6,

        "Unknown": 3

    }

    environmental_score += disease_adjustment.get(
        disease_type,
        3
    )

    # ========================================================
    # COMBINE CURRENT RISK + ENVIRONMENT
    # ========================================================

    forecast_score = (
        (risk_score * 0.55) +
        (environmental_score * 0.45)
    )

    forecast_score = max(
        0,
        min(
            round(
                forecast_score
            ),
            100
        )
    )

    # ========================================================
    # FORECAST LEVEL
    # ========================================================

    if forecast_score >= 70:

        forecast_level = "HIGH"

        message = (
            "Current environmental conditions are favorable "
            "for disease development and spread."
        )

        recommendation = (
            "Monitor nearby plants closely and begin "
            "recommended preventive action promptly."
        )

    elif forecast_score >= 40:

        forecast_level = "MODERATE"

        message = (
            "Some environmental conditions may support "
            "disease development or spread."
        )

        recommendation = (
            "Increase crop monitoring and follow the "
            "recommended prevention measures."
        )

    else:

        forecast_level = "LOW"

        message = (
            "Current environmental conditions are less "
            "favorable for rapid disease spread."
        )

        recommendation = (
            "Continue regular monitoring and maintain "
            "good crop hygiene."
        )

    # ========================================================
    # RETURN FORECAST
    # ========================================================

    return {

        "level":
            forecast_level,

        "score":
            forecast_score,

        "period":
            "Next 3–5 days",

        "message":
            message,

        "factors":
            factors,

        "recommendation":
            recommendation

    }


# ============================================================
# HELPER - GET ENGLISH TEXT
# ============================================================

def get_english_text(value):
    """
    Convert treatment/disease information into a simple
    string suitable for storing in MySQL.
    """

    if isinstance(value, dict):

        return (
            value.get("english")
            or value.get("en")
            or ""
        )

    if value is None:

        return ""

    return str(value)


# ============================================================
# SAVE ANALYSIS TO MYSQL
# ============================================================

def save_analysis_to_database(
    crop,
    disease,
    confidence,
    location,
    temperature,
    humidity,
    rainfall,
    risk_level,
    disease_type,
    treatment,
    prevention,
    image_path
):
    """
    Save a completed crop analysis into MySQL.
    """

    connection = None
    cursor = None

    try:

        connection = get_connection()

        cursor = connection.cursor()

        query = """
            INSERT INTO analyses (
                crop,
                disease,
                confidence,
                location,
                temperature,
                humidity,
                rainfall,
                risk_level,
                disease_type,
                treatment,
                prevention,
                image_path
            )
            VALUES (
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s
            )
        """

        values = (
            crop,
            disease,
            confidence,
            location,
            temperature,
            humidity,
            rainfall,
            risk_level,
            disease_type,
            treatment,
            prevention,
            image_path
        )

        cursor.execute(
            query,
            values
        )

        connection.commit()

        print(
            "Analysis saved to MySQL successfully!"
        )

        return True

    except Exception as e:

        print(
            f"MySQL save error: {e}"
        )

        return False

    finally:

        if cursor:

            cursor.close()

        if connection:

            connection.close()


# ============================================================
# HOME
# ============================================================

@app.get("/")
def home():

    return {

        "message":
            "Crop Disease Detection API is running",

        "status":
            "success"

    }


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health():

    return {

        "status":
            "healthy",

        "model":
            "loaded",

        "weather":
            "live OpenWeatherMap",

        "gradcam":
            "enabled",

        "disease_information":
            "enabled",

        "spread_forecast":
            "enabled",

        "database":
            "MySQL"

    }


# ============================================================
# PREDICT DISEASE
# ============================================================

@app.post("/predict")
async def predict_disease_api(

    file: UploadFile = File(...),

    city: str = Form("Hyderabad")

):

    """
    Upload a crop leaf image and receive:

    - Disease
    - Confidence
    - Disease type
    - Crop
    - Disease name
    - Severity
    - Symptoms
    - Cause
    - Spread
    - Live weather
    - Risk level
    - Risk score
    - Risk reason
    - Treatment
    - Prevention
    - Grad-CAM explanation
    - Disease spread forecast

    The completed analysis is also saved to MySQL.
    """

    temp_path = None

    try:

        # ====================================================
        # 1. VALIDATE IMAGE
        # ====================================================

        if (
            not file.content_type
            or not file.content_type.startswith("image/")
        ):

            raise HTTPException(
                status_code=400,
                detail="Please upload a valid image file."
            )

        # ====================================================
        # 2. VALIDATE CITY
        # ====================================================

        city = city.strip()

        if not city:

            raise HTTPException(
                status_code=400,
                detail="Please enter a valid crop location."
            )

        # ====================================================
        # 3. SAVE IMAGE TEMPORARILY
        # ====================================================

        suffix = os.path.splitext(
            file.filename or ".jpg"
        )[1]

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=suffix
        ) as temp_file:

            contents = await file.read()

            temp_file.write(
                contents
            )

            temp_path = temp_file.name

        # ====================================================
        # 4. AI DISEASE PREDICTION
        # ====================================================

        prediction = predict_disease(
            temp_path
        )

        disease = prediction[
            "disease"
        ]

        confidence = prediction[
            "confidence"
        ]

        # ====================================================
        # 5. IDENTIFY DISEASE TYPE
        # ====================================================

        disease_type = get_disease_type(
            disease
        )

        # ====================================================
        # 6. GET DISEASE INFORMATION
        # ====================================================

        disease_information = (
            get_disease_information(
                disease
            )
        )

        # ====================================================
        # 7. GENERATE GRAD-CAM
        # ====================================================

        unique_id = uuid.uuid4().hex[:10]

        gradcam_filename = (
            f"gradcam_{unique_id}.jpg"
        )

        gradcam_path = os.path.join(
            GENERATED_DIR,
            gradcam_filename
        )

        create_gradcam_image(
            temp_path,
            gradcam_path
        )

        # ====================================================
        # 8. GET LIVE WEATHER
        # ====================================================

        weather = get_weather(
            city
        )

        temperature = weather[
            "temperature"
        ]

        humidity = weather[
            "humidity"
        ]

        rainfall = weather[
            "rainfall"
        ]

        # ====================================================
        # 9. CALCULATE DISEASE RISK
        # ====================================================

        risk = calculate_risk(

            disease_type,

            temperature,

            humidity,

            rainfall

        )

        # ====================================================
        # 10. CALCULATE DISEASE SPREAD FORECAST
        # ====================================================

        spread_forecast = calculate_spread_forecast(

            disease_type,

            temperature,

            humidity,

            rainfall,

            risk

        )

        # ====================================================
        # 11. GRAD-CAM URL
        # ====================================================

        gradcam_url = (
            f"/generated/{gradcam_filename}"
        )

        # ====================================================
        # 12. GET CROP NAME
        # ====================================================

        crop_information = disease_information.get(
            "crop",
            {}
        )

        crop_name = get_english_text(
            crop_information
        )

        if not crop_name:

            crop_name = "Unknown"

        # ====================================================
        # 13. GET TREATMENT / PREVENTION TEXT
        # ====================================================

        treatment_value = disease_information.get(
            "treatment",
            {}
        )

        prevention_value = disease_information.get(
            "prevention",
            {}
        )

        treatment_text = get_english_text(
            treatment_value
        )

        prevention_text = get_english_text(
            prevention_value
        )

        # ====================================================
        # 14. GET RISK LEVEL
        # ====================================================

        risk_level = risk.get(
            "level",
            "Unknown"
        )

        # ====================================================
        # 15. SAVE ANALYSIS TO MYSQL
        # ====================================================

        database_saved = save_analysis_to_database(

            crop=crop_name,

            disease=disease,

            confidence=round(
                confidence,
                2
            ),

            location=city,

            temperature=temperature,

            humidity=humidity,

            rainfall=rainfall,

            risk_level=risk_level,

            disease_type=disease_type,

            treatment=treatment_text,

            prevention=prevention_text,

            image_path=gradcam_url

        )

        # ====================================================
        # 16. RETURN COMPLETE RESULT
        # ====================================================

        return {

            "success":
                True,

            "database_saved":
                database_saved,

            # ------------------------------------------------
            # IMAGE
            # ------------------------------------------------

            "filename":
                file.filename,

            # ------------------------------------------------
            # DISEASE
            # ------------------------------------------------

            "disease":
                disease,

            "confidence":
                round(
                    confidence,
                    2
                ),

            "disease_type":
                disease_type,

            # ------------------------------------------------
            # DISEASE INFORMATION
            # ------------------------------------------------

            "disease_info": {

                "crop":
                    disease_information.get(
                        "crop",
                        {}
                    ),

                "disease_name":
                    disease_information.get(
                        "disease_name",
                        {}
                    ),

                "severity":
                    disease_information.get(
                        "severity",
                        "Unknown"
                    ),

                "symptoms":
                    disease_information.get(
                        "symptoms",
                        {}
                    ),

                "cause":
                    disease_information.get(
                        "cause",
                        {}
                    ),

                "spread":
                    disease_information.get(
                        "spread",
                        {}
                    )

            },

            # ------------------------------------------------
            # WEATHER
            # ------------------------------------------------

            "weather": {

                "city":
                    weather.get(
                        "city",
                        city
                    ),

                "temperature":
                    temperature,

                "humidity":
                    humidity,

                "rainfall":
                    rainfall

            },

            # ------------------------------------------------
            # RISK
            # ------------------------------------------------

            "risk": {

                "level":
                    risk.get(
                        "level",
                        "Unknown"
                    ),

                "score":
                    risk.get(
                        "score",
                        0
                    ),

                "reason":
                    risk.get(
                        "reason",
                        "Risk assessment unavailable."
                    )

            },

            # ------------------------------------------------
            # DISEASE SPREAD FORECAST
            # ------------------------------------------------

            "spread_forecast": {

                "level":
                    spread_forecast.get(
                        "level",
                        "Unknown"
                    ),

                "score":
                    spread_forecast.get(
                        "score",
                        0
                    ),

                "period":
                    spread_forecast.get(
                        "period",
                        "Next 3–5 days"
                    ),

                "message":
                    spread_forecast.get(
                        "message",
                        ""
                    ),

                "factors":
                    spread_forecast.get(
                        "factors",
                        []
                    ),

                "recommendation":
                    spread_forecast.get(
                        "recommendation",
                        ""
                    )

            },

            # ------------------------------------------------
            # TREATMENT
            # ------------------------------------------------

            "treatment":
                treatment_value,

            # ------------------------------------------------
            # PREVENTION
            # ------------------------------------------------

            "prevention":
                prevention_value,

            # ------------------------------------------------
            # GRAD-CAM
            # ------------------------------------------------

            "gradcam":
                gradcam_url

        }

    # ========================================================
    # HTTP EXCEPTION
    # ========================================================

    except HTTPException:

        raise

    # ========================================================
    # OTHER ERRORS
    # ========================================================

    except Exception as e:

        print(
            f"Prediction error: {e}"
        )

        raise HTTPException(

            status_code=500,

            detail=
                f"Prediction failed: {str(e)}"

        )

    # ========================================================
    # CLEANUP TEMPORARY IMAGE
    # ========================================================

    finally:

        if (
            temp_path
            and os.path.exists(temp_path)
        ):

            try:

                os.remove(
                    temp_path
                )

            except Exception:

                pass


# ============================================================
# GET ANALYSIS HISTORY FROM MYSQL
# ============================================================

@app.get("/history")
def get_analysis_history():

    """
    Return previous crop analyses stored in MySQL.
    """

    connection = None
    cursor = None

    try:

        connection = get_connection()

        cursor = connection.cursor(
            dictionary=True
        )

        query = """
            SELECT
                id,
                crop,
                disease,
                confidence,
                location,
                temperature,
                humidity,
                rainfall,
                risk_level,
                disease_type,
                treatment,
                prevention,
                image_path,
                created_at
            FROM analyses
            ORDER BY created_at DESC
        """

        cursor.execute(
            query
        )

        rows = cursor.fetchall()

        # Convert datetime values to strings
        for row in rows:

            if row.get("created_at"):

                row["created_at"] = (
                    row["created_at"].isoformat()
                )

        return {

            "success":
                True,

            "count":
                len(rows),

            "history":
                rows

        }

    except Exception as e:

        print(
            f"MySQL history error: {e}"
        )

        raise HTTPException(

            status_code=500,

            detail=
                f"Could not fetch analysis history: {str(e)}"

        )

    finally:

        if cursor:

            cursor.close()

        if connection:

            connection.close()