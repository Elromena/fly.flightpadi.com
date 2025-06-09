import React from 'react';
import { Plane, Clock, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { parseDateTime, formatTime } from '../../utils/dateTime';

interface FlightDetailsCardProps {
  departureFlight: any;
  returnFlight?: any;
  isRoundTrip: boolean;
  expandedFlights: { [key: string]: boolean };
  setExpandedFlights: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  totalPassengers: number;
}

const FlightDetailsCard: React.FC<FlightDetailsCardProps> = ({
  departureFlight,
  returnFlight,
  isRoundTrip,
  expandedFlights,
  setExpandedFlights,
  totalPassengers
}) => {
  const toggleFlightDetails = (flightType: 'departure' | 'return') => {
    setExpandedFlights(prev => ({
      ...prev,
      [flightType]: !prev[flightType]
    }));
  };

  const calculateLayoverDuration = (currentSegment: any, nextSegment: any) => {
    const currentArrival = parseDateTime(currentSegment.arrival.time);
    const nextDeparture = parseDateTime(nextSegment.departure.time);
    const diffMinutes = Math.floor((nextDeparture.getTime() - currentArrival.getTime()) / (1000 * 60));
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const renderFlightSegments = (flight: any, type: 'departure' | 'return') => {
    if (!flight.segments || flight.segments.length <= 1) return null;

    return (
      <div className="mt-4">
        <button
          type="button"
          onClick={() => toggleFlightDetails(type)}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          {expandedFlights[type] ? (
            <ChevronUp className="w-4 h-4 mr-1" />
          ) : (
            <ChevronDown className="w-4 h-4 mr-1" />
          )}
          View Full Trip Details
        </button>

        {expandedFlights[type] && (
          <div className="mt-4 space-y-4">
            {flight.segments.map((segment: any, index: number) => (
              <div key={index} className="relative">
                {index > 0 && (
                  <div className="absolute left-6 -top-4 h-8 w-0.5 bg-gray-300"></div>
                )}
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white rounded-full border border-gray-200">
                    <Plane className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                      {segment.airline.name} {segment.airline.code}
                      <span className="text-xs text-gray-500">
                        {segment.aircraft && `• ${segment.aircraft}`}
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{segment.departure.code}</p>
                        <p className="text-xs text-gray-500">
                          {formatTime(parseDateTime(segment.departure.time))}
                        </p>
                      </div>
                      <div className="flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        {segment.duration && (
                          <p className="text-xs text-gray-500 ml-1">{segment.duration}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{segment.arrival.code}</p>
                        <p className="text-xs text-gray-500">
                          {formatTime(parseDateTime(segment.arrival.time))}
                        </p>
                      </div>
                    </div>
                    {segment.seat?.type && (
                      <p className="text-xs text-gray-500 mt-1">
                        {segment.seat.type}
                        {segment.seat.legroom && ` (${segment.seat.legroom})`}
                      </p>
                    )}
                  </div>
                </div>
                {index < flight.segments.length - 1 && (
                  <div className="ml-6 mt-2 pl-4 border-l border-gray-300">
                    <p className="text-sm text-orange-600 font-medium">
                      Layover • {calculateLayoverDuration(segment, flight.segments[index + 1])}
                    </p>
                    <p className="text-xs text-gray-500">
                      at {segment.arrival.name}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <button
        onClick={() => setExpandedFlights(prev => ({ ...prev, flightDetails: !prev.flightDetails }))}
        className="flex items-center justify-between w-full text-left mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Plane className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Flight Details</h2>
            <p className="text-sm text-gray-500">View your complete itinerary</p>
          </div>
        </div>
        {expandedFlights.flightDetails ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {expandedFlights.flightDetails && (
        <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-blue-50/50 rounded-xl border border-blue-100/50">
          {/* Departure Flight */}
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white rounded-full shadow-sm border border-blue-100">
              <Plane className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">Departure Flight</h3>
              <p className="text-gray-600">{departureFlight.airline.name} {departureFlight.airline.code}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xl font-semibold text-blue-900">{departureFlight.segments[0].departure.code}</p>
                <p className="text-gray-600">{departureFlight.segments[0].departure.name}</p>
                <p className="text-sm text-gray-500">{departureFlight.departureTime}</p>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-5 h-5 text-gray-400" />
                <p className="text-sm text-gray-500">{departureFlight.route.duration}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold text-blue-900">
                  {departureFlight.segments[departureFlight.segments.length - 1].arrival.code}
                </p>
                <p className="text-gray-600">
                  {departureFlight.segments[departureFlight.segments.length - 1].arrival.name}
                </p>
                <p className="text-sm text-gray-500">{departureFlight.arrivalTime}</p>
              </div>
            </div>
            
            <div className="border-t border-blue-100 pt-3">
              <p className="text-gray-600">{departureFlight.date}</p>
            </div>
          </div>

          {renderFlightSegments(departureFlight, 'departure')}

          {/* Return Flight */}
          {isRoundTrip && returnFlight && (
            <>
              <div className="my-4 border-t border-blue-200"></div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white rounded-full">
                  <Plane className="w-6 h-6 text-blue-600 transform rotate-180" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900">Return Flight</h3>
                  <p className="text-gray-600">{returnFlight.airline.name} {returnFlight.airline.code}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold text-blue-900">{returnFlight.segments[0].departure.code}</p>
                    <p className="text-gray-600">{returnFlight.segments[0].departure.name}</p>
                    <p className="text-sm text-gray-500">{returnFlight.departureTime}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <p className="text-sm text-gray-500">{returnFlight.route.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-blue-900">
                      {returnFlight.segments[returnFlight.segments.length - 1].arrival.code}
                    </p>
                    <p className="text-gray-600">
                      {returnFlight.segments[returnFlight.segments.length - 1].arrival.name}
                    </p>
                    <p className="text-sm text-gray-500">{returnFlight.arrivalTime}</p>
                  </div>
                </div>
                
                <div className="border-t border-blue-100 pt-3">
                  <p className="text-gray-600">{returnFlight.date}</p>
                </div>
              </div>
              {renderFlightSegments(returnFlight, 'return')}
            </>
          )}

          {/* Total Price */}
          <div className="mt-6 pt-4 border-t-2 border-blue-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold text-blue-900">Total Price</p>
                <span className="text-sm font-normal text-gray-600">
                  for {totalPassengers} {totalPassengers === 1 ? 'passenger' : 'passengers'}
                </span>
              </div>
              <p className="text-3xl font-bold text-blue-900">
                ₦ {((departureFlight.price.amount + (returnFlight?.price.amount || 0))).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FlightDetailsCard;