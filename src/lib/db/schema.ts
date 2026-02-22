import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// --- Catégories ---

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// --- Questions ---

export const questions = sqliteTable('questions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id),
  difficulty: integer('difficulty').notNull(),
  questionText: text('question_text').notNull(),
  codeSnippet: text('code_snippet'),
  explanation: text('explanation').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// --- Réponses ---

export const answers = sqliteTable('answers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  questionId: integer('question_id')
    .notNull()
    .references(() => questions.id, { onDelete: 'cascade' }),
  text: text('text').notNull(),
  isCorrect: integer('is_correct', { mode: 'boolean' }).notNull().default(false),
  displayOrder: integer('display_order').notNull().default(0),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// --- Sessions ---

export const quizSessions = sqliteTable('quiz_sessions', {
  id: text('id').primaryKey(),
  playerName: text('player_name').notNull(),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id),
  difficulty: integer('difficulty').notNull(),
  score: integer('score').default(0),
  totalQuestions: integer('total_questions').notNull(),
  totalTimeSeconds: integer('total_time_seconds'),
  startedAt: text('started_at').default(sql`CURRENT_TIMESTAMP`),
  completedAt: text('completed_at'),
});
