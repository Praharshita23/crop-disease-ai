import os
import requests
from dotenv import load_dotenv


# ============================================================
# LOAD ENVIRONMENT VARIABLES
# ============================================================

load_dotenv()

API_KEY = os.getenv("OPENWEATHER_API_KEY")


# ============================================================
# GET LIVE WEATHER
# ============================================================

def get_weather(city):
    """
    Get current weather for a city using OpenWeatherMap.
    """

    if not API_KEY:
        raise Exception(
            "OPENWEATHER_API_KEY is not configured in .env"
        )

    url = "https://api.openweathermap.org/data/2.5/weather"

    params = {
        "q": city,
        "appid": API_KEY,
        "units": "metric"
    }

    try:

        response = requests.get(
            url,
            params=params,
            timeout=10
        )

    except requests.RequestException as error:

        raise Exception(
            f"Unable to connect to weather service: {error}"
        )

    # --------------------------------------------------------
    # CHECK API RESPONSE
    # --------------------------------------------------------

    if response.status_code != 200:

        raise Exception(
            f"Weather API error: "
            f"{response.status_code} - {response.text}"
        )

    data = response.json()

    # --------------------------------------------------------
    # EXTRACT WEATHER DATA
    # --------------------------------------------------------

    temperature = data["main"]["temp"]

    humidity = data["main"]["humidity"]

    rainfall = data.get("rain", {}).get("1h", 0)

    actual_city = data.get("name", city)

    # --------------------------------------------------------
    # RETURN WEATHER INFORMATION
    # --------------------------------------------------------

    return {
        "city": actual_city,
        "temperature": temperature,
        "humidity": humidity,
        "rainfall": rainfall
    }


# ============================================================
# DEMO WEATHER
# ============================================================

def get_demo_weather(city):
    """
    Temporary demo weather data.
    Used only for development/testing.
    """

    return {
        "city": city,
        "temperature": 28,
        "humidity": 85,
        "rainfall": 12
    }