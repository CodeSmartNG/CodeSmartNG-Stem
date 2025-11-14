import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>About CodeSmartNG Stem</h1>
          <p className="hero-subtitle">
            Empowering the next generation of innovators through cutting-edge STEM education
          </p>
        </div>
        <div className="hero-graphic">
          <div className="floating-icon">🚀</div>
          <div className="floating-icon">💻</div>
          <div className="floating-icon">🔬</div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision">
        <div className="mission-card">
          <div className="card-icon">🎯</div>
          <h3>Our Mission</h3>
          <p>
            To provide accessible, high-quality STEM education that equips students with 
            the technical skills and creative thinking needed to thrive in the digital age.
          </p>
        </div>
        
        <div className="vision-card">
          <div className="card-icon">🔭</div>
          <h3>Our Vision</h3>
          <p>
            A world where every student has the opportunity to become a creator, innovator, 
            and problem-solver through technology and science education.
          </p>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="offerings-section">
        <h2>What We Offer</h2>
        <div className="offerings-grid">
          <div className="offering-card">
            <div className="offering-icon">📚</div>
            <h4>Comprehensive Courses</h4>
            <p>
              From beginner to advanced levels in programming, data science, 
              robotics, and more. Continuously updated curriculum.
            </p>
          </div>

          <div className="offering-card">
            <div className="offering-icon">👨‍🏫</div>
            <h4>Expert Instructors</h4>
            <p>
              Learn from industry professionals and experienced educators 
              passionate about mentoring the next generation.
            </p>
          </div>

          <div className="offering-card">
            <div className="offering-icon">💬</div>
            <h4>Collaborative Learning</h4>
            <p>
              Engage with peers through discussion forums, group projects, 
              and interactive coding sessions.
            </p>
          </div>

          <div className="offering-card">
            <div className="offering-icon">🎓</div>
            <h4>Career Pathways</h4>
            <p>
              Get guidance on career opportunities, portfolio building, and 
              job readiness in STEM fields.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">10,000+</div>
            <div className="stat-label">Students Enrolled</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Courses Available</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Satisfaction Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">15+</div>
            <div className="stat-label">Expert Instructors</div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Our Leadership Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-avatar">👨‍💼</div>
            <h4>Kabir Alkasim</h4>
            <p className="member-role">Founder & CEO</p>
            <p className="member-bio">
              The founder of CodeSmartNG Stem.
            </p>
          </div>

          <div className="team-member">
            <div className="member-avatar">👩‍🔬</div>
            <h4>Aisha Bande</h4>
            <p className="member-role">Head of Curriculum</p>
            <p className="member-bio">
              PhD in Computer Science with expertise in AI and machine learning education.
            </p>
          </div>

          <div className="team-member">
            <div className="member-avatar">👨‍🎓</div>
            <h4>Auwal Ibrahim</h4>
            <p className="member-role">Student Success Manager</p>
            <p className="member-bio">
              Dedicated to ensuring every student achieves their learning goals and career aspirations.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2>Our Values</h2>
        <div className="values-list">
          <div className="value-item">
            <h4>🚀 Innovation</h4>
            <p>Constantly evolving our teaching methods and course content</p>
          </div>
          <div className="value-item">
            <h4>🤝 Community</h4>
            <p>Building supportive networks for learners and educators</p>
          </div>
          <div className="value-item">
            <h4>🔍 Excellence</h4>
            <p>Maintaining high standards in education and student outcomes</p>
          </div>
          <div className="value-item">
            <h4>🌍 Accessibility</h4>
            <p>Making quality STEM education available to everyone</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Your STEM Journey?</h2>
          <p>Join thousands of students already learning with CodeSmartNG Stem</p>
          <div className="cta-buttons">
            <button className="cta-primary">Explore Courses</button>
            <button className="cta-secondary">Contact Us</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;