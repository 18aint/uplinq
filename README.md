# Uplinq - Digital UX built for scale

Uplinq is a modern web development agency website built with React, TypeScript, and Vite, featuring Stripe payment integration for pricing plans.

## Features

- Responsive design optimized for all devices
- Animated UI components using Framer Motion
- Stripe payment integration for pricing plans
- Contact form with multi-step validation
- Interactive pricing calculator
- Testimonial carousel
- Mobile-optimized navigation

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Payment Processing**: Stripe
- **Backend**: Node.js, Express
- **Routing**: React Router
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- Stripe account (for payment processing)

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd uplinq
```

2. Install frontend dependencies

```bash
npm install
```

3. Install backend dependencies

```bash
cd server
npm install
cd ..
```

### Configuration

1. Set up Stripe (see detailed instructions in `server/README.md`)
   - Create a Stripe account
   - Get API keys
   - Create products and prices
   - Update price IDs in the code

2. Configure environment variables
   - Create a `.env` file in the server directory
   - Add Stripe keys and other required variables (see server/README.md)

### Running the Application

1. Start the backend server

```bash
cd server
npm run dev
```

2. In a new terminal, start the frontend development server

```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:5173
```

## Stripe Payment Testing

When in test mode, use Stripe's test credit card numbers:

- Card number: 4242 4242 4242 4242
- Expiration date: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

More test card numbers are available in the [Stripe documentation](https://stripe.com/docs/testing).

## Folder Structure

```
uplinq/
├── public/              # Static assets
│   ├── avatars/         # User avatars for testimonials
│   └── logos/           # Company logos
├── server/              # Backend server
│   ├── src/             # Server source code
│   └── .env             # Server environment variables (create this)
└── src/                 # Frontend source code
    ├── assets/          # Frontend assets
    ├── components/      # React components
    ├── lib/             # Utility libraries
    ├── pages/           # Page components
    └── types/           # TypeScript type definitions
```

## License

[MIT License](LICENSE)
