# Online Booking Portal (MERN Stack)

## Features
- User registration & login
- Book resources/appointments
- Payment integration (Stripe)
- Email notifications
- View and cancel bookings

## Tech Stack
- **Frontend:** React, Material-UI, Stripe.js
- **Backend:** Node.js, Express, MongoDB, Stripe, Nodemailer

## Setup Instructions

### 1. Clone the repository

```
git clone <repo-url>
cd online-booking-portal
```

### 2. Backend Setup

```
cd backend
npm install
```

- Create a `.env` file in `backend/` with:
  - `PORT=5000`
  - `MONGO_URI=your_mongodb_connection_string`
  - `JWT_SECRET=your_jwt_secret`
  - `STRIPE_SECRET_KEY=your_stripe_secret_key`
  - `EMAIL_USER=your_email@gmail.com`
  - `EMAIL_PASS=your_email_password`

```
npm run dev
```

### 3. Frontend Setup

```
cd ../frontend
npm install
```

- In `src/pages/PaymentPage.js`, replace `'your_stripe_publishable_key'` with your Stripe publishable key.

```
npm start
```

### 4. Usage
- Register and login as a user
- Book a resource and pay
- View and cancel your bookings

---

**Note:**
- Make sure MongoDB and Stripe credentials are correct.
- For emails, use Gmail or any SMTP provider.
- For production, set up environment variables securely. 
