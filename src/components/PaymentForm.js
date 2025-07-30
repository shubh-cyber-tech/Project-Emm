import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const booking = JSON.parse(localStorage.getItem('booking'));
    const token = localStorage.getItem('token');
    try {
      // Create payment intent
      const { data } = await axios.post('http://localhost:5000/api/payment/create-payment-intent', {
        amount: 1000 // $10, for example
      }, { headers: { Authorization: token } });

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        // Payment successful, create booking
        await axios.post('http://localhost:5000/api/bookings', {
          resourceId: booking.resourceId,
          slot: booking.slot
        }, { headers: { Authorization: token } });
        navigate('/my-bookings');
      }
    } catch (err) {
      setError('Payment failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5">Payment</Typography>
      <CardElement />
      <Button type="submit" variant="contained" style={{ marginTop: 16 }}>Pay</Button>
      {error && <Typography color="error">{error}</Typography>}
    </form>
  );
};

export default PaymentForm; 