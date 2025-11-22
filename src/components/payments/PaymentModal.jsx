import React, { useState } from 'react';
import PaystackPayment from './PaystackPayment';
import FlutterwavePayment from './FlutterwavePayment';
import MonnifyPayment from './MonnifyPayment';
import './PaymentModal.css';

const PaymentModal = ({ isOpen, onClose, lesson, student, onPaymentSuccess }) => {
  const [selectedMethod, setSelectedMethod] = useState('paystack');

  if (!isOpen) return null;

  const paymentMethods = [
    { 
      id: 'paystack', 
      name: 'Paystack', 
      description: 'Card, Bank Transfer, USSD',
      icon: '🏦'
    },
    { 
      id: 'flutterwave', 
      name: 'Flutterwave', 
      description: 'OPay, PalmPay, Mobile Money',
      icon: '📱'
    },
    { 
      id: 'monnify', 
      name: 'Monnify', 
      description: 'Direct Bank Transfer',
      icon: '💳'
    }
  ];

  return (
    <div className="modal-overlay">
      <div className="payment-modal nigerian-payment">
        <div className="payment-header">
          <h3>🔒 Unlock Lesson</h3>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <div className="lesson-info">
          <h4>{lesson.title}</h4>
          <p className="price">Price: <strong>₦{lesson.price}</strong></p>
          <p className="description">{lesson.description}</p>
        </div>

        <div className="payment-methods">
          <h4>Choose Payment Method:</h4>
          {paymentMethods.map(method => (
            <label key={method.id} className="payment-option">
              <input
                type="radio"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={(e) => setSelectedMethod(e.target.value)}
              />
              <span className="method-icon">{method.icon}</span>
              <div className="method-info">
                <span className="method-name">{method.name}</span>
                <span className="method-desc">{method.description}</span>
              </div>
            </label>
          ))}
        </div>

        <div className="payment-form">
          {selectedMethod === 'paystack' && (
            <PaystackPayment 
              lesson={lesson} 
              student={student} 
              onSuccess={onPaymentSuccess}
              onClose={onClose}
            />
          )}
          {selectedMethod === 'flutterwave' && (
            <FlutterwavePayment 
              lesson={lesson} 
              student={student} 
              onSuccess={onPaymentSuccess}
              onClose={onClose}
            />
          )}
          {selectedMethod === 'monnify' && (
            <MonnifyPayment 
              lesson={lesson} 
              student={student} 
              onSuccess={onPaymentSuccess}
              onClose={onClose}
            />
          )}
        </div>

        <div className="payment-security">
          <p>🔒 Secure payment powered by Nigerian banking infrastructure</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;