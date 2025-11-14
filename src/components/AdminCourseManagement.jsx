// components/AdminCourseManagement.jsx
import React, { useState, useEffect } from 'react';
import { 
  getAllCoursesForAdmin, 
  getCourseDetailsForAdmin,
  deleteCourseAsAdmin,
  deleteLessonAsAdmin,
  getCourseAnalyticsForAdmin,
  getAllTeachers,
  getTeacherCoursesForAdmin
} from '../utils/storage';
import './AdminCourseManagement.css';

const AdminCourseManagement = ({ currentUser }) => {
  const [courses, setCourses] = useState({});
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseDetails, setCourseDetails] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    try {
      const allCourses = getAllCoursesForAdmin();
      const allTeachers = getAllTeachers();
      setCourses(allCourses);
      setTeachers(allTeachers);
    } catch (error) {
      setMessage('Error loading data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewCourseDetails = (courseKey) => {
    try {
      const details = getCourseDetailsForAdmin(courseKey);
      const courseAnalytics = getCourseAnalyticsForAdmin(courseKey);
      setSelectedCourse(courseKey);
      setCourseDetails(details);
      setAnalytics(courseAnalytics);
    } catch (error) {
      setMessage('Error loading course details: ' + error.message);
    }
  };

  const handleDeleteCourse = (courseKey, courseTitle) => {
    if (window.confirm(`Are you sure you want to delete the course "${courseTitle}"? This will remove it from all students and cannot be undone.`)) {
      try {
        deleteCourseAsAdmin(courseKey);
        setMessage(`Course "${courseTitle}" deleted successfully.`);
        loadData();
        setSelectedCourse(null);
        setCourseDetails(null);
        setAnalytics(null);
      } catch (error) {
        setMessage('Error deleting course: ' + error.message);
      }
    }
  };

  const handleDeleteLesson = (courseKey, lessonId, lessonTitle) => {
    if (window.confirm(`Are you sure you want to delete the lesson "${lessonTitle}"?`)) {
      try {
        deleteLessonAsAdmin(courseKey, lessonId);
        setMessage(`Lesson "${lessonTitle}" deleted successfully.`);
        // Reload course details to reflect changes
        if (selectedCourse === courseKey) {
          handleViewCourseDetails(courseKey);
        }
      } catch (error) {
        setMessage('Error deleting lesson: ' + error.message);
      }
    }
  };

  const filteredCourses = selectedTeacher === 'all' 
    ? courses 
    : getTeacherCoursesForAdmin(selectedTeacher);

  if (loading) {
    return <div className="loading">Loading course data...</div>;
  }

  return (
    <div className="admin-course-management">
      <div className="admin-header">
        <h2>Course Management</h2>
        <p>Manage all courses and lessons in the system</p>
      </div>

      {message && (
        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="management-controls">
        <div className="filter-section">
          <label htmlFor="teacherFilter">Filter by Teacher:</label>
          <select
            id="teacherFilter"
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
          >
            <option value="all">All Teachers</option>
            {teachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name} ({teacher.email})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="courses-grid">
        <div className="courses-list">
          <h3>Courses ({Object.keys(filteredCourses).length})</h3>
          <div className="courses-container">
            {Object.entries(filteredCourses).map(([courseKey, course]) => (
              <div key={courseKey} className="course-card">
                <div className="course-header">
                  <span className="course-thumbnail">{course.thumbnail}</span>
                  <div className="course-info">
                    <h4>{course.title}</h4>
                    <p className="course-description">{course.description}</p>
                    <div className="course-meta">
                      <span>Teacher: {course.teacherName}</span>
                      <span>Lessons: {course.lessons?.length || 0}</span>
                      <span>Status: {course.isPublished ? 'Published' : 'Draft'}</span>
                    </div>
                  </div>
                </div>
                <div className="course-actions">
                  <button 
                    className="view-btn"
                    onClick={() => handleViewCourseDetails(courseKey)}
                  >
                    View Details
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteCourse(courseKey, course.title)}
                  >
                    Delete Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedCourse && courseDetails && (
          <div className="course-details">
            <h3>Course Details: {courseDetails.title}</h3>
            <div className="details-section">
              <h4>Basic Information</h4>
              <p><strong>Description:</strong> {courseDetails.description}</p>
              <p><strong>Teacher:</strong> {courseDetails.teacherInfo?.name} ({courseDetails.teacherInfo?.email})</p>
              <p><strong>Created:</strong> {new Date(courseDetails.createdAt).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {courseDetails.isPublished ? 'Published' : 'Draft'}</p>
            </div>

            {analytics && (
              <div className="analytics-section">
                <h4>Analytics</h4>
                <div className="analytics-grid">
                  <div className="stat">
                    <span className="stat-number">{analytics.totalEnrolled}</span>
                    <span className="stat-label">Students Enrolled</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">{analytics.completionRate}%</span>
                    <span className="stat-label">Completion Rate</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">{analytics.averageQuizScore}%</span>
                    <span className="stat-label">Avg Quiz Score</span>
                  </div>
                </div>
              </div>
            )}

            <div className="lessons-section">
              <h4>Lessons ({courseDetails.lessons?.length || 0})</h4>
              {courseDetails.lessons?.map(lesson => (
                <div key={lesson.id} className="lesson-item">
                  <div className="lesson-info">
                    <h5>{lesson.title}</h5>
                    <p><strong>Duration:</strong> {lesson.duration}</p>
                    <p className="lesson-content">{lesson.content.substring(0, 100)}...</p>
                    {lesson.quiz && (
                      <span className="quiz-badge">Quiz: {lesson.quiz.questions.length} questions</span>
                    )}
                    {lesson.multimedia && lesson.multimedia.length > 0 && (
                      <span className="media-badge">Media: {lesson.multimedia.length} files</span>
                    )}
                  </div>
                  <div className="lesson-actions">
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteLesson(selectedCourse, lesson.id, lesson.title)}
                    >
                      Delete Lesson
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCourseManagement;