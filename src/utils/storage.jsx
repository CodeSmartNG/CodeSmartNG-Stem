// Local Storage utilities for STEM Platform - Enhanced Version

// Keys for localStorage
const STUDENT_KEY = 'hausaStem_students';
const CURRENT_USER_KEY = 'hausaStem_currentUser';
const COURSES_KEY = 'hausaStem_courses';
const USERS_KEY = 'hausaStem_users';
const EMAIL_CONFIRMATIONS_KEY = 'hausaStem_email_confirmations';

// Initialize with default data if empty
export const initializeStorage = () => {
  const existingStudents = getStudents();
  const existingCourses = getCourses();
  const existingUsers = getUsers();

  console.log('🔄 Initializing Storage...');
  console.log('Existing users:', Object.keys(existingUsers).length);
  console.log('Existing students:', existingStudents.length);
  console.log('Existing courses:', Object.keys(existingCourses).length);

  // Always ensure admin user exists, even if storage already has data
  const users = getUsers();
  let needsSave = false;

  // Check and create admin if missing
  if (!users['admin1']) {
    console.log('🛠 Creating admin user...');
    users['admin1'] = {
      id: 'admin1',
      name: "Kabir Alkasim",
      email: "codesmartng1@gmail.com",
      password: "Kb1217@#$%&",
      role: "admin",
      isEmailConfirmed: true,
      joinedDate: new Date().toISOString()
    };
    needsSave = true;
  } else if (users['admin1'].email !== 'codesmartng1@gmail.com') {
    console.log('🛠 Updating admin user email...');
    users['admin1'].email = "codesmartng1@gmail.com";
    users['admin1'].isEmailConfirmed = true;
    needsSave = true;
  }

  // Check and create teacher if missing
  if (!users['teacher1'] || users['teacher1'].email !== 'kabir@teacher.com') {
    console.log('🛠 Creating teacher user...');
    users['teacher1'] = {
      id: 'teacher1',
      name: "Kabir Teacher",
      email: "kabir@teacher.com",
      password: "121712",
      role: "teacher",
      specialization: "Computer Science",
      bio: "Experienced teacher in web development and programming",
      joinedDate: new Date().toISOString(),
      courses: ['webDevelopment', 'python', 'mathematics'],
      isApproved: true,
      isEmailConfirmed: true,
      approvedDate: new Date().toISOString()
    };
    needsSave = true;
  }

  // Check and create student if missing
  if (!users['student1'] || users['student1'].email !== 'student@example.com') {
    console.log('🛠 Creating student user...');
    users['student1'] = {
      id: 'student1',
      name: "Ahmad Musa",
      email: "student@example.com",
      password: "password123",
      role: "student",
      level: "Beginner",
      progress: {},
      completedLessons: [],
      currentLessonIndex: {}, // NEW: Track current lesson for each course
      points: 0,
      badges: [],
      enrolledCourses: [],
      enrolledCoursesDate: {},
      isEmailConfirmed: true,
      joinedDate: new Date().toISOString()
    };
    needsSave = true;
  }

  if (needsSave) {
    console.log('💾 Saving updated users...');
    saveUsers(users);
  }

  if (existingStudents.length === 0) {
    console.log('🛠 Creating default students...');
    const defaultStudents = [
      {
        id: 1,
        userId: 'student1',
        name: "Ahmad Musa",
        email: "student@example.com",
        password: "password123",
        role: "student",
        level: "Beginner",
        progress: {},
        completedLessons: [],
        currentLessonIndex: {}, // NEW: Track current lesson for each course
        points: 0,
        badges: [],
        enrolledCourses: [],
        enrolledCoursesDate: {},
        isEmailConfirmed: true,
        joinedDate: new Date().toISOString()
      }
    ];
    saveStudents(defaultStudents);
  }

  if (Object.keys(existingCourses).length === 0) {
    console.log('🛠 Creating default courses...');
    const defaultCourses = {
      webDevelopment: {
        title: "Web Development",
        description: "Learn how to build websites using HTML, CSS and JavaScript",
        thumbnail: "🌐",
        teacherId: "teacher1",
        teacherName: "Kabir Teacher",
        isPublished: true,
        approvedDate: new Date().toISOString(),
        lessons: [
          {
            id: 1,
            title: "Introduction to HTML",
            content: "HTML is the first part of a website. It provides the structure of web pages.",
            duration: "30 minutes",
            completed: false,
            multimedia: [
              {
                id: 1,
                type: "video",
                url: "https://www.youtube.com/embed/dD2EISBDjWM",
                title: "Video: How to use HTML",
                description: "This video will teach you everything you need to know about HTML"
              }
            ],
            quiz: {
              title: "HTML Questions",
              passingScore: 70,
              questions: [
                {
                  id: 1,
                  question: "What does HTML stand for?",
                  type: "text",
                  options: [
                    "Hyper Text Markup Language",
                    "High Tech Modern Language", 
                    "Hyper Transfer Markup Language",
                    "Home Tool Markup Language"
                  ],
                  correctAnswer: 0
                }
              ]
            }
          },
          {
            id: 2,
            title: "CSS Basics",
            content: "CSS makes websites look beautiful and organized.",
            duration: "25 minutes",
            completed: false,
            multimedia: [],
            quiz: null
          },
          {
            id: 3,
            title: "JavaScript Fundamentals",
            content: "JavaScript adds interactivity to websites.",
            duration: "35 minutes",
            completed: false,
            multimedia: [],
            quiz: null
          }
        ]
      },
      python: {
        title: "Python Programming", 
        description: "Learn how to program software with the Python language",
        thumbnail: "🐍",
        teacherId: "teacher1",
        teacherName: "Kabir Teacher",
        isPublished: true,
        approvedDate: new Date().toISOString(),
        lessons: [
          {
            id: 1,
            title: "Python Basics",
            content: "Start learning about the basic components in Python: variables, data types, and basic operations.",
            duration: "40 minutes",
            completed: false,
            multimedia: [],
            quiz: {
              title: "Python Questions",
              passingScore: 70,
              questions: [
                {
                  id: 1,
                  question: "How do you create a variable in Python?",
                  type: "text",
                  options: [
                    "x = 5",
                    "variable x = 5", 
                    "let x = 5",
                    "var x = 5"
                  ],
                  correctAnswer: 0
                }
              ]
            }
          },
          {
            id: 2,
            title: "Functions and Loops",
            content: "Learn about functions and loops in Python.",
            duration: "30 minutes",
            completed: false,
            multimedia: [],
            quiz: null
          }
        ]
      },
      mathematics: {
        title: "Mathematics",
        description: "Learn mathematics from basics to advanced levels",
        thumbnail: "📊",
        teacherId: "teacher1",
        teacherName: "Kabir Teacher",
        isPublished: true,
        approvedDate: new Date().toISOString(),
        lessons: [
          {
            id: 1,
            title: "Algebra Basics", 
            content: "Start learning about algebra and how to use it to solve problems.",
            duration: "35 minutes",
            completed: false,
            multimedia: [],
            quiz: {
              title: "Algebra Questions",
              passingScore: 70,
              questions: [
                {
                  id: 1,
                  question: "What is x in the equation 2x + 5 = 15?",
                  type: "text",
                  options: ["5", "10", "15", "20"],
                  correctAnswer: 0
                }
              ]
            }
          },
          {
            id: 2,
            title: "Geometry Introduction",
            content: "Learn basic geometry concepts.",
            duration: "30 minutes",
            completed: false,
            multimedia: [],
            quiz: null
          }
        ]
      }
    };
    saveCourses(defaultCourses);
  }

  console.log('✅ Storage initialization complete');
  debugStorage();
};

