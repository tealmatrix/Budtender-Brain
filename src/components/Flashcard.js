import React, { useState, useEffect } from 'react';
import './Flashcard.css';

const Flashcard = ({ question, questionText, onCorrect, onWrong, onNext }) => {
  const [isFlipped, setIsFlipped] = useState(false);

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
          <ul className="menu-items">
            {data.menuItems.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        );
      case 'quick':
        return <p><strong>{data.quickLine}</strong></p>;
      default:
        return null;
    }
  };

  return (
    <div className="flashcard-section">
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <div className="flashcard-content">
          <div className="terpene-name">{question.terpene}</div>
          {!isFlipped ? (
            <div className="question">{questionText}</div>
          ) : (
            <div className="answer">{renderAnswer()}</div>
          )}
        </div>
      </div>
      <p className="flip-hint">💡 Click card to flip</p>
      
      <div className="controls">
        <button className="btn btn-success" onClick={onCorrect}>
          ✅ Got It Right
        </button>
        <button className="btn btn-danger" onClick={onWrong}>
          ❌ Missed It
        </button>
        <button className="btn btn-primary" onClick={onNext}>
          ➡️ Next Card
        </button>
      </div>
    </div>
  );
};

export default Flashcard;
