// Local Storage utilities for STEM Platform

// Keys for localStorage
const STUDENT_KEY = 'hausaStem_students';
const CURRENT_USER_KEY = 'hausaStem_currentUser';
const COURSES_KEY = 'hausaStem_courses';
const USERS_KEY = 'hausaStem_users';
const EMAIL_CONFIRMATIONS_KEY = 'hausaStem_email_confirmations';

// ==================== BASIC STORAGE FUNCTIONS ====================

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

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error loading current user:', error);
    return null;
  }
};

export const setCurrentUser = (user) => {
  try {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch (error) {
    console.error('Error saving current user:', error);
  }
};

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// ==================== CRITICAL STUDENT FUNCTIONS ====================

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

// ==================== COURSE ENROLLMENT FUNCTIONS ====================

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
  
  // Remove from completed courses if present
  const updatedCompletedCourses = student.completedCourses?.filter(course => course !== courseKey) || [];
  
  // Remove enrollment date
  const updatedEnrolledCoursesDate = { ...student.enrolledCoursesDate };
  delete updatedEnrolledCoursesDate[courseKey];
  
  const updatedStudent = {
    ...student,
    enrolledCourses: updatedEnrolledCourses,
    progress: updatedProgress,
    completedCourses: updatedCompletedCourses,
    enrolledCoursesDate: updatedEnrolledCoursesDate
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
    
    const courseData = {
      key: courseKey,
      ...course,
      progress: student.progress?.[courseKey] || 0,
      isCompleted: student.completedCourses?.includes(courseKey) || false,
      enrolledDate: student.enrolledCoursesDate?.[courseKey] || student.joinedDate
    };
    
    console.log('✅ Course data loaded:', courseKey);
    return courseData;
  }).filter(course => course !== null);
  
  console.log('🎯 Final enrolled courses:', enrolledCourses.length);
  return enrolledCourses;
};

export const updateCourseProgress = (studentId, courseKey, progress) => {
  const student = getStudentById(studentId);
  
  if (!student) {
    throw new Error('Student not found');
  }
  
  if (!student.enrolledCourses?.includes(courseKey)) {
    throw new Error('Not enrolled in this course');
  }
  
  // Initialize progress tracking if it doesn't exist
  if (!student.progress) {
    student.progress = {};
  }
  
  // Update progress
  const newProgress = Math.min(100, Math.max(0, progress));
  student.progress[courseKey] = newProgress;
  
  // Check if course is completed
  if (newProgress >= 100) {
    if (!student.completedCourses) {
      student.completedCourses = [];
    }
    if (!student.completedCourses.includes(courseKey)) {
      student.completedCourses.push(courseKey);
      
      // Award points for course completion
      student.points = (student.points || 0) + 100;
      
      // Add completion badge if not already present
      if (!student.badges) {
        student.badges = [];
      }
      if (!student.badges.includes('Course Completer')) {
        student.badges.push('Course Completer');
      }
    }
  }
  
  updateStudent(student);
  return student.progress[courseKey];
};

export const getCourseCompletionStatus = (studentId, courseKey) => {
  const student = getStudentById(studentId);
  
  if (!student) {
    return { enrolled: false, progress: 0, completed: false };
  }
  
  return {
    enrolled: student.enrolledCourses?.includes(courseKey) || false,
    progress: student.progress?.[courseKey] || 0,
    completed: student.completedCourses?.includes(courseKey) || false
  };
};

// ==================== INITIALIZATION ====================

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
    // Update existing admin with proper email
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
          }
        ]
      }
    };
    saveCourses(defaultCourses);
  }

  console.log('✅ Storage initialization complete');
  debugStorage();
};

// ==================== USER AUTHENTICATION & REGISTRATION ====================

export const authenticateUser = (email, password) => {
  const users = getUsers();
  
  console.log('🔐 Authentication Attempt:', { email });
  
  // Find user by email and password
  const user = Object.values(users).find(
    user => user.email === email && user.password === password
  );
  
  console.log('Found User:', user);
  
  if (user) {
    // Admin users don't need email confirmation
    if (user.role !== 'admin' && !user.isEmailConfirmed) {
      console.log('❌ Login blocked: Email not confirmed');
      throw new Error('Please confirm your email address before logging in. Check your inbox for the confirmation link.');
    }
    
    // Check if user is a teacher and not approved
    if (user.role === 'teacher' && !user.isApproved) {
      console.log('❌ Teacher login blocked: Account not approved');
      throw new Error('Your teacher account is pending admin approval. Please wait for approval before logging in.');
    }
    
    // Set current user
    setCurrentUser(user);
    console.log('✅ Login Successful:', user.role);
    return user;
  }
  
  console.log('❌ Login Failed: No matching user found');
  return null;
};

