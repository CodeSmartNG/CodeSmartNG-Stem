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
      <h2>Student Profile</h2>
      
      {!isEditing ? (
        <div className="profile-view">
          <div className="profile-info">
            <p><strong>Sunan:</strong> {student.name}</p>
            <p><strong>Imel:</strong> {student.email}</p>
            <p><strong>Matsayi:</strong> {student.level}</p>
          </div>
          
          <div className="progress-section">
            <h3>Progress</h3>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: `${student.progress.webDevelopment}%`}}>
                Web Development: {student.progress.webDevelopment}%
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: `${student.progress.python}%`}}>
                Python: {student.progress.python}%
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: `${student.progress.mathematics}%`}}>
                Mathematics: {student.progress.mathematics}%
              </div>
            </div>
          </div>
          
          <button onClick={() => setIsEditing(true)} className="edit-btn">
            Edit
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Level:</label>
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
            <button type="submit" className="save-btn">Save</button>
            <button type="button" onClick={() => setIsEditing(false)} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default StudentProfile;