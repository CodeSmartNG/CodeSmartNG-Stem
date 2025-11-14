import React, { useState } from 'react';
import { checkCertificateEligibility, generateCertificate } from '../utils/storage';
import Certificate from './Certificate';
import './CertificateAward.css';

const CertificateAward = ({ student, courseKey, onClose }) => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificate, setCertificate] = useState(null);
  const [eligibility, setEligibility] = useState(null);

  React.useEffect(() => {
    const checkEligibility = () => {
      const result = checkCertificateEligibility(student.id, courseKey);
      setEligibility(result);
      
      // If already has certificate, show it
      if (result.certificate) {
        setCertificate(result.certificate);
      }
    };
    
    checkEligibility();
  }, [student.id, courseKey]);

  const handleGenerateCertificate = () => {
    try {
      const newCertificate = generateCertificate(student.id, courseKey);
      setCertificate(newCertificate);
      setShowCertificate(true);
    } catch (error) {
      alert('Error generating certificate: ' + error.message);
    }
  };

  const handleViewCertificate = () => {
    setShowCertificate(true);
  };

  if (showCertificate && certificate) {
    return (
      <Certificate 
        certificate={certificate} 
        onClose={() => setShowCertificate(false)}
        onDownload={() => console.log('Certificate downloaded')}
      />
    );
  }

  return (
    <div className="certificate-award">
      <div className="award-header">
        <h2>🎓 Course Completion Certificate</h2>
        <button onClick={onClose} className="close-btn">×</button>
      </div>

      <div className="award-content">
        {eligibility ? (
          <>
            {eligibility.eligible ? (
              <div className="eligible-section">
                <div className="success-message">
                  <div className="success-icon">🎉</div>
                  <h3>Congratulations!</h3>
                  <p>You've successfully completed the course and earned a certificate!</p>
                </div>
                
                <div className="course-info">
                  <h4>{eligibility.courseTitle}</h4>
                  <p>Progress: 100% completed</p>
                </div>
                
                <button 
                  onClick={handleGenerateCertificate}
                  className="generate-cert-btn"
                >
                  🏆 Generate Certificate
                </button>
                
                <div className="certificate-benefits">
                  <h4>Your Certificate Will Include:</h4>
                  <ul>
                    <li>✅ Your name and course title</li>
                    <li>✅ Completion date</li>
                    <li>✅ Unique verification code</li>
                    <li>✅ Professional design for sharing</li>
                  </ul>
                </div>
              </div>
            ) : eligibility.certificate ? (
              <div className="already-issued">
                <div className="issued-icon">✅</div>
                <h3>Certificate Already Issued</h3>
                <p>You already have a certificate for this course.</p>
                
                <div className="certificate-preview">
                  <strong>Issued on:</strong> {new Date(eligibility.certificate.issuedDate).toLocaleDateString()}
                  <br />
                  <strong>Verification Code:</strong> {eligibility.certificate.verificationCode}
                </div>
                
                <button 
                  onClick={handleViewCertificate}
                  className="view-cert-btn"
                >
                  👁️ View Certificate
                </button>
              </div>
            ) : (
              <div className="not-eligible">
                <div className="warning-icon">📚</div>
                <h3>Course Not Completed</h3>
                <p>You need to complete the course to earn a certificate.</p>
                
                <div className="progress-info">
                  <strong>Current Progress:</strong> {eligibility.progress}%
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{width: `${eligibility.progress}%`}}
                    ></div>
                  </div>
                </div>
                
                <p className="encouragement">
                    Keep learning! You're {100 - eligibility.progress}% away from your certificate.
                </p>
                
                <button onClick={onClose} className="continue-learning-btn">
                  Continue Learning
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="loading-certificate">
            <div className="loading-spinner"></div>
            <p>Checking certificate eligibility...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateAward;