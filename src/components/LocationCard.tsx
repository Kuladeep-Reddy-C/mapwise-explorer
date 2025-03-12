
import React, { useState } from 'react';
import { Location } from '@/types';
import { getPlaceholderImage } from '@/data/locations';
import { cn } from '@/lib/utils';

interface LocationCardProps {
  location: Location;
  isSelected: boolean;
  onClick: () => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, isSelected, onClick }) => {
  const { name, category, address, rating, photo } = location;
  
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  
  const imageUrl = photo || getPlaceholderImage(category);

  const formatRating = (rating: number | string): string => {
    if (rating === 'N/A' || rating === undefined) return 'Not Rated';
    return typeof rating === 'number' ? rating.toFixed(1) : rating.toString();
  };
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div 
      className={cn(
        "p-4 rounded-xl transition-all duration-300 ease-out cursor-pointer",
        "border border-gray-200 hover:shadow-lg hover:-translate-y-1",
        isSelected ? "ring-2 ring-primary shadow-md scale-[1.02]" : "hover:border-gray-300"
      )}
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="aspect-video relative overflow-hidden rounded-lg">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 image-skeleton" />
          )}
          
          <img
            src={imageError ? getPlaceholderImage(category) : imageUrl}
            alt={name}
            className={cn(
              "w-full h-full object-cover rounded-lg transition-opacity duration-300",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
          
          <div className="absolute top-2 right-2">
            <span className={cn(
              "px-2 py-1 text-xs font-medium rounded-full",
              "bg-white/90 backdrop-blur-sm text-primary"
            )}>
              {category}
            </span>
          </div>
        </div>
        
        <div className="space-y-1">
          <h3 className="font-medium line-clamp-1 text-balance">{name}</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <span className="text-sm text-muted-foreground font-medium">
                {formatRating(rating)}
              </span>
              {typeof rating === 'number' && (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-4 h-4 text-amber-500"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" 
                    clipRule="evenodd" 
                  />
                </svg>
              )}
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground line-clamp-2">
            {address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
