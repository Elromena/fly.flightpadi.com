import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { nigerianAirports } from '../data/airports';
import { internationalAirports } from '../data/internationalAirports';
import { searchFlights, searchReturnFlights } from '../api/flights';
import type { SearchParams } from '../types/flight';
import { getTimeCategory, parseDateTime, formatTime } from '../utils/dateTime';
import TimeBasedFlightCard from '../components/search/TimeBasedFlightCard';
import SelectedFlight from '../components/search/SelectedFlight';
import AllFlights from '../components/search/AllFlights';

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(true);
  const [categorizedFlights, setCategorizedFlights] = React.useState<Record<string, any>>({
    morning: null,
    afternoon: null,
    evening: null,
    night: null
  });
  const [returnCategorizedFlights, setReturnCategorizedFlights] = React.useState<Record<string, any>>({
    morning: null,
    afternoon: null,
    evening: null,
    night: null
  });
  const [selectedDeparture, setSelectedDeparture] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [expandedFlights, setExpandedFlights] = React.useState<{ [key: string]: boolean }>({});
  const [showAllFlights, setShowAllFlights] = React.useState(false);
  const [allFlights, setAllFlights] = React.useState<any[]>([]);
  const MARKUP_PERCENTAGE = 0.05; // 5% markup
  const totalPassengers = parseInt(searchParams.get('adults') || '1') + parseInt(searchParams.get('children') || '0');
  const isRoundTrip = searchParams.get('trip_type') === 'roundtrip';

  const categorizeFlights = (flights: any[]) => {
    const categories: Record<string, any[]> = {
      morning: [],
      afternoon: [],
      evening: [],
      night: []
    };

    // Group flights by time category
    flights.forEach(flight => {
      const departureTime = parseDateTime(flight.departure_time);
      const category = getTimeCategory(departureTime);
      categories[category].push(flight);
    });

    // Select best flight for each category (prioritize direct flights, then price)
    const bestFlights: Record<string, any> = {};
    Object.entries(categories).forEach(([category, categoryFlights]) => {

      if (categoryFlights.length === 0) {
        bestFlights[category] = null;
        return;
      }

      categoryFlights.sort((a, b) => {
        if (a.stops !== b.stops) return a.stops - b.stops;
        return a.price.amount - b.price.amount;
      });

      bestFlights[category] = categoryFlights[0];
    });

    return bestFlights;
  };

  const handleBooking = (departureFlight: any, returnFlight?: any) => {
    if (returnFlight?.price.amount === "unavailable") {
      window.location.href = 'https://flightpadi.com/contact';
      return;
    }

    const formatFlightDate = (dateTimeStr: string) => {
      const date = parseDateTime(dateTimeStr);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const findDestinationCity = (arrivalId: string) => {
      const airport = [...nigerianAirports, ...internationalAirports].find(
        airport => airport.iata === arrivalId
      );
      return airport?.city || 'your destination';
    };

    navigate('/booking', {
      state: {
        totalPassengers,
        destinationCity: findDestinationCity(searchParams.get('arrival_id') || ''),
        departureFlight: {
          ...departureFlight,
          departureTime: formatTime(parseDateTime(departureFlight.departure_time)),
          arrivalTime: formatTime(parseDateTime(departureFlight.arrival_time)),
          date: formatFlightDate(departureFlight.departure_time)
        },
        ...(returnFlight && {
          returnFlight: {
            ...returnFlight,
            departureTime: formatTime(parseDateTime(returnFlight.departure_time)),
            arrivalTime: formatTime(parseDateTime(returnFlight.arrival_time)),
            date: formatFlightDate(returnFlight.departure_time)
          }
        })
      }
    });
  };

  const handleSelectDeparture = async (flight: any) => {
    if (!isRoundTrip) {
      if (flight.price.amount === "unavailable") {
        window.location.href = 'https://flightpadi.com/contact';
        return;
      }
      handleBooking(flight);
      return;
    }

    setSelectedDeparture(flight);
    setIsLoading(true);
    setError(null);

    try {
      const response = await searchReturnFlights(
        Object.fromEntries(searchParams.entries()) as SearchParams
      );

      if (response.error) {
        setError(response.error);
      } else {
        const processedFlights = response.data?.itineraries.otherFlights
          .filter(flight => flight.price !== "unavailable")
          .map(flight => ({
          id: flight.booking_token,
          departure_time: flight.departure_time,
          arrival_time: flight.arrival_time,
          stops: flight.flights.length - 1,
          segments: flight.flights.map((segment: any) => ({
            airline: {
              name: segment.airline,
              code: segment.flight_number.split(' ')[0]
            },
            departure: {
              code: segment.departure_airport.airport_code,
              name: segment.departure_airport.airport_name,
              time: segment.departure_airport.time || segment.departure_time
            },
            arrival: {
              code: segment.arrival_airport.airport_code,
              name: segment.arrival_airport.airport_name,
              time: segment.arrival_airport.time || segment.arrival_time
            },
            duration: segment.duration?.text || '',
            aircraft: segment.aircraft || '',
            seat: {
              type: segment.seat || '',
              legroom: segment.legroom || ''
            }
          })),
          price: {
            amount: Math.round(flight.price * (1 + MARKUP_PERCENTAGE) * totalPassengers),
            currency: 'NGN'
          },
          route: {
            from: {
              code: flight.flights[0].departure_airport.airport_code,
              name: flight.flights[0].departure_airport.airport_name
            },
            to: {
              code: flight.flights[0].arrival_airport.airport_code,
              name: flight.flights[0].arrival_airport.airport_name
            },
            duration: flight.duration.text
          },
          airline: {
            name: flight.flights[0].airline,
            code: flight.flights[0].flight_number.split(' ')[0]
          }
        }));
        setReturnCategorizedFlights(categorizeFlights(processedFlights));
      }
    } catch (err) {
      setError('Failed to fetch return flights. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const fetchFlights = async () => {
      setIsLoading(true);
      setError(null);
      setSelectedDeparture(null);
      setReturnCategorizedFlights({
        morning: null,
        afternoon: null,
        evening: null,
        night: null
      });

      // For initial search, don't include return_date even for round trips
      const params: SearchParams = {
        trip_type: searchParams.get('trip_type') as 'oneway' | 'roundtrip',
        departure_id: searchParams.get('departure_id') || '',
        arrival_id: searchParams.get('arrival_id') || '',
        outbound_date: searchParams.get('outbound_date') || '',
        travel_class: searchParams.get('travel_class') as any || 'ECONOMY',
        adults: searchParams.get('adults') || '1',
        children: searchParams.get('children') || '0'
      };

      try {
        const response = await searchFlights(params);
        if (response.error) {
          setError(response.error);
        } else {
          const processedFlights = response.data.itineraries.otherFlights
            .filter(flight => flight.price !== "unavailable")
            .map(flight => ({
            id: flight.booking_token,
            departure_time: flight.departure_time,
            raw_departure_time: new Date(flight.departure_time).getTime(),
            arrival_time: flight.arrival_time,
            stops: flight.flights.length - 1,
            segments: flight.flights.map((segment: any) => ({
              airline: {
                name: segment.airline,
                code: segment.flight_number.split(' ')[0]
              },
              departure: {
                code: segment.departure_airport.airport_code,
                name: segment.departure_airport.airport_name,
                time: segment.departure_airport.time || segment.departure_time
              },
              arrival: {
                code: segment.arrival_airport.airport_code,
                name: segment.arrival_airport.airport_name,
                time: segment.arrival_airport.time || segment.arrival_time
              },
              duration: segment.duration?.text || '',
              aircraft: segment.aircraft || '',
              seat: {
                type: segment.seat || '',
                legroom: segment.legroom || ''
              }
            })),
            price: {
              amount: Math.round(flight.price * (1 + MARKUP_PERCENTAGE) * totalPassengers),
              currency: 'NGN'
            },
            route: {
              from: {
                code: flight.flights[0].departure_airport.airport_code,
                name: flight.flights[0].departure_airport.airport_name
              },
              to: {
                code: flight.flights[0].arrival_airport.airport_code,
                name: flight.flights[0].arrival_airport.airport_name
              },
              duration: flight.duration.text
            },
            airline: {
              name: flight.flights[0].airline,
              code: flight.flights[0].flight_number.split(' ')[0]
            }
          }));
          setCategorizedFlights(categorizeFlights(processedFlights));
          setAllFlights(processedFlights.sort((a, b) => a.raw_departure_time - b.raw_departure_time));
        }
      } catch (err) {
        setError('Failed to fetch flights. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlights();
  }, [searchParams]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-12 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform" />
        Back to Search
      </button>

      <h1 className="text-4xl font-bold text-center mb-3 bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
        {selectedDeparture ? 'Choose Your Return Journey' : 'Find Your Outbound Flight'}
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto text-lg leading-relaxed">
        {selectedDeparture 
          ? "You're halfway there! Now let's find you the perfect return flight to complete your journey."
          : "We've curated the best flight options based on comfort, timing, and value. Here's what we recommend for you."}
      </p>

      {selectedDeparture && (
        <div className="max-w-5xl mx-auto mb-12">
          <SelectedFlight
            flight={selectedDeparture}
            expandedFlights={expandedFlights}
            setExpandedFlights={setExpandedFlights}
          />
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-100 border-t-blue-600"></div>
        </div>
      )}

      {error && (
        <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 text-center">
          {error}
        </div>
      )}
      
      {!isLoading && !error && Object.values(selectedDeparture ? returnCategorizedFlights : categorizedFlights).every(f => f === null) && (
        <div className="max-w-2xl mx-auto text-center py-16 bg-blue-50/50 rounded-xl border border-blue-100">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">No Flights Available</h2>
          <p className="text-gray-600 text-lg mb-6">
            We couldn't find any flights for your selected date. Try searching for a different date - you might find better options!
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Search Different Dates
          </button>
        </div>
      )}
      
      {!isLoading && !error && (
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="md:col-span-2 mb-6">
            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={() => setExpandedFlights(prev => ({
                  ...prev,
                  recommendations: !prev.recommendations
                }))}
                className="text-blue-600 hover:text-blue-800 transition-colors text-sm flex items-center gap-1 group"
              >
                Why am I seeing these options?
                {expandedFlights.recommendations ? (
                  <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                ) : (
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                )}
              </button>
            </div>
            {expandedFlights.recommendations && (
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-100/50 animate-fadeIn">
                <h2 className="text-2xl font-semibold text-blue-900 mb-3">Personalized Flight Selection</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We've done the hard work for you. Each recommendation is carefully chosen based on the perfect balance 
                  of departure time, price, and convenience. Choose the time that works best for your schedule.
                </p>
              </div>
            )}
          </div>
          {Object.entries(selectedDeparture ? returnCategorizedFlights : categorizedFlights).map(([category, flight]) => flight && (
            <TimeBasedFlightCard
              key={category}
              category={category}
              flight={flight}
              currentTimeCategory={getTimeCategory(new Date())}
              onSelect={(flight) => {
                if (flight.price.amount === "unavailable") {
                  window.location.href = 'https://flightpadi.com/contact';
                } else {
                  selectedDeparture ? handleBooking(selectedDeparture, flight) : handleSelectDeparture(flight);
                }
              }}
              expandedFlights={expandedFlights}
              setExpandedFlights={setExpandedFlights}
              selectedDeparture={selectedDeparture}
              isRoundTrip={isRoundTrip}
            />
          ))}
        </div>
      )}
      
      {!isLoading && !error && allFlights.length > 0 && (
        <AllFlights
          flights={selectedDeparture ? Object.values(returnCategorizedFlights).flatMap(flight => flight ? [flight] : []) : allFlights}
          showAllFlights={showAllFlights}
          setShowAllFlights={setShowAllFlights}
          onSelect={(flight) => selectedDeparture ? handleBooking(selectedDeparture, flight) : handleSelectDeparture(flight)}
          expandedFlights={expandedFlights}
          setExpandedFlights={setExpandedFlights}
          selectedDeparture={selectedDeparture}
          isRoundTrip={isRoundTrip}
        />
      )}
    </div>
  );
};

export default SearchResults