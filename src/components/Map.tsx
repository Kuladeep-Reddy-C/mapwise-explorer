
import React, { useRef, useEffect, useState } from 'react';
import { Location } from '@/types';
import { loadGoogleMapsApi } from '@/lib/mapHelpers';
import { toast } from "@/components/ui/use-toast";

interface MapProps {
  apiKey: string;
  locations: Location[];
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
}

const Map: React.FC<MapProps> = ({ apiKey, locations, selectedLocation, onLocationSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Initialize map
  useEffect(() => {
    if (!apiKey || !mapRef.current) return;
    
    const initMap = async () => {
      try {
        setIsLoading(true);
        await loadGoogleMapsApi(apiKey);
        
        // Default map options centered on Kadapa, India
        const defaultCenter = { lat: 14.4673, lng: 78.8242 };
        
        const mapOptions: google.maps.MapOptions = {
          center: defaultCenter,
          zoom: 14,
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          zoomControl: true,
          mapId: '8e0a97af9386fef',
          styles: [
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                { "color": "#e9e9e9" },
                { "lightness": 17 }
              ]
            },
            {
              "featureType": "landscape",
              "elementType": "geometry",
              "stylers": [
                { "color": "#f5f5f5" },
                { "lightness": 20 }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.fill",
              "stylers": [
                { "color": "#ffffff" },
                { "lightness": 17 }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                { "color": "#f5f5f5" },
                { "lightness": 21 }
              ]
            }
          ]
        };
        
        const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
        setMap(newMap);
        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing map:', error);
        setIsLoading(false);
        toast({
          title: "Error",
          description: "Failed to load Google Maps. Please check your API key and try again.",
          variant: "destructive",
        });
      }
    };
    
    initMap();
    
    return () => {
      // Clean up markers
      markers.forEach(marker => marker.setMap(null));
      setMarkers([]);
    };
  }, [apiKey]);
  
  // Add markers for locations
  useEffect(() => {
    if (!map || !locations.length) return;
    
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    
    // Create new markers
    const newMarkers = locations.filter(location => location.position).map(location => {
      if (!location.position) return null;
      
      const marker = new window.google.maps.Marker({
        position: location.position,
        map: map,
        title: location.name,
        animation: google.maps.Animation.DROP,
        icon: {
          url: selectedLocation?.name === location.name 
            ? 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            : 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
          scaledSize: new google.maps.Size(40, 40)
        }
      });
      
      // Add click event to marker
      marker.addListener('click', () => {
        onLocationSelect(location);
      });
      
      return marker;
    }).filter(Boolean) as google.maps.Marker[];
    
    setMarkers(newMarkers);
    
    // Create bounds to fit all markers
    if (newMarkers.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      newMarkers.forEach(marker => {
        bounds.extend(marker.getPosition() as google.maps.LatLng);
      });
      map.fitBounds(bounds);
      
      // Don't zoom in too far
      const listener = google.maps.event.addListener(map, 'idle', () => {
        if (map.getZoom() > 16) {
          map.setZoom(16);
        }
        google.maps.event.removeListener(listener);
      });
    }
  }, [map, locations]);
  
  // Update selected marker
  useEffect(() => {
    if (!map || !markers.length) return;
    
    markers.forEach(marker => {
      const isSelected = selectedLocation?.name === marker.getTitle();
      marker.setIcon({
        url: isSelected 
          ? 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          : 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
        scaledSize: new google.maps.Size(40, 40)
      });
      
      // If selected, center map on this marker and add a bounce animation
      if (isSelected) {
        map.panTo(marker.getPosition() as google.maps.LatLng);
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(() => {
          marker.setAnimation(null);
        }, 1500);
      }
    });
  }, [selectedLocation, markers, map]);

  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden shadow-lg">
      {isLoading && (
        <div className="absolute inset-0 bg-muted/10 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="glass-effect p-6 rounded-xl flex items-center space-x-4">
            <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <div className="text-sm font-medium">Loading map...</div>
          </div>
        </div>
      )}
      <div 
        ref={mapRef} 
        className="w-full h-full"
        style={{ opacity: isLoading ? 0.5 : 1, transition: 'opacity 0.3s ease-in-out' }}
      />
    </div>
  );
};

export default Map;
