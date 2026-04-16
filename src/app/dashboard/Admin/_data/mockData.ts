import type {
  Attraction,
  AttractionCategory,
  AttractionConnector,
  City,
  HotelCategory,
  HotelItem,
  TravelConnector,
  TravelMode,
} from "../_types/entities";

export const travelModes: TravelMode[] = ["Car", "Bus", "Bike", "Walk", "Boat"];

export const hotelCategories: HotelCategory[] = [
  "Budget",
  "Standard",
  "Premium",
  "Luxury",
];

export const attractionCategories: AttractionCategory[] = [
  "Nature",
  "Beach",
  "Historic",
  "Adventure",
  "Culture",
];

export const mockCities: City[] = [
  {
    id: "city-1",
    name: "Dhaka",
    descp: "Capital city with dense urban life, heritage landmarks, and food streets.",
  },
  {
    id: "city-2",
    name: "Cox's Bazar",
    descp: "Coastal city known for the longest natural sea beach and marine vibe.",
  },
  {
    id: "city-3",
    name: "Sylhet",
    descp: "Tea gardens, waterfalls, and calm green hills with river-side viewpoints.",
  },
  {
    id: "city-4",
    name: "Bandarban",
    descp: "Hill district popular for trekking, cloud views, and tribal culture.",
  },
  {
    id: "city-5",
    name: "Khulna",
    descp: "Gateway to Sundarbans with river routes and eco-tour activities.",
  },
];

export const mockTravelConnectors: TravelConnector[] = [
  {
    id: "tc-1",
    city1: "Dhaka",
    city2: "Cox's Bazar",
    mode: "Bus",
    timeInMinutes: 520,
  },
  {
    id: "tc-2",
    city1: "Dhaka",
    city2: "Sylhet",
    mode: "Car",
    timeInMinutes: 320,
  },
  {
    id: "tc-3",
    city1: "Sylhet",
    city2: "Bandarban",
    mode: "Bus",
    timeInMinutes: 620,
  },
  {
    id: "tc-4",
    city1: "Khulna",
    city2: "Dhaka",
    mode: "Car",
    timeInMinutes: 360,
  },
];

export const mockHotels: HotelItem[] = [
  {
    id: "hotel-1",
    city: "Cox's Bazar",
    name: "Sea Pearl Horizon",
    category: "Luxury",
    price: 145,
  },
  {
    id: "hotel-2",
    city: "Dhaka",
    name: "Metro Crown Inn",
    category: "Standard",
    price: 78,
  },
  {
    id: "hotel-3",
    city: "Sylhet",
    name: "Tea Garden Suites",
    category: "Premium",
    price: 118,
  },
  {
    id: "hotel-4",
    city: "Bandarban",
    name: "Hill Breeze Resort",
    category: "Budget",
    price: 54,
  },
  {
    id: "hotel-5",
    city: "Khulna",
    name: "River Dock Lodge",
    category: "Standard",
    price: 66,
  },
];

export const mockAttractions: Attraction[] = [
  {
    id: "attr-1",
    city: "Cox's Bazar",
    name: "Laboni Beach",
    descp: "Popular beachfront with sunset walks and lively local stalls.",
    lat: 21.4272,
    long: 91.9766,
    category: "Beach",
    rating: 4.6,
    openingHours: "06:00 - 22:00",
    entryFee: 0,
    duration: "2-3 hours",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "attr-2",
    city: "Sylhet",
    name: "Ratargul Swamp Forest",
    descp: "Boat-friendly freshwater swamp forest with scenic routes.",
    lat: 25.0011,
    long: 91.9735,
    category: "Nature",
    rating: 4.5,
    openingHours: "08:00 - 18:00",
    entryFee: 4,
    duration: "3-4 hours",
    imageUrl:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "attr-3",
    city: "Dhaka",
    name: "Lalbagh Fort",
    descp: "Historic Mughal-era fort complex with gardens and museum halls.",
    lat: 23.7189,
    long: 90.3882,
    category: "Historic",
    rating: 4.3,
    openingHours: "10:00 - 17:00",
    entryFee: 2,
    duration: "1-2 hours",
    imageUrl:
      "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "attr-4",
    city: "Bandarban",
    name: "Nilgiri Hills",
    descp: "High-altitude viewpoint famous for clouds and panoramic sunrises.",
    lat: 21.7873,
    long: 92.4304,
    category: "Adventure",
    rating: 4.7,
    openingHours: "07:00 - 19:00",
    entryFee: 6,
    duration: "4-5 hours",
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
  },
];

export const mockAttractionConnectors: AttractionConnector[] = [
  {
    id: "ac-1",
    hotel: "Sea Pearl Horizon",
    attraction: "Laboni Beach",
    mode: "Walk",
    time: 12,
  },
  {
    id: "ac-2",
    hotel: "Tea Garden Suites",
    attraction: "Ratargul Swamp Forest",
    mode: "Car",
    time: 46,
  },
  {
    id: "ac-3",
    hotel: "Metro Crown Inn",
    attraction: "Lalbagh Fort",
    mode: "Car",
    time: 28,
  },
  {
    id: "ac-4",
    hotel: "Hill Breeze Resort",
    attraction: "Nilgiri Hills",
    mode: "Bike",
    time: 35,
  },
];