// ==================== ENHANCED COURSE NAVIGATION FUNCTIONS ====================

// NEW: Get the next lesson index for a course
export const getNextLessonIndex = (studentId, courseKey) => {
  try {
    const student = getStudentById(studentId);
    const course = getCourseByKey(courseKey);
    
    if (!student || !course) {
      return 0; // Start from beginning
    }
    
    const currentIndex = student.currentLessonIndex?.[courseKey] || 0;
    const completedLessons = student.completedLessons || [];
    
    // If no lessons completed, return current index or 0
    if (completedLessons.length === 0) {
      return currentIndex || 0;
    }
    
    // Find the first uncompleted lesson
    const totalLessons = course.lessons?.length || 0;
    for (let i = 0; i < totalLessons; i++) {
      const lessonKey = `${courseKey}-${course.lessons[i].id}`;
      if (!completedLessons.includes(lessonKey)) {
        return i;
      }
    }
    
    // All lessons completed, return to first lesson for review
    return 0;
  } catch (error) {
    console.error('Error getting next lesson:', error);
    return 0;
  }
};

// NEW: Get course navigation info
export const getCourseNavigationInfo = (studentId, courseKey) => {
  const progress = getCourseProgress(studentId, courseKey);
  const course = getCourseByKey(courseKey);
  const nextLessonIndex = getNextLessonIndex(studentId, courseKey);
  
  return {
    course,
    progress,
    nextLessonIndex,
    shouldStartNew: progress.progress === 0,
    shouldContinue: progress.progress > 0 && progress.progress < 100,
    isCompleted: progress.progress === 100,
    nextLesson: course?.lessons?.[nextLessonIndex] || null
  };
};

