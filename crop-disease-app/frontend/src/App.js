import React, {
  useState,
  useEffect
} from "react";
import jsPDF from "jspdf";
import "./App.css";

import {
  predictDisease,
  getAnalysisHistory
} from "./services/api";


function App() {

  // ============================================================
  // IMAGE
  // ============================================================

  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);


  // ============================================================
  // LOCATION
  // ============================================================

  const [city, setCity] = useState("");


  // ============================================================
  // RESULT
  // ============================================================

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // ============================================================
  // LANGUAGE
  // ============================================================

  const [language, setLanguage] = useState("en");

  const isHindi = language === "hi";


  const toggleLanguage = () => {
    setLanguage(current =>
      current === "en" ? "hi" : "en"
    );
  };


  // ============================================================
  // HISTORY
  // ============================================================

  const [history, setHistory] = useState([]);

// ============================================================
// LOAD HISTORY FROM MYSQL
// ============================================================

// useEffect(() => {

//   const loadHistory = async () => {

//     try {

//       const data =
//         await getAnalysisHistory();

//       const formattedHistory =
//         data.map(item => ({

//           id: item.id,

//           date: item.created_at,

//           filename: "",

//           city: item.location,

//           disease: item.disease,

//           confidence: item.confidence,

//           disease_type: item.disease_type,

//           disease_info: null,

//           weather: {

//             city: item.location,

//             temperature: item.temperature,

//             humidity: item.humidity,

//             rainfall: item.rainfall

//           },

//           risk: {

//             level: item.risk_level,

//             score: 0,

//             reason: ""

//           },

//           spread_forecast: null,

//           treatment: {

//             english: item.treatment,

//             hindi: item.treatment

//           },

//           prevention: {

//             english: item.prevention,

//             hindi: item.prevention

//           },

//           gradcam: item.image_path || null,

//           image: null

//         }));

//       setHistory(formattedHistory);

//     } catch (error) {

//       console.error(
//         "Could not load history from MySQL:",
//         error
//       );

//   };

//   loadHistory();

// }, []);
// ============================================================
// LOAD HISTORY FROM MYSQL
// ============================================================

