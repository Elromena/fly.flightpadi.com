export interface Booking {
  id: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  departure_flight: any;
  return_flight?: any;
  total_passengers: number;
  destination_city: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  total_amount: number;
  payment_status: 'pending' | 'completed' | 'failed';
  transaction_id?: string;
}