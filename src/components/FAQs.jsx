import React from 'react';
import './FAQs.css';

const FAQs = () => {
  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer: "You can browse our course catalog and click on any course to see the enrollment options. Most courses are available for immediate enrollment."
    },
    {
      question: "What if I need help with my coursework?",
      answer: "We have dedicated support through our discussion forums, and you can also contact our support team for personalized assistance."
    },
    {
      question: "Are there any prerequisites for the courses?",
      answer: "Prerequisites vary by course. Each course listing specifies the required knowledge level. We offer beginner to advanced courses."
    },
    {
      question: "Can I access courses on mobile devices?",
      answer: "Yes! Our platform is fully responsive and works on all devices including smartphones and tablets."
    }
  ];

  return (
    <div className="faqs-container">
      <div className="faqs-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about CodeSmartNG Stem</p>
      </div>
      
      <div className="faqs-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3 className="faq-question">Q: {faq.question}</h3>
            <p className="faq-answer">A: {faq.answer}</p>
          </div>
        ))}
      </div>
      
      <div className="faqs-contact">
        <h3>Still have questions?</h3>
        <p>Contact our support team for personalized assistance.</p>
        <button 
          className="contact-support-btn"
          onClick={() => window.location.href = '/contact'}
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default FAQs;