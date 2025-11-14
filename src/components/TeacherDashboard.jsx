import React, { useState, useEffect } from 'react';
import { 
  getTeacherCourses,
  addNewCourse, 
  addLessonToCourse, 
  updateCourse,
  deleteCourse,
  updateLesson,
  deleteLesson,
  addMultimediaToLesson,
  deleteMultimediaFromLesson,
  getTeacherStats
} from '../utils/storage';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [courses, setCoursesState] = useState({});
  
  // Course Form States
  const [newCourseForm, setNewCourseForm] = useState({
    title: '',
    description: '',
    thumbnail: '📚',
    key: ''
  });
  
  // Lesson Form States with Video Support
  const [newLessonForm, setNewLessonForm] = useState({
    courseKey: '',
    title: '',
    content: '',
    duration: '',
    videoUrl: '',
    videoTitle: '',
    videoDescription: ''
  });
  
  // Quiz Form States
  const [quizForm, setQuizForm] = useState({
    title: '',
    passingScore: 70,
    questions: []
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    type: 'text',
    options: ['', '', '', ''],
    correctAnswer: 0,
    imageUrl: ''
  });

  const [showQuizForm, setShowQuizForm] = useState(false);
  
  // Edit States
  const [editingCourse, setEditingCourse] = useState(null);
  const [editCourseForm, setEditCourseForm] = useState({});
  const [editingLesson, setEditingLesson] = useState(null);
  const [editLessonForm, setEditLessonForm] = useState({});
  const [viewingCourseLessons, setViewingCourseLessons] = useState(null);
  
  // Multimedia States
  const [managingMultimedia, setManagingMultimedia] = useState(null);
  const [newMultimediaForm, setNewMultimediaForm] = useState({
    type: 'video',
    url: '',
    title: '',
    description: ''
  });

  // Function to extract YouTube video ID from various URL formats
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    
    // If it's already an embed URL, return as is
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    // Extract video ID from various YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&]+)/,
      /youtube\.com\/v\/([^?]+)/,
      /youtube\.com\/watch\?.*v=([^&]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
      }
    }
    
    // If no pattern matches, return original URL
    return url;
  };

  // Function to check if URL is a valid YouTube URL
  const isValidYouTubeUrl = (url) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setStats(getTeacherStats());
    setCoursesState(getTeacherCourses());
  };

  // Course Management Functions
  const handleAddCourse = (e) => {
    e.preventDefault();
    try {
      const courseKey = addNewCourse(newCourseForm);
      alert(`Course added successfully with key: ${courseKey}`);
      setNewCourseForm({
        title: '',
        description: '',
        thumbnail: '📚',
        key: ''
      });
      loadData();
      setActiveTab('my-courses');
    } catch (error) {
      alert('Error adding course: ' + error.message);
    }
  };

  const startEditCourse = (courseKey) => {
    const course = courses[courseKey];
    setEditingCourse(courseKey);
    setEditCourseForm({
      title: course.title,
      description: course.description,
      thumbnail: course.thumbnail
    });
  };

  const cancelEditCourse = () => {
    setEditingCourse(null);
    setEditCourseForm({});
  };

  const handleUpdateCourse = (e) => {
    e.preventDefault();
    try {
      updateCourse(editingCourse, editCourseForm);
      alert('Course updated successfully!');
      setEditingCourse(null);
      setEditCourseForm({});
      loadData();
    } catch (error) {
      alert('Error updating course: ' + error.message);
    }
  };

  const handleDeleteCourse = (courseKey) => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        deleteCourse(courseKey);
        alert('Course deleted successfully!');
        loadData();
      } catch (error) {
        alert('Error deleting course: ' + error.message);
      }
    }
  };

  // Quiz Management Functions
  const handleAddQuestion = () => {
    if (!currentQuestion.question.trim()) {
      alert('Please enter a question');
      return;
    }

    if (currentQuestion.options.some(opt => !opt.trim())) {
      alert('Please fill all options');
      return;
    }

    const newQuestion = {
      id: quizForm.questions.length + 1,
      ...currentQuestion,
      options: [...currentQuestion.options]
    };

    setQuizForm(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));

    // Reset current question
    setCurrentQuestion({
      question: '',
      type: 'text',
      options: ['', '', '', ''],
      correctAnswer: 0,
      imageUrl: ''
    });
  };

  const handleRemoveQuestion = (questionId) => {
    setQuizForm(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion(prev => ({
      ...prev,
      options: newOptions
    }));
  };

  const handleCorrectAnswerChange = (index) => {
    setCurrentQuestion(prev => ({
      ...prev,
      correctAnswer: index
    }));
  };

  const resetQuizForm = () => {
    setQuizForm({
      title: '',
      passingScore: 70,
      questions: []
    });
    setCurrentQuestion({
      question: '',
      type: 'text',
      options: ['', '', '', ''],
      correctAnswer: 0,
      imageUrl: ''
    });
    setShowQuizForm(false);
  };

  // Lesson Management Functions with Video Support
  const handleAddLesson = (e) => {
    e.preventDefault();
    try {
      const lessonData = {
        title: newLessonForm.title,
        content: newLessonForm.content,
        duration: newLessonForm.duration,
        completed: false,
        multimedia: [],
        quiz: null
      };

      // Add video if provided
      if (newLessonForm.videoUrl) {
        const embedUrl = getYouTubeEmbedUrl(newLessonForm.videoUrl);
        lessonData.multimedia.push({
          type: 'video',
          url: embedUrl,
          title: newLessonForm.videoTitle || 'Lesson Video',
          description: newLessonForm.videoDescription || 'Video content for this lesson',
          originalUrl: newLessonForm.videoUrl // Store original URL for reference
        });
      }

      // Add quiz if there are questions
      if (quizForm.questions.length > 0) {
        lessonData.quiz = {
          title: quizForm.title || 'Lesson Quiz',
          passingScore: quizForm.passingScore,
          questions: quizForm.questions
        };
      }

      addLessonToCourse(newLessonForm.courseKey, lessonData);
      alert('Lesson added successfully!');
      
      // Reset all forms
      setNewLessonForm({
        courseKey: '',
        title: '',
        content: '',
        duration: '',
        videoUrl: '',
        videoTitle: '',
        videoDescription: ''
      });
      resetQuizForm();
      loadData();
    } catch (error) {
      alert('Error adding lesson: ' + error.message);
    }
  };

  const startViewLessons = (courseKey) => {
    setViewingCourseLessons(courseKey);
    setActiveTab('manage-lessons');
  };

  const startEditLesson = (courseKey, lesson) => {
    setEditingLesson({ courseKey, lessonId: lesson.id });
    setEditLessonForm({
      title: lesson.title,
      content: lesson.content,
      duration: lesson.duration
    });
  };

  const cancelEditLesson = () => {
    setEditingLesson(null);
    setEditLessonForm({});
  };

  const handleUpdateLesson = (e) => {
    e.preventDefault();
    try {
      updateLesson(editingLesson.courseKey, editingLesson.lessonId, editLessonForm);
      alert('Lesson updated successfully!');
      setEditingLesson(null);
      setEditLessonForm({});
      loadData();
    } catch (error) {
      alert('Error updating lesson: ' + error.message);
    }
  };

  const handleDeleteLesson = (courseKey, lessonId, lessonTitle) => {
    if (window.confirm(`Are you sure you want to delete the lesson "${lessonTitle}"?`)) {
      try {
        deleteLesson(courseKey, lessonId);
        alert('Lesson deleted successfully!');
        loadData();
      } catch (error) {
        alert('Error deleting lesson: ' + error.message);
      }
    }
  };

  // Multimedia Management Functions
  const startManageMultimedia = (courseKey, lesson) => {
    setManagingMultimedia({ courseKey, lesson });
    setActiveTab('manage-multimedia');
  };

  const handleAddMultimedia = (e) => {
    e.preventDefault();
    try {
      const multimediaData = { ...newMultimediaForm };
      
      // Convert YouTube URLs to embed format
      if (multimediaData.type === 'video' && isValidYouTubeUrl(multimediaData.url)) {
        multimediaData.url = getYouTubeEmbedUrl(multimediaData.url);
      }
      
      addMultimediaToLesson(
        managingMultimedia.courseKey, 
        managingMultimedia.lesson.id, 
        multimediaData
      );
      alert('Multimedia content added successfully!');
      setNewMultimediaForm({
        type: 'video',
        url: '',
        title: '',
        description: ''
      });
      loadData();
    } catch (error) {
      alert('Error adding multimedia: ' + error.message);
    }
  };

  const handleDeleteMultimedia = (multimediaId, multimediaTitle) => {
    if (window.confirm(`Are you sure you want to delete "${multimediaTitle}"?`)) {
      try {
        deleteMultimediaFromLesson(
          managingMultimedia.courseKey, 
          managingMultimedia.lesson.id, 
          multimediaId
        );
        alert('Multimedia content deleted successfully!');
        loadData();
      } catch (error) {
        alert('Error deleting multimedia: ' + error.message);
      }
    }
  };

  if (!stats) {
    return <div className="loading-teacher">Loading teacher data...</div>;
  }

  return (
    <div className="teacher-dashboard">
      <div className="teacher-header">
        <h3>Teacher Dashboard</h3>
        <p>Manage Your Courses and Lessons</p>
      </div>

      <div className="teacher-tabs">
        <button onClick={() => setActiveTab('overview')} className={activeTab === 'overview' ? 'active' : ''}>
          Overview
        </button>
        <button onClick={() => setActiveTab('my-courses')} className={activeTab === 'my-courses' ? 'active' : ''}>
          My Courses ({Object.keys(courses).length})
        </button>
        <button onClick={() => setActiveTab('manage-lessons')} className={activeTab === 'manage-lessons' ? 'active' : ''}>
          Manage Lessons
        </button>
        <button onClick={() => setActiveTab('add-course')} className={activeTab === 'add-course' ? 'active' : ''}>
          Add Course
        </button>
        <button onClick={() => setActiveTab('add-lesson')} className={activeTab === 'add-lesson' ? 'active' : ''}>
          Add Lesson
        </button>
        <button onClick={() => setActiveTab('manage-multimedia')} className={activeTab === 'manage-multimedia' ? 'active' : ''}>
          Manage Media
        </button>
      </div>

      <div className="teacher-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>My Courses</h3>
                <div className="stat-number">{stats.totalCourses}</div>
              </div>
              <div className="stat-card">
                <h3>Total Lessons</h3>
                <div className="stat-number">{stats.totalLessons}</div>
              </div>
              <div className="stat-card">
                <h3>Students Enrolled</h3>
                <div className="stat-number">{stats.totalStudents}</div>
              </div>
              <div className="stat-card">
                <h3>Completion Rate</h3>
                <div className="stat-number">{stats.averageCompletionRate}%</div>
              </div>
            </div>

            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {stats.recentActivity.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon">
                      {activity.type === 'course' && '📚'}
                      {activity.type === 'lesson' && '📖'}
                      {activity.type === 'quiz' && '📝'}
                    </div>
                    <div className="activity-info">
                      <strong>{activity.title}</strong>
                      <span>{activity.description}</span>
                      <small>{new Date(activity.date).toLocaleDateString()}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* My Courses Tab with Edit Functionality */}
        {activeTab === 'my-courses' && (
          <div className="courses-tab">
            <h3>My Courses</h3>
            <div className="courses-list">
              {Object.entries(courses).map(([key, course]) => (
                <div key={key} className="course-teacher-card">
                  {editingCourse === key ? (
                    <div className="edit-course-form">
                      <h4>Edit Course: {course.title}</h4>
                      <form onSubmit={handleUpdateCourse} className="teacher-form">
                        <div className="form-group">
                          <label>Course Title</label>
                          <input
                            type="text"
                            value={editCourseForm.title}
                            onChange={(e) => setEditCourseForm({...editCourseForm, title: e.target.value})}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Description</label>
                          <textarea
                            value={editCourseForm.description}
                            onChange={(e) => setEditCourseForm({...editCourseForm, description: e.target.value})}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Thumbnail Emoji</label>
                          <input
                            type="text"
                            value={editCourseForm.thumbnail}
                            onChange={(e) => setEditCourseForm({...editCourseForm, thumbnail: e.target.value})}
                          />
                        </div>
                        <div className="form-actions">
                          <button type="submit" className="save-btn">Save Changes</button>
                          <button type="button" onClick={cancelEditCourse} className="cancel-btn">Cancel</button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <>
                      <div className="course-header">
                        <span className="course-thumbnail">{course.thumbnail}</span>
                        <div className="course-info">
                          <h4>{course.title}</h4>
                          <p className="course-description">{course.description}</p>
                        </div>
                      </div>
                      <div className="course-stats">
                        <span>Lessons: {course.lessons?.length || 0}</span>
                        <span>Students: {course.enrolledStudents || 0}</span>
                      </div>
                      <div className="course-actions">
                        <button className="edit-btn" onClick={() => startEditCourse(key)}>Edit</button>
                        <button className="view-btn" onClick={() => startViewLessons(key)}>Manage Lessons</button>
                        <button className="delete-btn" onClick={() => handleDeleteCourse(key)}>Delete</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Manage Lessons Tab */}
        {activeTab === 'manage-lessons' && (
          <div className="manage-lessons-tab">
            <h3>
              Manage Lessons 
              {viewingCourseLessons && ` - ${courses[viewingCourseLessons]?.title}`}
            </h3>
            
            {!viewingCourseLessons ? (
              <div className="select-course-prompt">
                <p>Select a course to manage its lessons:</p>
                <div className="course-buttons">
                  {Object.entries(courses).map(([key, course]) => (
                    <button 
                      key={key} 
                      className="course-select-btn"
                      onClick={() => startViewLessons(key)}
                    >
                      {course.thumbnail} {course.title}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="lessons-management">
                <button 
                  className="back-to-courses"
                  onClick={() => setViewingCourseLessons(null)}
                >
                  ← Back to Courses
                </button>
                
                <div className="lessons-list">
                  {courses[viewingCourseLessons]?.lessons?.map((lesson) => (
                    <div key={lesson.id} className="lesson-teacher-card">
                      {editingLesson?.courseKey === viewingCourseLessons && editingLesson.lessonId === lesson.id ? (
                        <div className="edit-lesson-form">
                          <h4>Edit Lesson</h4>
                          <form onSubmit={handleUpdateLesson} className="teacher-form">
                            <div className="form-group">
                              <label>Lesson Title</label>
                              <input
                                type="text"
                                value={editLessonForm.title}
                                onChange={(e) => setEditLessonForm({...editLessonForm, title: e.target.value})}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Lesson Content</label>
                              <textarea
                                value={editLessonForm.content}
                                onChange={(e) => setEditLessonForm({...editLessonForm, content: e.target.value})}
                                required
                                rows="4"
                              />
                            </div>
                            <div className="form-group">
                              <label>Duration</label>
                              <input
                                type="text"
                                value={editLessonForm.duration}
                                onChange={(e) => setEditLessonForm({...editLessonForm, duration: e.target.value})}
                                required
                              />
                            </div>
                            <div className="form-actions">
                              <button type="submit" className="save-btn">Save Changes</button>
                              <button type="button" onClick={cancelEditLesson} className="cancel-btn">Cancel</button>
                            </div>
                          </form>
                        </div>
                      ) : (
                        <>
                          <div className="lesson-info">
                            <h5>{lesson.title}</h5>
                            <p><strong>Duration:</strong> {lesson.duration}</p>
                            <p className="lesson-content-preview">{lesson.content.substring(0, 100)}...</p>
                            {lesson.multimedia && lesson.multimedia.length > 0 && (
                              <div className="lesson-media-indicator">
                                🎬 {lesson.multimedia.length} media file(s)
                              </div>
                            )}
                            {lesson.quiz && (
                              <div className="lesson-quiz-indicator">
                                📝 Has quiz ({lesson.quiz.questions.length} questions)
                              </div>
                            )}
                          </div>
                          <div className="lesson-actions">
                            <button 
                              className="edit-btn"
                              onClick={() => startEditLesson(viewingCourseLessons, lesson)}
                            >
                              Edit
                            </button>
                            <button 
                              className="media-btn"
                              onClick={() => startManageMultimedia(viewingCourseLessons, lesson)}
                            >
                              Media
                            </button>
                            <button 
                              className="delete-btn"
                              onClick={() => handleDeleteLesson(viewingCourseLessons, lesson.id, lesson.title)}
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Add Course Tab */}
        {activeTab === 'add-course' && (
          <div className="add-course-tab">
            <h3>Add New Course</h3>
            <form onSubmit={handleAddCourse} className="teacher-form">
              <div className="form-group">
                <label>Course Title</label>
                <input
                  type="text"
                  value={newCourseForm.title}
                  onChange={(e) => setNewCourseForm({...newCourseForm, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newCourseForm.description}
                  onChange={(e) => setNewCourseForm({...newCourseForm, description: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Thumbnail Emoji</label>
                <input
                  type="text"
                  value={newCourseForm.thumbnail}
                  onChange={(e) => setNewCourseForm({...newCourseForm, thumbnail: e.target.value})}
                  placeholder="🌐"
                />
              </div>
              <div className="form-group">
                <label>Course Key (auto-generated if empty)</label>
                <input
                  type="text"
                  value={newCourseForm.key}
                  onChange={(e) => setNewCourseForm({...newCourseForm, key: e.target.value})}
                  placeholder="webDevelopment"
                />
              </div>
              <button type="submit" className="submit-btn">Add Course</button>
            </form>
          </div>
        )}

        {/* Add Lesson Tab with Video Embedding and Quiz */}
        {activeTab === 'add-lesson' && (
          <div className="add-lesson-tab">
            <h3>Add New Lesson</h3>
            <form onSubmit={handleAddLesson} className="teacher-form">
              <div className="form-group">
                <label>Select Course</label>
                <select
                  value={newLessonForm.courseKey}
                  onChange={(e) => setNewLessonForm({...newLessonForm, courseKey: e.target.value})}
                  required
                >
                  <option value="">Choose a course</option>
                  {Object.entries(courses).map(([key, course]) => (
                    <option key={key} value={key}>{course.title}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Lesson Title</label>
                <input
                  type="text"
                  value={newLessonForm.title}
                  onChange={(e) => setNewLessonForm({...newLessonForm, title: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Lesson Content</label>
                <textarea
                  value={newLessonForm.content}
                  onChange={(e) => setNewLessonForm({...newLessonForm, content: e.target.value})}
                  required
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label>Duration</label>
                <input
                  type="text"
                  value={newLessonForm.duration}
                  onChange={(e) => setNewLessonForm({...newLessonForm, duration: e.target.value})}
                  placeholder="30 minutes"
                  required
                />
              </div>

              {/* Video Embed Section */}
              <div className="video-embed-section">
                <h4>Video Content (Optional)</h4>
                <div className="form-group">
                  <label>Video URL (YouTube, Vimeo, etc.)</label>
                  <input
                    type="url"
                    value={newLessonForm.videoUrl}
                    onChange={(e) => setNewLessonForm({...newLessonForm, videoUrl: e.target.value})}
                    placeholder="https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID"
                  />
                  <small className="help-text">
                    For YouTube: You can use regular YouTube links (watch or youtu.be). We'll automatically convert them to embed format.
                  </small>
                </div>

                <div className="form-group">
                  <label>Video Title</label>
                  <input
                    type="text"
                    value={newLessonForm.videoTitle}
                    onChange={(e) => setNewLessonForm({...newLessonForm, videoTitle: e.target.value})}
                    placeholder="Lesson Video Tutorial"
                  />
                </div>
                <div className="form-group">
                  <label>Video Description</label>
                  <input
                    type="text"
                    value={newLessonForm.videoDescription}
                    onChange={(e) => setNewLessonForm({...newLessonForm, videoDescription: e.target.value})}
                    placeholder="Watch this video to learn more"
                  />
                </div>

                {/* Video Preview */}
                {newLessonForm.videoUrl && (
                  <div className="video-preview">
                    <h5>Video Preview:</h5>
                    <div className="preview-container">
                      {isValidYouTubeUrl(newLessonForm.videoUrl) ? (
                        <iframe
                          src={getYouTubeEmbedUrl(newLessonForm.videoUrl)}
                          title="Video Preview"
                          width="100%"
                          height="200"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : newLessonForm.videoUrl.includes('vimeo.com') ? (
                        <iframe
                          src={newLessonForm.videoUrl}
                          title="Video Preview"
                          width="100%"
                          height="200"
                          frameBorder="0"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <div className="video-link-preview">
                          <p>🔗 Video Link: <a href={newLessonForm.videoUrl} target="_blank" rel="noopener noreferrer">{newLessonForm.videoUrl}</a></p>
                          <small>Note: Only YouTube and Vimeo embed URLs will show preview. For other video platforms, students will be directed to the video page.</small>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Quiz Section */}
              <div className="quiz-section">
                <div className="section-header">
                  <h4>Quiz Content (Optional)</h4>
                  <button 
                    type="button"
                    onClick={() => setShowQuizForm(!showQuizForm)}
                    className="toggle-btn"
                  >
                    {showQuizForm ? 'Hide Quiz Form' : 'Add Quiz'}
                  </button>
                </div>

                {showQuizForm && (
                  <div className="quiz-form">
                    <div className="form-group">
                      <label>Quiz Title</label>
                      <input
                        type="text"
                        value={quizForm.title}
                        onChange={(e) => setQuizForm({...quizForm, title: e.target.value})}
                        placeholder="Lesson Quiz"
                      />
                    </div>

                    <div className="form-group">
                      <label>Passing Score (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={quizForm.passingScore}
                        onChange={(e) => setQuizForm({...quizForm, passingScore: parseInt(e.target.value) || 70})}
                      />
                    </div>

                    {/* Current Question Form */}
                    <div className="current-question">
                      <h5>Add New Question</h5>
                      
                      <div className="form-group">
                        <label>Question Type</label>
                        <select
                          value={currentQuestion.type}
                          onChange={(e) => setCurrentQuestion({...currentQuestion, type: e.target.value})}
                        >
                          <option value="text">Text Question</option>
                          <option value="image">Image Question</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Question Text</label>
                        <input
                          type="text"
                          value={currentQuestion.question}
                          onChange={(e) => setCurrentQuestion({...currentQuestion, question: e.target.value})}
                          placeholder="Enter your question here"
                        />
                      </div>

                      {currentQuestion.type === 'image' && (
                        <div className="form-group">
                          <label>Image URL</label>
                          <input
                            type="url"
                            value={currentQuestion.imageUrl}
                            onChange={(e) => setCurrentQuestion({...currentQuestion, imageUrl: e.target.value})}
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                      )}

                      <div className="options-section">
                        <h6>Options</h6>
                        {currentQuestion.options.map((option, index) => (
                          <div key={index} className="option-item">
                            <input
                              type="radio"
                              name="correctAnswer"
                              checked={currentQuestion.correctAnswer === index}
                              onChange={() => handleCorrectAnswerChange(index)}
                            />
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => handleOptionChange(index, e.target.value)}
                              placeholder={`Option ${index + 1}`}
                              className="option-input"
                            />
                            <span className="correct-label">
                              {currentQuestion.correctAnswer === index ? 'Correct' : ''}
                            </span>
                          </div>
                        ))}
                      </div>

                      <button 
                        type="button" 
                        onClick={handleAddQuestion}
                        className="add-question-btn"
                      >
                        Add Question to Quiz
                      </button>
                    </div>

                    {/* Existing Questions List */}
                    {quizForm.questions.length > 0 && (
                      <div className="existing-questions">
                        <h5>Questions in Quiz ({quizForm.questions.length})</h5>
                        {quizForm.questions.map((question, index) => (
                          <div key={question.id} className="question-item">
                            <div className="question-info">
                              <strong>Q{index + 1}:</strong> {question.question}
                              {question.type === 'image' && question.imageUrl && (
                                <div className="question-image-preview">
                                  <img src={question.imageUrl} alt="Question" style={{maxWidth: '100px'}} />
                                </div>
                              )}
                              <div className="options-preview">
                                Options: {question.options.join(', ')}
                              </div>
                              <div className="correct-answer">
                                Correct: Option {question.correctAnswer + 1}
                              </div>
                            </div>
                            <button 
                              type="button"
                              onClick={() => handleRemoveQuestion(question.id)}
                              className="remove-btn"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button type="submit" className="submit-btn">Add Lesson</button>
            </form>
          </div>
        )}

        {/* Manage Multimedia Tab */}
        {activeTab === 'manage-multimedia' && (
          <div className="manage-multimedia-tab">
            <h3>
              Manage Multimedia Content
              {managingMultimedia && ` - ${managingMultimedia.lesson.title}`}
            </h3>
            
            {!managingMultimedia ? (
              <div className="select-lesson-prompt">
                <p>Select a lesson to manage its multimedia content:</p>
                <div className="lessons-grid">
                  {Object.entries(courses).map(([courseKey, course]) =>
                    course.lessons?.map(lesson => (
                      <div key={`${courseKey}-${lesson.id}`} className="lesson-select-card">
                        <div className="lesson-info">
                          <strong>{lesson.title}</strong>
                          <span>Course: {course.title}</span>
                          <span>Duration: {lesson.duration}</span>
                        </div>
                        <div className="multimedia-stats">
                          {lesson.multimedia && lesson.multimedia.length > 0 ? (
                            <span className="has-media">📹 {lesson.multimedia.length} media files</span>
                          ) : (
                            <span className="no-media">No media</span>
                          )}
                        </div>
                        <button 
                          className="manage-media-btn"
                          onClick={() => startManageMultimedia(courseKey, lesson)}
                        >
                          Manage Media
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="multimedia-management">
                <div className="management-header">
                  <button 
                    className="back-to-lessons"
                    onClick={() => setManagingMultimedia(null)}
                  >
                    ← Back to Lessons
                  </button>
                  <h4>Managing: {managingMultimedia.lesson.title}</h4>
                </div>

                {/* Add New Multimedia Form */}
                <div className="add-multimedia-form">
                  <h5>Add New Multimedia Content</h5>
                  <form onSubmit={handleAddMultimedia} className="teacher-form compact">
                    <div className="form-group">
                      <label>Media Type</label>
                      <select
                        value={newMultimediaForm.type}
                        onChange={(e) => setNewMultimediaForm({...newMultimediaForm, type: e.target.value})}
                        required
                      >
                        <option value="video">Video</option>
                        <option value="image">Image</option>
                        <option value="audio">Audio</option>
                        <option value="document">Document</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Media URL</label>
                      <input
                        type="url"
                        value={newMultimediaForm.url}
                        onChange={(e) => setNewMultimediaForm({...newMultimediaForm, url: e.target.value})}
                        placeholder={
                          newMultimediaForm.type === 'video' 
                            ? 'https://www.youtube.com/watch?v=VIDEO_ID' 
                            : 'https://example.com/image.jpg'
                        }
                        required
                      />
                      <small className="help-text">
                        {newMultimediaForm.type === 'video' 
                          ? 'For YouTube: Use regular YouTube links (watch or youtu.be). We\'ll automatically convert to embed format.' 
                          : 'Direct link to image, audio file, or document'}
                      </small>
                    </div>

                    <div className="form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        value={newMultimediaForm.title}
                        onChange={(e) => setNewMultimediaForm({...newMultimediaForm, title: e.target.value})}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        value={newMultimediaForm.description}
                        onChange={(e) => setNewMultimediaForm({...newMultimediaForm, description: e.target.value})}
                        rows="2"
                      />
                    </div>

                    <button type="submit" className="submit-btn">Add Media</button>
                  </form>
                </div>

                {/* Existing Multimedia List */}
                <div className="existing-multimedia">
                  <h5>Existing Media Content</h5>
                  {managingMultimedia.lesson.multimedia && managingMultimedia.lesson.multimedia.length > 0 ? (
                    <div className="multimedia-list">
                      {managingMultimedia.lesson.multimedia.map(media => (
                        <div key={media.id} className="media-item">
                          <div className="media-preview">
                            {media.type === 'video' && <span className="media-icon">🎬</span>}
                            {media.type === 'image' && <span className="media-icon">🖼️</span>}
                            {media.type === 'audio' && <span className="media-icon">🎵</span>}
                            {media.type === 'document' && <span className="media-icon">📄</span>}
                            <div className="media-info">
                              <strong>{media.title}</strong>
                              <span>Type: {media.type}</span>
                              <span className="media-url">{media.url}</span>
                            </div>
                          </div>
                          <button 
                            className="delete-btn"
                            onClick={() => handleDeleteMultimedia(media.id, media.title)}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-media-message">No multimedia content added yet.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;