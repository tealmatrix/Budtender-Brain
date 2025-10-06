import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Stats from './components/Stats';
import ModeSelector from './components/ModeSelector';
import Flashcard from './components/Flashcard';
import ReferenceGuide from './components/ReferenceGuide';
import LevelProgress from './components/LevelProgress';
import StreakCounter from './components/StreakCounter';
import AchievementPopup from './components/AchievementPopup';
import AchievementsGallery from './components/AchievementsGallery';
import XPGainNotification from './components/XPGainNotification';
import terpenes from './data/terpenes.json';
import highTerpProducts from './data/highTerpProducts.json';
import { calculateXP, checkAchievements } from './utils/gameLogic';
import { loadGameData, saveGameData } from './utils/storage';

function App() {
  // Session stats
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentMode, setCurrentMode] = useState(null);
  const [showReference, setShowReference] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  
  // Game progression
  const [xp, setXp] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [combo, setCombo] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [modesUsed, setModesUsed] = useState(new Set());
  const [terpeneCorrect, setTerpeneCorrect] = useState({});
  const [sessionCount, setSessionCount] = useState(0);
  
  // UI notifications
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const [xpGain, setXpGain] = useState(0);
  
  // Load saved game data on mount
  useEffect(() => {
    const savedData = loadGameData();
    setXp(savedData.xp || 0);
    setBestStreak(savedData.bestStreak || 0);
    setAchievements(savedData.achievements || []);
    setModesUsed(savedData.modesUsed || new Set());
    setTerpeneCorrect(savedData.terpeneCorrect || {});
    setTotalCorrect(savedData.totalCorrect || 0);
  }, []);
  
  // Save game data whenever it changes
  useEffect(() => {
    const gameData = {
      xp,
      bestStreak,
      totalCorrect,
      achievements,
      modesUsed,
      terpeneCorrect
    };
    saveGameData(gameData);
  }, [xp, bestStreak, totalCorrect, achievements, modesUsed, terpeneCorrect]);

  const terpeneNames = Object.keys(terpenes);

  const questionTypes = {
    'aroma': 'What is the aroma profile?',
    'feelings': 'What are the common reported feelings?',
    'therapeutic': 'What is the primary therapeutic potential?',
    'menu': 'Name products on the menu that feature this terpene:',
    'quick': "What's the quick counter line?"
  };

  const getRandomTerpene = () => {
    return terpeneNames[Math.floor(Math.random() * terpeneNames.length)];
  };

  const getRandomQuestionType = () => {
    const types = ['aroma', 'feelings', 'therapeutic', 'menu', 'quick'];
    return types[Math.floor(Math.random() * types.length)];
  };

  const generateNewQuestion = (mode) => {
    const terpeneName = getRandomTerpene();
    const questionType = mode === 'random' ? getRandomQuestionType() : mode;
    
    setCurrentQuestion({
      terpene: terpeneName,
      type: questionType,
      data: terpenes[terpeneName]
    });
  };

  const handleModeSelect = (mode) => {
    setCurrentMode(mode);
    setShowReference(false);
    setShowAchievements(false);
    generateNewQuestion(mode);
    
    // Track modes used
    const newModesUsed = new Set(modesUsed);
    newModesUsed.add(mode);
    setModesUsed(newModesUsed);
  };

  const handleAnswerCorrect = () => {
    const newScore = score + 1;
    const newTotal = total + 1;
    const newStreak = currentStreak + 1;
    const newCombo = combo + 1;
    const newTotalCorrect = totalCorrect + 1;
    
    setScore(newScore);
    setTotal(newTotal);
    setCurrentStreak(newStreak);
    setCombo(newCombo);
    setTotalCorrect(newTotalCorrect);
    setSessionCount(sessionCount + 1);
    
    // Update best streak
    if (newStreak > bestStreak) {
      setBestStreak(newStreak);
    }
    
    // Track terpene-specific correct answers
    const terpeneName = currentQuestion.terpene;
    setTerpeneCorrect(prev => ({
      ...prev,
      [terpeneName]: (prev[terpeneName] || 0) + 1
    }));
    
    // Calculate and award XP
    const earnedXP = calculateXP(true, newStreak, newCombo);
    setXp(xp + earnedXP);
    setXpGain(earnedXP);
    
    // Check for new achievements
    const stats = {
      score: newScore,
      total: newTotal,
      currentStreak: newStreak,
      totalCorrect: newTotalCorrect,
      xp: xp + earnedXP,
      modesUsed,
      terpeneCorrect: { ...terpeneCorrect, [terpeneName]: (terpeneCorrect[terpeneName] || 0) + 1 },
      sessionCount: sessionCount + 1
    };
    
    const newAchievements = checkAchievements(stats, achievements);
    if (newAchievements.length > 0) {
      setCurrentAchievement(newAchievements[0]);
      setAchievements([...achievements, ...newAchievements.map(a => a.id)]);
    }
    
    generateNewQuestion(currentMode);
  };

  const handleAnswerWrong = () => {
    setTotal(total + 1);
    setCurrentStreak(0);
    setCombo(0);
    generateNewQuestion(currentMode);
  };

  const handleNextCard = () => {
    generateNewQuestion(currentMode);
  };

  const toggleReference = () => {
    setShowReference(!showReference);
    setShowAchievements(false);
  };
  
  const toggleAchievements = () => {
    setShowAchievements(!showAchievements);
    setShowReference(false);
  };

  return (
    <div className="App">
      <div className="container">
        <Header />
        
        {/* XP and Level Progress */}
        <LevelProgress xp={xp} />
        
        {/* Session Stats and Streak */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <Stats score={score} total={total} />
          </div>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <StreakCounter currentStreak={currentStreak} bestStreak={bestStreak} />
          </div>
        </div>
        
        <ModeSelector 
          onModeSelect={handleModeSelect}
          onToggleReference={toggleReference}
          onToggleAchievements={toggleAchievements}
          currentMode={currentMode}
        />
        
        {!showReference && !showAchievements && currentQuestion && (
          <Flashcard
            question={currentQuestion}
            questionText={questionTypes[currentQuestion.type]}
            onCorrect={handleAnswerCorrect}
            onWrong={handleAnswerWrong}
            onNext={handleNextCard}
          />
        )}

        {showReference && (
          <ReferenceGuide 
            terpenes={terpenes}
            highTerpProducts={highTerpProducts}
          />
        )}
        
        {showAchievements && (
          <AchievementsGallery unlockedAchievements={achievements} />
        )}
      </div>
      
      {/* Achievement Popup */}
      {currentAchievement && (
        <AchievementPopup 
          achievement={currentAchievement}
          onClose={() => setCurrentAchievement(null)}
        />
      )}
      
      {/* XP Gain Notification */}
      <XPGainNotification 
        xpGained={xpGain}
        onComplete={() => setXpGain(0)}
      />
    </div>
  );
}

export default App;
