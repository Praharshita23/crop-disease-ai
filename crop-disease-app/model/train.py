import os
import json
import numpy as np
import tensorflow as tf

from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras import layers, models
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint


# ============================================================
# 1. PROJECT PATHS
# ============================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

TRAIN_DIR = os.path.join(
    BASE_DIR,
    "data",
    "PlantVillageDataset",
    "train_val_test",
    "train"
)

VAL_DIR = os.path.join(
    BASE_DIR,
    "data",
    "PlantVillageDataset",
    "train_val_test",
    "val"
)

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
# 2. SETTINGS
# ============================================================

IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 10


print("\n========================================")
print(" AI CROP DISEASE CLASSIFICATION")
print("========================================\n")

print("Training directory:", TRAIN_DIR)
print("Validation directory:", VAL_DIR)
print("Test directory:", TEST_DIR)


# ============================================================
# 3. DATA AUGMENTATION
# ============================================================

train_datagen = ImageDataGenerator(
    preprocessing_function=preprocess_input,
    rotation_range=20,
    width_shift_range=0.1,
    height_shift_range=0.1,
    zoom_range=0.15,
    horizontal_flip=True
)

val_test_datagen = ImageDataGenerator(
    preprocessing_function=preprocess_input
)


# ============================================================
# 4. LOAD DATASETS
# ============================================================

print("\nLoading training images...")

train_generator = train_datagen.flow_from_directory(
    TRAIN_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode="categorical",
    shuffle=True
)

print("\nLoading validation images...")

val_generator = val_test_datagen.flow_from_directory(
    VAL_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode="categorical",
    shuffle=False
)

print("\nLoading test images...")

test_generator = val_test_datagen.flow_from_directory(
    TEST_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode="categorical",
    shuffle=False
)


# ============================================================
# 5. DISPLAY DATASET INFORMATION
# ============================================================

num_classes = len(train_generator.class_indices)

print("\n========================================")
print("DATASET INFORMATION")
print("========================================")

print("Number of classes:", num_classes)
print("Training images:", train_generator.samples)
print("Validation images:", val_generator.samples)
print("Test images:", test_generator.samples)

print("\nClass mapping:")

for class_name, class_index in train_generator.class_indices.items():
    print(class_index, "->", class_name)


# ============================================================
# 6. SAVE CLASS NAMES
# ============================================================

class_names = {
    str(index): class_name
    for class_name, index in train_generator.class_indices.items()
}

with open(CLASS_NAMES_PATH, "w") as file:
    json.dump(class_names, file, indent=4)

print("\nClass names saved to:")
print(CLASS_NAMES_PATH)


# ============================================================
# 7. CALCULATE CLASS WEIGHTS
# ============================================================

print("\nCalculating class weights...")

class_counts = np.bincount(
    train_generator.classes,
    minlength=num_classes
)

total_samples = np.sum(class_counts)

class_weights = {}

for class_index in range(num_classes):
    if class_counts[class_index] > 0:
        class_weights[class_index] = (
            total_samples /
            (num_classes * class_counts[class_index])
        )

print("\nClass weights:")

for class_index, weight in class_weights.items():
    print(
        f"{class_index}: "
        f"{class_names[str(class_index)]} "
        f"-> {weight:.2f}"
    )


# ============================================================
# 8. LOAD PRETRAINED MOBILENETV2
# ============================================================

print("\nLoading MobileNetV2...")

base_model = MobileNetV2(
    weights="imagenet",
    include_top=False,
    input_shape=(224, 224, 3)
)

# Freeze the pretrained layers
base_model.trainable = False


# ============================================================
# 9. BUILD OUR CLASSIFICATION MODEL
# ============================================================

model = models.Sequential([
    base_model,

    layers.GlobalAveragePooling2D(),

    layers.Dense(
        128,
        activation="relu"
    ),

    layers.Dropout(0.3),

    layers.Dense(
        num_classes,
        activation="softmax"
    )
])


# ============================================================
# 10. COMPILE MODEL
# ============================================================

model.compile(
    optimizer=tf.keras.optimizers.Adam(
        learning_rate=0.0001
    ),
    loss="categorical_crossentropy",
    metrics=["accuracy"]
)


# ============================================================
# 11. DISPLAY MODEL
# ============================================================

print("\n========================================")
print("MODEL SUMMARY")
print("========================================\n")

model.summary()


# ============================================================
# 12. CALLBACKS
# ============================================================

early_stopping = EarlyStopping(
    monitor="val_loss",
    patience=3,
    restore_best_weights=True
)

model_checkpoint = ModelCheckpoint(
    MODEL_PATH,
    monitor="val_accuracy",
    save_best_only=True,
    verbose=1
)


# ============================================================
# 13. TRAIN MODEL
# ============================================================

print("\n========================================")
print("STARTING TRAINING")
print("========================================\n")

history = model.fit(
    train_generator,
    validation_data=val_generator,
    epochs=EPOCHS,
    class_weight=class_weights,
    callbacks=[
        early_stopping,
        model_checkpoint
    ]
)


# ============================================================
# 14. TEST MODEL
# ============================================================

print("\n========================================")
print("EVALUATING MODEL ON TEST DATA")
print("========================================\n")

test_loss, test_accuracy = model.evaluate(
    test_generator
)

print("\nTest Loss:", test_loss)
print("Test Accuracy:", test_accuracy)


# ============================================================
# 15. SAVE FINAL MODEL
# ============================================================

model.save(MODEL_PATH)

print("\n========================================")
print("TRAINING COMPLETE")
print("========================================")

print("\nModel saved to:")
print(MODEL_PATH)

print("\nClass mapping saved to:")
print(CLASS_NAMES_PATH)

print("\nFinal Test Accuracy:")
print(f"{test_accuracy * 100:.2f}%")

print("\n========================================")
print("DONE!")
print("========================================")