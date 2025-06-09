import type { InternationalAirport } from '../types/flight';

export const internationalAirports: InternationalAirport[] = [
  // Europe
  {
    iata: 'LHR',
    name: 'Heathrow Airport',
    city: 'London',
    country: 'United Kingdom',
    type: 'international'
  },
  {
    iata: 'CDG',
    name: 'Charles de Gaulle Airport',
    city: 'Paris',
    country: 'France',
    type: 'international'
  },
  {
    iata: 'FRA',
    name: 'Frankfurt Airport',
    city: 'Frankfurt',
    country: 'Germany',
    type: 'international'
  },
  {
    iata: 'AMS',
    name: 'Amsterdam Airport Schiphol',
    city: 'Amsterdam',
    country: 'Netherlands',
    type: 'international'
  },
  {
    iata: 'IST',
    name: 'Istanbul Airport',
    city: 'Istanbul',
    country: 'Turkey',
    type: 'international'
  },

  // Middle East
  {
    iata: 'DXB',
    name: 'Dubai International Airport',
    city: 'Dubai',
    country: 'UAE',
    type: 'international'
  },
  {
    iata: 'DOH',
    name: 'Hamad International Airport',
    city: 'Doha',
    country: 'Qatar',
    type: 'international'
  },
  {
    iata: 'AUH',
    name: 'Abu Dhabi International Airport',
    city: 'Abu Dhabi',
    country: 'UAE',
    type: 'international'
  },

  // North America
  {
    iata: 'JFK',
    name: 'John F. Kennedy International Airport',
    city: 'New York',
    country: 'USA',
    type: 'international'
  },
  {
    iata: 'IAD',
    name: 'Washington Dulles International Airport',
    city: 'Washington',
    country: 'USA',
    type: 'international'
  },
  {
    iata: 'ATL',
    name: 'Hartsfield-Jackson Atlanta International Airport',
    city: 'Atlanta',
    country: 'USA',
    type: 'international'
  },
  {
    iata: 'YYZ',
    name: 'Toronto Pearson International Airport',
    city: 'Toronto',
    country: 'Canada',
    type: 'international'
  },

  // Asia
  {
    iata: 'PEK',
    name: 'Beijing Capital International Airport',
    city: 'Beijing',
    country: 'China',
    type: 'international'
  },
  {
    iata: 'CAN',
    name: 'Guangzhou Baiyun International Airport',
    city: 'Guangzhou',
    country: 'China',
    type: 'international'
  },
  {
    iata: 'BOM',
    name: 'Chhatrapati Shivaji Maharaj International Airport',
    city: 'Mumbai',
    country: 'India',
    type: 'international'
  },
  {
    iata: 'DEL',
    name: 'Indira Gandhi International Airport',
    city: 'Delhi',
    country: 'India',
    type: 'international'
  },

  // Africa
  {
    iata: 'JNB',
    name: 'O.R. Tambo International Airport',
    city: 'Johannesburg',
    country: 'South Africa',
    type: 'international'
  },
  {
    iata: 'ADD',
    name: 'Bole International Airport',
    city: 'Addis Ababa',
    country: 'Ethiopia',
    type: 'international'
  },
  {
    iata: 'NBO',
    name: 'Jomo Kenyatta International Airport',
    city: 'Nairobi',
    country: 'Kenya',
    type: 'international'
  },
  {
    iata: 'CAI',
    name: 'Cairo International Airport',
    city: 'Cairo',
    country: 'Egypt',
    type: 'international'
  },
  {
    iata: 'ACC',
    name: 'Kotoka International Airport',
    city: 'Accra',
    country: 'Ghana',
    type: 'international'
  },
  {
    iata: 'DKR',
    name: 'Blaise Diagne International Airport',
    city: 'Dakar',
    country: 'Senegal',
    type: 'international'
  }
];