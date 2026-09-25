import os
import json
import numpy as np
import tensorflow as tf

from tensorflow.keras.utils import load_img, img_to_array
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input


# ============================================================
# 1. PROJECT PATHS
# ============================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "crop_disease_model.keras"
)

CLASS_NAMES_PATH = os.path.join(
    BASE_DIR,
    "class_names.json"
)


# ============================================================
# 2. CHECK REQUIRED FILES
# ============================================================

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(
        f"Model not found:\n{MODEL_PATH}"
    )

if not os.path.exists(CLASS_NAMES_PATH):
    raise FileNotFoundError(
        f"Class names file not found:\n{CLASS_NAMES_PATH}"
    )


# ============================================================
# 3. LOAD MODEL
# ============================================================

print("\nLoading crop disease model...")

model = tf.keras.models.load_model(
    MODEL_PATH,
    compile=False
)

print("Crop disease model loaded successfully!")


# ============================================================
# 4. LOAD CLASS NAMES
# ============================================================

with open(CLASS_NAMES_PATH, "r", encoding="utf-8") as file:
    class_names = json.load(file)

print("Class names loaded successfully!")


# ============================================================
# 5. PREDICTION FUNCTION
# ============================================================

def predict_disease(image_path):
    """
    Predict crop disease from an image.

    Parameters:
        image_path (str): Path to the crop leaf image.

    Returns:
        dict:
            {
                "disease": predicted disease name,
                "confidence": confidence percentage
            }
    """

    # --------------------------------------------------------
    # Check image exists
    # --------------------------------------------------------

    if not os.path.exists(image_path):
        raise FileNotFoundError(
            f"Image not found:\n{image_path}"
        )

    # --------------------------------------------------------
    # Load image
    # --------------------------------------------------------

    image = load_img(
        image_path,
        target_size=(224, 224)
    )

    # --------------------------------------------------------
    # Convert image to array
    # --------------------------------------------------------

    image_array = img_to_array(image)

    # --------------------------------------------------------
    # Add batch dimension
    # --------------------------------------------------------

    image_array = np.expand_dims(
        image_array,
        axis=0
    )

    # --------------------------------------------------------
    # MobileNetV2 preprocessing
    # --------------------------------------------------------

    image_array = preprocess_input(
        image_array
    )

    # --------------------------------------------------------
    # Make prediction
    # --------------------------------------------------------

    predictions = model.predict(
        image_array,
        verbose=0
    )

    # --------------------------------------------------------
    # Find highest probability class
    # --------------------------------------------------------

    predicted_index = int(
        np.argmax(predictions[0])
    )

    # --------------------------------------------------------
    # Calculate confidence
    # --------------------------------------------------------

    confidence = float(
        predictions[0][predicted_index] * 100
    )

    # --------------------------------------------------------
    # Get disease name
    # --------------------------------------------------------

    predicted_class = class_names[
        str(predicted_index)
    ]

    # --------------------------------------------------------
    # Return result
    # --------------------------------------------------------

    return {
        "disease": predicted_class,
        "confidence": confidence
    }


# ============================================================
# 6. STANDALONE TEST
# ============================================================

if __name__ == "__main__":

    IMAGE_DIR = os.path.join(
        BASE_DIR,
        "data",
        "PlantVillageDataset",
        "train_val_test",
        "test",
        "Pepper__bell___Bacterial_spot"
    )

    if not os.path.exists(IMAGE_DIR):
        raise FileNotFoundError(
            f"Test image folder not found:\n{IMAGE_DIR}"
        )

    # Find images
    image_files = [
        file_name
        for file_name in os.listdir(IMAGE_DIR)
        if file_name.lower().endswith(
            (".jpg", ".jpeg", ".png")
        )
    ]

    if not image_files:
        raise FileNotFoundError(
            "No test images found."
        )

    # Select first image
    image_name = image_files[0]

    image_path = os.path.join(
        IMAGE_DIR,
        image_name
    )

    print("\n========================================")
    print("       CROP DISEASE PREDICTION")
    print("========================================")

    print(f"Image: {image_name}")

    # Run prediction
    result = predict_disease(image_path)

    print(
        f"Predicted Class: {result['disease']}"
    )

    print(
        f"Confidence: {result['confidence']:.2f}%"
    )

    print("========================================")