useEffect(() => {

  const loadHistory = async () => {

    try {

      const data = await getAnalysisHistory();

      const formattedHistory = data.map(item => ({

        id: item.id,

        date: item.created_at,

        filename: "",

        city: item.location,

        disease: item.disease,

        confidence: item.confidence,

        disease_type: item.disease_type,

        disease_info: null,

        weather: {

          city: item.location,

          temperature: item.temperature,

          humidity: item.humidity,

          rainfall: item.rainfall

        },

        risk: {

          level: item.risk_level,

          score: 0,

          reason: ""

        },

        spread_forecast: null,

        treatment: {

          english: item.treatment,

          hindi: item.treatment

        },

        prevention: {

          english: item.prevention,

          hindi: item.prevention

        },

        gradcam: item.image_path || null,

        image: null

      }));

      setHistory(formattedHistory);

    } catch (error) {

      console.error(
        "Could not load history from MySQL:",
        error
      );

    }

  };

  loadHistory();

}, []);

  // ============================================================
  // TRANSLATIONS
  // ============================================================

  const text = {

    // ==========================================================
    // ENGLISH
    // ==========================================================

    en: {

      welcome: "WELCOME TO",

      tagline:
        "Smarter Crop Care. Healthier Harvests.",

      welcomeDescription:
        "An AI-powered agricultural assistant that helps detect crop diseases early, assess disease risk, and provide practical treatment and prevention guidance.",

      getStarted: "Get Started",

      scroll: "Scroll to explore",

      headerDescription:
        "AI-powered crop disease detection and risk assessment",

      analysisLabel:
        "AI-POWERED CROP ANALYSIS",

      detectEarly:
        "Detect Crop Diseases Early",

      heroDescription:
        "Upload a photo of your crop leaf and let AI identify possible diseases, analyze environmental risk, and provide treatment guidance.",

      uploadTitle:
        "📷 Upload Crop Image",

      uploadDescription:
        "Upload a clear image of the affected crop leaf.",

      locationTitle:
        "📍 Crop Location",

      locationDescription:
        "Enter the city where the crop is located. Weather and disease risk will be calculated for this location.",

      cityPlaceholder:
        "Enter city name",

      locationExample:
        "Example: Hyderabad, Delhi, Mumbai, Warangal",

      chooseImage:
        "Choose a leaf image",

      imageFormat:
        "JPG, JPEG or PNG",

      imageSelected:
        "Image selected successfully ✓",

      changeImage:
        "Click to change image",

      selected:
        "Selected:",

      detectDisease:
        "🔍 Detect Disease",

      analyzingButton:
        "⏳ Analyzing...",

      processingTitle:
        "Analyzing your crop...",

      processingDescription:
        "Please wait while CropCare AI processes your image.",

      processingImage:
        "Processing crop image",

      runningAI:
        "Running AI disease detection",

      checkingWeather:
        "Checking environmental conditions",

      assessingRisk:
        "Assessing disease risk",

      analysis:
        "ANALYSIS",

      resultsTitle:
        "📊 Analysis Results",

      disease:
        "Disease",

      detectedDisease:
        "Detected disease",

      noAnalysis:
        "No analysis yet",

      uploadToBegin:
        "Upload an image to begin",

      confidence:
        "Confidence",

      modelConfidence:
        "Model confidence",

      weather:
        "Weather",

      temperatureHumidity:
        "Temperature / Humidity",

      riskLevel:
        "Risk Level",

      diseaseSpreadRisk:
        "Disease spread risk",


      // ----------------------------------------------------------
      // DISEASE SPREAD FORECAST
      // ----------------------------------------------------------

      spreadForecast:
        "Disease Spread Forecast",

      spreadForecastPeriod:
        "Next 3–5 Days",

      spreadForecastScore:
        "Forecast Score",

      spreadForecastMessage:
        "Current environmental conditions may influence disease development and spread.",

      spreadForecastFactors:
        "Environmental Factors",

      spreadForecastRecommendation:
        "Recommended Action",


      // ----------------------------------------------------------
      // DISEASE INFORMATION
      // ----------------------------------------------------------

      diseaseInformation:
        "🌱 Disease Information",

      crop:
        "Crop",

      diseaseName:
        "Disease Name",

      severity:
        "Severity",

      symptoms:
        "🔎 Symptoms",

      cause:
        "🧬 Cause",

      spread:
        "↗️ How It Spreads",


      // ----------------------------------------------------------
      // TREATMENT
      // ----------------------------------------------------------

      treatment:
        "💊 Treatment Advice",

      treatmentPlaceholder:
        "Disease treatment information will appear here after analysis.",

      prevention:
        "🛡️ Prevention Advice",

      preventionPlaceholder:
        "Prevention recommendations will appear here after analysis.",


      // ----------------------------------------------------------
      // RECOMMENDED ACTION
      // ----------------------------------------------------------

      recommendedAction:
        "RECOMMENDED ACTION",

      whatShouldYouDo:
        "🌾 What Should You Do?",

      recommendedActionDescription:
        "Practical next steps based on the detected disease and current risk conditions.",

      healthyAction1:
        "Continue regular crop monitoring.",

      healthyAction2:
        "Maintain proper irrigation and field hygiene.",

      healthyAction3:
        "Monitor nearby plants for early symptoms.",

      action1:
        "Remove and safely dispose of severely infected plant material.",

      action2:
        "Monitor nearby plants regularly for signs of disease spread.",

      action3:
        "Maintain good field hygiene and remove infected debris.",

      action4:
        "Follow locally approved agricultural treatment recommendations for the detected disease.",

      action5:
        "Recheck the crop if symptoms increase or spread to additional plants.",

      actionNote:
        "AI results are intended as decision-support information. For severe crop damage, consult a qualified agricultural expert.",


      // ----------------------------------------------------------
      // WEATHER
      // ----------------------------------------------------------

      weatherLocation:
        "📍 Weather location:",

      rainfall:
        "🌧️ Rainfall:",


            // ----------------------------------------------------------
      // AGRICULTURAL EXPERT / HELP
      // ----------------------------------------------------------

      expertHelpTitle:
        "📍 Need Agricultural Expert Help?",

      expertHelpDescription:
        "Get agricultural support and find nearby services based on your crop location.",

      cropLocation:
        "Crop location:",

      findKVK:
        "Find Nearby KVK",

      findExpert:
        "Find Agricultural Experts",

      governmentSupport:
        "Government Agriculture Support",

      agroAdvisories:
        "View Agro-Advisories",

      openHelp:
        "Open",

      expertHelpNote:
        "For severe crop damage or uncertain diagnosis, consult a qualified agricultural expert.",


      // ----------------------------------------------------------
      // OTHER
      // ----------------------------------------------------------

      analyzeAnother:
        "🔄 Analyze Another Image",

      downloadPDF:
        "📄 Download PDF Report",

      footer:
        "CropCare AI • AI-powered agricultural decision support",

      invalidImage:
        "Please upload a JPG, JPEG or PNG image.",

      imageTooLarge:
        "Image size must be less than 10 MB.",

      selectImage:
        "Please select a crop image first.",

      selectCity:
        "Please enter the city where the crop is located.",

      predictionError:
        "Something went wrong while predicting.",

      explanationTitle:
        "Why did AI make this prediction?",

      explanationDescription:
        "The highlighted areas show the regions of the leaf that influenced the AI's prediction.",

      gradcamNote:
        "The heatmap helps explain which parts of the leaf the AI focused on during disease detection.",

      historyLabel:
        "PREVIOUS ANALYSIS",

      historyTitle:
        "📋 Analysis History",

      historyDescription:
        "Your previous crop analyses are stored here.",

      historyConfidence:
        "Confidence",

      historyRisk:
        "Risk",

      historyTemperature:
        "Temperature",

      historyClear:
        "Clear History",

      historyEmpty:
        "No previous analyses yet.",

      historyEmptyDescription:
        "Your completed crop analyses will appear here.",

      historyDate:
        "Analyzed on"

    },


    // ==========================================================
    // HINDI
    // ==========================================================

    hi: {

      welcome:
        "आपका स्वागत है",

      tagline:
        "बेहतर फसल देखभाल। स्वस्थ फसलें।",

      welcomeDescription:
        "एक AI-संचालित कृषि सहायक जो फसल रोगों की जल्दी पहचान करने, रोग के जोखिम का आकलन करने और उपचार एवं बचाव की उपयोगी सलाह देने में मदद करता है।",

      getStarted:
        "शुरू करें",

      scroll:
        "आगे देखने के लिए स्क्रॉल करें",

      headerDescription:
        "AI-संचालित फसल रोग पहचान और जोखिम आकलन",

      analysisLabel:
        "AI-संचालित फसल विश्लेषण",

      detectEarly:
        "फसल रोगों की जल्दी पहचान करें",

      heroDescription:
        "अपनी फसल की पत्ती की तस्वीर अपलोड करें और AI को संभावित रोग की पहचान करने, पर्यावरणीय जोखिम का विश्लेषण करने और उपचार की सलाह देने दें।",

      uploadTitle:
        "📷 फसल की तस्वीर अपलोड करें",

      uploadDescription:
        "प्रभावित फसल की पत्ती की एक साफ तस्वीर अपलोड करें।",

      locationTitle:
        "📍 फसल का स्थान",

      locationDescription:
        "उस शहर का नाम दर्ज करें जहाँ फसल स्थित है। मौसम और रोग का जोखिम इसी स्थान के आधार पर निर्धारित किया जाएगा।",

      cityPlaceholder:
        "शहर का नाम दर्ज करें",

      locationExample:
        "उदाहरण: हैदराबाद, दिल्ली, मुंबई, वारंगल",

      chooseImage:
        "पत्ती की तस्वीर चुनें",

      imageFormat:
        "JPG, JPEG या PNG",

      imageSelected:
        "तस्वीर सफलतापूर्वक चुनी गई ✓",

      changeImage:
        "तस्वीर बदलने के लिए क्लिक करें",

      selected:
        "चुनी गई तस्वीर:",

      detectDisease:
        "🔍 रोग की पहचान करें",

      analyzingButton:
        "⏳ विश्लेषण हो रहा है...",

      processingTitle:
        "आपकी फसल का विश्लेषण हो रहा है...",

      processingDescription:
        "कृपया प्रतीक्षा करें, CropCare AI आपकी तस्वीर का विश्लेषण कर रहा है।",

      processingImage:
        "फसल की तस्वीर प्रोसेस की जा रही है",

      runningAI:
        "AI द्वारा रोग की पहचान की जा रही है",

      checkingWeather:
        "पर्यावरणीय परिस्थितियों की जाँच की जा रही है",

      assessingRisk:
        "रोग के जोखिम का आकलन किया जा रहा है",

      analysis:
        "विश्लेषण",

      resultsTitle:
        "📊 विश्लेषण के परिणाम",

      disease:
        "रोग",

      detectedDisease:
        "पहचाना गया रोग",

      noAnalysis:
        "अभी कोई विश्लेषण नहीं",

      uploadToBegin:
        "शुरू करने के लिए तस्वीर अपलोड करें",

      confidence:
        "विश्वसनीयता",

      modelConfidence:
        "मॉडल की विश्वसनीयता",

      weather:
        "मौसम",

      temperatureHumidity:
        "तापमान / नमी",

      riskLevel:
        "जोखिम स्तर",

      diseaseSpreadRisk:
        "रोग फैलने का जोखिम",


      // ----------------------------------------------------------
      // DISEASE SPREAD FORECAST
      // ----------------------------------------------------------

      spreadForecast:
        "रोग फैलने का पूर्वानुमान",

      spreadForecastPeriod:
        "अगले 3–5 दिन",

      spreadForecastScore:
        "पूर्वानुमान स्कोर",

      spreadForecastMessage:
        "वर्तमान पर्यावरणीय परिस्थितियाँ रोग के विकास और फैलाव को प्रभावित कर सकती हैं।",

      spreadForecastFactors:
        "पर्यावरणीय कारक",

      spreadForecastRecommendation:
        "अनुशंसित कार्रवाई",


      // ----------------------------------------------------------
      // DISEASE INFORMATION
      // ----------------------------------------------------------

      diseaseInformation:
        "🌱 रोग की जानकारी",

      crop:
        "फसल",

      diseaseName:
        "रोग का नाम",

      severity:
        "गंभीरता",

      symptoms:
        "🔎 लक्षण",

      cause:
        "🧬 कारण",

      spread:
        "↗️ कैसे फैलता है",


      // ----------------------------------------------------------
      // TREATMENT
      // ----------------------------------------------------------

      treatment:
        "💊 उपचार की सलाह",

      treatmentPlaceholder:
        "विश्लेषण के बाद रोग के उपचार की जानकारी यहाँ दिखाई देगी।",

      prevention:
        "🛡️ बचाव की सलाह",

      preventionPlaceholder:
        "विश्लेषण के बाद रोग से बचाव की सलाह यहाँ दिखाई देगी।",


      // ----------------------------------------------------------
      // RECOMMENDED ACTION
      // ----------------------------------------------------------

      recommendedAction:
        "अनुशंसित कार्रवाई",

      whatShouldYouDo:
        "🌾 आपको क्या करना चाहिए?",

      recommendedActionDescription:
        "पहचाने गए रोग और वर्तमान जोखिम की स्थिति के आधार पर उपयोगी अगले कदम।",

      healthyAction1:
        "फसल की नियमित निगरानी जारी रखें।",

      healthyAction2:
        "उचित सिंचाई और खेत की स्वच्छता बनाए रखें।",

      healthyAction3:
        "आसपास के पौधों में शुरुआती लक्षणों की निगरानी करें।",

      action1:
        "गंभीर रूप से संक्रमित पौधों के हिस्सों को हटाकर सुरक्षित रूप से नष्ट करें।",

      action2:
        "रोग फैलने के संकेतों के लिए आसपास के पौधों की नियमित निगरानी करें।",

      action3:
        "खेत की स्वच्छता बनाए रखें और संक्रमित अवशेषों को हटा दें।",

      action4:
        "पहचाने गए रोग के लिए स्थानीय रूप से स्वीकृत कृषि उपचार संबंधी सलाह का पालन करें।",

      action5:
        "यदि लक्षण बढ़ते हैं या अन्य पौधों में फैलते हैं तो फसल की दोबारा जाँच करें।",

      actionNote:
        "AI के परिणाम निर्णय लेने में सहायता के लिए हैं। फसल को गंभीर नुकसान होने पर योग्य कृषि विशेषज्ञ से सलाह लें।",


      // ----------------------------------------------------------
      // WEATHER
      // ----------------------------------------------------------

      weatherLocation:
        "📍 मौसम का स्थान:",

      rainfall:
        "🌧️ वर्षा:",


            // ----------------------------------------------------------
      // AGRICULTURAL EXPERT / HELP
      // ----------------------------------------------------------

      expertHelpTitle:
        "📍 कृषि विशेषज्ञ की सहायता चाहिए?",

      expertHelpDescription:
        "अपनी फसल के स्थान के आधार पर नज़दीकी कृषि सहायता और सेवाएँ खोजें।",

      cropLocation:
        "फसल का स्थान:",

      findKVK:
        "नज़दीकी KVK खोजें",

      findExpert:
        "कृषि विशेषज्ञ खोजें",

      governmentSupport:
        "सरकारी कृषि सहायता",

      agroAdvisories:
        "कृषि सलाह देखें",

      openHelp:
        "खोलें",

      expertHelpNote:
        "फसल को गंभीर नुकसान या अनिश्चित रोग की स्थिति में योग्य कृषि विशेषज्ञ से सलाह लें.",


      // ----------------------------------------------------------
      // OTHER
      // ----------------------------------------------------------

      analyzeAnother:
        "🔄 दूसरी तस्वीर का विश्लेषण करें",

      downloadPDF:
        "📄 PDF रिपोर्ट डाउनलोड करें",

      footer:
        "CropCare AI • AI-संचालित कृषि निर्णय सहायता",

      invalidImage:
        "कृपया JPG, JPEG या PNG तस्वीर अपलोड करें।",

      imageTooLarge:
        "तस्वीर का आकार 10 MB से कम होना चाहिए।",

      selectImage:
        "कृपया पहले फसल की तस्वीर चुनें।",

      selectCity:
        "कृपया उस शहर का नाम दर्ज करें जहाँ फसल स्थित है।",

      predictionError:
        "रोग की पहचान करते समय कुछ समस्या हुई।",

      explanationTitle:
        "AI ने यह रोग क्यों पहचाना?",

      explanationDescription:
        "हाइलाइट किए गए क्षेत्र पत्ती के उन हिस्सों को दिखाते हैं जिन्होंने AI की भविष्यवाणी को प्रभावित किया।",

      gradcamNote:
        "हीटमैप यह समझने में मदद करता है कि रोग की पहचान करते समय AI ने पत्ती के किन हिस्सों पर अधिक ध्यान दिया।",

      historyLabel:
        "पिछला विश्लेषण",

      historyTitle:
        "📋 विश्लेषण इतिहास",

      historyDescription:
        "आपके पिछले फसल विश्लेषण यहाँ दिखाई देंगे।",

      historyConfidence:
        "विश्वसनीयता",

      historyRisk:
        "जोखिम",

      historyTemperature:
        "तापमान",

      historyClear:
        "इतिहास साफ करें",

      historyEmpty:
        "अभी कोई पिछला विश्लेषण नहीं है।",

      historyEmptyDescription:
        "आपके पूरे किए गए फसल विश्लेषण यहाँ दिखाई देंगे।",

      historyDate:
        "विश्लेषण किया गया"

    }

  };


  const t = text[language];


  // ============================================================
  // DISEASE NAME
  // ============================================================

  const formatDiseaseName = (disease) => {

    if (!disease) {
      return "";
    }


    const hindiNames = {

      "Potato___Late_blight":
        "आलू – लेट ब्लाइट",

      "Potato___Early_blight":
        "आलू – अर्ली ब्लाइट",

      "Potato___healthy":
        "आलू – स्वस्थ",

      "Tomato___Late_blight":
        "टमाटर – लेट ब्लाइट",

      "Tomato___Early_blight":
        "टमाटर – अर्ली ब्लाइट",

      "Tomato___healthy":
        "टमाटर – स्वस्थ",

      "Tomato___Bacterial_spot":
        "टमाटर – बैक्टीरियल स्पॉट",

      "Tomato_Bacterial_spot":
        "टमाटर – बैक्टीरियल स्पॉट",

      "Tomato_Early_blight":
        "टमाटर – अर्ली ब्लाइट",

      "Tomato_Late_blight":
        "टमाटर – लेट ब्लाइट",

      "Tomato_Leaf_Mold":
        "टमाटर – लीफ मोल्ड",

      "Tomato_Septoria_leaf_spot":
        "टमाटर – सेप्टोरिया लीफ स्पॉट",

      "Tomato_Spider_mites_Two_spotted_spider_mite":
        "टमाटर – टू-स्पॉटेड स्पाइडर माइट",

      "Tomato__Target_Spot":
        "टमाटर – टारगेट स्पॉट",

      "Tomato__Tomato_YellowLeaf__Curl_Virus":
        "टमाटर – येलो लीफ कर्ल वायरस",

      "Tomato__Tomato_mosaic_virus":
        "टमाटर – मोज़ेक वायरस",

      "Tomato_healthy":
        "टमाटर – स्वस्थ",

      "Pepper__bell___Bacterial_spot":
        "शिमला मिर्च – बैक्टीरियल स्पॉट",

      "Pepper__bell___healthy":
        "शिमला मिर्च – स्वस्थ"

    };


    if (
      isHindi &&
      hindiNames[disease]
    ) {

      return hindiNames[disease];

    }


    return disease
      .replace(/___/g, " – ")
      .replace(/_/g, " ")
      .replace(
        /\b\w/g,
        letter => letter.toUpperCase()
      );

  };


  // ============================================================
  // GET STARTED
  // ============================================================

  const handleGetStarted = () => {

    document
      .getElementById("detector")
      ?.scrollIntoView({
        behavior: "smooth"
      });

  };


  // ============================================================
  // HISTORY IMAGE
  // ============================================================

  const createHistoryImage = (file) => {

    return new Promise(resolve => {

      const reader = new FileReader();


      reader.onload = event => {

        const image = new Image();


        image.onload = () => {

          const maxSize = 700;

          let width = image.width;
          let height = image.height;


          if (
            width > maxSize ||
            height > maxSize
          ) {

            if (width > height) {

              height =
                (height / width) *
                maxSize;

              width = maxSize;

            } else {

              width =
                (width / height) *
                maxSize;

              height = maxSize;

            }

          }


          const canvas =
            document.createElement("canvas");


          canvas.width = width;
          canvas.height = height;


          const context =
            canvas.getContext("2d");


          context.drawImage(
            image,
            0,
            0,
            width,
            height
          );


          resolve(
            canvas.toDataURL(
              "image/jpeg",
              0.7
            )
          );

        };


        image.onerror = () =>
          resolve(null);


        image.src =
          event.target.result;

      };


      reader.onerror = () =>
        resolve(null);


      reader.readAsDataURL(file);

    });

  };


  // ============================================================
  // IMAGE CHANGE
  // ============================================================

  const handleImageChange = event => {

    const file =
      event.target.files[0];


    if (!file) {
      return;
    }


    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png"
    ];


    if (
      !allowedTypes.includes(file.type)
    ) {

      setError(t.invalidImage);

      return;

    }


    if (
      file.size >
      10 * 1024 * 1024
    ) {

      setError(t.imageTooLarge);

      return;

    }


    setSelectedImage(file);


    setPreview(
      URL.createObjectURL(file)
    );


    setResult(null);

    setError("");

  };


  // ============================================================
  // SAVE HISTORY
  // ============================================================

  const saveToHistory = async data => {

    try {

      const image =
        selectedImage
          ? await createHistoryImage(
              selectedImage
            )
          : null;


      const item = {

        id: Date.now(),

        date:
          new Date().toLocaleString(),

        filename:
          selectedImage?.name || "",

        city: city,

        disease:
          data.disease,

        confidence:
          data.confidence,

        disease_type:
          data.disease_type,

        disease_info:
          data.disease_info || null,

        weather:
          data.weather,

        risk:
          data.risk,

        // NEW: SAVE SPREAD FORECAST
        spread_forecast:
          data.spread_forecast || null,

        treatment:
          data.treatment,

        prevention:
          data.prevention,

        gradcam:
          data.gradcam || null,

        image: image

      };


      const updated = [
        item,
        ...history
      ].slice(0, 20);


      setHistory(updated);


      localStorage.setItem(
        "cropcare_history",
        JSON.stringify(updated)
      );


    } catch (error) {

      console.error(
        "Could not save history:",
        error
      );

    }

  };


  // ============================================================
  // PREDICT
  // ============================================================

  const handlePredict = async () => {

    if (!selectedImage) {

      setError(t.selectImage);

      return;

    }


    if (!city.trim()) {

      setError(t.selectCity);

      return;

    }


    setLoading(true);

    setError("");

    setResult(null);


    try {

      console.log(
        "City being sent:",
        city.trim()
      );


      const data =
        await predictDisease(
          selectedImage,
          city.trim()
        );


      console.log(
        "Prediction response:",
        data
      );


setResult(data);

const historyData =
  await getAnalysisHistory();

const formattedHistory =
  historyData.map(item => ({

    id: item.id,
    date: item.created_at,
    filename: "",
    city: item.location,
    disease: item.disease,
    confidence: item.confidence,
    disease_type: item.disease_type,
    disease_info: null,

    weather: {
      city: item.location,
      temperature: item.temperature,
      humidity: item.humidity,
      rainfall: item.rainfall
    },

    risk: {
      level: item.risk_level,
      score: 0,
      reason: ""
    },

    spread_forecast: null,

    treatment: {
      english: item.treatment,
      hindi: item.treatment
    },

    prevention: {
      english: item.prevention,
      hindi: item.prevention
    },

    gradcam: item.image_path || null,
    image: null

  }));

setHistory(formattedHistory);

    } catch (error) {

      console.error(
        "Prediction error:",
        error
      );

      setError(
        error.message ||
        t.predictionError
      );

    } finally {

      setLoading(false);

    }

  };

  // ============================================================
  // ANALYZE ANOTHER
  // ============================================================

  const handleAnotherImage = () => {

    setSelectedImage(null);

    setPreview(null);

    setResult(null);

    setError("");


    const input =
      document.getElementById(
        "crop-image-input"
      );


    if (input) {
      input.value = "";
    }


    document
      .getElementById(
        "upload-section"
      )
      ?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

  };


  // ============================================================
  // CLEAR HISTORY
  // ============================================================

  const handleClearHistory = () => {

    const confirmed =
      window.confirm(
        isHindi
          ? "क्या आप पूरा विश्लेषण इतिहास हटाना चाहते हैं?"
          : "Are you sure you want to clear all analysis history?"
      );


    if (!confirmed) {
      return;
    }


    setHistory([]);


    localStorage.removeItem(
      "cropcare_history"
    );

  };


  // ============================================================
  // VIEW HISTORY ITEM
  // ============================================================

  const handleViewHistory = (item) => {

    setResult(item);

    setCity(item.city || "");

    setPreview(item.image || null);

    setSelectedImage(null);

    setError("");


    setTimeout(() => {

      document
        .querySelector(".results-section")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

    }, 100);

  };


