import os
import numpy as np
import tensorflow as tf

from tensorflow.keras.models import load_model
from PIL import Image


# ============================================================
# MODEL PATH
# ============================================================

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "model",
    "crop_disease_model.keras"
)


# ============================================================
# LOAD MODEL
# ============================================================

model = load_model(
    MODEL_PATH,
    compile=False
)

print("Grad-CAM model loaded successfully!")


# ============================================================
# FIND MOBILENETV2 BASE MODEL
# ============================================================

base_model = None

for layer in model.layers:

    if isinstance(layer, tf.keras.Model):

        if "mobilenetv2" in layer.name.lower():

            base_model = layer
            break


if base_model is None:

    raise ValueError(
        "MobileNetV2 base model could not be found."
    )


print(
    "Base model found:",
    base_model.name
)


# ============================================================
# FIND LAST CONVOLUTIONAL LAYER
# ============================================================

target_layer = None

for layer in reversed(base_model.layers):

    if isinstance(
        layer,
        tf.keras.layers.Conv2D
    ):

        target_layer = layer
        break


if target_layer is None:

    raise ValueError(
        "Could not find a Conv2D layer."
    )


print(
    "Grad-CAM target layer:",
    target_layer.name
)


# ============================================================
# CREATE BASE MODEL FOR GRAD-CAM
# ============================================================

activation_model = tf.keras.Model(
    inputs=base_model.input,
    outputs=[
        target_layer.output,
        base_model.output
    ]
)


# ============================================================
# GET CLASSIFICATION HEAD
# ============================================================

# The output of MobileNetV2 is passed through the remaining
# layers of the original model.

head_layers = []

found_base = False

for layer in model.layers:

    if found_base:

        head_layers.append(layer)

    if layer is base_model:

        found_base = True


print("\nGrad-CAM head layers:")

for layer in head_layers:

    print(
        layer.name,
        "->",
        layer.__class__.__name__
    )


# ============================================================
# CREATE GRAD-CAM IMAGE
# ============================================================

def create_gradcam_image(
    image_path,
    output_path
):

    # ========================================================
    # 1. LOAD ORIGINAL IMAGE
    # ========================================================

    original_image = Image.open(
        image_path
    ).convert("RGB")


    # ========================================================
    # 2. MODEL INPUT SIZE
    # ========================================================

    input_shape = model.input_shape

    height = input_shape[1]
    width = input_shape[2]


    if height is None or width is None:

        raise ValueError(
            "Could not determine model input size."
        )


    # ========================================================
    # 3. RESIZE IMAGE
    # ========================================================

    resized_image = original_image.resize(
        (width, height)
    )


    # ========================================================
    # 4. CONVERT TO NUMPY
    # ========================================================

    img_array = np.array(
        resized_image
    ).astype(
        np.float32
    )


    # ========================================================
    # 5. NORMALIZE
    # ========================================================

    img_array = img_array / 255.0


    # ========================================================
    # 6. ADD BATCH DIMENSION
    # ========================================================

    img_array = np.expand_dims(
        img_array,
        axis=0
    )


    # Convert to TensorFlow tensor

    input_tensor = tf.convert_to_tensor(
        img_array,
        dtype=tf.float32
    )


    # ========================================================
    # 7. GRADIENT TAPE
    # ========================================================

    with tf.GradientTape() as tape:

        # ----------------------------------------------------
        # Get activation maps from MobileNetV2
        # ----------------------------------------------------

        conv_outputs, base_output = activation_model(
            input_tensor,
            training=False
        )


        # ----------------------------------------------------
        # Pass MobileNetV2 output through original head
        # ----------------------------------------------------

        predictions = base_output

        for layer in head_layers:

            predictions = layer(
                predictions,
                training=False
            )


        # ----------------------------------------------------
        # Get predicted class
        # ----------------------------------------------------

        predicted_index = tf.argmax(
            predictions[0]
        )


        # ----------------------------------------------------
        # Get score for predicted class
        # ----------------------------------------------------

        class_score = predictions[
            0,
            predicted_index
        ]


    # ========================================================
    # 8. CALCULATE GRADIENTS
    # ========================================================

    gradients = tape.gradient(
        class_score,
        conv_outputs
    )


    if gradients is None:

        raise ValueError(
            "Could not calculate Grad-CAM gradients."
        )


    # ========================================================
    # 9. GLOBAL AVERAGE POOLING
    # ========================================================

    pooled_gradients = tf.reduce_mean(
        gradients,
        axis=(0, 1, 2)
    )


    # ========================================================
    # 10. REMOVE BATCH DIMENSION
    # ========================================================

    conv_outputs = conv_outputs[0]


    # ========================================================
    # 11. WEIGHT FEATURE MAPS
    # ========================================================

    heatmap = tf.reduce_sum(
        conv_outputs * pooled_gradients,
        axis=-1
    )


    # ========================================================
    # 12. RELU
    # ========================================================

    heatmap = tf.maximum(
        heatmap,
        0
    )


    # ========================================================
    # 13. NORMALIZE
    # ========================================================

    max_value = tf.reduce_max(
        heatmap
    )


    if float(max_value) > 0:

        heatmap = (
            heatmap / max_value
        )


    heatmap = heatmap.numpy()


    # ========================================================
    # 14. CONVERT HEATMAP TO IMAGE
    # ========================================================

    heatmap_image = Image.fromarray(
        np.uint8(
            heatmap * 255
        )
    )


    # ========================================================
    # 15. RESIZE HEATMAP
    # ========================================================

    heatmap_image = heatmap_image.resize(
        original_image.size
    )


    # ========================================================
    # 16. CREATE COLORED HEATMAP
    # ========================================================

    heatmap_array = np.array(
        heatmap_image
    )


    colored_heatmap = np.zeros(
        (
            heatmap_array.shape[0],
            heatmap_array.shape[1],
            3
        ),
        dtype=np.uint8
    )


    # Red

    colored_heatmap[:, :, 0] = (
        heatmap_array
    )


    # Green

    colored_heatmap[:, :, 1] = (
        heatmap_array // 3
    )


    # Blue

    colored_heatmap[:, :, 2] = 0


    colored_heatmap = Image.fromarray(
        colored_heatmap
    )


    # ========================================================
    # 17. BLEND ORIGINAL + HEATMAP
    # ========================================================

    overlay = Image.blend(
        original_image,
        colored_heatmap,
        alpha=0.45
    )


    # ========================================================
    # 18. CREATE OUTPUT DIRECTORY
    # ========================================================

    output_directory = os.path.dirname(
        output_path
    )


    os.makedirs(
        output_directory,
        exist_ok=True
    )


    # ========================================================
    # 19. SAVE
    # ========================================================

    overlay.save(
        output_path,
        format="JPEG",
        quality=95
    )


    # ========================================================
    # 20. SUCCESS
    # ========================================================

    print(
        "Grad-CAM image saved:",
        output_path
    )


    return output_path