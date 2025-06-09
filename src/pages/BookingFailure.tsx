import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft, AlertCircle, PhoneCall, Mail } from 'lucide-react';

const BookingFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 p-4">
      <button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Search
      </button>

      <div className="max-w-4xl mx-auto mt-20">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something Went Wrong</h1>
            <p className="text-gray-600 mb-8">
              We encountered an issue while processing your booking. Don't worry - no payment has been processed,
              and we're here to help you complete your reservation.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-red-50 rounded-xl p-6">
                <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Common Issues</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Temporary system unavailability</li>
                  <li>• Network connectivity problems</li>
                  <li>• Payment processing issues</li>
                  <li>• Session timeout</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <PhoneCall className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Need Immediate Assistance?</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>Our support team is available 24/7</p>
                  <a 
                    href="tel:+2348012345678"
                    className="block text-blue-600 hover:text-blue-800 font-medium"
                  >
                    +234 801 234 5678
                  </a>
                  <a
                    href="mailto:support@flightpadi.com"
                    className="flex items-center justify-center gap-1 text-blue-600 hover:text-blue-800"
                  >
                    <Mail className="w-4 h-4" />
                    support@flightpadi.com
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => navigate('/')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Try Booking Again
              </button>
              <a
                href="https://flightpadi.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFailure;