import os
import json
import numpy as np
import tensorflow as tf

from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

from sklearn.metrics import (
    classification_report,
    confusion_matrix,
    accuracy_score
)

import matplotlib.pyplot as plt


# ============================================================
# 1. PROJECT PATHS
# ============================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

TEST_DIR = os.path.join(
    BASE_DIR,
    "data",
    "PlantVillageDataset",
    "train_val_test",
    "test"
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "crop_disease_model.keras"
)

CLASS_NAMES_PATH = os.path.join(
    BASE_DIR,
    "class_names.json"
)


# ============================================================
# 2. CHECK FILES
# ============================================================

print("\n========================================")
print(" CROP DISEASE MODEL EVALUATION")
print("========================================\n")

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(
        f"Model not found:\n{MODEL_PATH}"
    )

if not os.path.exists(TEST_DIR):
    raise FileNotFoundError(
        f"Test dataset not found:\n{TEST_DIR}"
    )


# ============================================================
# 3. LOAD MODEL
# ============================================================

print("Loading trained model...")

model = tf.keras.models.load_model(
    MODEL_PATH
)

print("Model loaded successfully!")


# ============================================================
# 4. LOAD CLASS NAMES
# ============================================================

with open(
    CLASS_NAMES_PATH,
    "r",
    encoding="utf-8"
) as file:

    class_names_dict = json.load(file)


# Convert JSON mapping to ordered list

class_names = [
    class_names_dict[str(i)]
    for i in range(len(class_names_dict))
]


print("\nClasses:")

for i, name in enumerate(class_names):

    print(
        f"{i} -> {name}"
    )


# ============================================================
# 5. LOAD TEST DATA
# ============================================================

test_datagen = ImageDataGenerator(
    preprocessing_function=preprocess_input
)


test_generator = test_datagen.flow_from_directory(

    TEST_DIR,

    target_size=(224, 224),

    batch_size=32,

    class_mode="categorical",

    shuffle=False
)


print("\n========================================")
print(" TEST DATASET")
print("========================================")

print(
    "Test images:",
    test_generator.samples
)

print(
    "Number of classes:",
    len(test_generator.class_indices)
)


# ============================================================
# 6. EVALUATE MODEL
# ============================================================

print("\n========================================")
print(" EVALUATING MODEL")
print("========================================\n")


test_loss, test_accuracy = model.evaluate(
    test_generator,
    verbose=1
)


# ============================================================
# 7. MODEL ACCURACY
# ============================================================

print("\n========================================")
print(" MODEL PERFORMANCE")
print("========================================")

print(
    f"Test Loss: {test_loss:.4f}"
)

print(
    f"Test Accuracy: {test_accuracy * 100:.2f}%"
)


# ============================================================
# 8. GET PREDICTIONS
# ============================================================

print("\nGenerating predictions...")

predictions = model.predict(
    test_generator,
    verbose=1
)


predicted_classes = np.argmax(
    predictions,
    axis=1
)


true_classes = test_generator.classes


# ============================================================
# 9. ACCURACY CHECK
# ============================================================

accuracy = accuracy_score(
    true_classes,
    predicted_classes
)


print("\nAccuracy using predictions:")

print(
    f"{accuracy * 100:.2f}%"
)


# ============================================================
# 10. CLASSIFICATION REPORT
# ============================================================

print("\n========================================")
print(" CLASSIFICATION REPORT")
print("========================================\n")


report = classification_report(

    true_classes,

    predicted_classes,

    target_names=class_names,

    digits=4

)


print(report)


# ============================================================
# 11. CONFUSION MATRIX
# ============================================================

print("\n========================================")
print(" CONFUSION MATRIX")
print("========================================\n")


cm = confusion_matrix(
    true_classes,
    predicted_classes
)


print(cm)


# ============================================================
# 12. SAVE CONFUSION MATRIX
# ============================================================

plt.figure(
    figsize=(10, 8)
)

plt.imshow(
    cm,
    interpolation="nearest"
)

plt.title(
    "Crop Disease Classification - Confusion Matrix"
)

plt.colorbar()

tick_marks = np.arange(
    len(class_names)
)

plt.xticks(
    tick_marks,
    class_names,
    rotation=90
)

plt.yticks(
    tick_marks,
    class_names
)

plt.xlabel(
    "Predicted Class"
)

plt.ylabel(
    "True Class"
)

plt.tight_layout()


CONFUSION_MATRIX_PATH = os.path.join(
    BASE_DIR,
    "confusion_matrix.png"
)


plt.savefig(
    CONFUSION_MATRIX_PATH,
    dpi=300,
    bbox_inches="tight"
)

plt.close()


# ============================================================
# 13. FINAL RESULTS
# ============================================================

print("\n========================================")
print(" FINAL RESULTS")
print("========================================")

print(
    f"Test Accuracy : {test_accuracy * 100:.2f}%"
)

print(
    f"Test Images   : {test_generator.samples}"
)

print(
    f"Classes       : {len(class_names)}"
)

print("\nConfusion matrix saved to:")

print(
    CONFUSION_MATRIX_PATH
)

print("\n========================================")
print(" EVALUATION COMPLETE")
print("========================================")