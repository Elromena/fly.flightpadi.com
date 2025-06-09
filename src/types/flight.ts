export type TravelClass = 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
export type TripType = 'oneway' | 'roundtrip';

export interface SearchParams {
  trip_type: TripType;
  departure_id: string;
  arrival_id: string;
  outbound_date: string;
  return_date?: string;
  travel_class?: TravelClass;
  adults?: string;
  children?: string;
}

export interface BaseAirport {
  iata: string;
  name: string;
  city: string;
}

export interface DomesticAirport extends BaseAirport {
  type: 'domestic';
  routes: {
    domestic: string[];  // IATA codes of domestic destinations
    international: string[];  // IATA codes of international destinations
  };
}

export interface InternationalAirport extends BaseAirport {
  type: 'international';
  country: string;
}