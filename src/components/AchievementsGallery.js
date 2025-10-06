import React from 'react';
import './AchievementsGallery.css';
import { ACHIEVEMENTS } from '../utils/gameLogic';

const AchievementsGallery = ({ unlockedAchievements }) => {
  return (
    <div className="achievements-gallery">
      <h2>🏆 Achievements ({unlockedAchievements.length}/{ACHIEVEMENTS.length})</h2>
      <div className="achievements-grid">
        {ACHIEVEMENTS.map(achievement => {
          const isUnlocked = unlockedAchievements.includes(achievement.id);
          return (
            <div 
              key={achievement.id} 
              className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}
            >
              <div className="achievement-card-icon">
                {isUnlocked ? achievement.title.split(' ')[0] : '🔒'}
              </div>
              <div className="achievement-card-title">
                {isUnlocked ? achievement.title : '???'}
              </div>
              <div className="achievement-card-desc">
                {isUnlocked ? achievement.description : 'Complete to unlock'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsGallery;
