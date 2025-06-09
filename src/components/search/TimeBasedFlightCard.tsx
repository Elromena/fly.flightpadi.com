import React from 'react';
import { Clock, Plane } from 'lucide-react';
import { TIME_CATEGORIES } from '../../utils/dateTime';
import FlightCard from './FlightCard';

interface TimeBasedFlightCardProps {
  category: string;
  flight: any;
  currentTimeCategory: string;
  onSelect: (flight: any) => void;
  expandedFlights: { [key: string]: boolean };
  setExpandedFlights: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  selectedDeparture?: any;
  isRoundTrip: boolean;
}

const TimeBasedFlightCard: React.FC<TimeBasedFlightCardProps> = ({
  category,
  flight,
  currentTimeCategory,
  onSelect,
  expandedFlights,
  setExpandedFlights,
  selectedDeparture,
  isRoundTrip
}) => {
  if (!flight) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className={`p-4 text-white ${
        category === 'morning' ? 'bg-gradient-to-r from-orange-400 to-yellow-500' :
        category === 'afternoon' ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
        category === 'evening' ? 'bg-gradient-to-r from-purple-400 to-pink-500' :
        'bg-gradient-to-r from-indigo-400 to-blue-500'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{TIME_CATEGORIES[category as keyof typeof TIME_CATEGORIES].icon}</span>
            <h3 className="font-semibold">{TIME_CATEGORIES[category as keyof typeof TIME_CATEGORIES].label}</h3>
          </div>
          <div className="text-right">
            <span className="text-sm opacity-75">
              {TIME_CATEGORIES[category as keyof typeof TIME_CATEGORIES].description}
            </span>
            <div className="text-xs mt-1 opacity-75">
              {category === 'morning' ? 'Perfect for early birds and business travelers' :
               category === 'afternoon' ? 'Ideal for leisurely departures' :
               category === 'evening' ? 'Great for after-work travel' :
               'Best rates for flexible travelers'}
            </div>
          </div>
        </div>
        {category === currentTimeCategory && (
          <div className="mt-2 text-xs bg-white/20 rounded px-2 py-1 inline-block">
            ✨ Best value for this time slot
          </div>
        )}
      </div>

      <FlightCard
        flight={flight}
        onSelect={onSelect}
        expandedFlights={expandedFlights}
        setExpandedFlights={setExpandedFlights}
        selectedDeparture={selectedDeparture}
        isRoundTrip={isRoundTrip}
      />
    </div>
  );
};

export default TimeBasedFlightCard;