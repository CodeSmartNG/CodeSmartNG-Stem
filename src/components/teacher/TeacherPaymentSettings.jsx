import React, { useState } from 'react';
import TeacherBankAccount from './TeacherBankAccount';
import TeacherEarnings from './TeacherEarnings';
import './TeacherPayment.css';

const TeacherPaymentSettings = ({ teacher, updateTeacher }) => {
  const [activeTab, setActiveTab] = useState('bank');

  const handleBankUpdate = (bankAccount) => {
    updateTeacher({
      ...teacher,
      bankAccount
    });
  };

  const handlePricingUpdate = (pricing) => {
    updateTeacher({
      ...teacher,
      lessonPricing: pricing
    });
  };

  return (
    <div className="teacher-payment-settings">
      <h2>💰 Payment Settings</h2>
      
      <div className="payment-tabs">
        <button 
          className={`tab-btn ${activeTab === 'bank' ? 'active' : ''}`}
          onClick={() => setActiveTab('bank')}
        >
          🏦 Bank Account
        </button>
        <button 
          className={`tab-btn ${activeTab === 'earnings' ? 'active' : ''}`}
          onClick={() => setActiveTab('earnings')}
        >
          💰 Earnings
        </button>
        <button 
          className={`tab-btn ${activeTab === 'pricing' ? 'active' : ''}`}
          onClick={() => setActiveTab('pricing')}
        >
          💵 Lesson Pricing
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'bank' && (
          <TeacherBankAccount 
            teacher={teacher} 
            onUpdate={handleBankUpdate}
          />
        )}
        
        {activeTab === 'earnings' && (
          <TeacherEarnings teacher={teacher} />
        )}
        
        {activeTab === 'pricing' && (
          <LessonPricing 
            teacher={teacher}
            onUpdate={handlePricingUpdate}
          />
        )}
      </div>
    </div>
  );
};

// Additional component for lesson pricing
const LessonPricing = ({ teacher, onUpdate }) => {
  const [pricing, setPricing] = useState(teacher?.lessonPricing || {
    defaultPrice: 500,
    advancedPrice: 1000,
    premiumPrice: 2000
  });

  const savePricing = () => {
    onUpdate(pricing);
    alert('Pricing updated successfully!');
  };

  return (
    <div className="lesson-pricing">
      <h3>💵 Set Lesson Prices</h3>
      <p>Define how much students pay for your lessons.</p>
      
      <div className="pricing-options">
        <div className="price-option">
          <label>Basic Lessons:</label>
          <div className="price-input">
            <span>₦</span>
            <input
              type="number"
              value={pricing.defaultPrice}
              onChange={(e) => setPricing(prev => ({
                ...prev,
                defaultPrice: parseInt(e.target.value) || 0
              }))}
              min="100"
            />
          </div>
        </div>
        
        <div className="price-option">
          <label>Advanced Lessons:</label>
          <div className="price-input">
            <span>₦</span>
            <input
              type="number"
              value={pricing.advancedPrice}
              onChange={(e) => setPricing(prev => ({
                ...prev,
                advancedPrice: parseInt(e.target.value) || 0
              }))}
              min="100"
            />
          </div>
        </div>
        
        <div className="price-option">
          <label>Premium Lessons:</label>
          <div className="price-input">
            <span>₦</span>
            <input
              type="number"
              value={pricing.premiumPrice}
              onChange={(e) => setPricing(prev => ({
                ...prev,
                premiumPrice: parseInt(e.target.value) || 0
              }))}
              min="100"
            />
          </div>
        </div>
      </div>
      
      <button onClick={savePricing} className="save-pricing-btn">
        Save Pricing
      </button>
    </div>
  );
};

export default TeacherPaymentSettings;