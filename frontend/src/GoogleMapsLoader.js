// src/GoogleMapsLoader.js
const loadGoogleMapsScript = () => {
    const existingScript = document.querySelector("script[src*='https://maps.googleapis.com/maps/api/js']");
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
  
      script.onload = () => {
        console.log("Google Maps script loaded successfully.");
      };
    } else {
      console.log("Google Maps script already loaded.");
    }
  };
  
  export default loadGoogleMapsScript;
  