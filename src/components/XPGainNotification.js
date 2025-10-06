import React, { useEffect, useState } from 'react';
import './XPGainNotification.css';

const XPGainNotification = ({ xpGained, onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (xpGained > 0) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 300);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [xpGained, onComplete]);

  if (xpGained === 0) return null;

  return (
    <div className={`xp-gain-notification ${isVisible ? 'visible' : ''}`}>
      +{xpGained} XP
    </div>
  );
};

export default XPGainNotification;
