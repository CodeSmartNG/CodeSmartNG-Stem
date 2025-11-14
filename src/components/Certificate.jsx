import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import './Certificate.css';

const Certificate = ({ certificate, onClose, onDownload }) => {
  const certificateRef = useRef();

  const handleDownload = async () => {
    if (certificateRef.current) {
      try {
        const canvas = await html2canvas(certificateRef.current, {
          scale: 2,
          useCORS: true,
          allowTaint: true
        });
        
        const link = document.createElement('a');
        link.download = `Certificate_${certificate.courseKey}_${certificate.studentName}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        if (onDownload) {
          onDownload();
        }
      } catch (error) {
        console.error('Error downloading certificate:', error);
        alert('Error downloading certificate. Please try again.');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="certificate-modal">
      <div className="certificate-container">
        <div className="certificate-header">
          <h2>Certificate of Completion</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>
        
        <div className="certificate-actions">
          <button onClick={handleDownload} className="download-btn">
            📥 Download Certificate
          </button>
          <div className="verification-info">
            <strong>Verification Code:</strong> {certificate.verificationCode}
          </div>
        </div>

        {/* Certificate Design */}
        <div ref={certificateRef} className="certificate-design">
          <div className="certificate-border">
            <div className="certificate-content">
              {/* Header */}
              <div className="certificate-header-design">
                <div className="logo">🏆</div>
                <h1>Certificate of Completion</h1>
                <p className="subtitle">Hausa STEM Platform</p>
              </div>

              {/* Body */}
              <div className="certificate-body">
                <p className="presented-to">This is to certify that</p>
                <h2 className="student-name">{certificate.studentName}</h2>
                <p className="completion-text">
                  has successfully completed the course
                </p>
                <h3 className="course-title">{certificate.courseTitle}</h3>
                <p className="course-hausa">"{certificate.courseHausaTitle}"</p>
                
                <div className="certificate-details">
                  <div className="detail-item">
                    <strong>Completed on:</strong> {formatDate(certificate.completionDate)}
                  </div>
                  <div className="detail-item">
                    <strong>Issued on:</strong> {formatDate(certificate.issuedDate)}
                  </div>
                  <div className="detail-item">
                    <strong>Verification Code:</strong> {certificate.verificationCode}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="certificate-footer">
                <div className="signature-section">
                  <div className="signature-line"></div>
                  <p>Director, Hausa STEM</p>
                </div>
                <div className="certificate-id">
                  Certificate ID: {certificate.id}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="decoration top-left">✦</div>
              <div className="decoration top-right">✦</div>
              <div className="decoration bottom-left">✦</div>
              <div className="decoration bottom-right">✦</div>
            </div>
          </div>
        </div>

        <div className="certificate-instructions">
          <h4>How to Use Your Certificate:</h4>
          <ul>
            <li>📥 <strong>Download</strong> - Save as PNG for printing or sharing</li>
            <li>📧 <strong>Share</strong> - Add to your portfolio, LinkedIn, or CV</li>
            <li>🔍 <strong>Verify</strong> - Use the verification code to prove authenticity</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Certificate;