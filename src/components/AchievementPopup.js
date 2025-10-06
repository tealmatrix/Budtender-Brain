import React, { useEffect, useState } from 'react';
import './AchievementPopup.css';

const AchievementPopup = ({ achievement, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`achievement-popup ${isVisible ? 'visible' : ''}`}>
      <div className="achievement-content">
        <div className="achievement-icon">🏆</div>
        <div className="achievement-info">
          <div className="achievement-title">Achievement Unlocked!</div>
          <div className="achievement-name">{achievement.title}</div>
          <div className="achievement-description">{achievement.description}</div>
        </div>
      </div>
    </div>
  );
};

export default AchievementPopup;
