# ============================================================
# CROP DISEASE RISK ASSESSMENT
# ============================================================


def calculate_risk(disease_type, temperature, humidity, rainfall):
    """
    Calculate disease spread risk using simple rule-based logic.

    This is NOT another ML model.
    It combines:
        - Disease type
        - Temperature
        - Humidity
        - Rainfall

    Returns:
        risk_level
        score
        reason
    """

    # --------------------------------------------------------
    # Initial score
    # --------------------------------------------------------

    score = 0
    reasons = []

    # Make disease type safe
    disease_type = str(disease_type).lower()

    # --------------------------------------------------------
    # 1. Humidity
    # --------------------------------------------------------

    if humidity >= 80:
        score += 3
        reasons.append("High humidity")

    elif humidity >= 60:
        score += 2
        reasons.append("Moderate humidity")

    else:
        score += 0

    # --------------------------------------------------------
    # 2. Rainfall
    # --------------------------------------------------------

    if rainfall >= 10:
        score += 3
        reasons.append("Heavy rainfall")

    elif rainfall >= 5:
        score += 2
        reasons.append("Moderate rainfall")

    # --------------------------------------------------------
    # 3. Temperature
    # --------------------------------------------------------

    if 20 <= temperature <= 30:
        score += 2
        reasons.append(
            "Temperature is favorable for disease activity"
        )

    elif 15 <= temperature <= 35:
        score += 1
        reasons.append(
            "Temperature may support disease activity"
        )

    # --------------------------------------------------------
    # 4. Disease type
    # --------------------------------------------------------

    if disease_type == "fungal":

        score += 2

        reasons.append(
            "Fungal diseases can increase under humid conditions"
        )

    elif disease_type == "bacterial":

        score += 1

        reasons.append(
            "Bacterial diseases can spread under favorable moisture conditions"
        )

    elif disease_type == "viral":

        score += 1

        reasons.append(
            "Viral diseases can spread through infected plants and vectors"
        )

    # --------------------------------------------------------
    # 5. Determine risk level
    # --------------------------------------------------------

    if score >= 8:
        risk_level = "HIGH"

    elif score >= 4:
        risk_level = "MEDIUM"

    else:
        risk_level = "LOW"

    # --------------------------------------------------------
    # 6. Create explanation
    # --------------------------------------------------------

    if reasons:
        reason = "; ".join(reasons)
    else:
        reason = "Current environmental conditions indicate low disease risk"

    # --------------------------------------------------------
    # 7. Return complete result
    # --------------------------------------------------------

    return {
        "level": risk_level,
        "score": score,
        "reason": reason
    }


# ============================================================
# TEST
# ============================================================

if __name__ == "__main__":

    result = calculate_risk(
        "Fungal",
        28,
        85,
        12
    )

    print("\n========================================")
    print("        DISEASE RISK ASSESSMENT")
    print("========================================")

    print("Risk Level:", result["level"])
    print("Risk Score:", result["score"])
    print("Reason:", result["reason"])

    print("========================================")