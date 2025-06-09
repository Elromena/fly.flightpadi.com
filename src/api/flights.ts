import type { SearchParams } from '../types/flight';

const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const RAPIDAPI_HOST = import.meta.env.VITE_RAPIDAPI_HOST;

export async function searchReturnFlights(params: SearchParams): Promise<FlightResponse> {
  // Swap departure and arrival for return flight search
  const returnParams = {
    trip_type: params.trip_type,
    departure_id: params.arrival_id,
    arrival_id: params.departure_id,
    outbound_date: params.return_date || '',
    travel_class: params.travel_class,
    adults: params.adults,
    children: params.children
  };

  return searchFlights(returnParams);
}

interface FlightDetails {
  booking_token: string;
  departure_time: string;
  arrival_time: string;
  duration: {
    text: string;
  };
  flights: Array<{
    airline: string;
    flight_number: string;
    departure_airport: {
      airport_name: string;
      airport_code: string;
    };
    arrival_airport: {
      airport_name: string;
      airport_code: string;
    };
  }>;
  price: number;
  next_token?: string;
}

interface FlightResponse {
  status: boolean;
  message: string;
  data: {
    itineraries: {
      topFlights: any[];
      otherFlights: Array<FlightDetails>;
    };
  };
  error?: string;
}

export async function searchFlights(params: SearchParams): Promise<FlightResponse> {
  const searchParams = new URLSearchParams({
    departure_id: params.departure_id,
    arrival_id: params.arrival_id,
    outbound_date: params.outbound_date,
    travel_class: params.travel_class || 'ECONOMY',
    adults: '1', // Always search for 1 adult
    children: '0', // Remove children from API search
    currency: 'NGN',
    language_code: 'en-US',
    country_code: 'NG'
  });
  
  const url = `https://google-flights2.p.rapidapi.com/api/v1/searchFlights?${searchParams}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch flights');
    }

    const data = await response.json();
    console.log('API Response Data:', {
      params,
      response: data,
      isRoundTrip: !!params.return_date
    });
    return data;
  } catch (error) {
    console.error('Error fetching flights:', error);
    return {
      flights: [],
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}