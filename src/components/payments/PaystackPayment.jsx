import React from 'react';
import { usePaystackPayment } from 'react-paystack';


touch src/components/payments/PaymentModal.jsx
touch src/components/payments/PaystackPayment.jsx
touch src/components/payments/FlutterwavePayment.jsx
touch src/components/payments/MonnifyPayment.jsx
touch src/components/payments/PaymentModal.css


const PaystackPayment = ({ lesson, student, onSuccess, onClose }) => {
  const config = {
    reference: new Date().getTime().toString(),
    email: student.email || 'student@example.com',
    amount: lesson.price * 100, // Convert to kobo
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
    currency: 'NGN',
    metadata: {
      custom_fields: [
        {
          display_name: "Student Name",
          variable_name: "student_name",
          value: student.name
        },
        {
          display_name: "Lesson",
          variable_name: "lesson_title", 
          value: lesson.title
        },
        {
          display_name: "Course",
          variable_name: "course_id",
          value: lesson.courseId
        }
      ]
    }
  };

  const initializePayment = usePaystackPayment(config);

  const handlePaymentSuccess = (reference) => {
    console.log('Payment successful:', reference);
    // You can send reference to your backend here
    onSuccess({
      paymentId: reference.reference,
      gateway: 'paystack',
      amount: lesson.price,
      lessonId: lesson.id
    });
  };

  const handlePaymentClose = () => {
    console.log('Payment closed');
    onClose();
  };

  return (
    <div className="paystack-payment">
      <button 
        onClick={() => initializePayment(handlePaymentSuccess, handlePaymentClose)}
        className="payment-btn paystack-btn"
      >
        Pay ₦{lesson.price} with Paystack
      </button>
      <p className="payment-note">
        You will be redirected to Paystack secure payment page
      </p>
    </div>
  );
};

export default PaystackPayment;