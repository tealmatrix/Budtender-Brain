// Text-to-Speech utility using Web Speech API

const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

// Pronunciation guide for terpene names
const PRONUNCIATION_MAP = {
  'Myrcene': 'MUR-seen',
  'Limonene': 'LIM-oh-neen',
  'Linalool': 'lin-uh-LOO-ol',
  'β-Caryophyllene': 'beta carry-oh-FIL-een',
  'Pinene': 'PIE-neen',
  'Humulene': 'HYOO-mew-leen'
};

// Cache for loaded voices
let voicesLoaded = false;
let preferredVoice = null;

// Load voices when available
if (synth) {
  const loadVoices = () => {
    const voices = synth.getVoices();
    if (voices.length > 0) {
      voicesLoaded = true;
      // Prefer English voices
      preferredVoice = voices.find(voice => 
        voice.lang.startsWith('en-') && voice.name.includes('Google')
      ) || voices.find(voice => 
        voice.lang.startsWith('en-')
      ) || voices[0];
    }
  };

  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = loadVoices;
  }
  loadVoices();
}

/**
 * Speak a terpene name with proper pronunciation
 * @param {string} terpeneName - The name of the terpene
 * @param {number} rate - Speech rate (0.1 to 10, default 0.9)
 * @param {number} pitch - Speech pitch (0 to 2, default 1)
 */
export const speakTerpeneName = (terpeneName, rate = 0.9, pitch = 1) => {
  if (!synth) {
    console.warn('Speech synthesis not supported in this browser');
    return;
  }

  // Cancel any ongoing speech
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(terpeneName);
  
  // Set voice if available
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }
  
  // Configure speech properties
  utterance.rate = rate;
  utterance.pitch = pitch;
  utterance.volume = 1;
  utterance.lang = 'en-US';

  // Speak!
  synth.speak(utterance);
};

/**
 * Get the phonetic pronunciation guide for a terpene
 * @param {string} terpeneName - The name of the terpene
 * @returns {string} - Phonetic pronunciation
 */
export const getPronunciation = (terpeneName) => {
  return PRONUNCIATION_MAP[terpeneName] || terpeneName;
};

/**
 * Check if speech synthesis is supported
 * @returns {boolean}
 */
export const isSpeechSupported = () => {
  return synth !== null && synth !== undefined;
};

/**
 * Stop any ongoing speech
 */
export const stopSpeech = () => {
  if (synth) {
    synth.cancel();
  }
};

/**
 * Play a success sound using oscillator (for correct answers)
 */
export const playSuccessSound = () => {
  if (typeof window === 'undefined' || !window.AudioContext) return;
  
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 523.25; // C5
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (error) {
    console.warn('Audio playback not available:', error);
  }
};

/**
 * Play an error sound (for wrong answers)
 */
export const playErrorSound = () => {
  if (typeof window === 'undefined' || !window.AudioContext) return;
  
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 200; // Lower frequency for error
    oscillator.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (error) {
    console.warn('Audio playback not available:', error);
  }
};
