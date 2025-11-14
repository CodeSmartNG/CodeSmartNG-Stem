import React from 'react';
import './Dashboard.css';

const Dashboard = ({ student, setStudent }) => {
  const totalProgress = Object.values(student.progress).reduce((a, b) => a + b, 0) / 3;

  const getJoinedDate = () => {
    if (student.joinedDate) {
      return new Date(student.joinedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return 'Unknown';
  };

  return (
    <div className="dashboard">
      <h3>Welcome, {student.name}!</h3>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Level</h3>
          <p className="stat-value">{student.level}</p>
        </div>
        
        <div className="stat-card">
          <h3>Total progress.</h3>
          <p className="stat-value">{totalProgress.toFixed(1)}%</p>
        </div>
        
        <div className="stat-card">
          <h3>Completed Lesson</h3>
          <p className="stat-value">{student.completedLessons.length}</p>
        </div>

        <div className="stat-card">
          <h3>Points</h3>
          <p className="stat-value">{student.points || 0}</p>
        </div>
      </div>

      {/* Badges Section */}
      {student.badges && student.badges.length > 0 && (
        <div className="badges-section">
          <h3>Badges list</h3>
          <div className="badges-list">
            {student.badges.map((badge, index) => (
              <div key={index} className="badge-item">
                🏅 {badge}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="progress-overview">
        <h3>Progress overview</h3>
        
        <div className="course-progress">
          <div className="progress-item">
            <span>Web Development</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{width: `${student.progress.webDevelopment || 0}%`}}
              >
                {student.progress.webDevelopment || 0}%
              </div>
            </div>
          </div>
          
          <div className="progress-item">
            <span>Python</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{width: `${student.progress.python || 0}%`}}
              >
                {student.progress.python || 0}%
              </div>
            </div>
          </div>
          
          <div className="progress-item">
            <span>Mathematics</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{width: `${student.progress.mathematics || 0}%`}}
              >
                {student.progress.mathematics || 0}%
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="recent-activity">
        <h3>Completed Lesson</h3>
        {student.completedLessons.length > 0 ? (
          <ul>
            {student.completedLessons.slice(-5).map((lesson, index) => (
              <li key={index}>Completed: {lesson}</li>
            ))}
          </ul>
        ) : (
          <p>No lesson completed. Start lesson nown!</p>
        )}
      </div>

      <div className="account-info">
        <h3>Account information</h3>
        <p><strong>Member since:</strong> {getJoinedDate()}</p>
        <p><strong>Email address:</strong> {student.email}</p>
      </div>
    </div>
  );
};

export default Dashboard;