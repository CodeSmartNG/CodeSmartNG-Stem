import React, { useEffect } from 'react';





const MonnifyPayment = ({ lesson, student, onSuccess, onClose }) => {
  useEffect(() => {
    // Load Monnify script
    const loadMonnifyScript = () => {
      if (!window.MonnifySDK) {
        const script = document.createElement('script');
        script.src = 'https://sdk.monnify.com/plugin/monnify.js';
        script.onload = () => console.log('Monnify SDK loaded');
        document.head.appendChild(script);
      }
    };

    loadMonnifyScript();
  }, []);

  const initializeMonnifyPayment = () => {
    if (!window.MonnifySDK) {
      alert('Monnify payment is still loading. Please try again.');
      return;
    }

    window.MonnifySDK.initialize({
      amount: lesson.price,
      currency: "NGN",
      reference: '' + Math.floor(Math.random() * 1000000000 + 1),
      customerName: student.name,
      customerEmail: student.email,
      customerMobileNumber: student.phone || '08012345678',
      apiKey: process.env.REACT_APP_MONNIFY_API_KEY,
      contractCode: process.env.REACT_APP_MONNIFY_CONTRACT_CODE,
      paymentDescription: `Payment for ${lesson.title}`,
      isTestMode: process.env.NODE_ENV === 'development',
      onComplete: function(response) {
        console.log('Payment complete', response);
        onSuccess({
          paymentId: response.transactionReference,
          gateway: 'monnify',
          amount: lesson.price,
          lessonId: lesson.id
        });
      },
      onClose: function(data) {
        console.log('Payment closed', data);
        onClose();
      }
    });
  };

  return (
    <div className="monnify-payment">
      <button 
        onClick={initializeMonnifyPayment}
        className="payment-btn monnify-btn"
      >
        Pay ₦{lesson.price} with Monnify
      </button>
      <p className="payment-note">
        Direct bank transfer and account funding
      </p>
    </div>
  );
};

export default MonnifyPayment;