import React from 'react';

const ModeSelectorNew = ({ onModeSelect, onViewReference, onViewAchievements, onViewEffectSearch, currentMode, studyType, onStudyTypeChange }) => {
  const modes = [
    { id: 'random', icon: '🎲', label: 'Random Mix' },
    { id: 'aroma', icon: '👃', label: 'Aroma Profile' },
    { id: 'feelings', icon: '😊', label: 'Common Feelings' },
    { id: 'therapeutic', icon: '💊', label: 'Therapeutic' },
    { id: 'menu', icon: '📋', label: 'Menu Items' },
    { id: 'quick', icon: '⚡', label: 'Quick Lines' },
    { id: 'pairsBest', icon: '🤝', label: 'Terpene Pairings' },
    { id: 'herbAnalogs', icon: '🌱', label: 'Herb Analogs' }
  ];

  return (
    <div className="mode-selector-wrapper">
      <h2 style={{ textAlign: 'center', color: 'white', marginBottom: '16px', fontSize: '2rem' }}>
        Choose Your Study Mode
      </h2>

      {/* Study Type Selector */}
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        justifyContent: 'center', 
        marginBottom: '32px',
        flexWrap: 'wrap'
      }}>
        <button
          className={`btn ${studyType === 'flashcard' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => onStudyTypeChange('flashcard')}
          style={{ minWidth: '180px' }}
        >
          🃏 Flashcard Mode
        </button>
        <button
          className={`btn ${studyType === 'quiz' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => onStudyTypeChange('quiz')}
          style={{ minWidth: '180px' }}
        >
          📝 Quiz Mode (A/B/C/D)
        </button>
      </div>

      {/* Mode Grid */}
      <div className="mode-grid">
        {modes.map(mode => (
          <div
            key={mode.id}
            className={`mode-card ${currentMode === mode.id ? 'active' : ''}`}
            onClick={() => onModeSelect(mode.id)}
          >
            <span className="mode-card-icon">{mode.icon}</span>
            <div className="mode-card-label">{mode.label}</div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="btn btn-info" onClick={onViewReference}>
          📖 Quick Reference
        </button>
        <button className="btn btn-primary" onClick={onViewEffectSearch}>
          🔍 Search by Effect
        </button>
        <button className="btn btn-success" onClick={onViewAchievements}>
          🏆 Achievements
        </button>
      </div>
    </div>
  );
};

export default ModeSelectorNew;
