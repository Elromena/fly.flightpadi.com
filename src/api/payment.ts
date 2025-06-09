const FLUTTERWAVE_API_URL = 'https://api.flutterwave.com/v3/payments';

interface PaymentDetails {
  tx_ref: string;
  amount: number;
  currency: string;
  redirect_url: string;
  customer: {
    email: string;
    name: string;
    phonenumber: string;
  };
  customizations: {
    title: string;
    description: string;
    logo: string;
  };
}

export async function createPayment(details: PaymentDetails) {
  try {
    const response = await fetch(FLUTTERWAVE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_FLUTTERWAVE_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...details,
        payment_options: "card,banktransfer,ussd"
      })
    });

    if (!response.ok) {
      throw new Error('Payment initiation failed');
    }

    const data = await response.json();
    return data.data.link;
  } catch (error) {
    console.error('Payment error:', error);
    throw error;
  }
}