export const registerUser = (userData) => {
  const users = getUsers();
  
  // Check if email already exists
  const existingUser = Object.values(users).find(
    user => user.email === userData.email
  );
  
  if (existingUser) {
    throw new Error('Email already registered');
  }
  
  // Generate unique user ID based on role
  const userId = `${userData.role}_${Date.now()}`;
  
  const newUser = {
    id: userId,
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: userData.role,
    isEmailConfirmed: false,
    joinedDate: new Date().toISOString()
  };
  
  // Add role-specific fields
  if (userData.role === 'teacher') {
    newUser.specialization = userData.specialization || 'General';
    newUser.bio = userData.bio || '';
    newUser.courses = [];
    newUser.isApproved = false;
    newUser.profileImage = userData.profileImage || '';
  } else if (userData.role === 'student') {
    newUser.level = userData.level || 'Beginner';
    newUser.progress = {};
    newUser.completedLessons = [];
    newUser.points = 0;
    newUser.badges = [];
    newUser.enrolledCourses = [];
    newUser.enrolledCoursesDate = {};
    
    // Also add to students array for backward compatibility
    const students = getStudents();
    const newStudentId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    const newStudent = {
      id: newStudentId,
      userId: userId,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: 'student',
      level: userData.level || 'Beginner',
      progress: {},
      completedLessons: [],
      points: 0,
      badges: [],
      enrolledCourses: [],
      enrolledCoursesDate: {},
      isEmailConfirmed: false,
      joinedDate: new Date().toISOString()
    };
    saveStudents([...students, newStudent]);
  }
  
  // Add to users
  users[userId] = newUser;
  saveUsers(users);
  
  // Create and send email confirmation
  const confirmationToken = createEmailConfirmation(userId, userData.email);
  sendEmailConfirmation(userData.email, confirmationToken);
  
  console.log('✅ New user registered (email confirmation sent):', userId);
  return { user: newUser, confirmationToken };
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

export const generateEmailConfirmationToken = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const createEmailConfirmation = (userId, email) => {
  const confirmations = getEmailConfirmations();
  const token = generateEmailConfirmationToken();
  
  const confirmation = {
    userId,
    email,
    token,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
    isUsed: false
  };
  
  confirmations[token] = confirmation;
  saveEmailConfirmations(confirmations);
  
  console.log(`📧 Email confirmation created for user ${userId}`);
  return token;
};

export const verifyEmailConfirmation = (token) => {
  const confirmations = getEmailConfirmations();
  const confirmation = confirmations[token];
  
  if (!confirmation) {
    throw new Error('Invalid confirmation token');
  }
  
  if (confirmation.isUsed) {
    throw new Error('Confirmation token already used');
  }
  
  if (new Date(confirmation.expiresAt) < new Date()) {
    throw new Error('Confirmation token has expired');
  }
  
  // Mark token as used
  confirmation.isUsed = true;
  confirmation.confirmedAt = new Date().toISOString();
  confirmations[token] = confirmation;
  saveEmailConfirmations(confirmations);
  
  return confirmation;
};

export const sendEmailConfirmation = (email, token) => {
  // In a real application, this would send an actual email
  // For demo purposes, we'll simulate the email sending and log the confirmation link
  const confirmationLink = `${window.location.origin}/confirm-email?token=${token}`;
  
  console.log('📧 Email Confirmation Details:');
  console.log('To:', email);
  console.log('Confirmation Link:', confirmationLink);
  console.log('Token (for testing):', token);
  
  // Simulate email sending
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('✅ Confirmation email sent successfully');
      resolve(true);
    }, 1000);
  });
};

export const confirmUserEmail = (token) => {
  try {
    const confirmation = verifyEmailConfirmation(token);
    const users = getUsers();
    
    if (!users[confirmation.userId]) {
      throw new Error('User not found');
    }
    
    // Update user email confirmation status
    users[confirmation.userId].isEmailConfirmed = true;
    users[confirmation.userId].emailConfirmedAt = new Date().toISOString();
    
    // Also update in students array if it's a student
    if (users[confirmation.userId].role === 'student') {
      const students = getStudents();
      const studentIndex = students.findIndex(s => s.userId === confirmation.userId || s.email === confirmation.email);
      if (studentIndex !== -1) {
        students[studentIndex].isEmailConfirmed = true;
        students[studentIndex].emailConfirmedAt = new Date().toISOString();
        saveStudents(students);
      }
    }
    
    saveUsers(users);
    
    console.log('✅ Email confirmed for user:', confirmation.userId);
    return users[confirmation.userId];
  } catch (error) {
    console.error('Error confirming email:', error);
    throw error;
  }
};

export const resendEmailConfirmation = (email) => {
  const users = getUsers();
  const user = Object.values(users).find(u => u.email === email);
  
  if (!user) {
    throw new Error('User not found with this email');
  }
  
  if (user.isEmailConfirmed) {
    throw new Error('Email is already confirmed');
  }
  
  // Create and send new email confirmation
  const confirmationToken = createEmailConfirmation(user.id, email);
  sendEmailConfirmation(email, confirmationToken);
  
  console.log('✅ Confirmation email resent to:', email);
  return { success: true, message: 'Confirmation email sent successfully' };
};

// ==================== TEACHER MANAGEMENT ====================

export const registerTeacher = (teacherData) => {
  return registerUser({
    ...teacherData,
    role: 'teacher'
  });
};

export const getAllTeachers = () => {
  const users = getUsers();
  return Object.values(users).filter(user => user.role === 'teacher');
};

export const getPendingTeachers = () => {
  const teachers = getAllTeachers();
  return teachers.filter(teacher => !teacher.isApproved);
};

export const getApprovedTeachers = () => {
  const teachers = getAllTeachers();
  return teachers.filter(teacher => teacher.isApproved);
};

export const approveTeacher = (teacherId) => {
  const users = getUsers();
  
  if (!users[teacherId] || users[teacherId].role !== 'teacher') {
    throw new Error('Teacher not found');
  }
  
  users[teacherId].isApproved = true;
  users[teacherId].approvedDate = new Date().toISOString();
  
  saveUsers(users);
  console.log('✅ Teacher approved:', teacherId);
  return users[teacherId];
};

export const getTeacherById = (teacherId) => {
  const users = getUsers();
  const teacher = users[teacherId];
  
  if (!teacher || teacher.role !== 'teacher') {
    return null;
  }
  
  return teacher;
};

// ==================== USER MANAGEMENT ====================

export const updateUser = (userId, userData) => {
  const users = getUsers();
  
  if (!users[userId]) {
    throw new Error('User not found');
  }

  users[userId] = {
    ...users[userId],
    ...userData,
    updatedAt: new Date().toISOString()
  };

  saveUsers(users);
  return users[userId];
};

export const getAllUsers = () => {
  const users = getUsers();
  return Object.values(users);
};

export const getUserById = (userId) => {
  const users = getUsers();
  return users[userId] || null;
};

// ==================== COURSE MANAGEMENT ====================

export const addStudent = (newStudent) => {
  const students = getStudents();
  const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
  const studentWithId = { 
    ...newStudent, 
    id: newId, 
    joinedDate: new Date().toISOString() 
  };
  
  const updatedStudents = [...students, studentWithId];
  saveStudents(updatedStudents);
  return studentWithId;
};

export const updateStudentProgress = (studentId, courseKey, progress, completedLessonId = null) => {
  const student = getStudentById(studentId);
  if (!student) return null;

  const updatedStudent = {
    ...student,
    progress: {
      ...student.progress,
      [courseKey]: progress
    }
  };

  if (completedLessonId && !updatedStudent.completedLessons.includes(completedLessonId)) {
    updatedStudent.completedLessons = [...updatedStudent.completedLessons, completedLessonId];
    updatedStudent.points = (updatedStudent.points || 0) + 10;
    
    if (updatedStudent.completedLessons.length >= 5) {
      if (!updatedStudent.badges) updatedStudent.badges = [];
      if (!updatedStudent.badges.includes('Fast Learner')) {
        updatedStudent.badges = [...updatedStudent.badges, 'Fast Learner'];
      }
    }
  }

  return updateStudent(updatedStudent);
};

export const getCourseByKey = (courseKey) => {
  const courses = getCourses();
  return courses[courseKey] || null;
};

// ==================== TEACHER FUNCTIONS ====================

export const getTeacherCourses = () => {
  const courses = getCourses();
  const teacherId = getCurrentTeacherId();
  
  if (!teacherId) {
    console.log('No teacher ID found, returning all courses for demo');
    return courses;
  }
  
  return Object.fromEntries(
    Object.entries(courses).filter(([key, course]) => course.teacherId === teacherId)
  );
};

export const getCurrentTeacherId = () => {
  const currentUser = getCurrentUser();
  return currentUser && currentUser.role === 'teacher' ? currentUser.id : null;
};

// ==================== ADMIN FUNCTIONS ====================

export const getPlatformStats = () => {
  const students = getStudents();
  const courses = getCourses();
  const teachers = getAllTeachers();
  const approvedTeachers = getApprovedTeachers();
  const pendingTeachers = getPendingTeachers();
  const users = getAllUsers();
  
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalApprovedTeachers = approvedTeachers.length;
  const totalPendingTeachers = pendingTeachers.length;
  const totalCourses = Object.keys(courses).length;
  const totalLessons = Object.values(courses).reduce((total, course) => 
    total + course.lessons.length, 0
  );
  const totalCompletedLessons = students.reduce((total, student) => 
    total + student.completedLessons.length, 0
  );
  
  const recentStudents = students
    .sort((a, b) => new Date(b.joinedDate) - new Date(a.joinedDate))
    .slice(0, 5);

  return {
    totalStudents,
    totalTeachers,
    totalApprovedTeachers,
    totalPendingTeachers,
    totalCourses,
    totalLessons,
    totalCompletedLessons,
    totalUsers: users.length,
    recentStudents
  };
};

// ==================== DEBUG & TESTING FUNCTIONS ====================

export const testStudentSystem = () => {
  console.log('=== 🧪 TESTING STUDENT SYSTEM ===');
  
  const currentUser = getCurrentUser();
  console.log('Current User:', currentUser);
  
  if (currentUser) {
    const student = getStudentById(currentUser.id);
    console.log('Student Data:', student);
    
    const enrolledCourses = getEnrolledCoursesWithProgress(currentUser.id);
    console.log('Enrolled Courses:', enrolledCourses);
    
    const allCourses = getCourses();
    console.log('All Courses:', Object.keys(allCourses));
  } else {
    console.log('❌ No user logged in');
  }
  
  console.log('=== TEST COMPLETE ===');
};

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

// ==================== EXPORT ALL FUNCTIONS ====================

export default {
  // Basic storage
  initializeStorage,
  getStudents,
  saveStudents,
  getUsers,
  saveUsers,
  getCourses,
  saveCourses,
  getCurrentUser,
  setCurrentUser,
  logoutUser,
  
  // Authentication & Registration
  authenticateUser,
  registerUser,
  registerTeacher,
  updateUser,
  getAllUsers,
  getUserById,
  
  // Student management
  getStudentById,
  updateStudent,
  addStudent,
  updateStudentProgress,
  
  // Course enrollment (NEW - CRITICAL)
  enrollStudentInCourse,
  unenrollStudentFromCourse,
  getEnrolledCoursesWithProgress,
  updateCourseProgress,
  getCourseCompletionStatus,
  
  // Email confirmation
  getEmailConfirmations,
  createEmailConfirmation,
  verifyEmailConfirmation,
  sendEmailConfirmation,
  confirmUserEmail,
  resendEmailConfirmation,
  
  // Teacher management
  getAllTeachers,
  getPendingTeachers,
  getApprovedTeachers,
  approveTeacher,
  getTeacherById,
  getTeacherCourses,
  getCurrentTeacherId,
  
  // Course management
  getCourseByKey,
  
  // Admin functions
  getPlatformStats,
  
  // Debug & Testing
  testStudentSystem,
  debugStorage
};
