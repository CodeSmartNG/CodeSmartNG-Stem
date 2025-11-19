import React, { useState } from 'react';
import './StudentProfile.css';

const StudentProfile = ({ student, setStudent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(student);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStudent(formData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="student-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          {student.name?.charAt(0).toUpperCase()}
        </div>
        <h2>Student Profile</h2>
      </div>
      
      {!isEditing ? (
        <div className="profile-view">
          <div className="profile-info">
            <p>
              <span className="info-label">Name:</span>
              <span className="info-value">{student.name}</span>
            </p>
            <p>
              <span className="info-label">Email:</span>
              <span className="info-value">{student.email}</span>
            </p>
            <p>
              <span className="info-label">Level:</span>
              <span className="info-value">{student.level}</span>
            </p>
          </div>
          
          <div className="progress-section">
            <h3 className="section-title">Learning Progress</h3>
            <div className="progress-item">
              <div className="progress-label">
                <span>Web Development</span>
                <span>{student.progress.webDevelopment}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{width: `${student.progress.webDevelopment}%`}}
                >
                  {student.progress.webDevelopment}%
                </div>
              </div>
            </div>
            
            <div className="progress-item">
              <div className="progress-label">
                <span>Python Programming</span>
                <span>{student.progress.python}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{width: `${student.progress.python}%`}}
                >
                  {student.progress.python}%
                </div>
              </div>
            </div>
            
            <div className="progress-item">
              <div className="progress-label">
                <span>Mathematics</span>
                <span>{student.progress.mathematics}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{width: `${student.progress.mathematics}%`}}
                >
                  {student.progress.mathematics}%
                </div>
              </div>
            </div>
          </div>
          
          <div className="action-buttons">
            <button onClick={() => setIsEditing(true)} className="edit-btn">
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="profile-form">
          <h3 className="section-title">Edit Profile</h3>
          
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="form-group">
            <label>Email Address:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
            />
          </div>
          
          <div className="form-group">
            <label>Skill Level:</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          
          <div className="form-buttons">
            <button type="submit" className="save-btn">
              Save Changes
            </button>
            <button 
              type="button" 
              onClick={() => setIsEditing(false)} 
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default StudentProfile;
