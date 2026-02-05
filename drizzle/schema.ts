/**
 * Drizzle Schema - Example
 * This is the Drizzle approach (alternative to Prisma)
 */

import { pgTable, uuid, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['user', 'admin']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name'),
  role: roleEnum('role').default('user').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// Example: Add your own tables below
// export const posts = pgTable('posts', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   title: text('title').notNull(),
//   content: text('content'),
//   published: boolean('published').default(false).notNull(),
//   authorId: uuid('author_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
//   createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
//   updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
// });

// Type exports
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
