import { loadStripe } from '@stripe/stripe-js';

// Replace with your Stripe publishable key
const stripePublishableKey = 'pk_live_51N1TaaI1AqaCg5XB6Nkkwp3p2pniepBJSwjiWm4HSZKo4RB2spYXObRptH8bpzLQrevjf8G2Qbh4bVdLHY4aZIBw00uwluuEDh';

// Initialize the Stripe instance
export const stripePromise = loadStripe(stripePublishableKey);

// Function to create a checkout session
export const createCheckoutSession = async (priceId: string) => {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
      }),
    });

    const session = await response.json();
    return session;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}; 