// NEW: Update current lesson index
export const updateCurrentLessonIndex = (studentId, courseKey, lessonIndex) => {
  try {
    const student = getStudentById(studentId);
    
    if (!student) {
      throw new Error('Student not found');
    }
    
    if (!student.currentLessonIndex) {
      student.currentLessonIndex = {};
    }
    
    student.currentLessonIndex[courseKey] = lessonIndex;
    student.lastAccessed = new Date().toISOString();
    
    return updateStudent(student);
  } catch (error) {
    console.error('Error updating current lesson index:', error);
    return false;
  }
};

// NEW: Mark lesson as completed
export const markLessonAsCompleted = (studentId, courseKey, lessonId) => {
  try {
    const student = getStudentById(studentId);
    const course = getCourseByKey(courseKey);
    
    if (!student || !course) {
      throw new Error('Student or course not found');
    }
    
    const lessonKey = `${courseKey}-${lessonId}`;
    
    // Initialize completed lessons array if it doesn't exist
    if (!student.completedLessons) {
      student.completedLessons = [];
    }
    
    // Add lesson to completed if not already there
    if (!student.completedLessons.includes(lessonKey)) {
      student.completedLessons.push(lessonKey);
      
      // Award points
      student.points = (student.points || 0) + 10;
      
      // Update progress
      const totalLessons = course.lessons?.length || 1;
      const completedCount = student.completedLessons.filter(lesson => 
        lesson.startsWith(courseKey)
      ).length;
      const progress = Math.round((completedCount / totalLessons) * 100);
      
      if (!student.progress) {
        student.progress = {};
      }
      student.progress[courseKey] = progress;
      
      // Check if course is completed
      if (progress >= 100) {
        if (!student.completedCourses) {
          student.completedCourses = [];
        }
        if (!student.completedCourses.includes(courseKey)) {
          student.completedCourses.push(courseKey);
          student.points += 100; // Bonus points for course completion
          
          // Add completion badge
          if (!student.badges) {
            student.badges = [];
          }
          if (!student.badges.includes('Course Completer')) {
            student.badges.push('Course Completer');
          }
        }
      }
      
      console.log(`✅ Lesson ${lessonId} marked as completed for student ${studentId}`);
      return updateStudent(student);
    }
    
    return student;
  } catch (error) {
    console.error('Error marking lesson as completed:', error);
    throw error;
  }
};

// NEW: Get lesson completion status
export const getLessonCompletionStatus = (studentId, courseKey, lessonId) => {
  try {
    const student = getStudentById(studentId);
    const lessonKey = `${courseKey}-${lessonId}`;
    
    if (!student || !student.completedLessons) {
      return false;
    }
    
    return student.completedLessons.includes(lessonKey);
  } catch (error) {
    console.error('Error getting lesson completion status:', error);
    return false;
  }
};

