
import React, { useState, useEffect } from 'react';
import { Location, GroupedLocations } from '@/types';
import LocationCard from './LocationCard';

interface LocationListProps {
  groupedLocations: GroupedLocations;
  onLocationSelect: (location: Location) => void;
  selectedLocation: Location | null;
}

const LocationList: React.FC<LocationListProps> = ({ 
  groupedLocations, 
  onLocationSelect,
  selectedLocation
}) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categories = Object.keys(groupedLocations);

  // Set initial active category
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  if (!activeCategory) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Loading locations...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Category tabs */}
      <div className="flex overflow-x-auto py-2 px-1 gap-2 mb-4 no-scrollbar">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`
              py-2 px-4 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-300
              ${activeCategory === category
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
              }
            `}
          >
            {category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            <span className="ml-1.5 text-xs font-normal opacity-80">
              ({groupedLocations[category].length})
            </span>
          </button>
        ))}
      </div>

      {/* Location cards */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        <div className="grid grid-cols-1 gap-4">
          {groupedLocations[activeCategory].map((location, index) => (
            <div
              key={`${location.name}-${index}`}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <LocationCard
                location={location}
                isSelected={selectedLocation?.name === location.name}
                onClick={() => onLocationSelect(location)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationList;
