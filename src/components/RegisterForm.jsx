import React, { useState } from 'react';
import './AuthForms.css';
const RegisterForm = ({ onRegister, onSwitchToLogin, isRegistering }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    if (!formData.name.trim()) {
      alert('Please enter your full name');
      setIsLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      alert('Please enter your email address');
      setIsLoading(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      await onRegister(formData.name, formData.email, formData.password);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword &&
      formData.password.length >= 6
    );
  };

  return (
    <div className="auth-form">
      <div className="form-header">
        <h2>Create Student Account</h2>
        <p className="form-description">
          Join our STEM learning community. We'll send a confirmation email to verify your account.
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isLoading}
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
            placeholder="Enter your email address"
          />
          <small className="input-help">
            We'll send a confirmation link to this email
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
            placeholder="Create a password (min. 6 characters)"
            minLength="6"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            disabled={isLoading}
            placeholder="Confirm your password"
          />
          {formData.confirmPassword && formData.password !== formData.confirmPassword && (
            <small className="input-error">Passwords do not match</small>
          )}
          {formData.confirmPassword && formData.password === formData.confirmPassword && (
            <small className="input-success">Passwords match</small>
          )}
        </div>

        <button 
          type="submit" 
          className={`btn-primary ${isLoading ? 'loading' : ''}`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Creating Account...
            </>
          ) : (
            'Create Account & Send Confirmation'
          )}
        </button>
      </form>

      <div className="auth-links">
        <p>
          Already have an account?{' '}
          <span 
            onClick={isLoading ? undefined : onSwitchToLogin} 
            className={`link ${isLoading ? 'disabled' : ''}`}
          >
            Login here
          </span>
        </p>
      </div>

      <div className="registration-info">
        <h4>What happens next?</h4>
        <ul>
          <li>📧 You'll receive a confirmation email</li>
          <li>🔗 Click the link in the email to verify your account</li>
          <li>✅ Come back here to log in and start learning</li>
        </ul>
      </div>
    </div>
  );
};

export default RegisterForm;