// ==================== ENHANCED COURSE PROGRESS FUNCTIONS ====================

export const getCourseProgress = (studentId, courseKey) => {
  try {
    const student = getStudentById(studentId);
    const course = getCourseByKey(courseKey);
    
    if (!student || !course) {
      return {
        progress: 0,
        completedLessons: 0,
        totalLessons: 0,
        currentLessonIndex: 0,
        lastAccessed: null,
        isCompleted: false
      };
    }
    
    const progress = student.progress?.[courseKey] || 0;
    const totalLessons = course.lessons?.length || 0;
    const completedLessons = student.completedLessons?.filter(lesson => 
      lesson.startsWith(courseKey)
    ).length || 0;
    const currentLessonIndex = student.currentLessonIndex?.[courseKey] || 0;
    
    return {
      progress,
      completedLessons,
      totalLessons,
      currentLessonIndex,
      lastAccessed: student.lastAccessed,
      isCompleted: progress === 100
    };
  } catch (error) {
    console.error('Error getting course progress:', error);
    return {
      progress: 0,
      completedLessons: 0,
      totalLessons: 0,
      currentLessonIndex: 0,
      lastAccessed: null,
      isCompleted: false
    };
  }
};

// ==================== CRITICAL FIXED STUDENT FUNCTIONS ====================

export const getStudentById = (id) => {
  const users = getUsers();
  const students = getStudents();
  
  console.log('🔍 Looking for student:', id);
  
  // First check in users system
  if (users[id] && users[id].role === 'student') {
    console.log('✅ Found student in users system:', id);
    return users[id];
  }
  
  // Then check in students array
  const studentFromArray = students.find(student => 
    student.id == id || student.userId === id
  );
  
  if (studentFromArray) {
    console.log('✅ Found student in students array:', id);
    return studentFromArray;
  }
  
  console.log('❌ Student not found in any system:', id);
  return null;
};

export const updateStudent = (updatedStudent) => {
  const users = getUsers();
  const students = getStudents();
  
  let updated = false;
  
  // Update in users system
  if (users[updatedStudent.id]) {
    users[updatedStudent.id] = {
      ...users[updatedStudent.id],
      ...updatedStudent
    };
    saveUsers(users);
    updated = true;
    console.log('✅ Updated student in users system:', updatedStudent.id);
  }
  
  // Update in students array
  const studentIndex = students.findIndex(student => 
    student.id === updatedStudent.id || student.userId === updatedStudent.id
  );
  
  if (studentIndex !== -1) {
    students[studentIndex] = {
      ...students[studentIndex],
      ...updatedStudent
    };
    saveStudents(students);
    updated = true;
    console.log('✅ Updated student in students array:', updatedStudent.id);
  }
  
  if (!updated) {
    console.log('⚠️ Student not found in any system for update:', updatedStudent.id);
  }
  
  return updatedStudent;
};

// ==================== FIXED COURSE ENROLLMENT FUNCTIONS ====================

export const enrollStudentInCourse = (studentId, courseKey) => {
  const student = getStudentById(studentId);
  const courses = getCourses();
  
  console.log('🎓 Enrollment attempt:', { studentId, courseKey });
  
  if (!student) {
    throw new Error('Student not found. Please log in again.');
  }
  
  if (!courses[courseKey]) {
    throw new Error('Course not found');
  }
  
  // Check if already enrolled
  if (student.enrolledCourses?.includes(courseKey)) {
    throw new Error('Already enrolled in this course');
  }
  
  // Update student data
  const updatedStudent = {
    ...student,
    enrolledCourses: [...(student.enrolledCourses || []), courseKey],
    progress: {
      ...(student.progress || {}),
      [courseKey]: 0
    },
    currentLessonIndex: {
      ...(student.currentLessonIndex || {}),
      [courseKey]: 0
    },
    enrolledCoursesDate: {
      ...(student.enrolledCoursesDate || {}),
      [courseKey]: new Date().toISOString()
    }
  };
  
  // Update in both systems
  updateStudent(updatedStudent);
  
  console.log('✅ Enrollment successful');
  return true;
};

