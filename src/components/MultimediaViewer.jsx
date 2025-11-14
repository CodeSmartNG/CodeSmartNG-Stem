import React, { useState } from 'react';
import './MultimediaViewer.css';

const MultimediaViewer = ({ multimedia }) => {
  const [currentMedia, setCurrentMedia] = useState(0);

  if (!multimedia || multimedia.length === 0) return null;

  const media = multimedia[currentMedia];

  return (
    <div className="multimedia-viewer">
      <h3>Learning process</h3>
      
      <div className="media-navigation">
        {multimedia.map((_, index) => (
          <button
            key={index}
            className={`nav-dot ${currentMedia === index ? 'active' : ''}`}
            onClick={() => setCurrentMedia(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="media-content">
        {media.type === 'video' ? (
          <div className="video-container">
            <iframe
              width="100%"
              height="400"
              src={media.url}
              title={media.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="image-container">
            <img src={media.url} alt={media.title} />
          </div>
        )}
        
        <div className="media-info">
          <h4>{media.title}</h4>
          <p>{media.description}</p>
        </div>
      </div>
    </div>
  );
};

export default MultimediaViewer;