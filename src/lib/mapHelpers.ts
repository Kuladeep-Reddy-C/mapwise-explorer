
// Helper function to save API key to local storage
export const saveApiKey = (apiKey: string): void => {
  localStorage.setItem('google_maps_api_key', apiKey);
};

// Helper function to get API key from local storage
export const getApiKey = (): string | null => {
  return localStorage.getItem('google_maps_api_key');
};

// Helper function to load Google Maps API script dynamically
export const loadGoogleMapsApi = (apiKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if the script is already loaded
    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.id = 'google-maps-script';
    
    script.onload = () => {
      resolve();
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load Google Maps API'));
    };
    
    // Remove any existing Google Maps scripts
    const existingScript = document.getElementById('google-maps-script');
    if (existingScript) {
      existingScript.remove();
    }
    
    document.head.appendChild(script);
  });
};

// Helper function to validate Google Maps API key
export const validateApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    // Create a test request to validate the API key
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=test&key=${apiKey}`
    );
    const data = await response.json();
    
    // If the API key is invalid, Google will return a status of "REQUEST_DENIED"
    return data.status !== 'REQUEST_DENIED';
  } catch (error) {
    console.error('Error validating API key:', error);
    return false;
  }
};