export const unenrollStudentFromCourse = (studentId, courseKey) => {
  const student = getStudentById(studentId);
  
  if (!student) {
    throw new Error('Student not found');
  }
  
  // Check if enrolled
  if (!student.enrolledCourses?.includes(courseKey)) {
    throw new Error('Not enrolled in this course');
  }
  
  // Remove course from enrolled courses
  const updatedEnrolledCourses = student.enrolledCourses.filter(course => course !== courseKey);
  
  // Remove progress tracking for this course
  const updatedProgress = { ...student.progress };
  delete updatedProgress[courseKey];
  
  // Remove current lesson index
  const updatedCurrentLessonIndex = { ...student.currentLessonIndex };
  delete updatedCurrentLessonIndex[courseKey];
  
  // Remove from completed courses if present
  const updatedCompletedCourses = student.completedCourses?.filter(course => course !== courseKey) || [];
  
  // Remove enrollment date
  const updatedEnrolledCoursesDate = { ...student.enrolledCoursesDate };
  delete updatedEnrolledCoursesDate[courseKey];
  
  // Remove completed lessons for this course
  const updatedCompletedLessons = student.completedLessons?.filter(lesson => 
    !lesson.startsWith(courseKey)
  ) || [];
  
  const updatedStudent = {
    ...student,
    enrolledCourses: updatedEnrolledCourses,
    progress: updatedProgress,
    currentLessonIndex: updatedCurrentLessonIndex,
    completedCourses: updatedCompletedCourses,
    enrolledCoursesDate: updatedEnrolledCoursesDate,
    completedLessons: updatedCompletedLessons
  };
  
  updateStudent(updatedStudent);
  console.log('✅ Unenrollment successful');
  return true;
};

export const getEnrolledCoursesWithProgress = (studentId) => {
  const student = getStudentById(studentId);
  const courses = getCourses();
  
  console.log('🔍 Getting enrolled courses for:', studentId);
  
  if (!student) {
    console.log('❌ Student not found:', studentId);
    return [];
  }
  
  if (!student.enrolledCourses || student.enrolledCourses.length === 0) {
    console.log('📝 No enrolled courses for student:', studentId);
    return [];
  }
  
  console.log('📚 Enrolled course keys:', student.enrolledCourses);
  
  const enrolledCourses = student.enrolledCourses.map(courseKey => {
    const course = courses[courseKey];
    if (!course) {
      console.log('❌ Course not found:', courseKey);
      return null;
    }
    
    const progress = getCourseProgress(studentId, courseKey);
    
    const courseData = {
      key: courseKey,
      ...course,
      progress: progress.progress,
      completedLessons: progress.completedLessons,
      totalLessons: progress.totalLessons,
      currentLessonIndex: progress.currentLessonIndex,
      isCompleted: progress.isCompleted,
      enrolledDate: student.enrolledCoursesDate?.[courseKey] || student.joinedDate
    };
    
    console.log('✅ Course data loaded:', courseKey, 'Progress:', progress.progress + '%');
    return courseData;
  }).filter(course => course !== null);
  
  console.log('🎯 Final enrolled courses:', enrolledCourses.length);
  return enrolledCourses;
};

// ==================== KEEP ALL YOUR EXISTING FUNCTIONS BELOW (with minor updates) ====================

// ... (Keep all your existing functions like email confirmation, user management, etc.)
// Only showing the enhanced parts above. The rest of your functions remain the same.

// ==================== ENHANCED TEST FUNCTION ====================

export const testStudentSystem = () => {
  console.log('=== 🧪 TESTING ENHANCED STUDENT SYSTEM ===');
  
  const currentUser = getCurrentUser();
  console.log('Current User:', currentUser);
  
  if (currentUser && currentUser.role === 'student') {
    const student = getStudentById(currentUser.id);
    console.log('Student Data:', student);
    
    const enrolledCourses = getEnrolledCoursesWithProgress(currentUser.id);
    console.log('Enrolled Courses:', enrolledCourses);
    
    // Test course navigation
    if (enrolledCourses.length > 0) {
      const courseKey = enrolledCourses[0].key;
      const navInfo = getCourseNavigationInfo(currentUser.id, courseKey);
      console.log('Course Navigation Info:', navInfo);
      
      const nextLessonIndex = getNextLessonIndex(currentUser.id, courseKey);
      console.log('Next Lesson Index:', nextLessonIndex);
    }
    
    const allCourses = getCourses();
    console.log('All Courses:', Object.keys(allCourses));
  } else {
    console.log('❌ No student user logged in');
  }
  
  console.log('=== ENHANCED TEST COMPLETE ===');
};

