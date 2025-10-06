import React from 'react';
import { getStreakMessage } from '../../utils/gameLogic';

const GameStatsPanel = ({ 
  score, 
  total, 
  xp, 
  levelInfo, 
  currentStreak, 
  bestStreak, 
  minimized, 
  onToggleMinimize 
}) => {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const streakMessage = getStreakMessage(currentStreak);
  const isOnFire = currentStreak >= 5;

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  if (minimized) {
    return (
      <div 
        className="game-stats-panel minimized" 
        onClick={onToggleMinimize}
        style={{ cursor: 'pointer' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: isMobile ? '8px' : '12px' }}>
          <div style={{ display: 'flex', gap: isMobile ? '12px' : '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div>
              <strong style={{ fontSize: isMobile ? '1rem' : '1.2rem', color: '#667eea' }}>LV {levelInfo.currentLevel.level}</strong>
              <span style={{ marginLeft: '6px', color: '#666', fontSize: isMobile ? '0.85rem' : '1rem' }}>{isMobile ? '' : levelInfo.currentLevel.title}</span>
            </div>
            <div>
              <span style={{ fontSize: isMobile ? '0.95rem' : '1.1rem' }}>
                {score}/{total} {isMobile ? '' : `(${percentage}%)`}
              </span>
            </div>
            {currentStreak > 0 && (
              <div>
                <span style={{ fontSize: isMobile ? '0.95rem' : '1.1rem' }}>
                  {isOnFire ? '🔥' : '✨'} {currentStreak}{isMobile ? '' : ' streak'}
                </span>
              </div>
            )}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#999' }}>
            Click to expand ▼
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-stats-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ color: '#667eea', fontSize: '1.2rem', fontWeight: '700' }}>Your Progress</h3>
        <button 
          onClick={onToggleMinimize}
          style={{
            background: 'none',
            border: 'none',
            color: '#999',
            cursor: 'pointer',
            fontSize: '0.9rem',
            padding: '4px 8px'
          }}
        >
          Minimize ▲
        </button>
      </div>

      {/* Level Progress */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
          <div style={{ textAlign: 'center', minWidth: '80px' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#667eea' }}>
              LV {levelInfo.currentLevel.level}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#666' }}>
              {levelInfo.currentLevel.title}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.85rem', color: '#666' }}>
              <span>{xp} XP</span>
              {levelInfo.nextLevel.level > levelInfo.currentLevel.level && (
                <span style={{ color: '#999', fontStyle: 'italic' }}>
                  {levelInfo.xpToNext} to next level
                </span>
              )}
            </div>
            <div style={{
              height: '20px',
              background: '#e0e0e0',
              borderRadius: '10px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${levelInfo.progress}%`,
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                transition: 'width 0.5s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                {levelInfo.progress > 15 && `${Math.round(levelInfo.progress)}%`}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {/* Session Stats */}
        <div className="stat-item">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{score}/{total}</h3>
            <p>Session ({percentage}%)</p>
          </div>
        </div>

        {/* Streak */}
        <div className="stat-item" style={isOnFire ? {
          background: 'linear-gradient(135deg, #FFE5E5 0%, #FFF0E5 100%)',
          border: '2px solid #FF6B6B'
        } : {}}>
          <div className="stat-icon">
            {currentStreak >= 10 ? '🔥🔥🔥' : currentStreak >= 5 ? '🔥🔥' : currentStreak >= 3 ? '🔥' : '✨'}
          </div>
          <div className="stat-content">
            <h3>{currentStreak}</h3>
            <p>Current Streak</p>
          </div>
        </div>

        {/* Best Streak */}
        <div className="stat-item">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <h3>{bestStreak}</h3>
            <p>Best Streak</p>
          </div>
        </div>
      </div>

      {/* Streak Message */}
      {streakMessage && (
        <div style={{
          marginTop: '12px',
          textAlign: 'center',
          padding: '12px',
          background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
          borderRadius: '12px',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
          animation: 'pulse 1s infinite'
        }}>
          {streakMessage}
        </div>
      )}
    </div>
  );
};

export default GameStatsPanel;
