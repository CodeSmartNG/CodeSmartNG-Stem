import React from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

const FlutterwavePayment = ({ lesson, student, onSuccess, onClose }) => {
  const config = {
    public_key: process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: Date.now().toString(),
    amount: lesson.price,
    currency: 'NGN',
    payment_options: 'card, banktransfer, ussd, mobilemoney',
    customer: {
      email: student.email || 'student@example.com',
      phonenumber: student.phone || '08012345678',
      name: student.name,
    },
    customizations: {
      title: 'STEM Courses',
      description: `Payment for ${lesson.title}`,
      logo: '/logo.png',
    },
  };

  const handlePayment = () => {
    return (
      <FlutterWaveButton
        {...config}
        text={`Pay ₦${lesson.price} with Flutterwave`}
        className="payment-btn flutterwave-btn"
        callback={async (response) => {
          console.log('Payment response:', response);
          if (response.status === 'successful') {
            await onSuccess({
              paymentId: response.transaction_id,
              gateway: 'flutterwave',
              amount: lesson.price,
              lessonId: lesson.id
            });
          }
          closePaymentModal();
        }}
        onClose={onClose}
      />
    );
  };

  return (
    <div className="flutterwave-payment">
      {handlePayment()}
      <p className="payment-note">
        Supports OPay, PalmPay, Bank Transfer, and Mobile Money
      </p>
    </div>
  );
};

export default FlutterwavePayment;