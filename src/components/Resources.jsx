import React from 'react';
import './Resources.css';

const Resources = () => {
  const resources = [
    {
      category: "Learning Materials",
      items: [
        { name: "Programming Cheat Sheets", type: "PDF", icon: "📄" },
        { name: "Video Tutorials", type: "Video", icon: "🎥" },
        { name: "Practice Exercises", type: "Interactive", icon: "💻" }
      ]
    },
    {
      category: "Tools & Software",
      items: [
        { name: "Code Editor Recommendations", type: "Guide", icon: "⚙️" },
        { name: "Free Development Tools", type: "Tools", icon: "🛠️" },
        { name: "Browser Extensions", type: "Extensions", icon: "🔧" }
      ]
    },
    {
      category: "Career Resources",
      items: [
        { name: "Resume Templates", type: "Templates", icon: "📝" },
        { name: "Interview Preparation", type: "Guide", icon: "💼" },
        { name: "Job Search Tips", type: "Articles", icon: "🔍" }
      ]
    }
  ];

  return (
    <div className="resources-container">
      <div className="resources-header">
        <h1>Learning Resources</h1>
        <p>Additional materials to support your STEM learning journey</p>
      </div>
      
      <div className="resources-grid">
        {resources.map((section, index) => (
          <div key={index} className="resource-section">
            <h2 className="section-title">{section.category}</h2>
            <div className="resource-items">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="resource-item">
                  <div className="resource-icon">{item.icon}</div>
                  <div className="resource-info">
                    <h3>{item.name}</h3>
                    <span className="resource-type">{item.type}</span>
                  </div>
                  <button className="download-btn">Download</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;