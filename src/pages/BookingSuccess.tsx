import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Plane, Globe, FileCheck, MapPin, Calendar } from 'lucide-react';

const BookingSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const destinationCity = location.state?.destinationCity || 'your destination';
  const isInternational = location.state?.isInternational || false;
  const continent = location.state?.continent || '';
  const country = location.state?.country || '';
  const bookingId = location.state?.bookingId;

  const getDestinationUrl = () => {
    if (isInternational) {
      return `https://flightpadi.com/visit/${continent}/${country.toLowerCase().replace(/\s+/g, '-')}`;
    }
    return `https://flightpadi.com/destination/${destinationCity.toLowerCase().replace(/\s+/g, '-')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-8">
      <div className="max-w-6xl mx-auto mt-12">
        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left Side - Success Message */}
          <div className="space-y-6">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <h1 className="text-4xl font-bold text-gray-900">
              Your Journey to {destinationCity} Awaits!
            </h1>
            <div className="prose prose-lg text-gray-600">
              <p>
                Great news! Your flight has been booked successfully. We've sent all the details to your email.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Booking Reference: <span className="font-mono font-medium">{bookingId}</span>
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Tip: Don't forget to check your spam folder if you don't see the email in your inbox.
              </p>
            </div>
            <button
              onClick={() => window.location.href = getDestinationUrl()}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors group"
            >
              <Plane className="w-5 h-5 mr-2" />
              Explore {destinationCity}
            </button>
          </div>

          {/* Right Side - Destination Postcard */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform"></div>
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transform -rotate-1 group-hover:-rotate-2 transition-transform">
              <div 
                className="h-64 bg-cover bg-center" 
                style={{
                  backgroundImage: `url(https://flightpadi.com/wp-content/uploads/${destinationCity.toLowerCase().replace(/\s+/g, '-')}.png)`
                }}
              ></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">{destinationCity}</h2>
                  </div>
                  <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    Confirmed
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Get ready for an unforgettable experience in {destinationCity}! We've put together some 
                  recommendations to make your trip even more special.
                </p>
                {/* Travel Guide Link */}
                <a
                  href="https://holiday.flightpadi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  I want to explore
                  <ArrowLeft className="w-4 h-4 ml-1 transform rotate-180" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Additional Services */}
        <div className="border-t border-gray-200 pt-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Get More from Flightpadi
          </h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            <a
              href="https://flightpadi.com/visa-assistance"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <FileCheck className="w-8 h-8 text-green-600 mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Visa Assistance</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Fast-track your visa application with our expert guidance.
                </p>
                <span className="text-green-600 text-sm group-hover:underline">Get started</span>
              </div>
            </a>

            <a
              href="https://flightpadi.com/yellow-card"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <Calendar className="w-8 h-8 text-yellow-600 mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Yellow Card</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Get your vaccination certificate quickly and easily.
                </p>
                <span className="text-yellow-600 text-sm group-hover:underline">Apply now</span>
              </div>
            </a>

            <a
              href="https://flightpadi.com/passport"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <Globe className="w-8 h-8 text-blue-600 mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Passport Application</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Apply for or renew your passport (For Nigerians).
                </p>
                <span className="text-blue-600 text-sm group-hover:underline">Learn more</span>
              </div>
            </a>

            <a
              href="https://flightpadi.com/flight-refunds"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <FileCheck className="w-8 h-8 text-indigo-600 mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Flight Refunds</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Get help with flight ticket refunds and claims.
                </p>
                <span className="text-indigo-600 text-sm group-hover:underline">Start claim</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;