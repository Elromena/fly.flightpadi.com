import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const VerifyPayment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const transaction_id = searchParams.get('transaction_id');
  const [state, setState] = React.useState<{
    isProcessing: boolean;
    error: string | null;
  }>({
    isProcessing: true,
    error: null
  });

  React.useEffect(() => {
    const verifyAndProcessBooking = async () => {
      try {
        const bookingDetails = sessionStorage.getItem('bookingDetails');
        if (!bookingDetails) {
          setState({ isProcessing: false, error: 'No booking details found' });
          navigate('/');
          return;
        }

        const { bookingId, destinationCity, isInternational, bookingData } = JSON.parse(bookingDetails);
        
        if (status === 'successful') {
          // Store successful booking data in localStorage for reference
          localStorage.setItem(`booking_${bookingId}`, JSON.stringify({ 
            status: 'confirmed', 
            transaction_id
          }));

          navigate('/booking/success', {
            state: { bookingId, destinationCity, isInternational }
          });
        } else {
          navigate('/booking/failure');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error('Error during payment verification:', errorMessage);
        setState(prev => ({ ...prev, error: errorMessage }));
        setTimeout(() => {
          navigate('/booking/failure', { state: { error: errorMessage } });
        }, 3000);
      } finally {
        // Clean up session storage
        sessionStorage.removeItem('bookingDetails');
        setState(prev => ({ ...prev, isProcessing: false }));
      }
    };

    verifyAndProcessBooking();
  }, [status, transaction_id, navigate, state.error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {state.isProcessing && (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-100 border-t-blue-600 mb-4"></div>
          <p className="text-gray-600">Processing your booking...</p>
        </div>
      )}
      {state.error && (
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-700">{state.error}</p>
          </div>
          <p className="text-gray-600">Redirecting to failure page...</p>
        </div>
      )}
    </div>
  );
};

export default VerifyPayment;