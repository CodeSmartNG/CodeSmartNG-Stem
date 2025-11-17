import React, { useState } from 'react';
import './Navigation.css';

const Navigation = ({ currentView, setCurrentView, currentUser, onLogout, isAdmin, isTeacher }) => {
  const [showMoreLinks, setShowMoreLinks] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle navigation clicks
  const handleNavClick = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false); // Close mobile menu on navigation
  };

  return (
    <>
      {/* Top Header Bar */}
      <header className="top-header">
        <div className="header-container">
          {/* Left: Logo and Brand */}
          <div className="header-brand">
            <div className="logo">🎓</div>
            <h1>CodeSmartNG<br/>Stem</h1>
          </div>

          {/* Hamburger Menu Button for Mobile */}
          <button 
            className="hamburger-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Center: General Navigation Links */}
          <nav className={`general-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            {/* Converted to buttons with onClick handlers */}



            {isStudent && (
  <button 
    onClick={() => setCurrentView('my-courses')}
    className={currentView === 'my-courses' ? 'active' : ''}
  >
    My Courses
  </button>
)}

            
            <button 
              className="nav-link"
              onClick={() => handleNavClick('about')}
            >
              About
            </button>
            <button 
              className="nav-link"
              onClick={() => handleNavClick('faqs')}
            >
              FAQs
            </button>
            <button 
              className="nav-link"
              onClick={() => handleNavClick('contact')}
            >
              Contact
            </button>
            
            {/* More Links Dropdown */}
            <div className="dropdown">
              <button 
                className="nav-link more-link"
                onClick={() => setShowMoreLinks(!showMoreLinks)}
              >
                More ▽
              </button>
              {showMoreLinks && (
                <div className="dropdown-menu">
                  <button 
                    className="dropdown-link"
                    onClick={() => handleNavClick('blog')}
                  >
                    Blog
                  </button>
                  <button 
                    className="dropdown-link"
                    onClick={() => handleNavClick('resources')}
                  >
                    Resources
                  </button>
                  <button 
                    className="dropdown-link"
                    onClick={() => handleNavClick('careers')}
                  >
                    Careers
                  </button>
                  <button 
                    className="dropdown-link"
                    onClick={() => handleNavClick('support')}
                  >
                    Support
                  </button>
                </div>
              )}
            </div>

            {/* Mobile-only user info */}
            <div className="mobile-user-info">
              <span className="welcome-text">Welcome, {currentUser?.name}</span>
              <span className="user-role">({currentUser?.role})</span>
            
<div className="user-info">
  <span className="user-role">{currentUser?.role}</span>
  <a 
    href="https://wa.me/0802 1025168" // Replace with actual WhatsApp number
    target="_blank" 
    rel="noopener noreferrer"
    className="help-btn"
  >
    Help viaw WhatsApp
  </a>
</div>
            </div>
          </nav>

          {/* Right: User Actions - Hidden on mobile */}
          <div className="header-actions">
            <span className="welcome-text">Welcome, {currentUser?.name}</span>
            <span className="user-role">({currentUser?.role})</span>
            <button className="help-btn">Help</button>
          </div>
        </div>
      </header>

      {/* Overlay for mobile menu when open */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Main App Navigation */}
      <nav className="app-navigation">
        <div className="nav-container">
          <ul className="app-nav-links">
            {/* Dashboard Link - Show for all roles */}
            <li>
              <button 
                className={`app-nav-btn ${currentView === 'dashboard' ? 'active' : ''}`}
                onClick={() => handleNavClick('dashboard')}
              >
                <span className="nav-icon">📊</span>
                <span className="nav-label">Dashboard</span>
              </button>
            </li>

            {/* Courses Link - Show for all roles */}
            <li>
              <button 
                className={`app-nav-btn ${currentView === 'courses' ? 'active' : ''}`}
                onClick={() => handleNavClick('courses')}
              >
                <span className="nav-icon">📚</span>
                <span className="nav-label">Courses</span>
              </button>
            </li>

            {/* Discussion Forum - For all roles */}
            <li>
              <button 
                className={`app-nav-btn ${currentView === 'discussion' ? 'active' : ''}`}
                onClick={() => handleNavClick('discussion')}
              >
                <span className="nav-icon">💬</span>
                <span className="nav-label">Forum</span>
              </button>
            </li>

            {/* Profile - For all roles */}
            <li>
              <button 
                className={`app-nav-btn ${currentView === 'profile' ? 'active' : ''}`}
                onClick={() => handleNavClick('profile')}
              >
                <span className="nav-icon">👤</span>
                <span className="nav-label">Profile</span>
              </button>
            </li>

            {/* Teacher Dashboard Link - Only for teachers */}
            {isTeacher && (
              <li>
                <button 
                  className={`app-nav-btn ${currentView === 'teacher' ? 'active' : ''}`}
                  onClick={() => handleNavClick('teacher')}
                >
                  <span className="nav-icon">👨‍🏫</span>
                  <span className="nav-label">Teacher</span>
                </button>
              </li>
            )}

            {/* Admin Dashboard Link - Only for admins */}
            {isAdmin && (
              <li>
                <button 
                  className={`app-nav-btn ${currentView === 'admin' ? 'active' : ''}`}
                  onClick={() => handleNavClick('admin')}
                >
                  <span className="nav-icon">⚙️</span>
                  <span className="nav-label">Admin</span>
                </button>
              </li>
            )}
            
            <li>
              <button onClick={onLogout} className="app-nav-btn logout-btn">
                <span className="nav-icon">🚪</span>
                <span className="nav-label">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
