import React, { useState } from 'react';
import './TeacherRegisterForm.css';

const TeacherRegisterForm = ({ onRegister, onSwitchToLogin }) => {
  const initialFormState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    experience: '',
    qualifications: '',
    bio: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.specialization.trim()) {
      newErrors.specialization = 'Specialization is required';
    }

    if (!formData.experience.trim()) {
      newErrors.experience = 'Experience level is required';
    }

    if (!formData.qualifications.trim()) {
      newErrors.qualifications = 'Qualifications are required';
    }

    if (!formData.bio.trim()) {
      newErrors.bio = 'Bio is required';
    } else if (formData.bio.length < 50) {
      newErrors.bio = 'Bio should be at least 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!validateForm()) {
      setLoading(false);
      return false;
    }

    try {
      const success = await onRegister(formData);
      if (success) {
        // Clear form on success
        setFormData(initialFormState);
        setErrors({});
        return true;
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
    
    return false;
  };

  return (
    <div className="teacher-register-form">
      <div className="form-header">
        <h2>Register as Teacher</h2>
        <p>Join our team of passionate educators</p>
      </div>

      {errors.submit && (
        <div className="error-message submit-error">
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} className="teacher-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="Create a password"
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'error' : ''}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="specialization">Specialization *</label>
            <select
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className={errors.specialization ? 'error' : ''}
            >
              <option value="">Select your specialization</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="Engineering">Engineering</option>
              <option value="Data Science">Data Science</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="AI & Machine Learning">AI & Machine Learning</option>
              <option value="Other">Other</option>
            </select>
            {errors.specialization && <span className="error-text">{errors.specialization}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="experience">Teaching Experience *</label>
            <select
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className={errors.experience ? 'error' : ''}
            >
              <option value="">Select experience level</option>
              <option value="Beginner (0-2 years)">Beginner (0-2 years)</option>
              <option value="Intermediate (2-5 years)">Intermediate (2-5 years)</option>
              <option value="Experienced (5-10 years)">Experienced (5-10 years)</option>
              <option value="Expert (10+ years)">Expert (10+ years)</option>
            </select>
            {errors.experience && <span className="error-text">{errors.experience}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="qualifications">Qualifications *</label>
          <input
            type="text"
            id="qualifications"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            className={errors.qualifications ? 'error' : ''}
            placeholder="e.g., B.Sc. Computer Science, M.Ed., PhD"
          />
          {errors.qualifications && <span className="error-text">{errors.qualifications}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="bio">Teaching Bio *</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className={errors.bio ? 'error' : ''}
            placeholder="Tell us about your teaching philosophy, experience, and why you want to join our platform..."
            rows="4"
          />
          {errors.bio && <span className="error-text">{errors.bio}</span>}
          <div className="character-count">
            {formData.bio.length}/50 characters minimum
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="spinner"></div>
              Registering...
            </>
          ) : (
            'Register as Teacher'
          )}
        </button>
      </form>

      <div className="form-footer">
        <p>
          Already have an account?{' '}
          <button 
            type="button" 
            className="switch-btn"
            onClick={onSwitchToLogin}
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default TeacherRegisterForm;