// --- Niveaux de difficulté ---

export const DIFFICULTY = {
  EASY: 1,
  HARD: 2,
  GOAT: 3,
} as const;

export type Difficulty = (typeof DIFFICULTY)[keyof typeof DIFFICULTY];

// --- Chronomètre ---

export const TIMER_SECONDS: Record<Difficulty, number | null> = {
  [DIFFICULTY.EASY]: null,
  [DIFFICULTY.HARD]: 90,
  [DIFFICULTY.GOAT]: 40,
};

// --- Indice (réponse unique / réponses multiples) ---

export const SHOW_ANSWER_HINT: Record<Difficulty, boolean> = {
  [DIFFICULTY.EASY]: true,
  [DIFFICULTY.HARD]: false,
  [DIFFICULTY.GOAT]: false,
};

// --- Étiquettes ---

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  [DIFFICULTY.EASY]: 'Facile',
  [DIFFICULTY.HARD]: 'Difficile',
  [DIFFICULTY.GOAT]: 'GOAT 🐐',
};

// --- Identifiant URL pour les niveaux ---

export const DIFFICULTY_SLUGS: Record<string, Difficulty> = {
  facile: DIFFICULTY.EASY,
  difficile: DIFFICULTY.HARD,
  goat: DIFFICULTY.GOAT,
};

// --- Quiz ---

export const QUESTIONS_PER_QUIZ = 20;

// --- Validation du pseudonyme ---

export const PLAYER_NAME_REGEX = /^[a-zA-Z0-9_-]{3,20}$/;
export const PLAYER_NAME_MIN_LENGTH = 3;
export const PLAYER_NAME_MAX_LENGTH = 20;
