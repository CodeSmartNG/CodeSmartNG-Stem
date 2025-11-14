import React, { useState } from 'react';
import TeacherRegisterForm from './TeacherRegisterForm';
import './Careers.css';

const Careers = ({ setCurrentView, setMessage, onTeacherRegister, currentUser }) => {
  const [showTeacherForm, setShowTeacherForm] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registeredTeacher, setRegisteredTeacher] = useState(null);

  const jobOpenings = [
    {
      title: "STEM Instructor",
      department: "Education",
      type: "Full-time",
      location: "Remote",
      description: "Join our team to teach and mentor students in programming and science subjects.",
      requirements: [
        "Bachelor's degree in Computer Science, Education, or related field",
        "2+ years of teaching experience",
        "Strong knowledge of programming concepts",
        "Excellent communication skills"
      ]
    },
    {
      title: "Curriculum Developer",
      department: "Content",
      type: "Full-time",
      location: "Hybrid",
      description: "Create engaging and effective learning materials for our STEM courses.",
      requirements: [
        "Experience in curriculum design and development",
        "Strong writing and editing skills",
        "Knowledge of educational technology",
        "Portfolio of previous work"
      ]
    },
    {
      title: "Student Success Manager",
      department: "Support",
      type: "Full-time",
      location: "Remote",
      description: "Help students achieve their learning goals and provide academic support.",
      requirements: [
        "Experience in student support or academic advising",
        "Excellent problem-solving skills",
        "Patience and empathy",
        "Strong organizational skills"
      ]
    }
  ];

  const [selectedJob, setSelectedJob] = useState(null);

  const handleTeacherRegisterClick = () => {
    setShowTeacherForm(true);
    setRegistrationSuccess(false);
    setRegisteredTeacher(null);
  };

  const handleBackToCareers = () => {
    setShowTeacherForm(false);
    setRegistrationSuccess(false);
    setRegisteredTeacher(null);
  };

  const handleTeacherFormSubmit = async (teacherData) => {
    try {
      const result = await onTeacherRegister(teacherData);
      if (result) {
        setRegistrationSuccess(true);
        setRegisteredTeacher(teacherData);
        // The form will handle the email confirmation flow
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const handleBackToTeacherForm = () => {
    setRegistrationSuccess(false);
    setRegisteredTeacher(null);
  };

  // Success Confirmation View
  if (registrationSuccess && registeredTeacher) {
    return (
      <div className="careers-container">
        <div className="success-confirmation">
          <div className="success-icon">🎉</div>
          <h2>Teacher Registration Successful!</h2>
          <div className="success-details">
            <p>Thank you, <strong>{registeredTeacher.name}</strong>, for registering as a teacher!</p>
            <p>We've sent a confirmation email to <strong>{registeredTeacher.email}</strong>.</p>
            <div className="next-steps">
              <h3>What's Next?</h3>
              <ul>
                <li>Check your email for the confirmation link</li>
                <li>Complete your profile setup after confirmation</li>
                <li>Our team will review your application</li>
                <li>You'll receive onboarding instructions within 24-48 hours</li>
              </ul>
            </div>
          </div>
          <div className="success-actions">
            <button 
              className="back-to-careers-btn"
              onClick={handleBackToCareers}
            >
              Back to Careers
            </button>
            <button 
              className="register-another-btn"
              onClick={handleBackToTeacherForm}
            >
              Register Another Teacher
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If user is logged in and clicks teacher register, show the form
  if (showTeacherForm && currentUser) {
    return (
      <div className="careers-container">
        <div className="teacher-form-section">
          <button 
            className="back-to-careers-btn"
            onClick={handleBackToCareers}
          >
            ← Back to Careers
          </button>
          <TeacherRegisterForm 
            onRegister={handleTeacherFormSubmit}
            onSwitchToLogin={() => {
              setMessage('');
              setCurrentView('login');
            }} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="careers-container">
      <div className="careers-header">
        <h1>Join Our Team</h1>
        <p>Build the future of STEM education with us</p>
      </div>
      
      <div className="careers-content">
        {/* Why Join Us Section */}
        <div className="why-join-us">
          <h2>Why Work at CodeSmartNG?</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <span className="benefit-icon">🚀</span>
              <h4>Impactful Work</h4>
              <p>Help shape the next generation of innovators and problem-solvers</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🌍</span>
              <h4>Flexible Work</h4>
              <p>Remote and hybrid opportunities with flexible schedules</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">📚</span>
              <h4>Continuous Learning</h4>
              <p>Access to all our courses and professional development resources</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">💝</span>
              <h4>Great Benefits</h4>
              <p>Competitive compensation, health benefits, and paid time off</p>
            </div>
          </div>
        </div>

        {/* Teacher Registration CTA */}
        <div className="teacher-cta-section">
          <div className="teacher-cta-content">
            <h2>Interested in Teaching with Us?</h2>
            <p>
              Join our network of passionate educators and share your expertise with students 
              from around the world. Whether you're looking for full-time positions or part-time 
              teaching opportunities, we'd love to hear from you.
            </p>
            <div className="teacher-cta-benefits">
              <div className="cta-benefit">
                <span className="benefit-check">✅</span>
                <span>Flexible teaching schedules</span>
              </div>
              <div className="cta-benefit">
                <span className="benefit-check">✅</span>
                <span>Competitive compensation</span>
              </div>
              <div className="cta-benefit">
                <span className="benefit-check">✅</span>
                <span>Supportive teaching community</span>
              </div>
              <div className="cta-benefit">
                <span className="benefit-check">✅</span>
                <span>Professional development opportunities</span>
              </div>
            </div>
            <div className="alternative-register">
              <p>Ready to start your teaching journey?</p>
              <button 
                className="teacher-register-btn"
                onClick={handleTeacherRegisterClick}
              >
                Register as Teacher
              </button>
            </div>
          </div>
        </div>
        
        {/* Current Job Openings */}
        <div className="job-openings">
          <h2>Current Openings</h2>
          <div className="jobs-list">
            {jobOpenings.map((job, index) => (
              <div key={index} className="job-card">
                <div className="job-info">
                  <h3>{job.title}</h3>
                  <div className="job-meta">
                    <span className="department">{job.department}</span>
                    <span className="type">{job.type}</span>
                    <span className="location">{job.location}</span>
                  </div>
                  <p className="job-description">{job.description}</p>
                  
                  {selectedJob === index && (
                    <div className="job-details">
                      <h4>Requirements:</h4>
                      <ul className="requirements-list">
                        {job.requirements.map((req, reqIndex) => (
                          <li key={reqIndex}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="job-actions">
                  <button className="apply-btn">Apply Now</button>
                  <button 
                    className="details-btn"
                    onClick={() => setSelectedJob(selectedJob === index ? null : index)}
                  >
                    {selectedJob === index ? 'Show Less' : 'View Details'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;