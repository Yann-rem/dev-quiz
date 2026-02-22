import type { Difficulty } from '@/lib/constants';

// --- Types déduits à partir du schéma Drizzle ---

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string | null;
};

export type Question = {
  id: number;
  categoryId: number;
  difficulty: Difficulty;
  questionText: string;
  codeSnippet: string | null;
  explanation: string;
  createdAt: string | null;
};

export type Answer = {
  id: number;
  questionId: number;
  text: string;
  isCorrect: boolean;
  displayOrder: number;
  createdAt: string | null;
};

export type QuizSession = {
  id: string;
  playerName: string;
  categoryId: number;
  difficulty: Difficulty;
  score: number | null;
  totalQuestions: number;
  totalTimeSeconds: number | null;
  startedAt: string | null;
  completedAt: string | null;
};

// --- Types API (envoyés au client) ---

/** Réponse envoyée au client pendant le quiz (sans is_correct) */
export type ClientAnswer = {
  id: number;
  text: string;
};

/** Question envoyée au client pendant le quiz */
export type ClientQuestion = {
  id: number;
  questionText: string;
  codeSnippet: string | null;
  isMultiple: boolean;
  answers: ClientAnswer[];
};

/** Réponse de l'API POST /api/quiz/start */
export type QuizStartResponse = {
  sessionId: string;
  questions: ClientQuestion[];
  timerSeconds: number | null;
  showAnswerHint: boolean;
};

/** Corps de la requête POST /api/quiz/submit */
export type QuizSubmitRequest = {
  sessionId: string;
  answers: Record<number, number[]>;
  totalTimeSeconds: number;
};

/** Correction d'une question (renvoyée après soumission) */
export type QuestionResult = {
  questionId: number;
  questionText: string;
  codeSnippet: string | null;
  explanation: string;
  isCorrect: boolean;
  userAnswerIds: number[];
  answers: (ClientAnswer & { isCorrect: boolean })[];
};

/** Réponse de l'API POST /api/quiz/submit */
export type QuizSubmitResponse = {
  score: number;
  totalQuestions: number;
  results: QuestionResult[];
};

// --- Classement ---

export type LeaderboardEntry = {
  playerName: string;
  score: number;
  totalQuestions: number;
  totalTimeSeconds: number;
  completedAt: string;
};

export type LeaderboardResponse = {
  entries: LeaderboardEntry[];
  category: string;
  difficulty: Difficulty;
};