// ============================================================
// AGRICULTURAL EXPERT / HELP
// ============================================================

const openAgriculturalHelp = (type) => {

  const location = city.trim() || "India";

  let url = "";

  // ----------------------------------------------------------
  // 1. KVK
  // ----------------------------------------------------------

  if (type === "kvk") {

    url =
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `Krishi Vigyan Kendra near ${location}`
      )}`;

  }


  // ----------------------------------------------------------
  // 2. AGRICULTURAL EXPERT
  // ----------------------------------------------------------

  else if (type === "expert") {

    url =
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `Agricultural expert near ${location}`
      )}`;

  }


  // ----------------------------------------------------------
  // 3. GOVERNMENT AGRICULTURE SUPPORT
  // ----------------------------------------------------------

  else if (type === "government") {

    url =
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `Department of Agriculture near ${location}`
      )}`;

  }


  // ----------------------------------------------------------
  // 4. AGRICULTURAL ADVISORIES
  // ----------------------------------------------------------

  else if (type === "advisory") {

    url =
      `https://www.google.com/search?q=${encodeURIComponent(
        `${location} agriculture department official agro advisories`
      )}`;

  }


  if (url) {

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );

  }

};

    // ============================================================
  // VOICE ASSISTANCE
  // ============================================================

  const speakResults = () => {

    if (!result) {
      return;
    }

    // Stop anything currently being spoken
    window.speechSynthesis.cancel();

    const disease =
      formatDiseaseName(
        result.disease
      );

    const confidence =
      typeof result.confidence === "number"
        ? `${result.confidence.toFixed(1)} percent`
        : `${result.confidence || "--"} percent`;

    const risk =
      result.risk?.level ||
      "Unknown";

    const temperature =
      result.weather?.temperature ??
      "--";

    const humidity =
      result.weather?.humidity ??
      "--";

    const rainfall =
      result.weather?.rainfall ??
      "--";

    const treatment =
      getBilingualValue(
        result.treatment
      );

    const prevention =
      getBilingualValue(
        result.prevention
      );

const advice =
  result.disease_type === "Healthy"

    ? [
        t.healthyAction1,
        t.healthyAction2,
        t.healthyAction3
      ].join(". ")

    : [
        t.action1,
        t.action2,
        t.action3,
        t.action4,
        t.action5
      ].join(". ");

    let speechText = "";

    if (isHindi) {

      speechText =
        `फसल विश्लेषण परिणाम। ` +

        `पहचाना गया रोग है ${disease}। ` +

        `मॉडल का विश्वास स्तर ${confidence} है। ` +

        `रोग का जोखिम स्तर ${risk} है। ` +

        `वर्तमान तापमान ${temperature} डिग्री सेल्सियस है। ` +

        `आर्द्रता ${humidity} प्रतिशत है। ` +

        `वर्षा ${rainfall} मिलीमीटर है। ` +

        `उपचार की सलाह: ${treatment}। ` +

        `रोकथाम की सलाह: ${prevention}। ` +

        `अनुशंसित कार्रवाई: ${advice}।`;

    } else {

      speechText =
        `Crop analysis result. ` +

        `The detected disease is ${disease}. ` +

        `The model confidence is ${confidence}. ` +

        `The disease risk level is ${risk}. ` +

        `The current temperature is ${temperature} degrees Celsius. ` +

        `Humidity is ${humidity} percent. ` +

        `Rainfall is ${rainfall} millimeters. ` +

        `Treatment advice: ${treatment}. ` +

        `Prevention advice: ${prevention}. ` +

        `Recommended action: ${advice}.`;

    }


    const utterance =
      new SpeechSynthesisUtterance(
        speechText
      );


    // Select language
    utterance.lang =
      isHindi
        ? "hi-IN"
        : "en-IN";


    utterance.rate = 0.9;

    utterance.pitch = 1;

    utterance.volume = 1;


    window.speechSynthesis.speak(
      utterance
    );

  };


  // ============================================================
  // STOP VOICE ASSISTANCE
  // ============================================================

  const stopSpeaking = () => {

    window.speechSynthesis.cancel();

  };


  // ============================================================
  // GRAD-CAM URL
  // ============================================================

  const getGradcamUrl = path => {

    if (!path) {
      return null;
    }


    if (
      path.startsWith("http://") ||
      path.startsWith("https://")
    ) {

      return path;

    }


    return `http://127.0.0.1:8000${path}`;

  };


  // ============================================================
  // GET BILINGUAL VALUE
  // ============================================================

  const getBilingualValue = value => {

    if (!value) {
      return "N/A";
    }


    if (typeof value === "string") {
      return value;
    }


    return (
      isHindi
        ? value.hindi
        : value.english
    ) ||
      value.english ||
      value.hindi ||
      "N/A";

  };


  // ============================================================
  // PDF HELPERS
  // ============================================================

  const addWrappedText = (
    doc,
    value,
    x,
    y,
    width,
    lineHeight = 6
  ) => {

    const text =
      value === undefined ||
      value === null
        ? "N/A"
        : String(value);


    const lines =
      doc.splitTextToSize(
        text,
        width
      );


    doc.text(
      lines,
      x,
      y
    );


    return (
      y +
      lines.length *
      lineHeight
    );

  };


  const loadImageAsDataURL = async url => {

    const response =
      await fetch(url);


    if (!response.ok) {

      throw new Error(
        "Could not load image"
      );

    }


    const blob =
      await response.blob();


    return new Promise(
      (resolve, reject) => {

        const reader =
          new FileReader();


        reader.onloadend = () =>
          resolve(
            reader.result
          );


        reader.onerror = () =>
          reject(
            new Error(
              "Image conversion failed"
            )
          );


        reader.readAsDataURL(blob);

      }
    );

  };

  


  // ============================================================
  // PDF
  // ============================================================

  const downloadPDF = async () => {

    if (!result) {
      return;
    }


    try {

      const doc = new jsPDF();

      const margin = 20;

      const pageWidth =
        doc.internal.pageSize.getWidth();

      const pageHeight =
        doc.internal.pageSize.getHeight();

      const width =
        pageWidth - margin * 2;

      let y = 20;


      // --------------------------------------------------------
      // HEADER
      // --------------------------------------------------------

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(22);

      doc.text(
        "CropCare AI",
        margin,
        y
      );


      y += 8;


      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(10);

      doc.text(
        "AI-Powered Crop Disease Detection & Risk Assessment",
        margin,
        y
      );


      y += 12;


      doc.line(
        margin,
        y,
        pageWidth - margin,
        y
      );


      y += 12;


      // --------------------------------------------------------
      // REPORT TITLE
      // --------------------------------------------------------

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(17);

      doc.text(
        "Crop Disease Analysis Report",
        margin,
        y
      );


      y += 10;


      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(9);

      doc.text(
        `Analysis Date: ${new Date().toLocaleString()}`,
        margin,
        y
      );


      y += 12;


      // --------------------------------------------------------
      // DISEASE DETECTION
      // --------------------------------------------------------

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(13);

      doc.text(
        "Disease Detection",
        margin,
        y
      );


      y += 8;


      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(11);


      y =
        addWrappedText(
          doc,
          `Disease: ${formatDiseaseName(
            result.disease
          )}`,
          margin,
          y,
          width
        );


      y += 2;


      y =
        addWrappedText(
          doc,
          `Confidence: ${
            typeof result.confidence ===
            "number"
              ? result.confidence.toFixed(2)
              : result.confidence
          }%`,
          margin,
          y,
          width
        );


      y += 2;


      y =
        addWrappedText(
          doc,
          `Disease Type: ${
            result.disease_type ||
            "N/A"
          }`,
          margin,
          y,
          width
        );


      y += 10;


      // --------------------------------------------------------
      // DISEASE INFORMATION
      // --------------------------------------------------------

      if (result.disease_info) {

        doc.setFont(
          "helvetica",
          "bold"
        );

        doc.setFontSize(13);

        doc.text(
          "Disease Information",
          margin,
          y
        );


        y += 8;


        doc.setFont(
          "helvetica",
          "normal"
        );

        doc.setFontSize(10);


        y =
          addWrappedText(
            doc,
            `Crop: ${getBilingualValue(
              result.disease_info.crop
            )}`,
            margin,
            y,
            width
          );


        y += 2;


        y =
          addWrappedText(
            doc,
            `Disease Name: ${getBilingualValue(
              result.disease_info.disease_name
            )}`,
            margin,
            y,
            width
          );


        y += 2;


        y =
          addWrappedText(
            doc,
            `Severity: ${
              result.disease_info.severity ||
              "N/A"
            }`,
            margin,
            y,
            width
          );


        y += 4;


        y =
          addWrappedText(
            doc,
            `Symptoms: ${getBilingualValue(
              result.disease_info.symptoms
            )}`,
            margin,
            y,
            width
          );


        y += 2;


        y =
          addWrappedText(
            doc,
            `Cause: ${getBilingualValue(
              result.disease_info.cause
            )}`,
            margin,
            y,
            width
          );


        y += 2;


        y =
          addWrappedText(
            doc,
            `Spread: ${getBilingualValue(
              result.disease_info.spread
            )}`,
            margin,
            y,
            width
          );


        y += 10;

      }


      // --------------------------------------------------------
      // WEATHER
      // --------------------------------------------------------

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(13);

      doc.text(
        "Weather Conditions",
        margin,
        y
      );


      y += 8;


      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(11);


      if (result.weather) {

        y =
          addWrappedText(
            doc,
            `Location: ${
              result.weather.city ||
              city
            }`,
            margin,
            y,
            width
          );


        y += 2;


        y =
          addWrappedText(
            doc,
            `Temperature: ${
              result.weather.temperature ??
              "N/A"
            } °C`,
            margin,
            y,
            width
          );


        y += 2;


        y =
          addWrappedText(
            doc,
            `Humidity: ${
              result.weather.humidity ??
              "N/A"
            }%`,
            margin,
            y,
            width
          );


        y += 2;


        y =
          addWrappedText(
            doc,
            `Rainfall: ${
              result.weather.rainfall ??
              "N/A"
            } mm`,
            margin,
            y,
            width
          );

      }


      y += 10;


      // --------------------------------------------------------
      // RISK
      // --------------------------------------------------------

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(13);

      doc.text(
        "Disease Risk Assessment",
        margin,
        y
      );


      y += 8;


      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(11);


      if (result.risk) {

        y =
          addWrappedText(
            doc,
            `Risk Level: ${
              result.risk.level ||
              "N/A"
            }`,
            margin,
            y,
            width
          );


        y += 2;


        y =
          addWrappedText(
            doc,
            `Risk Score: ${
              result.risk.score ??
              "N/A"
            }`,
            margin,
            y,
            width
          );


        y += 2;


        y =
          addWrappedText(
            doc,
            `Reason: ${
              result.risk.reason ||
              "N/A"
            }`,
            margin,
            y,
            width
          );

      }


      y += 10;


      // --------------------------------------------------------
      // DISEASE SPREAD FORECAST
      // --------------------------------------------------------

      if (result.spread_forecast) {

        doc.setFont(
          "helvetica",
          "bold"
        );

        doc.setFontSize(13);

        doc.text(
          "Disease Spread Forecast",
          margin,
          y
        );


        y += 8;


        doc.setFont(
          "helvetica",
          "normal"
        );

        doc.setFontSize(10);


        y =
          addWrappedText(
            doc,
            `Forecast Period: ${
              result.spread_forecast.period ||
              "Next 3–5 days"
            }`,
            margin,
            y,
            width
          );


        y += 2;


        y =
          addWrappedText(
            doc,
            `Forecast Level: ${
              result.spread_forecast.level ||
              "N/A"
            }`,
            margin,
            y,
            width
          );


        y += 2;


        y =
          addWrappedText(
            doc,
            `Forecast Score: ${
              result.spread_forecast.score ??
              "N/A"
            } / 100`,
            margin,
            y,
            width
          );


        y += 2;


        y =
          addWrappedText(
            doc,
            `Assessment: ${
              result.spread_forecast.message ||
              "N/A"
            }`,
            margin,
            y,
            width
          );


        y += 4;


        if (
          result.spread_forecast.factors &&
          result.spread_forecast.factors.length
        ) {

          y =
            addWrappedText(
              doc,
              `Environmental Factors: ${
                result.spread_forecast.factors.join(
                  "; "
                )
              }`,
              margin,
              y,
              width
            );

        }


        y += 2;


        y =
          addWrappedText(
            doc,
            `Recommended Action: ${
              result.spread_forecast.recommendation ||
              "N/A"
            }`,
            margin,
            y,
            width
          );

      }


      y += 10;


      // --------------------------------------------------------
      // TREATMENT
      // --------------------------------------------------------

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(13);

      doc.text(
        "Treatment Advice",
        margin,
        y
      );


      y += 8;


      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(10);


      const treatment =
        getBilingualValue(
          result.treatment
        );


      y =
        addWrappedText(
          doc,
          treatment,
          margin,
          y,
          width
        );


      y += 10;


      // --------------------------------------------------------
      // PREVENTION
      // --------------------------------------------------------

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(13);

      doc.text(
        "Prevention Advice",
        margin,
        y
      );


      y += 8;


      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(10);


      const prevention =
        getBilingualValue(
          result.prevention
        );


      y =
        addWrappedText(
          doc,
          prevention,
          margin,
          y,
          width
        );


      // --------------------------------------------------------
      // RECOMMENDED ACTION
      // --------------------------------------------------------

      doc.addPage();

      y = 20;


      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(16);

      doc.text(
        "Recommended Action",
        margin,
        y
      );


      y += 10;


      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(10);


      const actionLines =
        result.disease_type === "Healthy"

          ? [
              t.healthyAction1,
              t.healthyAction2,
              t.healthyAction3
            ]

          : [
              t.action1,
              t.action2,
              t.action3,
              t.action4,
              t.action5
            ];


      actionLines.forEach(
        (action, index) => {

          y =
            addWrappedText(
              doc,
              `${index + 1}. ${action}`,
              margin,
              y,
              width
            );

          y += 3;

        }
      );


      y += 5;


      y =
        addWrappedText(
          doc,
          `Note: ${t.actionNote}`,
          margin,
          y,
          width
        );


      // --------------------------------------------------------
      // GRAD-CAM
      // --------------------------------------------------------

      if (result.gradcam) {

        doc.addPage();

        y = 20;


        doc.setFont(
          "helvetica",
          "bold"
        );

        doc.setFontSize(18);

        doc.text(
          "AI Explanation",
          margin,
          y
        );


        y += 10;


        doc.setFont(
          "helvetica",
          "normal"
        );

        doc.setFontSize(10);


        y =
          addWrappedText(
            doc,
            "Grad-CAM highlights the regions of the crop leaf that influenced the AI model's prediction.",
            margin,
            y,
            width
          );


        y += 10;


        try {

          const url =
            getGradcamUrl(
              result.gradcam
            );


          const image =
            await loadImageAsDataURL(
              url
            );


          doc.addImage(
            image,
            "JPEG",
            margin,
            y,
            width,
            125
          );


          y += 140;


          doc.setFont(
            "helvetica",
            "bold"
          );

          doc.setFontSize(12);

          doc.text(
            "What does this mean?",
            margin,
            y
          );


          y += 7;


          doc.setFont(
            "helvetica",
            "normal"
          );

          doc.setFontSize(10);


          addWrappedText(
            doc,
            "The highlighted regions represent areas that the model considered important when making its disease prediction.",
            margin,
            y,
            width
          );


        } catch (error) {

          console.error(
            "Grad-CAM PDF error:",
            error
          );


          doc.text(
            "Grad-CAM image could not be included.",
            margin,
            y
          );

        }

      }


      // --------------------------------------------------------
      // FOOTER
      // --------------------------------------------------------

      const pages =
        doc.internal.getNumberOfPages();


      for (
        let page = 1;
        page <= pages;
        page++
      ) {

        doc.setPage(page);


        doc.setFont(
          "helvetica",
          "italic"
        );

        doc.setFontSize(8);


        doc.text(
          "CropCare AI • AI-powered agricultural decision support",
          margin,
          pageHeight - 15
        );


        doc.text(
          `${page} / ${pages}`,
          pageWidth - margin - 10,
          pageHeight - 10
        );

      }


      const safeDisease =
        String(
          result.disease ||
          "Analysis"
        ).replace(
          /[^a-zA-Z0-9-_]/g,
          "_"
        );


      doc.save(
        `CropCare_AI_${safeDisease}.pdf`
      );


    } catch (error) {

      console.error(
        "PDF error:",
        error
      );


      alert(
        "There was a problem creating the PDF."
      );

    }

  };


  // ============================================================
  // UI
  // ============================================================

  return (

    <div className="app">


      {/* ======================================================
          WELCOME
      ====================================================== */}

      <section className="welcome-section">

        <div className="welcome-overlay">

          <div className="welcome-content">

            <div className="welcome-icon">
              🌱
            </div>


            <p className="welcome-small">
              {t.welcome}
            </p>


            <h1>
              CropCare AI
            </h1>


            <p className="welcome-tagline">
              {t.tagline}
            </p>


            <p className="welcome-description">
              {t.welcomeDescription}
            </p>


            <button
              className="start-button"
              onClick={handleGetStarted}
            >
              {t.getStarted}
              <span>↓</span>
            </button>

          </div>


          <button
            className="scroll-indicator"
            onClick={handleGetStarted}
          >

            <span>
              {t.scroll}
            </span>

            <span className="scroll-arrow">
              ↓
            </span>

          </button>

        </div>

      </section>


      {/* ======================================================
          APPLICATION
      ====================================================== */}

      <div id="detector">


        {/* ====================================================
            HEADER
        ==================================================== */}

        <header className="header">

          <div>

            <h1>
              🌱 CropCare AI
            </h1>

            <p>
              {t.headerDescription}
            </p>

          </div>


          <button
            className="language-button"
            onClick={toggleLanguage}
          >

            {isHindi
              ? "🇬🇧 English"
              : "🇮🇳 हिंदी"}

          </button>

        </header>


        {/* ====================================================
            MAIN
        ==================================================== */}

        <main className="container">


          {/* ==================================================
              HERO
          ================================================== */}

          <section className="hero">

            <p className="section-label">
              {t.analysisLabel}
            </p>


            <h2>
              {t.detectEarly}
            </h2>


            <p>
              {t.heroDescription}
            </p>

          </section>


          {/* ==================================================
              UPLOAD
          ================================================== */}

          <section
            className="upload-card"
            id="upload-section"
          >

            <h2>
              {t.uploadTitle}
            </h2>


            <p className="upload-description">
              {t.uploadDescription}
            </p>


            {/* LOCATION */}

            <div className="location-input-container">

              <label htmlFor="city-input">
                {t.locationTitle}
              </label>


              <p className="location-description">
                {t.locationDescription}
              </p>


              <input
                id="city-input"
                type="text"
                value={city}
                onChange={event =>
                  setCity(
                    event.target.value
                  )
                }
                placeholder={
                  t.cityPlaceholder
                }
                className="city-input"
              />


              <p className="location-example">
                {t.locationExample}
              </p>

            </div>


            {/* IMAGE */}

            <label className="upload-area">

              {preview ? (

                <div className="preview-container">

                  <img
                    src={preview}
                    alt="Selected crop"
                    className="preview-image"
                  />


                  <p className="preview-text">
                    {t.imageSelected}
                  </p>


                  <span className="change-image">
                    {t.changeImage}
                  </span>

                </div>

              ) : (

                <>

                  <div className="upload-icon">
                    📤
                  </div>


                  <h3>
                    {t.chooseImage}
                  </h3>


                  <p>
                    {t.imageFormat}
                  </p>

                </>

              )}


              <input
                id="crop-image-input"
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleImageChange}
              />

            </label>


            {/* SELECTED FILE */}

            {selectedImage && (

              <div className="selected-file">

                <strong>
                  {t.selected}
                </strong>{" "}

                {selectedImage.name}

              </div>

            )}


            {/* DETECT BUTTON */}

            <button
              className="detect-button"
              onClick={handlePredict}
              disabled={
                !selectedImage ||
                loading
              }
            >

              {loading
                ? t.analyzingButton
                : t.detectDisease}

            </button>


            {/* LOADING */}

            {loading && (

              <div className="analysis-status">

                <div className="analysis-spinner">
                  🌱
                </div>


                <h3>
                  {t.processingTitle}
                </h3>


                <p>
                  {t.processingDescription}
                </p>


                <div className="analysis-steps">

                  <div className="analysis-step">
                    📷{" "}
                    {t.processingImage}
                  </div>

                  <div className="analysis-step">
                    🧠{" "}
                    {t.runningAI}
                  </div>

                  <div className="analysis-step">
                    🌦️{" "}
                    {t.checkingWeather}
                  </div>

                  <div className="analysis-step">
                    ⚠️{" "}
                    {t.assessingRisk}
                  </div>

                </div>

              </div>

            )}


            {/* ERROR */}

            {error && !loading && (

              <div className="error-message">
                ❌ {error}
              </div>

            )}

          </section>


          {/* ==================================================
              RESULTS
          ================================================== */}

          <section className="results-section">

            <div className="results-heading">

              <p className="section-label">
                {t.analysis}
              </p>


              <h2>
                {t.resultsTitle}
              </h2>

            </div>


            {/* ==================================================
                RESULT CARDS
            ================================================== */}

            <div className="result-grid">


              {/* DISEASE */}

              <div className="result-card">

                <span className="card-icon">
                  🦠
                </span>


                <h3>
                  {t.disease}
                </h3>


                <p className="result-value">

                  {result
                    ? formatDiseaseName(
                        result.disease
                      )
                    : t.noAnalysis}

                </p>


                <p className="result-label">

                  {result
                    ? t.detectedDisease
                    : t.uploadToBegin}

                </p>

              </div>


              {/* CONFIDENCE */}

              <div className="result-card">

                <span className="card-icon">
                  🎯
                </span>


                <h3>
                  {t.confidence}
                </h3>


                <p className="result-value">

                  {result &&
                  typeof result.confidence ===
                    "number"
                    ? `${result.confidence.toFixed(
                        2
                      )}%`
                    : "--"}

                </p>


                <p className="result-label">
                  {t.modelConfidence}
                </p>

              </div>


              {/* WEATHER */}

              <div className="result-card">

                <span className="card-icon">
                  🌦️
                </span>


                <h3>
                  {t.weather}
                </h3>


                <p className="result-value">

                  {result?.weather
                    ? `${result.weather.temperature}°C`
                    : "--"}

                </p>


                <p className="result-label">

                  {result?.weather
                    ? `${
                        isHindi
                          ? "नमी"
                          : "Humidity"
                      }: ${
                        result.weather.humidity
                      }%`
                    : t.temperatureHumidity}

                </p>

              </div>


              {/* RISK */}

              <div className="result-card risk-card">

                <span className="card-icon">
                  ⚠️
                </span>


                <h3>
                  {t.riskLevel}
                </h3>


                <p
                  className={`result-value risk-value ${
                    result?.risk?.level
                      ? result.risk.level
                          .toLowerCase()
                          .replace(
                            /\s+/g,
                            "-"
                          )
                      : ""
                  }`}
                >

                  {result?.risk?.level ||
                    "--"}

                </p>


                {result?.risk && (

                  <>

                    <p className="risk-description">
                      {t.diseaseSpreadRisk}
                    </p>


                    <div className="risk-reason">

                      {result.risk.reason &&
                        result.risk.reason
                          .split(";")
                          .map(
                            (
                              reason,
                              index
                            ) => (

                              <div
                                key={index}
                              >
                                •{" "}
                                {reason.trim()}
                              </div>

                            )
                          )}

                    </div>

                  </>

                )}

              </div>

            </div>


            {/* ==================================================
                DISEASE SPREAD FORECAST
            ================================================== */}

            {result?.spread_forecast && (

              <section className="spread-forecast-section">

                <div className="spread-forecast-header">

                  <div>

                    <p className="section-label">
                      {t.analysis}
                    </p>


                    <h2>
                      📈 {t.spreadForecast}
                    </h2>


                    <p>
                      {t.spreadForecastPeriod}
                    </p>

                  </div>


                  <div
                    className={`spread-forecast-level ${
                      result.spread_forecast.level
                        ? result.spread_forecast.level
                            .toLowerCase()
                        : ""
                    }`}
                  >

                    {result.spread_forecast.level}

                  </div>

                </div>


                <div className="spread-forecast-content">

                  {/* SCORE */}

                  <div className="spread-forecast-score-card">

                    <span className="spread-forecast-icon">
                      📊
                    </span>


                    <p>
                      {t.spreadForecastScore}
                    </p>


                    <h3>
                      {
                        result.spread_forecast.score ??
                        "--"
                      }
                      /100
                    </h3>

                  </div>


                  {/* MESSAGE */}

                  <div className="spread-forecast-message">

                    <h3>
                      {
                        result.spread_forecast.message
                      }
                    </h3>


                    <p>
                      {
                        result.spread_forecast.recommendation
                      }
                    </p>

                  </div>

                </div>


                {/* FACTORS */}

                {
                  result.spread_forecast.factors &&
                  result.spread_forecast.factors.length > 0 && (

                    <div className="spread-forecast-factors">

                      <h3>
                        {t.spreadForecastFactors}
                      </h3>


                      <div className="forecast-factor-list">

                        {
                          result.spread_forecast.factors.map(
                            (factor, index) => (

                              <div
                                className="forecast-factor"
                                key={index}
                              >

                                <span>
                                  ✓
                                </span>


                                <p>
                                  {factor}
                                </p>

                              </div>

                            )
                          )
                        }

                      </div>

                    </div>

                  )
                }

              </section>

            )}


            {/* ==================================================
                DISEASE INFORMATION
            ================================================== */}

            {result?.disease_info && (

              <div className="disease-information-section">

                <div className="disease-information-header">

                  <p className="section-label">
                    {t.analysis}
                  </p>


                  <h2>
                    {t.diseaseInformation}
                  </h2>

                </div>


                <div className="disease-basic-grid">


                  {/* CROP */}

                  <div className="disease-info-card">

                    <span className="disease-info-icon">
                      🌱
                    </span>


                    <div>

                      <p className="disease-info-label">
                        {t.crop}
                      </p>


                      <h3>
                        {getBilingualValue(
                          result.disease_info.crop
                        )}
                      </h3>

                    </div>

                  </div>


                  {/* DISEASE */}

                  <div className="disease-info-card">

                    <span className="disease-info-icon">
                      🦠
                    </span>


                    <div>

                      <p className="disease-info-label">
                        {t.diseaseName}
                      </p>


                      <h3>
                        {getBilingualValue(
                          result.disease_info.disease_name
                        )}
                      </h3>

                    </div>

                  </div>


                  {/* SEVERITY */}

                  <div className="disease-info-card">

                    <span className="disease-info-icon">
                      ⚠️
                    </span>


                    <div>

                      <p className="disease-info-label">
                        {t.severity}
                      </p>


                      <h3
                        className={`severity-${String(
                          result.disease_info.severity ||
                          "unknown"
                        ).toLowerCase()}`}
                      >

                        {isHindi

                          ? result.disease_info.severity ===
                            "High"

                            ? "अधिक"

                            : result.disease_info.severity ===
                              "Moderate"

                            ? "मध्यम"

                            : result.disease_info.severity ===
                              "Low"

                            ? "कम"

                            : result.disease_info.severity ===
                              "None"

                            ? "नहीं"

                            : "अज्ञात"

                          : result.disease_info.severity ||
                            "Unknown"}

                      </h3>

                    </div>

                  </div>

                </div>


                {/* DETAILS */}

                <div className="disease-details-grid">


                  {/* SYMPTOMS */}

                  <div className="disease-detail-card">

                    <h3>
                      {t.symptoms}
                    </h3>


                    <p>
                      {getBilingualValue(
                        result.disease_info.symptoms
                      )}
                    </p>

                  </div>


                  {/* CAUSE */}

                  <div className="disease-detail-card">

                    <h3>
                      {t.cause}
                    </h3>


                    <p>
                      {getBilingualValue(
                        result.disease_info.cause
                      )}
                    </p>

                  </div>


                  {/* SPREAD */}

                  <div className="disease-detail-card">

                    <h3>
                      {t.spread}
                    </h3>


                    <p>
                      {getBilingualValue(
                        result.disease_info.spread
                      )}
                    </p>

                  </div>

                </div>

              </div>

            )}


            {/* ==================================================
                TREATMENT + PREVENTION
            ================================================== */}

            <div className="advice-section">


              <div className="advice-card">

                <h2>
                  {t.treatment}
                </h2>


                <p>

                  {result?.treatment
                    ? getBilingualValue(
                        result.treatment
                      )
                    : t.treatmentPlaceholder}

                </p>

              </div>


              <div className="advice-card">

                <h2>
                  {t.prevention}
                </h2>


                <p>

                  {result?.prevention
                    ? getBilingualValue(
                        result.prevention
                      )
                    : t.preventionPlaceholder}

                </p>

              </div>

            </div>


            {/* ==================================================
                RECOMMENDED ACTION
            ================================================== */}

            {result && (

              <section className="recommended-action-section">

                <p className="section-label">
                  {t.recommendedAction}
                </p>


                <div className="recommended-action-header">

                  <span className="recommended-action-icon">
                    .
                  </span>


                  <div>

                    <h2>
                      {t.whatShouldYouDo}
                    </h2>


                    <p>
                      {t.recommendedActionDescription}
                    </p>

                  </div>

                </div>


                <div className="action-list">

                  {result.disease_type ===
                  "Healthy" ? (

                    <>

                      <div className="action-item">

                        <span>
                          ✓
                        </span>

                        <p>
                          {t.healthyAction1}
                        </p>

                      </div>


                      <div className="action-item">

                        <span>
                          ✓
                        </span>

                        <p>
                          {t.healthyAction2}
                        </p>

                      </div>


                      <div className="action-item">

                        <span>
                          ✓
                        </span>

                        <p>
                          {t.healthyAction3}
                        </p>

                      </div>

                    </>

                  ) : (

                    <>

                      <div className="action-item">

                        <span>
                          1
                        </span>

                        <p>
                          {t.action1}
                        </p>

                      </div>


                      <div className="action-item">

                        <span>
                          2
                        </span>

                        <p>
                          {t.action2}
                        </p>

                      </div>


                      <div className="action-item">

                        <span>
                          3
                        </span>

                        <p>
                          {t.action3}
                        </p>

                      </div>


                      <div className="action-item">

                        <span>
                          4
                        </span>

                        <p>
                          {t.action4}
                        </p>

                      </div>


                      <div className="action-item">

                        <span>
                          5
                        </span>

                        <p>
                          {t.action5}
                        </p>

                      </div>

                    </>

                  )}

                </div>


                <div className="action-note">

                  💡{" "}

                  <strong>
                    {isHindi
                      ? "ध्यान दें:"
                      : "Note:"}
                  </strong>{" "}

                  {t.actionNote}

                </div>

              </section>

            )}

                          {/* ==================================================
                  VOICE ASSISTANCE
              ================================================== */}

              {result && (

                <div className="voice-assistance">

                  <button
                    type="button"
                    className="voice-button"
                    onClick={speakResults}
                  >

                    🔊{" "}
                    {isHindi
                      ? "परिणाम सुनें"
                      : "Listen to Results"}

                  </button>


                  <button
                    type="button"
                    className="voice-stop-button"
                    onClick={stopSpeaking}
                  >

                    ⏹️{" "}
                    {isHindi
                      ? "रोकें"
                      : "Stop"}

                  </button>

                </div>

              )}


            {/* ==================================================
                GRAD-CAM
            ================================================== */}

            {result?.gradcam && (

              <div className="gradcam-section">

                <div className="gradcam-header">

                  <span className="gradcam-icon">
                    🔍
                  </span>


                  <div>

                    <h2>
                      {t.explanationTitle}
                    </h2>


                    <p>
                      {t.explanationDescription}
                    </p>

                  </div>

                </div>


                <div className="gradcam-image-container">

                  <img
                    src={getGradcamUrl(
                      result.gradcam
                    )}
                    alt="AI prediction explanation"
                    className="gradcam-image"
                  />

                </div>


                <p className="gradcam-note">
                  💡{" "}
                  {t.gradcamNote}
                </p>

              </div>

            )}


            {/* ==================================================
                WEATHER LOCATION
            ================================================== */}

            {result?.weather && (

              <div className="weather-location">

                <div>

                  {t.weatherLocation}

                  <strong>
                    {" "}
                    {result.weather.city}
                  </strong>

                </div>


                <div>

                  {t.rainfall}

                  <strong>
                    {" "}
                    {result.weather.rainfall} mm
                  </strong>

                </div>

              </div>

            )}

                        {/* ==================================================
                AGRICULTURAL EXPERT / HELP
            ================================================== */}

            {result && (

              <section className="expert-help-section">

                <div className="expert-help-header">

                  <p className="section-label">
                    {isHindi
                      ? "कृषि सहायता"
                      : "AGRICULTURAL SUPPORT"}
                  </p>

                  <h2>
                    {t.expertHelpTitle}
                  </h2>

                  <p>
                    {t.expertHelpDescription}
                  </p>

                </div>


                <div className="expert-location">

                  <span>
                    📍
                  </span>

                  <div>

                    <small>
                      {t.cropLocation}
                    </small>

                    <strong>
                      {city || "--"}
                    </strong>

                  </div>

                </div>


                <div className="expert-help-grid">


                  {/* KVK */}

                  <div className="expert-help-card">

                    <div className="expert-help-icon">
                      🏢
                    </div>

                    <div className="expert-help-content">

                      <h3>
                        {t.findKVK}
                      </h3>

                      <p>
                        {isHindi
                          ? "अपने स्थान के पास Krishi Vigyan Kendra खोजें।"
                          : "Find a Krishi Vigyan Kendra near your crop location."}
                      </p>

                      <button
                        className="expert-help-button"
                        onClick={() =>
                          openAgriculturalHelp("kvk")
                        }
                      >
                        {t.openHelp} →
                      </button>

                    </div>

                  </div>


                  {/* AGRICULTURAL EXPERT */}

                  <div className="expert-help-card">

                    <div className="expert-help-icon">
                      👨‍🌾
                    </div>

                    <div className="expert-help-content">

                      <h3>
                        {t.findExpert}
                      </h3>

                      <p>
                        {isHindi
                          ? "अपने क्षेत्र के कृषि विशेषज्ञों और सहायता सेवाओं को खोजें।"
                          : "Find agricultural experts and support services near you."}
                      </p>

                      <button
                        className="expert-help-button"
                        onClick={() =>
                          openAgriculturalHelp("expert")
                        }
                      >
                        {t.openHelp} →
                      </button>

                    </div>

                  </div>


                  {/* GOVERNMENT SUPPORT */}

                  <div className="expert-help-card">

                    <div className="expert-help-icon">
                      🏛️
                    </div>

                    <div className="expert-help-content">

                      <h3>
                        {t.governmentSupport}
                      </h3>

                      <p>
                        {isHindi
                          ? "सरकारी कृषि विभाग की आधिकारिक जानकारी और संपर्क देखें।"
                          : "Access official agriculture department information and contacts."}
                      </p>

                      <button
                        className="expert-help-button"
                        onClick={() =>
                          openAgriculturalHelp("government")
                        }
                      >
                        {t.openHelp} →
                      </button>

                    </div>

                  </div>


                  {/* AGRO ADVISORIES */}

                  <div className="expert-help-card">

                    <div className="expert-help-icon">
                      🌾
                    </div>

                    <div className="expert-help-content">

                      <h3>
                        {t.agroAdvisories}
                      </h3>

                      <p>
                        {isHindi
                          ? "कृषि विभाग की उपलब्ध कृषि सलाह और अपडेट देखें।"
                          : "View official agricultural advisories and updates."}
                      </p>

                      <button
                        className="expert-help-button"
                        onClick={() =>
                          openAgriculturalHelp("advisory")
                        }
                      >
                        {t.openHelp} →
                      </button>

                    </div>

                  </div>


                </div>


                <div className="expert-help-note">

                  💡{" "}
                  {t.expertHelpNote}

                </div>

              </section>

            )}


            {/* ==================================================
                PDF
            ================================================== */}

            {result && (

              <div className="pdf-container">

                <button
                  className="pdf-button"
                  onClick={downloadPDF}
                >
                  {t.downloadPDF}
                </button>

              </div>

            )}


            {/* ==================================================
                ANALYZE ANOTHER
            ================================================== */}

            {result && (

              <div className="another-image-container">

                <button
                  className="another-image-button"
                  onClick={
                    handleAnotherImage
                  }
                >
                  {t.analyzeAnother}
                </button>

              </div>

            )}


            {/* ==================================================
                HISTORY
            ================================================== */}

            <section className="history-section">

              <div className="history-heading">

                <p className="section-label">
                  {t.historyLabel}
                </p>


                <h2>
                  {t.historyTitle}
                </h2>


                <p className="history-description">
                  {t.historyDescription}
                </p>

              </div>


              {history.length === 0 ? (

                <div className="history-empty">

                  <div className="history-empty-icon">
                    📋
                  </div>


                  <h3>
                    {t.historyEmpty}
                  </h3>


                  <p>
                    {t.historyEmptyDescription}
                  </p>

                </div>

              ) : (

                <>

                  <div className="history-list">

                    {history.map(item => (

                      <div
                        className="history-card"
                        key={item.id}
                        onClick={() =>
                          handleViewHistory(item)
                        }
                        role="button"
                        tabIndex={0}
                        onKeyDown={event => {

                          if (
                            event.key ===
                              "Enter" ||
                            event.key === " "
                          ) {

                            handleViewHistory(
                              item
                            );

                          }

                        }}
                      >

                        <div className="history-image-container">

                          {item.image ? (

                            <img
                              src={item.image}
                              alt={item.disease}
                              className="history-image"
                            />

                          ) : (

                            <div className="history-placeholder">
                              🌱
                            </div>

                          )}

                        </div>


                        <div className="history-details">

                          <h3>
                            {formatDiseaseName(
                              item.disease
                            )}
                          </h3>


                          <p className="history-date">

                            🕒{" "}
                            {t.historyDate}:{" "}
                            {item.date}

                          </p>


                          <div className="history-info">

                            <span>

                              🎯{" "}
                              {t.historyConfidence}:{" "}

                              {typeof item.confidence ===
                              "number"

                                ? `${item.confidence.toFixed(
                                    2
                                  )}%`

                                : `${item.confidence}%`}

                            </span>


                            <span>

                              ⚠️{" "}
                              {t.historyRisk}:{" "}

                              {item.risk?.level ||
                                "--"}

                            </span>


                            <span>

                              🌡️{" "}
                              {t.historyTemperature}:{" "}

                              {item.weather?.temperature ??
                                "--"}°C

                            </span>

                          </div>


                          {item.city && (

                            <p>
                              📍 {item.city}
                            </p>

                          )}


                          {item.disease_type && (

                            <p>
                              🧬{" "}
                              {item.disease_type}
                            </p>

                          )}

                        </div>

                      </div>

                    ))}

                  </div>


                  <div className="clear-history-container">

                    <button
                      className="clear-history-button"
                      onClick={
                        handleClearHistory
                      }
                    >
                      🗑️{" "}
                      {t.historyClear}
                    </button>

                  </div>

                </>

              )}

            </section>

          </section>

        </main>


        {/* ======================================================
            FOOTER
        ====================================================== */}

        <footer>

          <p>
            {t.footer}
          </p>

        </footer>

      </div>

    </div>

  );

}


export default App;