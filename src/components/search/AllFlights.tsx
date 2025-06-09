import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import FlightCard from './FlightCard';

interface AllFlightsProps {
  flights: any[];
  showAllFlights: boolean;
  setShowAllFlights: React.Dispatch<React.SetStateAction<boolean>>;
  onSelect: (flight: any) => void;
  expandedFlights: { [key: string]: boolean };
  setExpandedFlights: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  selectedDeparture?: any;
  isRoundTrip: boolean;
}

const AllFlights: React.FC<AllFlightsProps> = ({
  flights,
  showAllFlights,
  setShowAllFlights,
  onSelect,
  expandedFlights,
  setExpandedFlights,
  selectedDeparture,
  isRoundTrip
}) => {
  return (
    <div className="mt-8">
      <button
        onClick={() => setShowAllFlights(!showAllFlights)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mx-auto"
      >
        {showAllFlights ? (
          <>
            <ChevronUp className="w-5 h-5" />
            Hide all flights
          </>
        ) : (
          <>
            <ChevronDown className="w-5 h-5" />
            Show all available flights ({flights.length})
          </>
        )}
      </button>
      
      {showAllFlights && (
        <div className="mt-6 space-y-4">
          {flights.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              onSelect={onSelect}
              expandedFlights={expandedFlights}
              setExpandedFlights={setExpandedFlights}
              selectedDeparture={selectedDeparture}
              isRoundTrip={isRoundTrip}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllFlights;