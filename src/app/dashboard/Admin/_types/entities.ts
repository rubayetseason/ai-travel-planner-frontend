export interface City {
  id: string;
  name: string;
  descp: string;
}

export type TravelMode = "Car" | "Bus" | "Bike" | "Walk" | "Boat";

export interface TravelConnector {
  id: string;
  city1: string;
  city2: string;
  mode: TravelMode;
  timeInMinutes: number;
}

export type HotelCategory = "Budget" | "Standard" | "Premium" | "Luxury";

export interface HotelItem {
  id: string;
  city: string;
  name: string;
  category: HotelCategory;
  price: number;
}

export type AttractionCategory =
  | "Nature"
  | "Beach"
  | "Historic"
  | "Adventure"
  | "Culture";

export interface Attraction {
  id: string;
  city: string;
  name: string;
  descp: string;
  lat: number;
  long: number;
  category: AttractionCategory;
  rating: number;
  openingHours: string;
  entryFee: number;
  duration: string;
  imageUrl: string;
}

export interface AttractionConnector {
  id: string;
  hotel: string;
  attraction: string;
  mode: TravelMode;
  time: number;
}
