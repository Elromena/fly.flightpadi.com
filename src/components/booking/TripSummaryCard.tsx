import React from 'react';
import { MapPin, Calendar, User, ArrowRightLeft } from 'lucide-react';

interface TripSummaryCardProps {
  destinationCity: string;
  departureDate: string;
  totalPassengers: number;
  isRoundTrip: boolean;
}

const TripSummaryCard: React.FC<TripSummaryCardProps> = ({
  destinationCity,
  departureDate,
  totalPassengers,
  isRoundTrip
}) => {
  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <div className="flex items-center gap-2 text-blue-200 mb-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Destination</span>
          </div>
          <p className="font-semibold">{destinationCity}</p>
        </div>
        <div>
          <div className="flex items-center gap-2 text-blue-200 mb-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Travel Date</span>
          </div>
          <p className="font-semibold">{departureDate}</p>
        </div>
        <div>
          <div className="flex items-center gap-2 text-blue-200 mb-2">
            <User className="w-4 h-4" />
            <span className="text-sm">Passengers</span>
          </div>
          <p className="font-semibold">{totalPassengers} {totalPassengers === 1 ? 'Person' : 'People'}</p>
        </div>
        <div>
          <div className="flex items-center gap-2 text-blue-200 mb-2">
            <ArrowRightLeft className="w-4 h-4" />
            <span className="text-sm">Trip Type</span>
          </div>
          <p className="font-semibold">{isRoundTrip ? 'Round Trip' : 'One Way'}</p>
        </div>
      </div>
    </div>
  );
};

export default TripSummaryCard;