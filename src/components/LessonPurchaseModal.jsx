// components/LessonPurchaseModal.jsx
import React from 'react';

const LessonPurchaseModal = ({ lesson, course, isOpen, onClose, onPurchase }) => {
  if (!isOpen) return null;

  return (
    <div className="purchase-modal-overlay">
      <div className="purchase-modal">
        <h3>🔒 Purchase Lesson Access</h3>
        <div className="lesson-info">
          <h4>{lesson.title}</h4>
          <p>Course: {course.title}</p>
          <p>Duration: {lesson.duration}</p>
        </div>
        <div className="pricing">
          <h4>Price: $9.99</h4>
          <p>One-time payment for lifetime access</p>
        </div>
        <div className="purchase-actions">
          <button className="purchase-btn" onClick={onPurchase}>
            Purchase Now
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};