// ==================== EMAIL CONFIRMATION MANAGEMENT ====================
export const getEmailConfirmations = () => {
  try {
    const confirmations = localStorage.getItem(EMAIL_CONFIRMATIONS_KEY);
    return confirmations ? JSON.parse(confirmations) : {};
  } catch (error) {
    console.error('Error loading email confirmations:', error);
    return {};
  }
};

export const saveEmailConfirmations = (confirmations) => {
  try {
    localStorage.setItem(EMAIL_CONFIRMATIONS_KEY, JSON.stringify(confirmations));
  } catch (error) {
    console.error('Error saving email confirmations:', error);
  }
};

// ... (Keep all your existing email confirmation functions)

// ==================== USER MANAGEMENT ====================
export const getUsers = () => {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : {};
  } catch (error) {
    console.error('Error loading users:', error);
    return {};
  }
};

export const saveUsers = (users) => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users:', error);
  }
};

// ... (Keep all your existing user management functions)

// ==================== STUDENT MANAGEMENT ====================
export const getStudents = () => {
  try {
    const students = localStorage.getItem(STUDENT_KEY);
    return students ? JSON.parse(students) : [];
  } catch (error) {
    console.error('Error loading students:', error);
    return [];
  }
};

export const saveStudents = (students) => {
  try {
    localStorage.setItem(STUDENT_KEY, JSON.stringify(students));
  } catch (error) {
    console.error('Error saving students:', error);
  }
};

// ==================== COURSES MANAGEMENT ====================
export const getCourses = () => {
  try {
    const courses = localStorage.getItem(COURSES_KEY);
    return courses ? JSON.parse(courses) : {};
  } catch (error) {
    console.error('Error loading courses:', error);
    return {};
  }
};

export const saveCourses = (courses) => {
  try {
    localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
  } catch (error) {
    console.error('Error saving courses:', error);
  }
};

export const getCourseByKey = (courseKey) => {
  const courses = getCourses();
  return courses[courseKey] || null;
};

// ... (Keep all your existing course management functions)

// ==================== DEBUG FUNCTIONS ====================
export const debugStorage = () => {
  console.log('=== STORAGE DEBUG INFO ===');
  
  const users = getUsers();
  const currentUser = getCurrentUser();
  const students = getStudents();
  const courses = getCourses();
  
  console.log('All Users:', users);
  console.log('Current User:', currentUser);
  console.log('Students:', students);
  console.log('Courses:', courses);
  
  // Check specific users
  console.log('Admin User (admin1):', users['admin1']);
  console.log('Teacher User (teacher1):', users['teacher1']);
  console.log('Student User (student1):', users['student1']);
  
  console.log('=== END DEBUG INFO ===');
};

// Export all functions including the new ones
export default {
  // Enhanced course navigation
  getNextLessonIndex,
  getCourseNavigationInfo,
  updateCurrentLessonIndex,
  markLessonAsCompleted,
  getLessonCompletionStatus,
  getCourseProgress,
  
  // Core initialization
  initializeStorage,
  
  // Student functions
  getStudentById,
  updateStudent,
  getStudents,
  saveStudents,
  enrollStudentInCourse,
  unenrollStudentFromCourse,
  getEnrolledCoursesWithProgress,
  
  // Course functions
  getCourses,
  saveCourses,
  getCourseByKey,
  
  // User functions
  getUsers,
  saveUsers,
  getCurrentUser,
  setCurrentUser,
  authenticateUser,
  registerUser,
  
  // Test function
  testStudentSystem,
  debugStorage
  
  // ... (export all your other existing functions)
};
