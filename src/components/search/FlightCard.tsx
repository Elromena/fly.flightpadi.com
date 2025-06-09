import React from 'react';
import { Clock, Plane, ArrowRight, DollarSign, Info, ChevronUp, ChevronDown } from 'lucide-react';
import { formatTime, parseDateTime } from '../../utils/dateTime';

interface FlightCardProps {
  flight: any;
  isSelected?: boolean;
  onSelect: (flight: any) => void;
  expandedFlights: { [key: string]: boolean };
  setExpandedFlights: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  selectedDeparture?: any;
  isRoundTrip: boolean;
}

const FlightCard: React.FC<FlightCardProps> = ({
  flight,
  isSelected,
  onSelect,
  expandedFlights,
  setExpandedFlights,
  selectedDeparture,
  isRoundTrip
}) => {
  const toggleFlightDetails = () => {
    setExpandedFlights(prev => ({
      ...prev,
      [flight.id]: !prev[flight.id]
    }));
  };

  const getButtonText = () => {
    if (flight.price.amount === "unavailable") {
      return 'Call to Book';
    }
    if (selectedDeparture) {
      return 'Select & Book';
    }
    return isRoundTrip ? 'Select Departure' : 'Select & Book';
  };

  const calculateLayoverDuration = (currentSegment: any, nextSegment: any) => {
    const currentArrival = new Date(currentSegment.arrival.time);
    const nextDeparture = new Date(nextSegment.departure.time);
    const diffMinutes = Math.floor((nextDeparture.getTime() - currentArrival.getTime()) / (1000 * 60));
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 rounded-full">
              <Plane className="w-5 h-5 text-blue-600" />
            </div>
            <span className="font-medium">{flight.airline.name}</span>
          </div>
          <span className="text-sm text-gray-500">{flight.airline.code}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Departure</p>
            <p className="font-semibold">{formatTime(parseDateTime(flight.segments[0].departure.time))}</p>
            <p className="text-sm">{flight.segments[0].departure.code}</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Clock className="w-4 h-4 text-gray-400 mb-1" />
            <p className="text-sm text-gray-500">{flight.route.duration}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Arrival</p>
            <p className="font-semibold">
              {formatTime(parseDateTime(flight.segments[flight.segments.length - 1].arrival.time))}
            </p>
            <p className="text-sm">{flight.segments[flight.segments.length - 1].arrival.code}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className={`text-sm px-2 py-1 rounded-full ${
            flight.stops === 0 
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}>
            {flight.stops === 0 ? 'Direct Flight' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}
          </span>
          <div className="flex items-center gap-1">
            {flight.price.amount === "unavailable" ? (
              <span className="text-blue-600 font-medium">Possibly cheaper</span>
            ) : (
              <span className="font-semibold">₦ {Math.round(flight.price.amount).toLocaleString()}</span>
            )}
          </div>
        </div>

        {flight.segments.length > 1 && (
          <div className="mb-4">
            <button
              type="button"
              onClick={toggleFlightDetails}
              className="text-blue-600 hover:text-blue-800 transition-colors text-sm flex items-center gap-1 w-full justify-center"
            >
              <Info className="w-4 h-4" />
              Flight Details
              {expandedFlights[flight.id] ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        )}

        <button
          onClick={() => onSelect(flight)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {getButtonText()}
        </button>
      </div>

      {expandedFlights[flight.id] && flight.segments.length > 1 && (
        <div className="mt-4 pt-4 border-t border-gray-200 px-4 pb-4">
          <div className="space-y-4">
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
        </div>
      )}
    </div>
  );
};

export default FlightCard;