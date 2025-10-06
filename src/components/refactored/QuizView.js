import React, { useState, useEffect, useCallback } from 'react';
import { getComboMessage } from '../../utils/gameLogic';
import { playSuccessSound, playErrorSound } from '../../utils/audio';
import TerpeneName from '../TerpeneName';

const QuizView = ({ question, onCorrect, onWrong, onNext, onBack, streak, combo, allTerpenes }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [options, setOptions] = useState([]);
  const comboMessage = getComboMessage(combo);

  const getCorrectAnswer = useCallback(() => {
    const { data, type } = question;
    switch(type) {
      case 'aroma':
        return data.aroma;
      case 'feelings':
        return data.feelings;
      case 'therapeutic':
        return data.therapeutic.split(';')[0]; // First part for brevity
      case 'quick':
        return data.quickLine;
      case 'menu':
        return data.menuItems[Math.floor(Math.random() * data.menuItems.length)];
      default:
        return data.aroma;
    }
  }, [question]);

  const generateWrongAnswers = useCallback(() => {
    const { type, terpene } = question;
    const otherTerpenes = Object.entries(allTerpenes)
      .filter(([name]) => name !== terpene)
      .map(([name, data]) => data);
    
    // Shuffle and take 3
    const shuffled = otherTerpenes.sort(() => Math.random() - 0.5);
    
    return shuffled.slice(0, 3).map(data => {
      switch(type) {
        case 'aroma':
          return data.aroma;
        case 'feelings':
          return data.feelings;
        case 'therapeutic':
          return data.therapeutic.split(';')[0];
        case 'quick':
          return data.quickLine;
        case 'menu':
          return data.menuItems[Math.floor(Math.random() * data.menuItems.length)];
        default:
          return data.aroma;
      }
    });
  }, [question, allTerpenes]);

  const generateOptions = useCallback(() => {
    const correctAnswer = getCorrectAnswer();
    const wrongAnswers = generateWrongAnswers();
    
    // Shuffle options
    const allOptions = [
      { text: correctAnswer, isCorrect: true },
      ...wrongAnswers.map(text => ({ text, isCorrect: false }))
    ];
    
    // Fisher-Yates shuffle
    for (let i = allOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
    }
    
    setOptions(allOptions);
  }, [getCorrectAnswer, generateWrongAnswers]);

  useEffect(() => {
    generateOptions();
    setSelectedAnswer(null);
    setShowResult(false);
  }, [generateOptions]);

  const handleSelectAnswer = (index) => {
    if (showResult) return; // Prevent changing after reveal
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    
    const isCorrect = options[selectedAnswer].isCorrect;
    
    // Play sound feedback
    if (isCorrect) {
      playSuccessSound();
    } else {
      playErrorSound();
    }
    
    // Delay the score update to show the result
    setTimeout(() => {
      if (isCorrect) {
        onCorrect();
      } else {
        onWrong();
      }
    }, 1500);
  };

  const getOptionStyle = (index) => {
    const isMobile = window.innerWidth < 768;
    const baseStyle = {
      padding: isMobile ? '16px' : '20px',
      marginBottom: isMobile ? '10px' : '12px',
      background: 'white',
      border: isMobile ? '2px solid #e0e0e0' : '3px solid #e0e0e0',
      borderRadius: isMobile ? '10px' : '12px',
      cursor: showResult ? 'default' : 'pointer',
      transition: 'all 0.2s ease',
      fontSize: isMobile ? '1rem' : '1.1rem',
      textAlign: 'left'
    };

    if (showResult) {
      if (options[index].isCorrect) {
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
          borderColor: '#56ab2f',
          color: 'white',
          transform: 'scale(1.02)'
        };
      } else if (selectedAnswer === index) {
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
          borderColor: '#dc3545',
          color: 'white',
          transform: 'scale(0.98)'
        };
      }
      return { ...baseStyle, opacity: 0.5 };
    }

    if (selectedAnswer === index) {
      return {
        ...baseStyle,
        borderColor: '#667eea',
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
        transform: 'translateX(8px)'
      };
    }

    return baseStyle;
  };

  const letters = ['A', 'B', 'C', 'D'];

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
          animation: 'pulse 0.5s ease'
        }}>
          {comboMessage}
        </div>
      )}

      {/* Quiz Container */}
      <div style={{
        background: 'white',
        padding: window.innerWidth < 768 ? '24px' : window.innerWidth < 480 ? '20px' : '48px',
        borderRadius: window.innerWidth < 480 ? '16px' : '24px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Terpene Name */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <TerpeneName 
            name={question.terpene}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '800',
              color: '#667eea',
              display: 'inline-block'
            }}
          />
        </div>

        {/* Question */}
        <p style={{
          fontSize: 'clamp(1.3rem, 3vw, 1.5rem)',
          color: '#333',
          textAlign: 'center',
          marginBottom: '32px',
          lineHeight: '1.5'
        }}>
          {question.questionText}
        </p>

        {/* Options */}
        <div style={{ marginBottom: '24px' }}>
          {options.map((option, index) => (
            <div
              key={index}
              style={getOptionStyle(index)}
              onClick={() => handleSelectAnswer(index)}
              onMouseEnter={(e) => {
                if (!showResult && selectedAnswer !== index) {
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!showResult && selectedAnswer !== index) {
                  e.currentTarget.style.borderColor = '#e0e0e0';
                  e.currentTarget.style.transform = 'translateX(0)';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  minWidth: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: showResult && options[index].isCorrect 
                    ? 'rgba(255,255,255,0.3)' 
                    : selectedAnswer === index 
                      ? '#667eea' 
                      : '#e0e0e0',
                  color: showResult && options[index].isCorrect 
                    ? 'white'
                    : selectedAnswer === index 
                      ? 'white' 
                      : '#666',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}>
                  {letters[index]}
                </div>
                <div style={{ flex: 1 }}>
                  {option.text}
                </div>
                {showResult && options[index].isCorrect && (
                  <div style={{ fontSize: '1.5rem' }}>✓</div>
                )}
                {showResult && selectedAnswer === index && !options[index].isCorrect && (
                  <div style={{ fontSize: '1.5rem' }}>✗</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button or Result */}
        {!showResult ? (
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            style={{
              width: '100%',
              padding: '20px',
              fontSize: '1.2rem',
              opacity: selectedAnswer === null ? 0.5 : 1,
              cursor: selectedAnswer === null ? 'not-allowed' : 'pointer'
            }}
          >
            Submit Answer
          </button>
        ) : (
          <div style={{ textAlign: 'center' }}>
            {options[selectedAnswer].isCorrect ? (
              <div style={{
                padding: '20px',
                background: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '1.3rem',
                fontWeight: 'bold',
                marginBottom: '16px'
              }}>
                🎉 Correct! Well done!
              </div>
            ) : (
              <div style={{
                padding: '20px',
                background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '1.3rem',
                fontWeight: 'bold',
                marginBottom: '16px'
              }}>
                ❌ Not quite. The correct answer is highlighted above.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pro Tip */}
      <div style={{
        textAlign: 'center',
        marginTop: '24px',
        color: 'rgba(255,255,255,0.7)',
        fontSize: '0.9rem'
      }}>
        <p>💡 <strong>Quiz Mode:</strong> Test your knowledge with multiple choice questions!</p>
      </div>
    </div>
  );
};

export default QuizView;
