import React from 'react';
import './ModeSelector.css';

const ModeSelector = ({ onModeSelect, onToggleReference, onToggleAchievements, currentMode }) => {
  const modes = [
    { id: 'random', label: '🎲 Random Mix' },
    { id: 'aroma', label: '👃 Aroma Profile' },
    { id: 'feelings', label: '😊 Common Feelings' },
    { id: 'therapeutic', label: '💊 Therapeutic' },
    { id: 'menu', label: '📋 Menu Items' },
    { id: 'quick', label: '⚡ Quick Lines' }
  ];

  return (
    <div className="mode-selector">
      <h2>📚 Study Mode</h2>
      <div className="mode-buttons">
        {modes.map(mode => (
          <button
            key={mode.id}
            className={`mode-btn ${currentMode === mode.id ? 'active' : ''}`}
            onClick={() => onModeSelect(mode.id)}
          >
            {mode.label}
          </button>
        ))}
      </div>
      <div className="reference-btn-container">
        <button className="btn btn-info" onClick={onToggleReference}>
          📖 Quick Reference Guide
        </button>
        <button className="btn btn-success" onClick={onToggleAchievements}>
          🏆 View Achievements
        </button>
      </div>
    </div>
  );
};

export default ModeSelector;
