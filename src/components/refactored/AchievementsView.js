import React from 'react';
import { ACHIEVEMENTS } from '../../utils/gameLogic';

const AchievementsView = ({ unlockedAchievements, stats, onBack }) => {
  const { xp, totalCorrect, bestStreak } = stats;

  return (
    <div>
      {/* Back Button */}
      <div style={{ marginBottom: '20px' }}>
        <button className="btn btn-ghost" onClick={onBack}>
          ← Back
        </button>
      </div>

      {/* Achievements Container */}
      <div style={{
        background: 'white',
        padding: '32px',
        borderRadius: '24px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ 
            color: '#667eea', 
            fontSize: '2.5rem',
            marginBottom: '16px'
          }}>
            🏆 Your Achievements
          </h2>
          <div style={{ 
            fontSize: '1.3rem',
            color: '#666',
            fontWeight: '600'
          }}>
            {unlockedAchievements.length} / {ACHIEVEMENTS.length} Unlocked
          </div>
          <div style={{
            width: '200px',
            height: '8px',
            background: '#e0e0e0',
            borderRadius: '4px',
            margin: '12px auto',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${(unlockedAchievements.length / ACHIEVEMENTS.length) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
              transition: 'width 0.5s ease'
            }} />
          </div>
        </div>

        {/* Stats Summary */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
          padding: '20px',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
          borderRadius: '16px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', color: '#667eea', fontWeight: 'bold' }}>
              {xp}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Total XP</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', color: '#28a745', fontWeight: 'bold' }}>
              {totalCorrect}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Correct Answers</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', color: '#FF6B6B', fontWeight: 'bold' }}>
              {bestStreak}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Best Streak</div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '20px'
        }}>
          {ACHIEVEMENTS.map(achievement => {
            const isUnlocked = unlockedAchievements.includes(achievement.id);
            return (
              <div
                key={achievement.id}
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  border: '2px solid transparent',
                  background: isUnlocked 
                    ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
                    : '#f0f0f0',
                  opacity: isUnlocked ? 1 : 0.6,
                  cursor: isUnlocked ? 'pointer' : 'default',
                  ...(isUnlocked && {
                    boxShadow: '0 5px 15px rgba(255, 215, 0, 0.3)'
                  })
                }}
                onMouseEnter={(e) => {
                  if (isUnlocked) {
                    e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 215, 0, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isUnlocked) {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(255, 215, 0, 0.3)';
                  }
                }}
              >
                <div style={{ 
                  fontSize: '3rem', 
                  marginBottom: '10px',
                  filter: !isUnlocked ? 'grayscale(100%)' : 'none'
                }}>
                  {isUnlocked ? achievement.title.split(' ')[0] : '🔒'}
                </div>
                <div style={{ 
                  fontWeight: 'bold', 
                  fontSize: '1rem',
                  marginBottom: '8px',
                  color: isUnlocked ? '#333' : '#999'
                }}>
                  {isUnlocked ? achievement.title : '???'}
                </div>
                <div style={{ 
                  fontSize: '0.85rem',
                  color: isUnlocked ? '#666' : '#aaa',
                  lineHeight: '1.4',
                  fontStyle: !isUnlocked ? 'italic' : 'normal'
                }}>
                  {isUnlocked ? achievement.description : 'Complete to unlock'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Encouragement Message */}
        {unlockedAchievements.length < ACHIEVEMENTS.length && (
          <div style={{
            marginTop: '32px',
            padding: '20px',
            background: 'linear-gradient(135deg, #E3F2FD 0%, #F3E5F5 100%)',
            borderRadius: '16px',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '1.1rem', color: '#667eea', fontWeight: '600' }}>
              🎯 Keep studying to unlock {ACHIEVEMENTS.length - unlockedAchievements.length} more achievements!
            </p>
          </div>
        )}

        {unlockedAchievements.length === ACHIEVEMENTS.length && (
          <div style={{
            marginTop: '32px',
            padding: '24px',
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            borderRadius: '16px',
            textAlign: 'center'
          }}>
            <p style={{ 
              fontSize: '1.5rem', 
              color: 'white', 
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
            }}>
              🎉 CONGRATULATIONS! You've unlocked ALL achievements! 🎉
            </p>
            <p style={{ 
              fontSize: '1.1rem', 
              color: 'white', 
              marginTop: '12px'
            }}>
              You're a true Terpene Master! 🌳
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsView;
