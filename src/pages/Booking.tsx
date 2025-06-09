import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import TripSummaryCard from '../components/booking/TripSummaryCard';
import FlightDetailsCard from '../components/booking/FlightDetailsCard';
import PassengerFormComponent from '../components/booking/PassengerFormComponent';

interface PassengerForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
}

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const departureFlight = location.state?.departureFlight;
  const destinationCity = location.state?.destinationCity;
  const returnFlight = location.state?.returnFlight;
  const totalPassengers = parseInt(location.state?.totalPassengers) || 1;
  const isRoundTrip = !!returnFlight;
  const [expandedForms, setExpandedForms] = React.useState<number[]>([0]);
  const [expandedFlights, setExpandedFlights] = React.useState<{ [key: string]: boolean }>({
    flightDetails: false
  });
  const [isProcessing, setIsProcessing] = React.useState(false);

  const [passengerForms, setPassengerForms] = React.useState<PassengerForm[]>(
    Array(totalPassengers).fill({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      nationality: ''
    })
  );
  const bookingId = React.useMemo(() => uuidv4(), []); 
  const totalAmount = departureFlight.price.amount + (returnFlight?.price.amount || 0);

  React.useEffect(() => {
    if (!departureFlight) {
      navigate('/');
    }
  }, [departureFlight, navigate]);

  if (!departureFlight) {
    return null;
  }

  const handleFormChange = (index: number, field: keyof PassengerForm, value: string) => {
    setPassengerForms(prev => {
      const newForms = [...prev];
      newForms[index] = { ...newForms[index], [field]: value };
      return newForms;
    });
  };

  const toggleForm = (index: number) => {
    setExpandedForms(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const sendBookingToWebhook = async (bookingData: any) => {
    try {
      const response = await fetch('https://hook.eu2.make.com/7fgwmvnmyqp2v8svvskubklc33cb78t1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorMessage = `Webhook failed with status: ${response.status}`;

        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Failed to send booking data: ${response.status}`);
        } else {
          const errorText = await response.text();
          throw new Error(`Failed to send booking data: ${errorText || response.status}`);
        }
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        const text = await response.text();
        return { success: true, message: text };
      }
    } catch (error) {
      console.error('Error sending booking data:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const primaryPassenger = passengerForms[0];
    if (!primaryPassenger.email || !primaryPassenger.phone) {
      alert('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);

    try {
      // Store booking details in sessionStorage for verification
      sessionStorage.setItem('bookingDetails', JSON.stringify({
        bookingId,
        destinationCity,
        isInternational: !!returnFlight,
        bookingData: {
          customer_name: `${primaryPassenger.firstName} ${primaryPassenger.lastName}`,
          customer_email: primaryPassenger.email,
          customer_phone: primaryPassenger.phone,
          departure_flight: departureFlight,
          return_flight: returnFlight,
          total_passengers: totalPassengers,
          total_amount: totalAmount,
          status: 'pending',
          passengers: passengerForms
        }
      }));

      // Send booking data to webhook
      const webhookResponse = await sendBookingToWebhook({
        booking_id: bookingId,
        customer_name: `${primaryPassenger.firstName} ${primaryPassenger.lastName}`,
        customer_email: primaryPassenger.email,
        customer_phone: primaryPassenger.phone,
        departure_flight: departureFlight,
        return_flight: returnFlight,
        total_passengers: totalPassengers,
        total_amount: totalAmount,
        passengers: passengerForms,
        status: 'pending'
      });

      console.log('Webhook response:', webhookResponse);

      window.FlutterwaveCheckout({
        public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
        tx_ref: bookingId,
        amount: totalAmount,
        currency: "NGN",
        payment_options: "card,banktransfer,ussd",
        redirect_url: `${window.location.origin}/booking/verify`,
        customer: {
          email: primaryPassenger.email,
          phone_number: primaryPassenger.phone,
          name: `${primaryPassenger.firstName} ${primaryPassenger.lastName}`,
        },
        customizations: {
          title: "Flightpadi Booking",
          description: `Flight booking to ${destinationCity}`,
          logo: "https://flightpadi.com/wp-content/uploads/2024/09/flightpadi-fav.png"
        },
        callback: function(response) {
          if (response.status === "successful") {
            navigate('/booking/success', {
              state: { bookingId, destinationCity, isInternational: !!returnFlight }
            });
          } else {
            navigate('/booking/failure');
          }
        },
        onclose: function() {
          // Handle modal close
        }
      });
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Failed to initiate payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const isFormValid = () => {
    return passengerForms.every((form, index) => {
      if (index === 0) {
        return form.firstName && form.lastName && form.email && form.phone && form.dateOfBirth && form.nationality;
      } else {
        return form.firstName && form.lastName && form.dateOfBirth && form.nationality;
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-12 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform" />
        Back to Search
      </button>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-3 bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
          Your Adventure Awaits!
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto text-lg leading-relaxed animate-fadeIn">
          Get ready for your trip to {destinationCity}! Let's make your booking experience smooth and enjoyable.
        </p>
        
        <TripSummaryCard
          destinationCity={destinationCity}
          departureDate={departureFlight.date}
          totalPassengers={totalPassengers}
          isRoundTrip={isRoundTrip}
        />

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100">
          <FlightDetailsCard
            departureFlight={departureFlight}
            returnFlight={returnFlight}
            isRoundTrip={isRoundTrip}
            expandedFlights={expandedFlights}
            setExpandedFlights={setExpandedFlights}
            totalPassengers={totalPassengers}
          />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Passenger Information</h3>
            
            {passengerForms.map((form, index) => (
              <PassengerFormComponent
                key={index}
                form={form}
                index={index}
                expandedForms={expandedForms}
                handleFormChange={handleFormChange}
                toggleForm={toggleForm}
              />
            ))}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-xl font-medium hover:from-blue-700 hover:to-blue-600 transition-all duration-300 mt-8 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transform hover:-translate-y-0.5"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : (
                'Proceed to Payment'
              )}
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking