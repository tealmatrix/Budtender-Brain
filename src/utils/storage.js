// LocalStorage utilities for game persistence

const STORAGE_KEY = 'terpene_flashcards_game_data';

export const loadGameData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      // Convert modesUsed back to Set
      if (parsed.modesUsed && Array.isArray(parsed.modesUsed)) {
        parsed.modesUsed = new Set(parsed.modesUsed);
      }
      return parsed;
    }
  } catch (error) {
    console.error('Error loading game data:', error);
  }
  
  // Default game data
  return {
    xp: 0,
    totalCorrect: 0,
    bestStreak: 0,
    achievements: [],
    modesUsed: new Set(),
    terpeneCorrect: {},
    totalSessions: 0,
    lastPlayed: null
  };
};

export const saveGameData = (gameData) => {
  try {
    // Convert Set to Array for storage
    const dataToSave = {
      ...gameData,
      modesUsed: gameData.modesUsed ? Array.from(gameData.modesUsed) : [],
      lastPlayed: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (error) {
    console.error('Error saving game data:', error);
  }
};

export const resetGameData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error resetting game data:', error);
  }
};

export const exportGameData = () => {
  const data = loadGameData();
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `terpene-flashcards-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
