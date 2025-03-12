
import React, { useState, useEffect } from 'react';
import ApiKeyInput from '@/components/ApiKeyInput';
import LocationList from '@/components/LocationList';
import Map from '@/components/Map';
import { Location } from '@/types';
import { locationData } from '@/data/locations';
import { getApiKey } from '@/lib/mapHelpers';

const Index: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [allLocations, setAllLocations] = useState<Location[]>([]);
  
  // Extract all locations from the grouped data to pass to the map
  useEffect(() => {
    const locations: Location[] = [];
    Object.values(locationData.groupedPlaces).forEach(categoryLocations => {
      locations.push(...categoryLocations);
    });
    setAllLocations(locations);
  }, []);

  // Check for existing API key on component mount
  useEffect(() => {
    const storedApiKey = getApiKey();
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto py-6 px-4 sm:px-6">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-balance animate-fade-in">
            {locationData.city.charAt(0).toUpperCase() + locationData.city.slice(1)} Explorer
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Discover the best places to visit in {locationData.city.charAt(0).toUpperCase() + locationData.city.slice(1)}
          </p>
        </header>

        {/* API Key Input Section */}
        {!apiKey && (
          <div className="mb-8">
            <ApiKeyInput onApiKeyChange={setApiKey} />
          </div>
        )}

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 min-h-[70vh]">
          {/* Left Column - Location List */}
          <div className="lg:w-1/3 glass-effect rounded-xl p-5 flex flex-col overflow-hidden animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Places to Explore</h2>
            <LocationList 
              groupedLocations={locationData.groupedPlaces} 
              onLocationSelect={handleLocationSelect}
              selectedLocation={selectedLocation}
            />
          </div>
          
          {/* Right Column - Map */}
          <div className="lg:w-2/3 h-[60vh] lg:h-auto animate-fade-in" style={{animationDelay: "0.2s"}}>
            {apiKey ? (
              <Map 
                apiKey={apiKey}
                locations={allLocations}
                selectedLocation={selectedLocation}
                onLocationSelect={handleLocationSelect}
              />
            ) : (
              <div className="w-full h-full glass-effect rounded-xl flex items-center justify-center">
                <div className="text-center p-8">
                  <h3 className="text-lg font-medium mb-2">Google Maps API Key Required</h3>
                  <p className="text-muted-foreground max-w-md">
                    Please enter your Google Maps API key above to view the interactive map.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Floating API key button when API key is set */}
        {apiKey && (
          <div className="fixed bottom-4 right-4 z-10 animate-fade-in">
            <button 
              onClick={() => setApiKey('')}
              className="glass-effect p-2 rounded-full hover:shadow-md transition-all"
              title="Change API Key"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M15.75 1.5a6.75 6.75 0 00-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 00-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 00.75-.75v-1.5h1.5A.75.75 0 009 19.5V18h1.5a.75.75 0 00.75-.75V15h1.5a.75.75 0 00.53-.22l.5-.5a.75.75 0 00.22-.53V12h.75a.75.75 0 00.53-.22l.5-.5a.75.75 0 00.22-.53V9.75a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 00-.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 00-.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 00-.75.75v1.5a.75.75 0 01-.75.75H4.5a.75.75 0 00-.75.75v3a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-3a.75.75 0 00-.75-.75H.75a.75.75 0 01-.75-.75V12a.75.75 0 01.22-.53l6.5-6.5a.75.75 0 00.22-.53c0-.179-.033-.362-.1-.55a5.255 5.255 0 01-.17-.89 5.337 5.337 0 01.122-1.695A5.25 5.25 0 0115.75 3h.012a5.2 5.2 0 01.568.067.755.755 0 00.554-.2 5.25 5.25 0 014.782-1.05A5.25 5.25 0 0115.75 1.5zm3.677 3.068a.75.75 0 00-1.06-1.06 2.25 2.25 0 00-.597 2.116.75.75 0 001.06-1.06z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
