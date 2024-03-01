import { serial, text, timestamp, pgTable, jsonb } from 'drizzle-orm/pg-core';

export const events = pgTable('events', {
  id: serial('id'),
  projectId: text('projectId'),
  userId: text('userId'),
  event: text('event'),
  properties: jsonb('properties'),
  timestamp: timestamp('timestamp'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;

export const projects = pgTable('projects', {
  id: text('id').primaryKey(),
  name: text('name'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
