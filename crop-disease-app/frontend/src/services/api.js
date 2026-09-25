const API_URL = "http://127.0.0.1:8000";


// ============================================================
// PREDICT CROP DISEASE
// ============================================================

export const predictDisease = async (
  imageFile,
  city
) => {

  // ----------------------------------------------------------
  // Validate image
  // ----------------------------------------------------------

  if (!imageFile) {
    throw new Error(
      "Please select an image first."
    );
  }


  // ----------------------------------------------------------
  // Validate city
  // ----------------------------------------------------------

  if (!city || !city.trim()) {
    throw new Error(
      "Please enter the crop location."
    );
  }


  // ----------------------------------------------------------
  // Create form data
  // ----------------------------------------------------------

  const formData = new FormData();


  // Add crop image
  formData.append(
    "file",
    imageFile
  );


  // Add crop location
  formData.append(
    "city",
    city.trim()
  );


  // ----------------------------------------------------------
  // Debug information
  // ----------------------------------------------------------

  console.log(
    "Sending crop image:",
    imageFile.name
  );

  console.log(
    "Sending city:",
    city.trim()
  );


  try {

    // --------------------------------------------------------
    // Send request to FastAPI
    // --------------------------------------------------------

    const response = await fetch(
      `${API_URL}/predict`,
      {
        method: "POST",
        body: formData,
      }
    );


    // --------------------------------------------------------
    // Read response
    // --------------------------------------------------------

    let data;

    try {

      data =
        await response.json();

    } catch (jsonError) {

      console.error(
        "Could not parse backend response:",
        jsonError
      );

      throw new Error(
        "Invalid response received from the backend."
      );

    }


    // --------------------------------------------------------
    // Handle HTTP errors
    // --------------------------------------------------------

    if (!response.ok) {

      console.error(
        "Backend error:",
        data
      );

      throw new Error(
        data?.detail ||
        "Prediction failed. Please try again."
      );

    }


    // --------------------------------------------------------
    // Handle application-level errors
    // --------------------------------------------------------

    if (
      data?.success === false
    ) {

      throw new Error(
        data?.detail ||
        "Disease detection was unsuccessful."
      );

    }


    // --------------------------------------------------------
    // Debug response
    // --------------------------------------------------------

    console.log(
      "Prediction response:",
      data
    );


    // --------------------------------------------------------
    // Return result to App.js
    // --------------------------------------------------------

    return data;

  } catch (error) {

    console.error(
      "Prediction API Error:",
      error
    );


    throw new Error(
      error.message ||
      "Unable to connect to the CropCare AI backend."
    );

  }

};


// ============================================================
// BACKEND HEALTH CHECK
// ============================================================

export const checkBackendHealth =
  async () => {

    try {

      const response =
        await fetch(
          `${API_URL}/health`
        );


      if (!response.ok) {

        return false;

      }


      const data =
        await response.json();


      return (
        data?.status ===
        "healthy"
      );

    } catch (error) {

      console.error(
        "Backend health check failed:",
        error
      );

      return false;

    }

  };


// ============================================================
// GET API URL
// ============================================================

export const getApiUrl =
  () => {

    return API_URL;

  };
  // ============================================================
// GET ANALYSIS HISTORY FROM MYSQL
// ============================================================

export const getAnalysisHistory = async () => {

  try {

    const response = await fetch(
      `${API_URL}/history`
    );

    const data = await response.json();

    if (!response.ok) {

      throw new Error(
        data?.detail ||
        "Could not fetch analysis history."
      );

    }

    return data.history || [];

  } catch (error) {

    console.error(
      "History API Error:",
      error
    );

    throw new Error(
      error.message ||
      "Unable to fetch analysis history."
    );

  }

};