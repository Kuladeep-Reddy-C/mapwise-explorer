
import { CityData } from '../types';

export const locationData: CityData = {
  "city": "kadapa",
  "groupedPlaces": {
    "tourist attraction": [
      {
        "name": "NeeM TrEe",
        "category": "tourist attraction",
        "address": "FRCC+WGW, Kadapa",
        "rating": 5,
        "photo": null,
        "position": { lat: 14.4673, lng: 78.8242 }
      },
      {
        "name": "Sri Bhagawan Mahaveer Circle - Kadapa",
        "category": "tourist attraction",
        "address": "FR4G+JW8, Gandhinagar, Nagarajupeta, Kadapa",
        "rating": 5,
        "photo": null,
        "position": { lat: 14.4651, lng: 78.8277 }
      },
      {
        "name": "DR B R AMBEDKAR CIRCLE",
        "category": "tourist attraction",
        "address": "FR7J+5M3, New Bus Stand Road, SLB Enclave, Y.S.Nagar, Kadapa",
        "rating": "N/A",
        "photo": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AUy1YQ117rP1PnF4jdh5A2cxmqMislvkpJ-84tLaBaMkWfMFGPlyNJeRax5Hy58a6MM9Bx21kTcU-NMA-WcYhU5R5RCG93TmbfOcjNUtyWts_Hkh8u7H4hcGbOMdTIdBDHicSgqLXCPWSckStuhOgZCiKEoHLpoMQU_aY2lPZfUX0mWECLhR83G9CzFUuglR7neC0SDDOHYJVRLgw2SeBND1xqr_gzErmt_BDOQ4OrqHbRPZh32eAcdeu01pJrRVimHRkDZZngLgcmT6wkCJnZ-FtOY6ODjuc754ZV-JuHffeU8-P3SuMyOZbgGxYzLVaf6O02ifE3O8KyA&key=AIzaSyC9TMHVE8z2JfBt7jiEgnndLEeQ951EEa4",
        "position": { lat: 14.4712, lng: 78.8312 }
      },
      {
        "name": "Sri Bhagavan Mahaveer Government Museum",
        "category": "tourist attraction",
        "address": "FR4H+92V, Railway Colony, Kadapa",
        "rating": 3.9,
        "photo": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AUy1YQ34vRdjZW9TxV3FvYQkqshygKaJFyA2p297LeoMkvU7EXbXvYH3OuLXVkqdplpMYmRA59HZUjrd93GMmvSbvpKaTF6_53MKlPFp5TOmqmussZdKvqbwE65ARlX_ix2zCOwn33fnObUQlqtgbd7XYhnMXW8uzjRzUYdL_AyFEy2-kwRXX7AzixDF9INIf-vZ_iTbCI0940j3xUrmXUw8nqPF63JvR78DVSfkHGPxuTrC7Bffg4eDE96kz59FJC0Yjj643r05ANfT24zqTVASrGUTZHEvY6ijE1YezU4Uh3TYiE0atB-mzWXZS5GgfCkz5dbamknfAxU&key=AIzaSyC9TMHVE8z2JfBt7jiEgnndLEeQ951EEa4",
        "position": { lat: 14.4656, lng: 78.8292 }
      },
      {
        "name": "Kadapa Clock Tower",
        "category": "tourist attraction",
        "address": "One Town Police Station, Market Road Kadapa, YV Street, Ganagapeta, Kadapa",
        "rating": 4.3,
        "photo": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AUy1YQ0T8IwzICJ_mpaGTimmtLcKUWUvCjBcqjIaf2cTQlMtf92ItPLrzcIQRE_U0CAOvw8uWyW9zRY0VRC-uxW9GkAcRKOUmOKUPnGSiS06qmDlKsu7dnloUJgBbt5XkpiHPZTdWvczpIO9jc3z-dFF5753WtsbvpQvOmIwaG4joilFniumvjIq7gYWxQCv73WCo_LJdtcfFtdCF-zMJ7UIIaPo9u3iCS6VEwjT3fvyV8Fpip4OTuB0ylX_yobNsBcarEYjFNwXW2F3nGLyOjVNlNktXooSyS8qoN7mruwjqwspI1I7yS_3izxRQV4DMI9EIXfyc5J5Aas&key=AIzaSyC9TMHVE8z2JfBt7jiEgnndLEeQ951EEa4",
        "position": { lat: 14.4741, lng: 78.8219 }
      }
    ],
    "restaurant": [
      {
        "name": "Kadapa Veg Restaurant",
        "category": "restaurant",
        "address": "123 Main St, Kadapa",
        "rating": 4.5,
        "photo": null,
        "position": { lat: 14.470, lng: 78.823 }
      },
      {
        "name": "Spice Palace",
        "category": "restaurant",
        "address": "456 Market St, Kadapa",
        "rating": 4.2,
        "photo": null,
        "position": { lat: 14.468, lng: 78.830 }
      }
    ],
    "hotel": [
      {
        "name": "Kadapa Grand Hotel",
        "category": "hotel",
        "address": "789 Plaza Circle, Kadapa",
        "rating": 4.7,
        "photo": null,
        "position": { lat: 14.473, lng: 78.827 }
      },
      {
        "name": "Comfort Inn",
        "category": "hotel",
        "address": "101 Rest Ave, Kadapa",
        "rating": 4.1,
        "photo": null,
        "position": { lat: 14.465, lng: 78.832 }
      }
    ]
  }
};

// Helper function to extract a placeholder image URL when photo is null
export const getPlaceholderImage = (category: string): string => {
  const placeholders: Record<string, string> = {
    "tourist attraction": "https://images.unsplash.com/photo-1546412414-8035e1776c9a?q=80&w=400",
    "restaurant": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400",
    "hotel": "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400"
  };
  
  return placeholders[category] || "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?q=80&w=400";
};
