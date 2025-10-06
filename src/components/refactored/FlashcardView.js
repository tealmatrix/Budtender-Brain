import React, { useState, useEffect } from 'react';
import { getComboMessage } from '../../utils/gameLogic';
import { playSuccessSound, playErrorSound } from '../../utils/audio';
import TerpeneName from '../TerpeneName';

const FlashcardView = ({ question, onCorrect, onWrong, onNext, onBack, streak, combo }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const comboMessage = getComboMessage(combo);

  useEffect(() => {
    setIsFlipped(false);
  }, [question]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const renderAnswer = () => {
    const { data, type } = question;

    switch(type) {
      case 'aroma':
        return <p><strong>{data.aroma}</strong></p>;
      case 'feelings':
        return <p><strong>{data.feelings}</strong></p>;
      case 'therapeutic':
        return <p>{data.therapeutic}</p>;
      case 'menu':
        return (
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            textAlign: 'left'
          }}>
            {data.menuItems.map((item, index) => (
              <li key={index} style={{ 
                padding: '8px 0', 
                borderBottom: index < data.menuItems.length - 1 ? '1px solid #eee' : 'none'
              }}>
                • {item}
              </li>
            ))}
          </ul>
        );
      case 'quick':
        return <p><strong>{data.quickLine}</strong></p>;
      case 'pairsBest':
        // Split by commas but keep the combo suggestions together
        const pairings = data.pairsBest.split('. Quick combos:');
        const mainPairs = pairings[0].split(/,(?![^()]*\))/).map(p => p.trim());
        const quickCombos = pairings[1];
        
        return (
          <div style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '12px' }}>
              {mainPairs.map((pair, idx) => (
                <div key={idx} style={{ 
                  padding: '8px 12px', 
                  marginBottom: '6px',
                  background: '#e8f5e9',
                  borderRadius: '8px',
                  borderLeft: '3px solid #4caf50'
                }}>
                  • {pair}
                </div>
              ))}
            </div>
            {quickCombos && (
              <div style={{ 
                marginTop: '12px',
                padding: '12px',
                background: '#fff9e6',
                borderRadius: '8px',
                borderLeft: '3px solid #ffa726'
              }}>
                <strong style={{ color: '#f57c00' }}>🔥 Quick Combos:</strong>{quickCombos}
              </div>
            )}
          </div>
        );
      case 'herbAnalogs':
        // Split herbs by comma and display each on its own line
        const herbs = data.herbAnalogs.split(',').map(h => h.trim());
        
        return (
          <div style={{ textAlign: 'left' }}>
            {herbs.map((herb, idx) => (
              <div key={idx} style={{ 
                padding: '10px 14px', 
                marginBottom: '8px',
                background: 'linear-gradient(135deg, #fff9e6 0%, #fffef7 100%)',
                borderRadius: '8px',
                borderLeft: '3px solid #ffa726',
                fontSize: '1.05rem',
                fontWeight: '500'
              }}>
                🌱 {herb}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Back Button */}
      <div style={{ marginBottom: '20px' }}>
        <button 
          className="btn btn-ghost" 
          onClick={onBack}
          style={{ minWidth: 'auto' }}
        >
          ← Back to Modes
        </button>
      </div>

      {/* Combo Message */}
      {comboMessage && (
        <div style={{
          textAlign: 'center',
          marginBottom: '16px',
          padding: '12px 24px',
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
          borderRadius: '20px',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
          animation: 'pulse 0.5s ease',
          display: 'inline-block',
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          {comboMessage}
        </div>
      )}

      {/* Flashcard */}
      <div className="flashcard-wrapper">
        <div className="flashcard-container">
          <div className="flashcard-face" onClick={handleFlip}>
            <TerpeneName 
              name={question.terpene} 
              className="flashcard-terpene-name"
            />
            {!isFlipped ? (
              <div className="flashcard-question">{question.questionText}</div>
            ) : (
              <div className="flashcard-answer">{renderAnswer()}</div>
            )}
          </div>
        </div>

        <div className="flip-indicator">
          💡 Click card to {isFlipped ? 'see question' : 'reveal answer'}
        </div>

        {/* Controls */}
        <div className="flashcard-controls">
          <button 
            className="btn btn-success" 
            onClick={() => {
              playSuccessSound();
              onCorrect();
            }}
            disabled={!isFlipped}
            style={{ opacity: isFlipped ? 1 : 0.5 }}
          >
            ✅ Got It Right
          </button>
          <button 
            className="btn btn-danger" 
            onClick={() => {
              playErrorSound();
              onWrong();
            }}
            disabled={!isFlipped}
            style={{ opacity: isFlipped ? 1 : 0.5 }}
          >
            ❌ Missed It
          </button>
          <button 
            className="btn btn-primary" 
            onClick={onNext}
          >
            ➡️ Skip
          </button>
        </div>
      </div>

      {/* Keyboard Hint */}
      <div style={{
        textAlign: 'center',
        marginTop: '24px',
        color: 'rgba(255,255,255,0.7)',
        fontSize: '0.9rem'
      }}>
        <p>💡 <strong>Pro Tip:</strong> Focus on the feeling and products to recommend to customers!</p>
      </div>
    </div>
  );
};

export default FlashcardView;
