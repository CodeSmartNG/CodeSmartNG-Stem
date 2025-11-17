
import React, { useState, useEffect } from 'react';
import { 
  getCourses, 
  enrollStudentInCourse, 
  unenrollStudentFromCourse,
  getStudentById,
  getEnrolledCoursesWithProgress, // Add this import
  getCurrentUser // Add this import
} from '../utils/storage';
import './CourseEnroll.css';

const CourseEnroll = ({ student, setStudent }) => {
  const [courses, setCourses] = useState({});
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadCourses();
  }, [student]);

  const loadCourses = () => {
    try {
      const allCourses = getCourses();
      setCourses(allCourses);
      
      // Use the fixed function to get enrolled courses
      const enrolled = getEnrolledCoursesWithProgress(student.id);
      setEnrolledCourses(enrolled);
      
      // Get available courses (not enrolled)
      const available = Object.keys(allCourses)
        .filter(courseKey => 
          !student.enrolledCourses?.includes(courseKey)
        )
        .map(courseKey => ({
          key: courseKey,
          ...allCourses[courseKey]
        }));
      
      setAvailableCourses(available);
      setLoading(false);
    } catch (error) {
      console.error('Error loading courses:', error);
      setMessage('Error loading courses. Please refresh the page.');
      setLoading(false);
    }
  };

  const handleEnroll = async (courseKey) => {
    try {
      setMessage('');
      const success = enrollStudentInCourse(student.id, courseKey);
      
      if (success) {
        // Update local student state - get from both systems
        const updatedStudent = getStudentById(student.id) || getCurrentUser();
        if (updatedStudent) {
          setStudent(updatedStudent);
        }
        
        setMessage(`✅ Successfully enrolled in "${courses[courseKey]?.title}"`);
        
        // Reload courses after a short delay
        setTimeout(() => {
          loadCourses();
        }, 500);
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      setMessage(`❌ ${error.message || 'Error enrolling in course'}`);
    }
  };

  const handleUnenroll = async (courseKey) => {
    try {
      setMessage('');
      
      if (!window.confirm(`Are you sure you want to unenroll from "${courses[courseKey]?.title}"?`)) {
        return;
      }
      
      const success = unenrollStudentFromCourse(student.id, courseKey);
      
      if (success) {
        // Update local student state
        const updatedStudent = getStudentById(student.id) || getCurrentUser();
        if (updatedStudent) {
          setStudent(updatedStudent);
        }
        
        setMessage(`✅ Unenrolled from "${courses[courseKey]?.title}"`);
        
        // Reload courses after a short delay
        setTimeout(() => {
          loadCourses();
        }, 500);
      }
    } catch (error) {
      console.error('Unenrollment error:', error);
      setMessage(`❌ ${error.message || 'Error unenrolling from course'}`);
    }
  };

  const handleContinueLearning = (courseKey) => {
    // This would navigate to the course player
    setMessage(`🎯 Continuing with "${courses[courseKey]?.title}"`);
    
    // In a full implementation, you would navigate to the course:
    // window.location.href = `/course/${courseKey}`;
    // or use your routing system:
    // navigate(`/course/${courseKey}`);
  };

  // Add this function to sync student data
  const syncStudentData = () => {
    try {
      const currentUser = getCurrentUser();
      if (currentUser && currentUser.id === student.id) {
        setStudent(currentUser);
      }
    } catch (error) {
      console.error('Error syncing student data:', error);
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#2ecc71';
    if (progress >= 50) return '#f39c12';
    return '#e74c3c';
  };

  const getDifficultyBadge = (difficulty) => {
    const levels = {
      beginner: { color: '#2ecc71', text: 'Beginner' },
      intermediate: { color: '#f39c12', text: 'Intermediate' },
      advanced: { color: '#e74c3c', text: 'Advanced' }
    };
    
    const level = levels[difficulty?.toLowerCase()] || levels.beginner;
    return (
      <span 
        className="difficulty-badge"
        style={{ backgroundColor: level.color }}
      >
        {level.text}
      </span>
    );
  };

  // Add a refresh button handler
  const handleRefresh = () => {
    setLoading(true);
    setMessage('');
    loadCourses();
    syncStudentData();
  };

  if (loading) {
    return (
      <div className="course-enroll-loading">
        <div className="loading-spinner"></div>
        <p>Loading your courses...</p>
      </div>
    );
  }

  return (
    <div className="course-enroll-container">
      <div className="course-enroll-header">
        <div className="header-top">
          <h1>My Learning Dashboard</h1>
          <button 
            className="refresh-btn"
            onClick={handleRefresh}
            title="Refresh courses"
          >
            🔄 Refresh
          </button>
        </div>
        <p>Manage your enrolled courses and discover new ones</p>
        
        {/* Student Info */}
        <div className="student-info-card">
          <div className="student-avatar">
            {student.name?.charAt(0) || 'S'}
          </div>
          <div className="student-details">
            <h3>{student.name || 'Student'}</h3>
            <p>Level: {student.level || 'Beginner'} • Points: {student.points || 0}</p>
          </div>
        </div>
      </div>

      {message && (
        <div className={`message ${message.includes('✅') || message.includes('🎯') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      {/* Enrolled Courses Section */}
      <section className="enrolled-courses-section">
        <div className="section-header">
          <h2>My Enrolled Courses ({enrolledCourses.length})</h2>
          {enrolledCourses.length > 0 && (
            <div className="progress-summary">
              Overall Progress: {Math.round(enrolledCourses.reduce((acc, course) => acc + (course.progress || 0), 0) / enrolledCourses.length) || 0}%
            </div>
          )}
        </div>
        
        {enrolledCourses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No courses enrolled yet</h3>
            <p>Browse available courses below to start your learning journey!</p>
          </div>
        ) : (
          <div className="enrolled-courses-grid">
            {enrolledCourses.map(course => (
              <div key={course.key} className="enrolled-course-card">
                <div className="course-header">
                  <div className="course-thumbnail">
                    {course.thumbnail || '📖'}
                  </div>
                  <div className="course-info">
                    <h3>{course.title}</h3>
                    <p className="course-description">{course.description}</p>
                    <div className="course-meta">
                      <span className="teacher">By {course.teacherName}</span>
                      {getDifficultyBadge(course.difficulty)}
                    </div>
                  </div>
                </div>
                
                <div className="progress-section">
                  <div className="progress-header">
                    <span>Your Progress</span>
                    <span className="progress-percent">{course.progress || 0}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${course.progress || 0}%`,
                        backgroundColor: getProgressColor(course.progress || 0)
                      }}
                    ></div>
                  </div>
                  <div className="course-stats">
                    <span>{course.lessons?.length || 0} lessons</span>
                    <span>{course.isCompleted ? '✅ Completed' : '🔄 In Progress'}</span>
                  </div>
                </div>
                
                <div className="course-actions">
                  <button 
                    className={`continue-btn ${course.isCompleted ? 'completed' : ''}`}
                    onClick={() => handleContinueLearning(course.key)}
                  >
                    {course.isCompleted ? '🎓 Completed' : '➤ Continue Learning'}
                  </button>
                  <button 
                    className="unenroll-btn"
                    onClick={() => handleUnenroll(course.key)}
                  >
                    🗑️ Unenroll
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Available Courses Section */}
      <section className="available-courses-section">
        <h2>Available Courses ({availableCourses.length})</h2>
        
        {availableCourses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎉</div>
            <h3>You're enrolled in all available courses!</h3>
            <p>Check back later for new courses or contact your teacher.</p>
          </div>
        ) : (
          <div className="available-courses-grid">
            {availableCourses.map(course => (
              <div key={course.key} className="available-course-card">
                <div className="course-thumbnail-large">
                  {course.thumbnail || '📖'}
                </div>
                <div className="course-content">
                  <h3>{course.title}</h3>
                  <p className="course-description">{course.description}</p>
                  
                  <div className="course-details">
                    <div className="detail-item">
                      <span className="detail-label">👨‍🏫 Teacher:</span>
                      <span className="detail-value">{course.teacherName}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">📚 Lessons:</span>
                      <span className="detail-value">{course.lessons?.length || 0}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">🎯 Level:</span>
                      <span className="detail-value">
                        {getDifficultyBadge(course.difficulty)}
                      </span>
                    </div>
                  </div>
                  
                  <button 
                    className="enroll-btn"
                    onClick={() => handleEnroll(course.key)}
                  >
                    📝 Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CourseEnroll;
