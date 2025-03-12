
export interface Location {
  name: string;
  category: string;
  address: string;
  rating: number | string;
  photo: string | null;
  position?: {
    lat: number;
    lng: number;
  };
}

export interface GroupedLocations {
  [category: string]: Location[];
}

export interface CityData {
  city: string;
  groupedPlaces: GroupedLocations;
}
