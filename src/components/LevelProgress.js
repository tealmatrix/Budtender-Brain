import React from 'react';
import './LevelProgress.css';
import { getLevelInfo } from '../utils/gameLogic';

const LevelProgress = ({ xp }) => {
  const levelInfo = getLevelInfo(xp);
  const { currentLevel, nextLevel, progress, xpToNext } = levelInfo;

  return (
    <div className="level-progress">
      <div className="level-badge">
        <div className="level-number">LV {currentLevel.level}</div>
        <div className="level-title">{currentLevel.title}</div>
      </div>
      
      <div className="xp-bar-container">
        <div className="xp-info">
          <span>{xp} XP</span>
          {nextLevel.level > currentLevel.level && (
            <span className="xp-to-next">{xpToNext} to next level</span>
          )}
        </div>
        <div className="xp-bar">
          <div 
            className="xp-bar-fill" 
            style={{ width: `${progress}%` }}
          >
            {progress > 10 && <span className="xp-bar-text">{Math.round(progress)}%</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelProgress;
