import React, { useState } from 'react';
import './EmailConfirmation.css';

const EmailConfirmation = ({ 
  email, 
  onConfirm, 
  onResend, 
  onCancel,
  token // Optional token for manual entry
}) => {
  const [manualToken, setManualToken] = useState(token || '');
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  const handleManualConfirm = () => {
    if (manualToken.trim()) {
      onConfirm(manualToken.trim());
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setResendMessage('');
    
    try {
      await onResend();
      setResendMessage('Confirmation email sent successfully!');
    } catch (error) {
      setResendMessage('Failed to resend email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="email-confirmation-container">
      <div className="email-confirmation-card">
        <div className="confirmation-header">
          <div className="confirmation-icon">📧</div>
          <h2>Confirm Your Email Address</h2>
        </div>
        
        <div className="confirmation-content">
          <p className="confirmation-instructions">
            We've sent a confirmation email to:
          </p>
          <p className="confirmation-email">{email}</p>
          
          <div className="confirmation-steps">
            <h3>To complete your registration:</h3>
            <ol>
              <li>Check your email inbox (and spam folder)</li>
              <li>Click the confirmation link in the email</li>
              <li>Return here to log in</li>
            </ol>
          </div>

          {/* Manual Token Entry for Demo/Testing */}
          <div className="manual-confirmation">
            <h4>Demo / Manual Confirmation</h4>
            <p className="demo-note">
              For testing purposes, you can manually enter a confirmation token below:
            </p>
            <div className="token-input-group">
              <input
                type="text"
                value={manualToken}
                onChange={(e) => setManualToken(e.target.value)}
                placeholder="Enter confirmation token"
                className="token-input"
              />
              <button
                onClick={handleManualConfirm}
                disabled={!manualToken.trim()}
                className="confirm-token-btn"
              >
                Confirm Email
              </button>
            </div>
          </div>

          {/* Resend Email Section */}
          <div className="resend-section">
            <p>Didn't receive the email?</p>
            <button
              onClick={handleResend}
              disabled={isResending}
              className="resend-btn"
            >
              {isResending ? 'Sending...' : 'Resend Confirmation Email'}
            </button>
            {resendMessage && (
              <p className={`resend-message ${resendMessage.includes('success') ? 'success' : 'error'}`}>
                {resendMessage}
              </p>
            )}
          </div>

          {/* Help Tips */}
          <div className="help-tips">
            <h4>Having trouble?</h4>
            <ul>
              <li>Check your spam or junk folder</li>
              <li>Make sure you entered the correct email address</li>
              <li>Wait a few minutes - emails can take time to arrive</li>
              <li>Contact support if you continue having issues</li>
            </ul>
          </div>
        </div>

        <div className="confirmation-actions">
          <button
            onClick={onCancel}
            className="cancel-btn"
          >
            Back to Login
          </button>
        </div>

        {/* Demo Information */}
        <div className="demo-info">
          <details>
            <summary>Demo Information</summary>
            <div className="demo-content">
              <p>
                <strong>How this works in demo mode:</strong>
              </p>
              <ul>
                <li>Confirmation tokens are stored in browser storage</li>
                <li>No actual emails are sent in this demo</li>
                <li>Use the manual confirmation above with the token shown during registration</li>
                <li>In a real application, users would receive actual email links</li>
              </ul>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation;