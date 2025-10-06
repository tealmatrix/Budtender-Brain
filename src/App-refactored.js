import React, { useState, useEffect } from 'react';
import './App.css';
import terpenes from './data/terpenes.json';
import highTerpProducts from './data/highTerpProducts.json';
import { calculateXP, checkAchievements, getLevelInfo } from './utils/gameLogic';
import { loadGameData, saveGameData } from './utils/storage';

// Import refactored components
import GameStatsPanel from './components/refactored/GameStatsPanel';
import ModeSelector from './components/refactored/ModeSelectorNew';
import FlashcardView from './components/refactored/FlashcardView';
import QuizView from './components/refactored/QuizView';
import ReferenceView from './components/refactored/ReferenceView';
import AchievementsView from './components/refactored/AchievementsView';
import EffectSearchView from './components/refactored/EffectSearchView';
import AchievementPopup from './components/AchievementPopup';
import XPGainNotification from './components/XPGainNotification';

// View states
const VIEWS = {
  STUDY: 'study',
  QUIZ: 'quiz',
  REFERENCE: 'reference',
  ACHIEVEMENTS: 'achievements',
  EFFECT_SEARCH: 'effect_search',
  MODE_SELECT: 'mode_select'
};

// Study types
const STUDY_TYPES = {
  FLASHCARD: 'flashcard',
  QUIZ: 'quiz'
};

function App() {
  // View Management
  const [currentView, setCurrentView] = useState(VIEWS.MODE_SELECT);
  const [previousView, setPreviousView] = useState(null);
  const [studyType, setStudyType] = useState(STUDY_TYPES.FLASHCARD);
  
  // Session Stats
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentMode, setCurrentMode] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  
  // Game Progression (Persistent)
  const [xp, setXp] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [combo, setCombo] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [modesUsed, setModesUsed] = useState(new Set());
  const [terpeneCorrect, setTerpeneCorrect] = useState({});
  const [sessionCount, setSessionCount] = useState(0);
  
  // UI Notifications
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const [xpGain, setXpGain] = useState(0);
  const [statsMinimized, setStatsMinimized] = useState(false);
  
  const terpeneNames = Object.keys(terpenes);
  
  const questionTypes = {
    'aroma': 'What is the aroma profile?',
    'feelings': 'What are the common reported feelings?',
    'therapeutic': 'What is the primary therapeutic potential?',
    'menu': 'Name products on the menu that feature this terpene:',
    'quick': "What's the quick counter line?",
    'pairsBest': 'Which terpenes pair best with this one?',
    'herbAnalogs': 'What herbs/plants have similar terpene profiles?'
  };
  
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
  
  // Auto-minimize stats when in study mode
  useEffect(() => {
    if (currentView === VIEWS.STUDY) {
      const timer = setTimeout(() => setStatsMinimized(true), 3000);
      return () => clearTimeout(timer);
    } else {
      setStatsMinimized(false);
    }
  }, [currentView]);
  
  const getRandomTerpene = () => {
    return terpeneNames[Math.floor(Math.random() * terpeneNames.length)];
  };
  
  const getRandomQuestionType = () => {
    const types = ['aroma', 'feelings', 'therapeutic', 'menu', 'quick', 'pairsBest', 'herbAnalogs'];
    return types[Math.floor(Math.random() * types.length)];
  };
  
  const generateNewQuestion = (mode) => {
    const terpeneName = getRandomTerpene();
    const questionType = mode === 'random' ? getRandomQuestionType() : mode;
    
    setCurrentQuestion({
      terpene: terpeneName,
      type: questionType,
      data: terpenes[terpeneName],
      questionText: questionTypes[questionType]
    });
  };
  
  const handleModeSelect = (mode) => {
    setCurrentMode(mode);
    setCurrentView(studyType === STUDY_TYPES.QUIZ ? VIEWS.QUIZ : VIEWS.STUDY);
    generateNewQuestion(mode);
    
    // Track modes used
    const newModesUsed = new Set(modesUsed);
    newModesUsed.add(mode);
    setModesUsed(newModesUsed);
  };
  
  const handleStudyTypeChange = (type) => {
    setStudyType(type);
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
  
  const switchView = (newView) => {
    setPreviousView(currentView);
    setCurrentView(newView);
  };
  
  const goBack = () => {
    if (currentView === VIEWS.STUDY || currentView === VIEWS.QUIZ) {
      setCurrentView(VIEWS.MODE_SELECT);
      setCurrentMode(null);
    } else if (previousView) {
      setCurrentView(previousView);
      setPreviousView(null);
    } else {
      setCurrentView(VIEWS.MODE_SELECT);
    }
  };
  
  const levelInfo = getLevelInfo(xp);
  
  return (
    <div className="App">
      <div className="container">
        {/* Header - Always Visible */}
        <header className="app-header">
          <h1>🌿 Terpene Flashcards</h1>
          <p>Earth's Own Naturals - Interview Prep</p>
        </header>
        
        {/* Game Stats Panel - Contextual Display */}
        {currentView !== VIEWS.MODE_SELECT && (
          <GameStatsPanel
            score={score}
            total={total}
            xp={xp}
            levelInfo={levelInfo}
            currentStreak={currentStreak}
            bestStreak={bestStreak}
            minimized={statsMinimized}
            onToggleMinimize={() => setStatsMinimized(!statsMinimized)}
          />
        )}
        
        {/* View Container with Smooth Transitions */}
        <div className="view-wrapper">
          {/* Mode Selection View */}
          {currentView === VIEWS.MODE_SELECT && (
            <div className="view-section">
              <ModeSelector
                onModeSelect={handleModeSelect}
                onViewReference={() => switchView(VIEWS.REFERENCE)}
                onViewAchievements={() => switchView(VIEWS.ACHIEVEMENTS)}
                onViewEffectSearch={() => switchView(VIEWS.EFFECT_SEARCH)}
                currentMode={currentMode}
                studyType={studyType}
                onStudyTypeChange={handleStudyTypeChange}
              />
            </div>
          )}
          
          {/* Study View - Flashcard */}
          {currentView === VIEWS.STUDY && currentQuestion && (
            <div className="view-section">
              <FlashcardView
                question={currentQuestion}
                onCorrect={handleAnswerCorrect}
                onWrong={handleAnswerWrong}
                onNext={handleNextCard}
                onBack={goBack}
                streak={currentStreak}
                combo={combo}
              />
            </div>
          )}
          
          {/* Study View - Quiz */}
          {currentView === VIEWS.QUIZ && currentQuestion && (
            <div className="view-section">
              <QuizView
                question={currentQuestion}
                onCorrect={handleAnswerCorrect}
                onWrong={handleAnswerWrong}
                onNext={handleNextCard}
                onBack={goBack}
                streak={currentStreak}
                combo={combo}
                allTerpenes={terpenes}
              />
            </div>
          )}
          
          {/* Reference View */}
          {currentView === VIEWS.REFERENCE && (
            <div className="view-section">
              <ReferenceView
                terpenes={terpenes}
                highTerpProducts={highTerpProducts}
                onBack={goBack}
              />
            </div>
          )}
          
          {/* Achievements View */}
          {currentView === VIEWS.ACHIEVEMENTS && (
            <div className="view-section">
              <AchievementsView
                unlockedAchievements={achievements}
                stats={{ xp, totalCorrect, bestStreak }}
                onBack={goBack}
              />
            </div>
          )}
          
          {/* Effect Search View */}
          {currentView === VIEWS.EFFECT_SEARCH && (
            <div className="view-section">
              <EffectSearchView
                terpenes={terpenes}
                onBack={goBack}
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Floating Notifications */}
      {currentAchievement && (
        <AchievementPopup
          achievement={currentAchievement}
          onClose={() => setCurrentAchievement(null)}
        />
      )}
      
      <XPGainNotification
        xpGained={xpGain}
        onComplete={() => setXpGain(0)}
      />
    </div>
  );
}

export default App;
