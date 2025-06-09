import React from 'react';
import { Plane, Calendar, ArrowRight, Clock, Info, ChevronUp, ChevronDown } from 'lucide-react';
import { formatTime, parseDateTime } from '../../utils/dateTime';

interface SelectedFlightProps {
  flight: any;
  expandedFlights: { [key: string]: boolean };
  setExpandedFlights: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
}

const SelectedFlight: React.FC<SelectedFlightProps> = ({
  flight,
  expandedFlights,
  setExpandedFlights
}) => {
  const toggleFlightDetails = () => {
    setExpandedFlights(prev => ({
      ...prev,
      selectedDeparture: !prev.selectedDeparture
    }));
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
    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
      <h2 className="font-semibold text-blue-900 mb-2">Selected Departure Flight</h2>
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white rounded-full">
            <Plane className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="font-medium">{flight.airline.name}</p>
            <div className="flex items-center gap-3 text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatTime(parseDateTime(flight.segments[0].departure.time))}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{flight.segments[0].departure.code}</span>
                <ArrowRight className="w-4 h-4" />
                <span>{flight.segments[flight.segments.length - 1].arrival.code}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {formatTime(parseDateTime(flight.segments[flight.segments.length - 1].arrival.time))}
                </span>
              </div>
            </div>
            <div className="text-sm mt-1">
              <span className={`inline-block px-2 py-0.5 rounded ${
                flight.stops === 0 
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {flight.stops === 0 ? 'Direct Flight' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600">{flight.route.duration}</span>
            {flight.segments.length > 1 && (
              <span className="text-sm text-gray-500">
                • {flight.segments.length - 1} {flight.segments.length - 1 === 1 ? 'stop' : 'stops'}
              </span>
            )}
          </div>
          <p className="font-semibold">₦{flight.price.amount.toLocaleString()}</p>
        </div>
      </div>

      {flight.segments.length > 1 && (
        <>
          <button
            type="button"
            onClick={toggleFlightDetails}
            className="mt-4 text-blue-600 hover:text-blue-800 transition-colors text-sm flex items-center gap-1"
          >
            <Info className="w-4 h-4" />
            Flight Details
            {expandedFlights.selectedDeparture ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {expandedFlights.selectedDeparture && (
            <div className="mt-4 pt-4 border-t border-blue-200">
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
        </>
      )}
    </div>
  );
};

export default SelectedFlight;