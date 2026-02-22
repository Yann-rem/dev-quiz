/**
 * Mélange un tableau (Mélange de Fisher-Yates).
 * Utilisé pour le tirage au sort des réponses côté client.
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Calcule le score pour une question.
 * Retourne 1 si le joueur a coché exactement les bonnes réponses, 0 sinon.
 */
export function calculateQuestionScore(
  userAnswerIds: number[],
  correctAnswerIds: number[],
): number {
  const userSet = new Set(userAnswerIds);
  const correctSet = new Set(correctAnswerIds);

  if (userSet.size !== correctSet.size) return 0;
  for (const id of userSet) {
    if (!correctSet.has(id)) return 0;
  }
  return 1;
}

/**
 * Valide un pseudonyme de joueur.
 * Retourne true si le pseudo est valide, false sinon.
 */
export function isValidPlayerName(name: string): boolean {
  const trimmed = name.trim();
  return /^[a-zA-Z0-9_-]{3,20}$/.test(trimmed);
}
