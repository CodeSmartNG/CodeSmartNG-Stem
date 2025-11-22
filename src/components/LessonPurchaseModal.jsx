import React from 'react';
import './LessonPurchaseModal.css';

const LessonPurchaseModal = ({ lesson, course, isOpen, onClose, onPurchase }) => {
  if (!isOpen) return null;

  return (
    <div className="purchase-modal-overlay">
      <div className="purchase-modal">
        <div className="purchase-header">
          <h3>🔒 Purchase Lesson Access</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="lesson-info">
          <h4>{lesson.title}</h4>
          <p><strong>Course:</strong> {course.title}</p>
          <p><strong>Duration:</strong> {lesson.duration}</p>
          {lesson.content && (
            <p className="lesson-preview">{lesson.content.substring(0, 150)}...</p>
          )}
        </div>

        <div className="pricing-section">
          <div className="price">$9.99</div>
          <p className="price-description">One-time payment for lifetime access</p>
          <ul className="features-list">
            <li>✅ Full lesson content access</li>
            <li>✅ Downloadable materials</li>
            <li>✅ Lifetime updates</li>
            <li>✅ Certificate eligibility</li>
          </ul>
        </div>

        <div className="purchase-actions">
          <button 
            className="purchase-btn"
            onClick={onPurchase}
          >
            🔓 Purchase & Unlock Lesson
          </button>
          <button 
            className="cancel-btn"
            onClick={onClose}
          >
            Maybe Later
          </button>
        </div>

        <div className="security-notice">
          <small>🔒 Secure payment • 30-day money-back guarantee</small>
        </div>
      </div>
    </div>
  );
};

export default LessonPurchaseModal;