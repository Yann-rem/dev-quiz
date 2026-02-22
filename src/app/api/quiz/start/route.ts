import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/db';
import { answers, categories, questions, quizSessions } from '@/lib/db/schema';
import { and, eq, isNotNull, isNull, sql } from 'drizzle-orm';
import {
  DIFFICULTY,
  QUESTIONS_PER_QUIZ,
  TIMER_SECONDS,
  SHOW_ANSWER_HINT,
  type Difficulty,
} from '@/lib/constants';
import { isValidPlayerName, shuffle } from '@/lib/utils';
import type { ClientQuestion, QuizStartResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { playerName, categorySlug, difficulty } = body as {
      playerName: string;
      categorySlug: string;
      difficulty: Difficulty;
    };

    // --- Validation ---

    if (!playerName || !isValidPlayerName(playerName)) {
      return NextResponse.json(
        { error: 'Pseudo invalide (3-20 caractères, alphanumérique, tirets et underscores)' },
        { status: 400 },
      );
    }

    if (!categorySlug) {
      return NextResponse.json({ error: 'Catégorie manquante' }, { status: 400 });
    }

    const validDifficulties = Object.values(DIFFICULTY);
    if (!validDifficulties.includes(difficulty)) {
      return NextResponse.json({ error: 'Niveau de difficulté invalide' }, { status: 400 });
    }

    // --- Récupération de la catégorie ---

    const category = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, categorySlug))
      .limit(1);

    if (category.length === 0) {
      return NextResponse.json({ error: 'Catégorie introuvable' }, { status: 404 });
    }

    const categoryId = category[0].id;

    // --- Sélection des questions ---

    let questionFilter;
    if (difficulty === DIFFICULTY.EASY) {
      // Facile : uniquement théoriques
      questionFilter = and(
        eq(questions.categoryId, categoryId),
        eq(questions.difficulty, difficulty),
        isNull(questions.codeSnippet),
      );
    } else if (difficulty === DIFFICULTY.GOAT) {
      // GOAT : uniquement code
      questionFilter = and(
        eq(questions.categoryId, categoryId),
        eq(questions.difficulty, difficulty),
        isNotNull(questions.codeSnippet),
      );
    } else {
      // Difficile : mélange théoriques + code
      questionFilter = and(
        eq(questions.categoryId, categoryId),
        eq(questions.difficulty, difficulty),
      );
    }

    const selectedQuestions = await db
      .select()
      .from(questions)
      .where(questionFilter)
      .orderBy(sql`RANDOM()`)
      .limit(QUESTIONS_PER_QUIZ);

    if (selectedQuestions.length === 0) {
      return NextResponse.json(
        { error: 'Aucune question disponible pour cette combinaison catégorie/niveau' },
        { status: 404 },
      );
    }

    // --- Récupération des réponses ---

    const clientQuestions: ClientQuestion[] = [];

    for (const q of selectedQuestions) {
      const questionAnswers = await db.select().from(answers).where(eq(answers.questionId, q.id));

      const correctCount = questionAnswers.filter((a) => a.isCorrect).length;

      clientQuestions.push({
        id: q.id,
        questionText: q.questionText,
        codeSnippet: q.codeSnippet,
        isMultiple: correctCount > 1,
        answers: shuffle(
          questionAnswers.map((a) => ({
            id: a.id,
            text: a.text,
          })),
        ),
      });
    }

    // --- Création de la session ---

    const sessionId = uuidv4();

    await db.insert(quizSessions).values({
      id: sessionId,
      playerName: playerName.trim(),
      categoryId,
      difficulty,
      totalQuestions: selectedQuestions.length,
    });

    // --- Réponse ---

    const response: QuizStartResponse = {
      sessionId,
      questions: clientQuestions,
      timerSeconds: TIMER_SECONDS[difficulty],
      showAnswerHint: SHOW_ANSWER_HINT[difficulty],
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Erreur /api/quiz/start:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
