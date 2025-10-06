import React, { useState } from 'react';
import { speakTerpeneName, getPronunciation, isSpeechSupported } from '../utils/audio';

const TerpeneName = ({ name, className, style, showPronunciation = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const pronunciation = getPronunciation(name);
  const speechSupported = isSpeechSupported();

  const handleClick = (e) => {
    e.stopPropagation();
    if (speechSupported) {
      setIsSpeaking(true);
      speakTerpeneName(name);
      setTimeout(() => setIsSpeaking(false), 2000);
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div
        className={className}
        style={{
          ...style,
          cursor: speechSupported ? 'pointer' : 'default',
          transition: 'all 0.2s ease',
          position: 'relative',
          ...(isHovered && speechSupported && {
            transform: 'scale(1.02)',
            textShadow: '0 0 20px rgba(102, 126, 234, 0.5)'
          }),
          ...(isSpeaking && {
            animation: 'pulse 0.5s ease infinite'
          })
        }}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {name}
        {speechSupported && (
          <span style={{
            marginLeft: '8px',
            fontSize: '0.7em',
            opacity: isHovered ? 1 : 0.5,
            transition: 'opacity 0.2s ease'
          }}>
            🔊
          </span>
        )}
      </div>
      
      {/* Pronunciation tooltip */}
      {showPronunciation && speechSupported && isHovered && pronunciation !== name && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '8px',
          padding: '6px 12px',
          background: 'rgba(0,0,0,0.85)',
          color: 'white',
          borderRadius: '8px',
          fontSize: '0.85rem',
          whiteSpace: 'nowrap',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          animation: 'fadeIn 0.2s ease'
        }}>
          <div style={{ fontStyle: 'italic', fontSize: '0.9em', marginBottom: '2px' }}>
            Pronunciation:
          </div>
          <div style={{ fontWeight: 'bold' }}>
            {pronunciation}
          </div>
          <div style={{
            position: 'absolute',
            top: '-6px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderBottom: '6px solid rgba(0,0,0,0.85)'
          }} />
        </div>
      )}
    </div>
  );
};

export default TerpeneName;
