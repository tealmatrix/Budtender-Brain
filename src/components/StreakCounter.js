import React from 'react';
import './StreakCounter.css';
import { getStreakMessage } from '../utils/gameLogic';

const StreakCounter = ({ currentStreak, bestStreak }) => {
  const message = getStreakMessage(currentStreak);
  const isOnFire = currentStreak >= 5;

  return (
    <div className={`streak-counter ${isOnFire ? 'on-fire' : ''}`}>
      <div className="streak-main">
        <div className="streak-icon">
          {currentStreak >= 10 ? '🔥🔥🔥' : currentStreak >= 5 ? '🔥🔥' : currentStreak >= 3 ? '🔥' : '✨'}
        </div>
        <div className="streak-info">
          <div className="streak-current">{currentStreak} Streak</div>
          <div className="streak-best">Best: {bestStreak}</div>
        </div>
      </div>
      {message && <div className="streak-message">{message}</div>}
    </div>
  );
};

export default StreakCounter;
