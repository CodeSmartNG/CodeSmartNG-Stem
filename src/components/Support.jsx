import React, { useState } from 'react';
import './Support.css';

const Support = () => {
  const [activeTab, setActiveTab] = useState('help');

  const supportTopics = [
    {
      category: "Technical Issues",
      issues: [
        "Login problems",
        "Course access issues",
        "Video playback problems",
        "Browser compatibility"
      ]
    },
    {
      category: "Account & Billing",
      issues: [
        "Password reset",
        "Account recovery",
        "Payment issues",
        "Subscription questions"
      ]
    },
    {
      category: "Course Content",
      issues: [
        "Course materials",
        "Assignment submission",
        "Certificate issuance",
        "Progress tracking"
      ]
    }
  ];

  return (
    <div className="support-container">
      <div className="support-header">
        <h1>Support Center</h1>
        <p>We're here to help you succeed</p>
      </div>
      
      <div className="support-tabs">
        <button 
          className={`tab-button ${activeTab === 'help' ? 'active' : ''}`}
          onClick={() => setActiveTab('help')}
        >
          Help Topics
        </button>
        <button 
          className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          Contact Support
        </button>
        <button 
          className={`tab-button ${activeTab === 'status' ? 'active' : ''}`}
          onClick={() => setActiveTab('status')}
        >
          System Status
        </button>
      </div>
      
      <div className="support-content">
        {activeTab === 'help' && (
          <div className="help-topics">
            <h2>Common Help Topics</h2>
            <div className="topics-grid">
              {supportTopics.map((topic, index) => (
                <div key={index} className="topic-category">
                  <h3>{topic.category}</h3>
                  <ul>
                    {topic.issues.map((issue, issueIndex) => (
                      <li key={issueIndex}>{issue}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'contact' && (
          <div className="contact-support">
            <h2>Contact Our Support Team</h2>
            <div className="contact-options">
              <div className="contact-option">
                <span className="option-icon">📧</span>
                <h4>Email Support</h4>
                <p>Codesmartng1@gmail.com</p>
                <p>Response time: Within 24 hours</p>
              </div>
              <div className="contact-option">
                <span className="option-icon">💬</span>
                <h4>Live Chat</h4>
                <p>Available Mon-Fri, 9AM-6PM EST</p>
                <button className="chat-btn">Start Chat</button>
              </div>
              <div className="contact-option">
                <span className="option-icon">📞</span>
                <h4>Phone Support</h4>
                <p>+234 8160932630-HELP</p>
                <p>Mon-Fri, 9AM-5PM EST</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'status' && (
          <div className="system-status">
            <h2>System Status</h2>
            <div className="status-items">
              <div className="status-item online">
                <span className="status-dot"></span>
                <span>Website</span>
                <span>Operational</span>
              </div>
              <div className="status-item online">
                <span className="status-dot"></span>
                <span>Course Platform</span>
                <span>Operational</span>
              </div>
              <div className="status-item online">
                <span className="status-dot"></span>
                <span>Payment System</span>
                <span>Operational</span>
              </div>
              <div className="status-item online">
                <span className="status-dot"></span>
                <span>Discussion Forum</span>
                <span>Operational</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;