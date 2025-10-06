// Game mechanics and calculations

export const ACHIEVEMENTS = [
  {
    id: 'first_correct',
    title: '🌱 First Steps',
    description: 'Get your first answer correct',
    requirement: { type: 'correct', value: 1 }
  },
  {
    id: 'ten_correct',
    title: '🌿 Budding Expert',
    description: 'Get 10 answers correct',
    requirement: { type: 'correct', value: 10 }
  },
  {
    id: 'fifty_correct',
    title: '🍃 Terpene Scholar',
    description: 'Get 50 answers correct',
    requirement: { type: 'correct', value: 50 }
  },
  {
    id: 'hundred_correct',
    title: '🌳 Master Budtender',
    description: 'Get 100 answers correct',
    requirement: { type: 'correct', value: 100 }
  },
  {
    id: 'perfect_streak_5',
    title: '🔥 On Fire!',
    description: 'Get 5 in a row correct',
    requirement: { type: 'streak', value: 5 }
  },
  {
    id: 'perfect_streak_10',
    title: '🔥🔥 Unstoppable!',
    description: 'Get 10 in a row correct',
    requirement: { type: 'streak', value: 10 }
  },
  {
    id: 'perfect_streak_20',
    title: '🔥🔥🔥 Legendary!',
    description: 'Get 20 in a row correct',
    requirement: { type: 'streak', value: 20 }
  },
  {
    id: 'accuracy_80',
    title: '🎯 Sharp Mind',
    description: 'Maintain 80% accuracy (min 20 questions)',
    requirement: { type: 'accuracy', value: 80, minQuestions: 20 }
  },
  {
    id: 'accuracy_90',
    title: '🎯🎯 Precision Expert',
    description: 'Maintain 90% accuracy (min 30 questions)',
    requirement: { type: 'accuracy', value: 90, minQuestions: 30 }
  },
  {
    id: 'level_5',
    title: '⭐ Rising Star',
    description: 'Reach level 5',
    requirement: { type: 'level', value: 5 }
  },
  {
    id: 'level_10',
    title: '⭐⭐ Expert Budtender',
    description: 'Reach level 10',
    requirement: { type: 'level', value: 10 }
  },
  {
    id: 'all_modes',
    title: '🎲 Well Rounded',
    description: 'Try all study modes',
    requirement: { type: 'modes', value: 6 }
  },
  {
    id: 'speed_demon',
    title: '⚡ Speed Demon',
    description: 'Complete 50 cards in one session',
    requirement: { type: 'session', value: 50 }
  },
  {
    id: 'myrcene_master',
    title: '🍄 Myrcene Master',
    description: 'Answer 10 Myrcene questions correctly',
    requirement: { type: 'terpene', value: 'Myrcene', count: 10 }
  },
  {
    id: 'limonene_pro',
    title: '🍋 Limonene Pro',
    description: 'Answer 10 Limonene questions correctly',
    requirement: { type: 'terpene', value: 'Limonene', count: 10 }
  },
  {
    id: 'all_terpenes',
    title: '🌈 Rainbow Master',
    description: 'Get at least 5 correct answers for each terpene',
    requirement: { type: 'allTerpenes', value: 5 }
  }
];

export const LEVELS = [
  { level: 1, xpRequired: 0, title: 'Novice' },
  { level: 2, xpRequired: 100, title: 'Apprentice' },
  { level: 3, xpRequired: 250, title: 'Student' },
  { level: 4, xpRequired: 500, title: 'Practitioner' },
  { level: 5, xpRequired: 1000, title: 'Budtender' },
  { level: 6, xpRequired: 1750, title: 'Senior Budtender' },
  { level: 7, xpRequired: 2750, title: 'Expert' },
  { level: 8, xpRequired: 4000, title: 'Master' },
  { level: 9, xpRequired: 5500, title: 'Guru' },
  { level: 10, xpRequired: 7500, title: 'Cannabis Sommelier' }
];

export const calculateXP = (isCorrect, streak, combo) => {
  let xp = 0;
  
  if (isCorrect) {
    xp = 10; // Base XP
    
    // Streak bonus
    if (streak >= 5) xp += 5;
    if (streak >= 10) xp += 10;
    if (streak >= 20) xp += 20;
    
    // Combo multiplier
    if (combo >= 3) xp = Math.floor(xp * 1.2);
    if (combo >= 5) xp = Math.floor(xp * 1.5);
    if (combo >= 10) xp = Math.floor(xp * 2);
  }
  
  return xp;
};

export const getLevelInfo = (xp) => {
  let currentLevel = LEVELS[0];
  let nextLevel = LEVELS[1];
  
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].xpRequired) {
      currentLevel = LEVELS[i];
      nextLevel = LEVELS[i + 1] || currentLevel;
    } else {
      break;
    }
  }
  
  const xpInCurrentLevel = xp - currentLevel.xpRequired;
  const xpNeededForNext = nextLevel.xpRequired - currentLevel.xpRequired;
  const progress = nextLevel.level > currentLevel.level 
    ? (xpInCurrentLevel / xpNeededForNext) * 100 
    : 100;
  
  return {
    currentLevel,
    nextLevel,
    progress: Math.min(progress, 100),
    xpToNext: Math.max(0, nextLevel.xpRequired - xp)
  };
};

export const checkAchievements = (stats, achievements) => {
  const newAchievements = [];
  
  ACHIEVEMENTS.forEach(achievement => {
    // Skip if already unlocked
    if (achievements.includes(achievement.id)) return;
    
    const { requirement } = achievement;
    
    switch (requirement.type) {
      case 'correct':
        if (stats.totalCorrect >= requirement.value) {
          newAchievements.push(achievement);
        }
        break;
        
      case 'streak':
        if (stats.currentStreak >= requirement.value) {
          newAchievements.push(achievement);
        }
        break;
        
      case 'accuracy':
        const accuracy = stats.total > 0 ? (stats.score / stats.total) * 100 : 0;
        if (stats.total >= requirement.minQuestions && accuracy >= requirement.value) {
          newAchievements.push(achievement);
        }
        break;
        
      case 'level':
        const levelInfo = getLevelInfo(stats.xp);
        if (levelInfo.currentLevel.level >= requirement.value) {
          newAchievements.push(achievement);
        }
        break;
        
      case 'modes':
        if (stats.modesUsed && stats.modesUsed.size >= requirement.value) {
          newAchievements.push(achievement);
        }
        break;
        
      case 'session':
        if (stats.sessionCount >= requirement.value) {
          newAchievements.push(achievement);
        }
        break;
        
      case 'terpene':
        if (stats.terpeneCorrect && stats.terpeneCorrect[requirement.value] >= requirement.count) {
          newAchievements.push(achievement);
        }
        break;
        
      case 'allTerpenes':
        if (stats.terpeneCorrect) {
          const allTerpenesQualify = Object.values(stats.terpeneCorrect)
            .every(count => count >= requirement.value);
          if (allTerpenesQualify) {
            newAchievements.push(achievement);
          }
        }
        break;
        
      default:
        break;
    }
  });
  
  return newAchievements;
};

export const getStreakMessage = (streak) => {
  if (streak >= 20) return '🔥🔥🔥 LEGENDARY STREAK! 🔥🔥🔥';
  if (streak >= 15) return '🔥🔥 INCREDIBLE! 🔥🔥';
  if (streak >= 10) return '🔥 ON FIRE! 🔥';
  if (streak >= 5) return '🎯 NICE STREAK! 🎯';
  if (streak >= 3) return '✨ Keep it up! ✨';
  return '';
};

export const getComboMessage = (combo) => {
  if (combo >= 10) return 'x' + combo + ' COMBO!!! 💥';
  if (combo >= 5) return 'x' + combo + ' COMBO! ⚡';
  if (combo >= 3) return 'x' + combo + ' combo ✨';
  return '';
};
