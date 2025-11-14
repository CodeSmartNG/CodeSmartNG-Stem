import React, { useState, useEffect } from 'react';
import { getCourses } from '../utils/storage';
import Quiz from './Quiz';
import MultimediaViewer from './MultimediaViewer';
import './CourseCatalog.css';

const CourseCatalog = ({ student, setStudent }) => {
  const [courses, setCourses] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [expandedCourses, setExpandedCourses] = useState({});

  // Load courses from storage
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    const coursesData = getCourses();
    console.log('Loaded courses:', coursesData);
    setCourses(coursesData || {});
  };

  // Toggle course expansion
  const toggleCourseExpansion = (courseKey) => {
    setExpandedCourses(prev => ({
      ...prev,
      [courseKey]: !prev[courseKey]
    }));
  };

  // Expand all courses
  const expandAllCourses = () => {
    const allExpanded = {};
    Object.keys(courses).forEach(key => {
      allExpanded[key] = true;
    });
    setExpandedCourses(allExpanded);
  };

  // Collapse all courses
  const collapseAllCourses = () => {
    setExpandedCourses({});
  };

  const handleStartQuiz = (courseKey, lessonIndex) => {
    const course = courses[courseKey];
    if (!course) return;
    
    const lesson = course.lessons[lessonIndex];
    if (lesson.quiz) {
      setCurrentQuiz(lesson.quiz);
      setShowQuiz(true);
    }
  };

  const handleQuizComplete = (scorePercentage, passed) => {
    const updatedStudent = { ...student };
    const lessonId = `${selectedCourse}-${courses[selectedCourse].lessons[currentLesson].id}`;
    
    if (passed && !updatedStudent.completedLessons.includes(lessonId)) {
      updatedStudent.completedLessons.push(lessonId);
      
      // Update course progress
      const totalLessons = courses[selectedCourse].lessons.length;
      const completedLessons = courses[selectedCourse].lessons.filter(
        lesson => updatedStudent.completedLessons.includes(`${selectedCourse}-${lesson.id}`)
      ).length;
      
      updatedStudent.progress[selectedCourse] = Math.min((completedLessons / totalLessons) * 100, 100);
    }
    
    setStudent(updatedStudent);
    setShowQuiz(false);
    setCurrentQuiz(null);
  };

  const handleCloseQuiz = () => {
    setShowQuiz(false);
    setCurrentQuiz(null);
  };

  const handleStartLesson = (courseKey, lessonIndex) => {
    setSelectedCourse(courseKey);
    setCurrentLesson(lessonIndex);
    setShowQuiz(false);
  };

  const completeLesson = (courseKey, lessonId) => {
    const updatedStudent = { ...student };
    const lessonKey = `${courseKey}-${lessonId}`;
    
    if (!updatedStudent.completedLessons.includes(lessonKey)) {
      updatedStudent.completedLessons.push(lessonKey);
      
      // Update course progress
      const totalLessons = courses[courseKey].lessons.length;
      const completedLessons = courses[courseKey].lessons.filter(
        lesson => updatedStudent.completedLessons.includes(`${courseKey}-${lesson.id}`)
      ).length;
      
      updatedStudent.progress[courseKey] = Math.min((completedLessons / totalLessons) * 100, 100);
      
      setStudent(updatedStudent);
    }
  };

  const handleViewCertificate = (courseKey) => {
    const course = courses[courseKey];
    alert(`🏆 Congratulations to ${student.name}!\n\nYou have completed the course: ${course.title}\n\nDate: ${new Date().toLocaleDateString()}\n\nYou can get your certificate at the office!`);
  };

  // Safety check for empty courses
  if (Object.keys(courses).length === 0) {
    return (
      <div className="course-catalog">
        <h2>STEM Courses</h2>
        <div className="no-courses">
          <p>No courses available. Please check back later.</p>
        </div>
      </div>
    );
  }

  // If a course is selected, show its lessons
  if (selectedCourse && courses[selectedCourse]) {
    const course = courses[selectedCourse];
    const lesson = course.lessons[currentLesson];
    const isCompleted = student.completedLessons.includes(`${selectedCourse}-${lesson.id}`);
    
    return (
      <div className="course-lesson">
        <button onClick={() => setSelectedCourse(null)} className="back-btn">
          ← Back to Courses
        </button>
        
        <div className="lesson-header">
          <h2>{lesson.title}</h2>
          {isCompleted && <span className="completion-badge">Completed ✓</span>}
        </div>
        
        <div className="lesson-content">
          <p>{lesson.content}</p>
          <p><strong>Duration:</strong> {lesson.duration}</p>
        </div>

        {/* Multimedia Content */}
        {lesson.multimedia && lesson.multimedia.length > 0 && (
          <MultimediaViewer multimedia={lesson.multimedia} />
        )}

        {/* Quiz Section */}
        {lesson.quiz && !showQuiz && (
          <div className="quiz-section">
            <h3>Knowledge Test</h3>
            <p>Test your knowledge about this lesson:</p>
            <button 
              onClick={() => handleStartQuiz(selectedCourse, currentLesson)}
              className="start-quiz-btn"
            >
              Start Quiz
            </button>
          </div>
        )}

        {/* Show Quiz Component */}
        {showQuiz && currentQuiz && (
          <Quiz 
            quiz={currentQuiz}
            onComplete={handleQuizComplete}
            onClose={handleCloseQuiz}
          />
        )}
        
        <div className="lesson-navigation">
          {currentLesson > 0 && (
            <button onClick={() => setCurrentLesson(currentLesson - 1)}>
              ← Previous Lesson
            </button>
          )}
          
          <button 
            onClick={() => completeLesson(selectedCourse, lesson.id)}
            className="complete-btn"
            disabled={isCompleted}
          >
            {isCompleted ? 'Completed' : 'Complete Lesson'}
          </button>
          
          {currentLesson < course.lessons.length - 1 && (
            <button onClick={() => setCurrentLesson(currentLesson + 1)}>
              Next Lesson →
            </button>
          )}
        </div>
      </div>
    );
  }

  // Main course catalog view with collapsible lessons
  return (
    <div className="course-catalog">
      <div className="catalog-header">
        <h2>STEM Courses</h2>
        <div className="course-controls">
          <button onClick={expandAllCourses} className="control-btn">
            Expand All
          </button>
          <button onClick={collapseAllCourses} className="control-btn">
            Collapse All
          </button>
        </div>
      </div>
      
      <div className="courses-grid">
        {Object.entries(courses).map(([key, course]) => (
          <div key={key} className="course-card">
            <div className="course-header">
              <span className="course-thumbnail">{course.thumbnail}</span>
              <div className="course-title-section">
                <h3>{course.title}</h3>
                <button 
                  onClick={() => toggleCourseExpansion(key)}
                  className="expand-btn"
                >
                  {expandedCourses[key] ? '▼ Hide' : '► Show'} Lessons ({course.lessons.length})
                </button>
              </div>
            </div>
            
            <p className="course-description">{course.description}</p>
            
            <div className="course-meta">
              <span className="progress-text">
                Progress: {student.progress[key] || 0}%
              </span>
              <span className="completed-lessons">
                Completed: {course.lessons.filter(lesson => 
                  student.completedLessons.includes(`${key}-${lesson.id}`)
                ).length} / {course.lessons.length}
              </span>
            </div>
            
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{width: `${student.progress[key] || 0}%`}}
              >
                {student.progress[key] || 0}%
              </div>
            </div>
            
            {/* Certificate Button */}
            {student.progress[key] === 100 && (
              <button 
                onClick={() => handleViewCertificate(key)}
                className="certificate-btn"
              >
                🏆 Get Certificate
              </button>
            )}
            
            {/* Collapsible Lessons Section */}
            {expandedCourses[key] && (
              <div className="lessons-list">
                {course.lessons.map((lesson, index) => {
                  const isLessonCompleted = student.completedLessons.includes(`${key}-${lesson.id}`);
                  return (
                    <div key={lesson.id} className={`lesson-item ${isLessonCompleted ? 'completed' : ''}`}>
                      <div className="lesson-info">
                        <div className="lesson-main-info">
                          <span className="lesson-title">{lesson.title}</span>
                          <span className="lesson-duration">{lesson.duration}</span>
                        </div>
                        <div className="lesson-features">
                          {lesson.multimedia && lesson.multimedia.length > 0 && (
                            <span className="media-indicator" title="Has learning materials">🎬</span>
                          )}
                          {lesson.quiz && (
                            <span className="quiz-indicator" title="Has quiz questions">📝</span>
                          )}
                          {isLessonCompleted && (
                            <span className="completion-indicator" title="Lesson completed">✅</span>
                          )}
                        </div>
                      </div>
                      <div className="lesson-actions">
                        <button 
                          onClick={() => handleStartLesson(key, index)}
                          disabled={isLessonCompleted}
                          className={isLessonCompleted ? 'completed-btn' : 'start-btn'}
                        >
                          {isLessonCompleted ? 'Completed' : 'Start Lesson'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCatalog;