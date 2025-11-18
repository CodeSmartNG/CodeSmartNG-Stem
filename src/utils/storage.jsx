// Local Storage utilities for STEM Platform

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
      isEmailConfirmed: true, // Admin email is pre-confirmed
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
      isEmailConfirmed: true, // Teacher email is pre-confirmed
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
      enrolledCoursesDate: {}, // ADDED: For course enrollment tracking
      isEmailConfirmed: true, // Demo student email is pre-confirmed
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
        userId: 'student1', // ADDED: Link to user ID
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
        enrolledCoursesDate: {}, // ADDED: For course enrollment tracking
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
  debugStorage(); // Show final state
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

// ==================== TEST FUNCTION ====================

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

// ==================== KEEP ALL YOUR EXISTING FUNCTIONS BELOW ====================
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

export const authenticateUser = (email, password) => {
  const users = getUsers();
  
  console.log('🔐 Authentication Attempt:', { email });
  console.log('Available Users:', Object.values(users).map(u => ({ 
    email: u.email, 
    role: u.role, 
    isApproved: u.isApproved,
    isEmailConfirmed: u.isEmailConfirmed 
  })));
  
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

// ==================== USER REGISTRATION ====================
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
    isEmailConfirmed: false, // Email not confirmed initially
    joinedDate: new Date().toISOString()
  };
  
  // Add role-specific fields
  if (userData.role === 'teacher') {
    newUser.specialization = userData.specialization || 'General';
    newUser.bio = userData.bio || '';
    newUser.courses = [];
    newUser.isApproved = false; // Must be approved by admin
    newUser.profileImage = userData.profileImage || '';
  } else if (userData.role === 'student') {
    newUser.level = userData.level || 'Beginner';
    newUser.progress = {};
    newUser.completedLessons = [];
    newUser.points = 0;
    newUser.badges = [];
    newUser.enrolledCourses = [];
    newUser.enrolledCoursesDate = {}; // ADDED: For course enrollment tracking
    
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
      enrolledCoursesDate: {}, // ADDED: For course enrollment tracking
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

// ==================== EMAIL CONFIRMATION ====================
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

// ==================== TEACHER REGISTRATION & MANAGEMENT ====================
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

export const rejectTeacher = (teacherId) => {
  const users = getUsers();
  
  if (!users[teacherId] || users[teacherId].role !== 'teacher') {
    throw new Error('Teacher not found');
  }
  
  // Remove teacher from users
  delete users[teacherId];
  saveUsers(users);
  
  console.log('❌ Teacher rejected and removed:', teacherId);
  return true;
};

export const dismissTeacher = (teacherId) => {
  const users = getUsers();
  
  if (!users[teacherId] || users[teacherId].role !== 'teacher') {
    throw new Error('Teacher not found');
  }
  
  // Set teacher as not approved and add dismissal date
  users[teacherId].isApproved = false;
  users[teacherId].dismissedDate = new Date().toISOString();
  
  saveUsers(users);
  console.log('🚫 Teacher dismissed:', teacherId);
  return users[teacherId];
};

export const updateTeacherProfile = (teacherId, profileData) => {
  const users = getUsers();
  
  if (!users[teacherId] || users[teacherId].role !== 'teacher') {
    throw new Error('Teacher not found');
  }
  
  users[teacherId] = {
    ...users[teacherId],
    ...profileData,
    updatedAt: new Date().toISOString()
  };
  
  saveUsers(users);
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

// ==================== USER MANAGEMENT FUNCTIONS ====================
export const deleteUser = (userId) => {
  const users = getUsers();
  const currentUser = getCurrentUser();
  
  if (!users[userId]) {
    throw new Error('User not found');
  }

  // Don't allow deleting the current user
  if (currentUser && currentUser.id === userId) {
    throw new Error('Cannot delete your own account');
  }

  // Don't allow deleting admin users
  if (users[userId].role === 'admin') {
    throw new Error('Cannot delete admin users');
  }

  // Remove user from users
  delete users[userId];
  saveUsers(users);

  // If it's a student, also remove from students array
  if (users[userId]?.role === 'student') {
    const students = getStudents();
    const updatedStudents = students.filter(student => student.userId !== userId);
    saveStudents(updatedStudents);
  }

  console.log('🗑 User deleted:', userId);
  return true;
};

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

export const getTeacherStats = () => {
  const teacherCourses = getTeacherCourses();
  const allStudents = getStudents();
  
  const totalCourses = Object.keys(teacherCourses).length;
  const totalLessons = Object.values(teacherCourses).reduce(
    (acc, course) => acc + (course.lessons?.length || 0), 0
  );
  
  // Calculate students enrolled in teacher's courses
  const teacherCourseKeys = Object.keys(teacherCourses);
  const totalStudents = allStudents.filter(student => 
    student.enrolledCourses?.some(courseKey => 
      teacherCourseKeys.includes(courseKey)
    )
  ).length;

  // Calculate completion rate
  let totalCompletions = 0;
  let totalPossibleCompletions = 0;
  
  allStudents.forEach(student => {
    teacherCourseKeys.forEach(courseKey => {
      if (student.enrolledCourses?.includes(courseKey)) {
        totalPossibleCompletions++;
        if (student.completedCourses?.includes(courseKey)) {
          totalCompletions++;
        }
      }
    });
  });
  
  const averageCompletionRate = totalPossibleCompletions > 0 
    ? Math.round((totalCompletions / totalPossibleCompletions) * 100)
    : 0;

  return {
    totalCourses,
    totalLessons,
    totalStudents,
    averageCompletionRate,
    recentActivity: [
      {
        type: 'course',
        title: 'New Course Created',
        description: 'You created a new course',
        date: new Date().toISOString()
      },
      {
        type: 'lesson',
        title: 'Lesson Updated',
        description: 'You updated a lesson',
        date: new Date(Date.now() - 86400000).toISOString()
      }
    ]
  };
};

export const getCurrentTeacherId = () => {
  const currentUser = getCurrentUser();
  return currentUser && currentUser.role === 'teacher' ? currentUser.id : null;
};

// Update the addNewCourse function to include teacher ID
export const addNewCourse = (courseData) => {
  const courses = getCourses();
  const courseKey = courseData.key || generateCourseKey(courseData.title);
  
  if (courses[courseKey]) {
    throw new Error('Course with this key already exists');
  }

  const teacherId = getCurrentTeacherId();
  
  courses[courseKey] = {
    ...courseData,
    key: courseKey,
    teacherId: teacherId,
    lessons: courseData.lessons || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
  return courseKey;
};

export const addNewCourseWithTeacher = (courseData, teacherId) => {
  const courses = getCourses();
  const users = getUsers();
  
  const courseKey = courseData.key || generateCourseKey(courseData.title);
  
  if (courses[courseKey]) {
    throw new Error('Course with this key already exists');
  }
  
  // Verify teacher exists and is approved
  const teacher = users[teacherId];
  if (!teacher || teacher.role !== 'teacher' || !teacher.isApproved) {
    throw new Error('Teacher not found or not approved');
  }
  
  // Create course
  courses[courseKey] = {
    ...courseData,
    key: courseKey,
    teacherId: teacherId,
    teacherName: teacher.name,
    lessons: courseData.lessons || [],
    isPublished: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // Add course to teacher's courses array
  if (!teacher.courses) {
    teacher.courses = [];
  }
  teacher.courses.push(courseKey);
  users[teacherId] = teacher;
  
  saveCourses(courses);
  saveUsers(users);
  
  return courseKey;
};

export const approveCourse = (courseKey) => {
  const courses = getCourses();
  
  if (!courses[courseKey]) {
    throw new Error('Course not found');
  }
  
  courses[courseKey].isPublished = true;
  courses[courseKey].approvedDate = new Date().toISOString();
  
  saveCourses(courses);
  return courses[courseKey];
};

const generateCourseKey = (title) => {
  return title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
};

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

// KEEP THIS ORIGINAL getStudentById BUT USE THE FIXED ONE ABOVE
// export const getStudentById = (id) => {
//   const students = getStudents();
//   return students.find(student => student.id === id);
// };

// KEEP THIS ORIGINAL updateStudent BUT USE THE FIXED ONE ABOVE  
// export const updateStudent = (updatedStudent) => {
//   const students = getStudents();
//   const updatedStudents = students.map(student => 
//     student.id === updatedStudent.id ? { ...student, ...updatedStudent } : student
//   );
//   saveStudents(updatedStudents);
//   return updatedStudent;
// };

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

// Progress tracking
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

export const addLessonToCourse = (courseKey, lessonData) => {
  const courses = getCourses();
  const course = courses[courseKey];
  
  if (!course) {
    throw new Error('Course not found');
  }
  
  const newLessonId = course.lessons.length > 0 
    ? Math.max(...course.lessons.map(l => l.id)) + 1 
    : 1;
  
  const newLesson = {
    id: newLessonId,
    ...lessonData
  };
  
  const updatedCourse = {
    ...course,
    lessons: [...course.lessons, newLesson]
  };
  
  const updatedCourses = {
    ...courses,
    [courseKey]: updatedCourse
  };
  
  saveCourses(updatedCourses);
  return newLesson;
};

export const updateCourse = (courseKey, courseData) => {
  const courses = getCourses();
  
  if (!courses[courseKey]) {
    throw new Error('Course not found');
  }
  
  const updatedCourses = {
    ...courses,
    [courseKey]: { 
      ...courses[courseKey], 
      ...courseData,
      updatedAt: new Date().toISOString()
    }
  };
  
  saveCourses(updatedCourses);
  return updatedCourses[courseKey];
};

export const deleteCourse = (courseKey) => {
  const courses = getCourses();
  if (!courses[courseKey]) {
    throw new Error('Course not found');
  }
  
  const updatedCourses = { ...courses };
  delete updatedCourses[courseKey];
  saveCourses(updatedCourses);
  return true;
};

// ==================== LESSON MANAGEMENT ====================
export const updateLesson = (courseKey, lessonId, lessonData) => {
  const courses = getCourses();
  const course = courses[courseKey];
  
  if (!course) {
    throw new Error('Course not found');
  }
  
  const updatedLessons = course.lessons.map(lesson =>
    lesson.id === lessonId ? { ...lesson, ...lessonData } : lesson
  );
  
  const updatedCourse = {
    ...course,
    lessons: updatedLessons
  };
  
  const updatedCourses = {
    ...courses,
    [courseKey]: updatedCourse
  };
  
  saveCourses(updatedCourses);
  return updatedCourse;
};

export const deleteLesson = (courseKey, lessonId) => {
  const courses = getCourses();
  const course = courses[courseKey];
  
  if (!course) {
    throw new Error('Course not found');
  }
  
  const updatedLessons = course.lessons.filter(lesson => lesson.id !== lessonId);
  
  const updatedCourse = {
    ...course,
    lessons: updatedLessons
  };
  
  const updatedCourses = {
    ...courses,
    [courseKey]: updatedCourse
  };
  
  saveCourses(updatedCourses);
  return updatedCourse;
};

// ==================== MULTIMEDIA MANAGEMENT ====================
export const addMultimediaToLesson = (courseKey, lessonId, multimediaItem) => {
  const courses = getCourses();
  const course = courses[courseKey];
  
  if (!course) {
    throw new Error('Course not found');
  }
  
  const lesson = course.lessons.find(l => l.id === lessonId);
  if (!lesson) {
    throw new Error('Lesson not found');
  }
  
  if (!lesson.multimedia) {
    lesson.multimedia = [];
  }
  
  const newMultimediaItem = {
    id: lesson.multimedia.length > 0 ? Math.max(...lesson.multimedia.map(m => m.id)) + 1 : 1,
    ...multimediaItem
  };
  
  lesson.multimedia.push(newMultimediaItem);
  
  const updatedCourses = {
    ...courses,
    [courseKey]: course
  };
  
  saveCourses(updatedCourses);
  return newMultimediaItem;
};

export const updateMultimediaInLesson = (courseKey, lessonId, multimediaId, multimediaData) => {
  const courses = getCourses();
  const course = courses[courseKey];
  
  if (!course) {
    throw new Error('Course not found');
  }
  
  const lesson = course.lessons.find(l => l.id === lessonId);
  if (!lesson || !lesson.multimedia) {
    throw new Error('Lesson or multimedia not found');
  }
  
  const updatedMultimedia = lesson.multimedia.map(item =>
    item.id === multimediaId ? { ...item, ...multimediaData } : item
  );
  
  lesson.multimedia = updatedMultimedia;
  
  const updatedCourses = {
    ...courses,
    [courseKey]: course
  };
  
  saveCourses(updatedCourses);
  return updatedMultimedia.find(item => item.id === multimediaId);
};

export const deleteMultimediaFromLesson = (courseKey, lessonId, multimediaId) => {
  const courses = getCourses();
  const course = courses[courseKey];
  
  if (!course) {
    throw new Error('Course not found');
  }
  
  const lesson = course.lessons.find(l => l.id === lessonId);
  if (!lesson || !lesson.multimedia) {
    throw new Error('Lesson or multimedia not found');
  }
  
  lesson.multimedia = lesson.multimedia.filter(item => item.id !== multimediaId);
  
  const updatedCourses = {
    ...courses,
    [courseKey]: course
  };
  
  saveCourses(updatedCourses);
  return true;
};

// ==================== ADMIN COURSE MANAGEMENT ====================
export const getAllCoursesForAdmin = () => {
  return getCourses();
};

export const getCourseDetailsForAdmin = (courseKey) => {
  const courses = getCourses();
  const course = courses[courseKey];
  
  if (!course) {
    throw new Error('Course not found');
  }
  
  // Get teacher information
  const users = getUsers();
  const teacher = users[course.teacherId];
  
  return {
    ...course,
    teacherInfo: teacher ? {
      name: teacher.name,
      email: teacher.email,
      specialization: teacher.specialization,
      isApproved: teacher.isApproved
    } : null
  };
};

export const deleteCourseAsAdmin = (courseKey) => {
  const courses = getCourses();
  
  if (!courses[courseKey]) {
    throw new Error('Course not found');
  }
  
  // Remove course from teacher's courses array if teacher exists
  const teacherId = courses[courseKey].teacherId;
  if (teacherId) {
    const users = getUsers();
    const teacher = users[teacherId];
    if (teacher && teacher.courses) {
      teacher.courses = teacher.courses.filter(course => course !== courseKey);
      saveUsers(users);
    }
  }
  
  // Remove course from enrolled students
  const students = getStudents();
  const updatedStudents = students.map(student => ({
    ...student,
    enrolledCourses: student.enrolledCourses?.filter(course => course !== courseKey) || [],
    completedCourses: student.completedCourses?.filter(course => course !== courseKey) || [],
    progress: Object.fromEntries(
      Object.entries(student.progress || {}).filter(([key]) => key !== courseKey)
    )
  }));
  saveStudents(updatedStudents);
  
  // Delete the course
  const updatedCourses = { ...courses };
  delete updatedCourses[courseKey];
  saveCourses(updatedCourses);
  
  console.log(`🗑 Admin deleted course: ${courseKey}`);
  return true;
};

export const deleteLessonAsAdmin = (courseKey, lessonId) => {
  const courses = getCourses();
  const course = courses[courseKey];
  
  if (!course) {
    throw new Error('Course not found');
  }
  
  const lesson = course.lessons.find(l => l.id === lessonId);
  if (!lesson) {
    throw new Error('Lesson not found');
  }
  
  // Remove lesson from students' completed lessons
  const students = getStudents();
  const updatedStudents = students.map(student => ({
    ...student,
    completedLessons: student.completedLessons?.filter(lessonKey => 
      !lessonKey.includes(`${courseKey}-${lessonId}`)
    ) || []
  }));
  saveStudents(updatedStudents);
  
  // Delete the lesson
  const updatedLessons = course.lessons.filter(lesson => lesson.id !== lessonId);
  const updatedCourse = {
    ...course,
    lessons: updatedLessons
  };
  
  const updatedCourses = {
    ...courses,
    [courseKey]: updatedCourse
  };
  
  saveCourses(updatedCourses);
  
  console.log(`🗑 Admin deleted lesson ${lessonId} from course: ${courseKey}`);
  return true;
};

export const getTeacherCoursesForAdmin = (teacherId) => {
  const courses = getCourses();
  const teacherCourses = Object.fromEntries(
    Object.entries(courses).filter(([key, course]) => course.teacherId === teacherId)
  );
  
  return teacherCourses;
};

export const getCourseAnalyticsForAdmin = (courseKey) => {
  const course = getCourseByKey(courseKey);
  if (!course) {
    throw new Error('Course not found');
  }
  
  const students = getStudents();
  const enrolledStudents = students.filter(student => 
    student.enrolledCourses?.includes(courseKey)
  );
  
  const completedStudents = students.filter(student => 
    student.completedCourses?.includes(courseKey)
  );
  
  let totalLessonCompletions = 0;
  let totalPossibleCompletions = 0;
  
  enrolledStudents.forEach(student => {
    course.lessons.forEach(lesson => {
      totalPossibleCompletions++;
      if (student.completedLessons?.includes(`${courseKey}-${lesson.id}`)) {
        totalLessonCompletions++;
      }
    });
  });
  
  const averageCompletionRate = totalPossibleCompletions > 0 
    ? Math.round((totalLessonCompletions / totalPossibleCompletions) * 100)
    : 0;
  
  // Quiz analytics
  let totalQuizAttempts = 0;
  let passedQuizAttempts = 0;
  let totalQuizScore = 0;
  
  enrolledStudents.forEach(student => {
    if (student.quizResults) {
      student.quizResults.forEach(result => {
        if (result.courseKey === courseKey) {
          totalQuizAttempts++;
          totalQuizScore += result.score;
          if (result.passed) {
            passedQuizAttempts++;
          }
        }
      });
    }
  });
  
  const averageQuizScore = totalQuizAttempts > 0 ? Math.round(totalQuizScore / totalQuizAttempts) : 0;
  const quizPassRate = totalQuizAttempts > 0 ? Math.round((passedQuizAttempts / totalQuizAttempts) * 100) : 0;
  
  return {
    courseKey,
    courseTitle: course.title,
    totalEnrolled: enrolledStudents.length,
    totalCompleted: completedStudents.length,
    completionRate: enrolledStudents.length > 0 ? Math.round((completedStudents.length / enrolledStudents.length) * 100) : 0,
    averageLessonCompletion: averageCompletionRate,
    totalLessons: course.lessons.length,
    totalQuizAttempts,
    averageQuizScore,
    quizPassRate,
    recentEnrollments: enrolledStudents
      .sort((a, b) => new Date(b.joinedDate) - new Date(a.joinedDate))
      .slice(0, 5)
      .map(student => ({
        name: student.name,
        enrolledDate: student.enrolledCoursesDate?.[courseKey] || student.joinedDate,
        progress: student.progress?.[courseKey] || 0
      }))
  };
};

export const getAllCoursesAnalyticsForAdmin = () => {
  const courses = getCourses();
  const analytics = [];
  
  Object.entries(courses).forEach(([courseKey, course]) => {
    const courseAnalytics = getCourseAnalyticsForAdmin(courseKey);
    analytics.push(courseAnalytics);
  });
  
  return analytics.sort((a, b) => b.totalEnrolled - a.totalEnrolled);
};

export const updateCourseAsAdmin = (courseKey, courseData) => {
  const courses = getCourses();
  
  if (!courses[courseKey]) {
    throw new Error('Course not found');
  }
  
  const updatedCourses = {
    ...courses,
    [courseKey]: { 
      ...courses[courseKey], 
      ...courseData,
      updatedAt: new Date().toISOString(),
      lastUpdatedBy: 'admin'
    }
  };
  
  saveCourses(updatedCourses);
  return updatedCourses[courseKey];
};

export const updateLessonAsAdmin = (courseKey, lessonId, lessonData) => {
  const courses = getCourses();
  const course = courses[courseKey];
  
  if (!course) {
    throw new Error('Course not found');
  }
  
  const updatedLessons = course.lessons.map(lesson =>
    lesson.id === lessonId ? { 
      ...lesson, 
      ...lessonData,
      lastUpdatedBy: 'admin'
    } : lesson
  );
  
  const updatedCourse = {
    ...course,
    lessons: updatedLessons
  };
  
  const updatedCourses = {
    ...courses,
    [courseKey]: updatedCourse
  };
  
  saveCourses(updatedCourses);
  return updatedCourse;
};

// ==================== ADMIN TEACHER MANAGEMENT ====================
export const getTeacherCoursesWithDetails = (teacherId) => {
  const teacherCourses = getTeacherCoursesForAdmin(teacherId);
  const coursesWithDetails = {};
  
  Object.entries(teacherCourses).forEach(([courseKey, course]) => {
    const analytics = getCourseAnalyticsForAdmin(courseKey);
    coursesWithDetails[courseKey] = {
      ...course,
      analytics
    };
  });
  
  return coursesWithDetails;
};

export const getUnapprovedCourses = () => {
  const courses = getCourses();
  const unapprovedCourses = Object.fromEntries(
    Object.entries(courses).filter(([key, course]) => !course.isPublished)
  );
  
  return unapprovedCourses;
};

export const approveCourseAsAdmin = (courseKey) => {
  const courses = getCourses();
  
  if (!courses[courseKey]) {
    throw new Error('Course not found');
  }
  
  courses[courseKey].isPublished = true;
  courses[courseKey].approvedDate = new Date().toISOString();
  courses[courseKey].approvedBy = 'admin';
  
  saveCourses(courses);
  console.log(`✅ Admin approved course: ${courseKey}`);
  return courses[courseKey];
};

export const rejectCourseAsAdmin = (courseKey) => {
  const courses = getCourses();
  
  if (!courses[courseKey]) {
    throw new Error('Course not found');
  }
  
  // You can either delete the course or mark it as rejected
  // Here we'll mark it as rejected but keep it for review
  courses[courseKey].isPublished = false;
  courses[courseKey].rejectedDate = new Date().toISOString();
  courses[courseKey].rejectedBy = 'admin';
  courses[courseKey].rejectionReason = 'Rejected by admin';
  
  saveCourses(courses);
  console.log(`❌ Admin rejected course: ${courseKey}`);
  return courses[courseKey];
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

  // Get quiz analytics
  const quizAnalytics = getQuizAnalytics();

  return {
    totalStudents,
    totalTeachers,
    totalApprovedTeachers,
    totalPendingTeachers,
    totalCourses,
    totalLessons,
    totalCompletedLessons,
    totalUsers: users.length,
    recentStudents,
    studentProgress: students.map(student => ({
      name: student.name,
      progress: Object.values(student.progress).reduce((a, b) => a + b, 0) / 3,
      completedLessons: student.completedLessons.length,
      joinedDate: student.joinedDate
    })),
    ...quizAnalytics
  };
};

// ==================== CERTIFICATE FUNCTIONS ====================
export const generateCertificate = (studentId, courseKey, completionDate, certificateId) => {
  const student = getStudentById(studentId);
  const courses = getCourses();
  const course = courses[courseKey];
  
  if (!student || !course) {
    throw new Error('Student or course not found');
  }
  
  const certificate = {
    id: certificateId || `cert_${Date.now()}`,
    studentId: student.id,
    studentName: student.name,
    courseKey: courseKey,
    courseTitle: course.title,
    completionDate: completionDate || new Date().toISOString(),
    issuedDate: new Date().toISOString(),
    certificateUrl: null,
    verificationCode: generateVerificationCode()
  };
  
  if (!student.certificates) {
    student.certificates = [];
  }
  student.certificates.push(certificate);
  
  updateStudent(student);
  
  return certificate;
};

export const getStudentCertificates = (studentId) => {
  const student = getStudentById(studentId);
  return student?.certificates || [];
};

export const getCertificateById = (certificateId) => {
  const students = getStudents();
  for (let student of students) {
    if (student.certificates) {
      const certificate = student.certificates.find(cert => cert.id === certificateId);
      if (certificate) return certificate;
    }
  }
  return null;
};

export const verifyCertificate = (certificateId, verificationCode) => {
  const certificate = getCertificateById(certificateId);
  if (!certificate) {
    return { valid: false, message: 'Certificate not found' };
  }
  
  if (certificate.verificationCode !== verificationCode) {
    return { valid: false, message: 'Invalid verification code' };
  }
  
  return { 
    valid: true, 
    message: 'Certificate verified successfully',
    certificate: certificate 
  };
};

export const checkCertificateEligibility = (studentId, courseKey) => {
  const student = getStudentById(studentId);
  const courses = getCourses();
  const course = courses[courseKey];
  
  if (!student || !course) {
    return { eligible: false, reason: 'Student or course not found' };
  }
  
  if (student.progress[courseKey] < 100) {
    return { 
      eligible: false, 
      reason: 'Course not completed', 
      progress: student.progress[courseKey] 
    };
  }
  
  const existingCert = student.certificates?.find(cert => 
    cert.courseKey === courseKey
  );
  
  if (existingCert) {
    return { 
      eligible: false, 
      reason: 'Certificate already issued',
      certificate: existingCert 
    };
  }
  
  return { eligible: true, reason: 'Eligible for certificate' };
};

const generateVerificationCode = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

// ==================== QUIZ MANAGEMENT FUNCTIONS ====================
export const addQuizToLesson = (courseKey, lessonId, quizData) => {
  const courses = getCourses();
  const course = courses[courseKey];
  
  if (!course) {
    throw new Error('Course not found');
  }
  
  const lesson = course.lessons.find(l => l.id === lessonId);
  if (!lesson) {
    throw new Error('Lesson not found');
  }
  
  // Generate unique IDs for questions if not provided
  const quizWithIds = {
    ...quizData,
    questions: quizData.questions.map((q, index) => ({
      id: q.id || index + 1,
      ...q
    }))
  };
  
  lesson.quiz = quizWithIds;
  
  const updatedCourses = {
    ...courses,
    [courseKey]: course
  };
  
  saveCourses(updatedCourses);
  return quizWithIds;
};

export const updateQuizInLesson = (courseKey, lessonId, quizData) => {
  const courses = getCourses();
  const course = courses[courseKey];
  
  if (!course) {
    throw new Error('Course not found');
  }
  
  const lesson = course.lessons.find(l => l.id === lessonId);
  if (!lesson || !lesson.quiz) {
    throw new Error('Lesson or quiz not found');
  }
  
  lesson.quiz = { ...lesson.quiz, ...quizData };
  
  const updatedCourses = {
    ...courses,
    [courseKey]: course
  };
  
  saveCourses(updatedCourses);
  return lesson.quiz;
};

export const deleteQuizFromLesson = (courseKey, lessonId) => {
  const courses = getCourses();
  const course = courses[courseKey];
  
  if (!course) {
    throw new Error('Course not found');
  }
  
  const lesson = course.lessons.find(l => l.id === lessonId);
  if (!lesson) {
    throw new Error('Lesson not found');
  }
  
  lesson.quiz = null;
  
  const updatedCourses = {
    ...courses,
    [courseKey]: course
  };
  
  saveCourses(updatedCourses);
  return true;
};

export const getQuizResults = (studentId, courseKey, lessonId) => {
  const student = getStudentById(studentId);
  if (!student || !student.quizResults) return null;
  
  return student.quizResults.find(result => 
    result.courseKey === courseKey && result.lessonId === lessonId
  );
};

export const saveQuizResult = (studentId, courseKey, lessonId, score, passed, totalQuestions) => {
  const student = getStudentById(studentId);
  if (!student) return null;

  if (!student.quizResults) {
    student.quizResults = [];
  }

  const existingResultIndex = student.quizResults.findIndex(
    result => result.courseKey === courseKey && result.lessonId === lessonId
  );

  const quizResult = {
    courseKey,
    lessonId,
    score,
    passed,
    totalQuestions,
    completedAt: new Date().toISOString(),
    attempts: existingResultIndex >= 0 ? student.quizResults[existingResultIndex].attempts + 1 : 1
  };

  if (existingResultIndex >= 0) {
    // Update existing result if this score is higher
    if (score > student.quizResults[existingResultIndex].score) {
      student.quizResults[existingResultIndex] = quizResult;
    }
  } else {
    // Add new result
    student.quizResults.push(quizResult);
  }

  return updateStudent(student);
};

// ==================== ENHANCED ANALYTICS ====================
export const getQuizAnalytics = () => {
  const students = getStudents();
  const courses = getCourses();
  
  let totalQuizzes = 0;
  let totalAttempts = 0;
  let passedAttempts = 0;
  let averageScore = 0;
  
  // Calculate quiz statistics
  students.forEach(student => {
    if (student.quizResults) {
      student.quizResults.forEach(result => {
        totalAttempts++;
        averageScore += result.score;
        if (result.passed) {
          passedAttempts++;
        }
      });
    }
  });
  
  // Count total quizzes available
  Object.values(courses).forEach(course => {
    course.lessons.forEach(lesson => {
      if (lesson.quiz) {
        totalQuizzes++;
      }
    });
  });
  
  averageScore = totalAttempts > 0 ? averageScore / totalAttempts : 0;
  
  return {
    totalQuizzes,
    totalAttempts,
    passedAttempts,
    failedAttempts: totalAttempts - passedAttempts,
    averageScore: Math.round(averageScore),
    passRate: totalAttempts > 0 ? Math.round((passedAttempts / totalAttempts) * 100) : 0
  };
};

export const getStudentQuizProgress = (studentId) => {
  const student = getStudentById(studentId);
  const courses = getCourses();
  
  if (!student) return null;
  
  let totalQuizzes = 0;
  let completedQuizzes = 0;
  let averageQuizScore = 0;
  
  // Count total quizzes and completed quizzes
  Object.entries(courses).forEach(([courseKey, course]) => {
    course.lessons.forEach(lesson => {
      if (lesson.quiz) {
        totalQuizzes++;
        const quizResult = student.quizResults?.find(
          result => result.courseKey === courseKey && result.lessonId === lesson.id
        );
        if (quizResult) {
          completedQuizzes++;
          averageQuizScore += quizResult.score;
        }
      }
    });
  });
  
  averageQuizScore = completedQuizzes > 0 ? averageQuizScore / completedQuizzes : 0;
  
  return {
    totalQuizzes,
    completedQuizzes,
    pendingQuizzes: totalQuizzes - completedQuizzes,
    completionRate: totalQuizzes > 0 ? Math.round((completedQuizzes / totalQuizzes) * 100) : 0,
    averageScore: Math.round(averageQuizScore)
  };
};

// ==================== ENHANCED COURSE FUNCTIONS ====================
export const getCourseByKey = (courseKey) => {
  const courses = getCourses();
  return courses[courseKey] || null;
};

export const getLessonById = (courseKey, lessonId) => {
  const course = getCourseByKey(courseKey);
  if (!course) return null;
  
  return course.lessons.find(lesson => lesson.id === lessonId) || null;
};

export const getTotalLessons = () => {
  const courses = getCourses();
  return Object.values(courses).reduce((total, course) => 
    total + course.lessons.length, 0
  );
};

export const getLessonsWithQuizzes = () => {
  const courses = getCourses();
  const lessonsWithQuizzes = [];
  
  Object.entries(courses).forEach(([courseKey, course]) => {
    course.lessons.forEach(lesson => {
      if (lesson.quiz) {
        lessonsWithQuizzes.push({
          courseKey,
          courseTitle: course.title,
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          quiz: lesson.quiz
        });
      }
    });
  });
  
  return lessonsWithQuizzes;
};

// ==================== DATA BACKUP AND MANAGEMENT ====================
export const exportData = () => {
  const data = {
    students: getStudents(),
    courses: getCourses(),
    users: getUsers(),
    exportDate: new Date().toISOString(),
    version: '1.0'
  };
  
  // Create a downloadable JSON file
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  return URL.createObjectURL(dataBlob);
};

export const importData = (jsonData) => {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.students && Array.isArray(data.students)) {
      saveStudents(data.students);
    }
    
    if (data.courses && typeof data.courses === 'object') {
      saveCourses(data.courses);
    }

    if (data.users && typeof data.users === 'object') {
      saveUsers(data.users);
    }
    
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};

export const resetAllData = () => {
  if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
    localStorage.removeItem(STUDENT_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(COURSES_KEY);
    localStorage.removeItem(USERS_KEY);
    initializeStorage();
    return true;
  }
  return false;
};

// ==================== ENHANCED PROGRESS TRACKING ====================
export const calculateOverallProgress = (studentId) => {
  const student = getStudentById(studentId);
  const courses = getCourses();
  
  if (!student) return 0;
  
  let totalLessons = 0;
  let completedLessons = 0;
  
  Object.entries(courses).forEach(([courseKey, course]) => {
    totalLessons += course.lessons.length;
    completedLessons += course.lessons.filter(lesson => 
      student.completedLessons.includes(`${courseKey}-${lesson.id}`)
    ).length;
  });
  
  return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
};

export const getStudentActivity = (studentId, days = 30) => {
  const student = getStudentById(studentId);
  if (!student) return [];
  
  const activities = [];
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  // Add lesson completions
  student.completedLessons.forEach(lessonKey => {
    // You might want to store completion dates separately for better tracking
    activities.push({
      type: 'lesson_completed',
      lessonKey,
      date: new Date().toISOString(), // This should ideally be stored with completion
      description: 'Completed a lesson'
    });
  });
  
  // Add quiz attempts
  if (student.quizResults) {
    student.quizResults.forEach(result => {
      activities.push({
        type: 'quiz_attempt',
        courseKey: result.courseKey,
        lessonId: result.lessonId,
        score: result.score,
        passed: result.passed,
        date: result.completedAt,
        description: `Scored ${result.score}% on quiz`
      });
    });
  }
  
  return activities
    .filter(activity => new Date(activity.date) >= cutoffDate)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

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

// Export all functions
export default {
  initializeStorage,
  // Email confirmation
  getEmailConfirmations,
  createEmailConfirmation,
  verifyEmailConfirmation,
  sendEmailConfirmation,
  confirmUserEmail,
  resendEmailConfirmation,
  // User management
  getUsers,
  saveUsers,
  registerUser,
  authenticateUser,
  getCurrentUser,
  setCurrentUser,
  logoutUser,
  deleteUser,
  updateUser,
  getAllUsers,
  getUserById,
  // Teacher registration & management
  registerTeacher,
  getAllTeachers,
  getPendingTeachers,
  getApprovedTeachers,
  approveTeacher,
  rejectTeacher,
  dismissTeacher,
  updateTeacherProfile,
  getTeacherById,
  // Teacher functions
  getTeacherCourses,
  getTeacherStats,
  getCurrentTeacherId,
  addNewCourse,
  addNewCourseWithTeacher,
  approveCourse,
  // Student management
  getStudents,
  saveStudents,
  getStudentById,
  updateStudent,
  addStudent,
  // Course management
  getCourses,
  saveCourses,
  updateStudentProgress,
  addLessonToCourse,
  updateCourse,
  deleteCourse,
  getCourseByKey,
  // Lesson management
  updateLesson,
  deleteLesson,
  getLessonById,
  // Multimedia management
  addMultimediaToLesson,
  updateMultimediaInLesson,
  deleteMultimediaFromLesson,
  // Admin functions
  getPlatformStats,
  getTotalLessons,
  getLessonsWithQuizzes,
  // NEW ADMIN COURSE MANAGEMENT FUNCTIONS
  getAllCoursesForAdmin,
  getCourseDetailsForAdmin,
  deleteCourseAsAdmin,
  deleteLessonAsAdmin,
  getTeacherCoursesForAdmin,
  getCourseAnalyticsForAdmin,
  getAllCoursesAnalyticsForAdmin,
  updateCourseAsAdmin,
  updateLessonAsAdmin,
  getTeacherCoursesWithDetails,
  getUnapprovedCourses,
  approveCourseAsAdmin,
  rejectCourseAsAdmin,
  // Certificate functions
  generateCertificate,
  getStudentCertificates,
  getCertificateById,
  verifyCertificate,
  checkCertificateEligibility,
  // Quiz functions
  addQuizToLesson,
  updateQuizInLesson,
  deleteQuizFromLesson,
  getQuizResults,
  saveQuizResult,
  getQuizAnalytics,
  getStudentQuizProgress,
  // Data management
  exportData,
  importData,
  resetAllData,
  // Progress tracking
  calculateOverallProgress,
  getStudentActivity,
  // Debug functions
  debugStorage,
  // NEW COURSE ENROLLMENT FUNCTIONS
  enrollStudentInCourse,
  unenrollStudentFromCourse,
  getEnrolledCoursesWithProgress,
  updateCourseProgress,
  getCourseCompletionStatus,
  testStudentSystem
};
