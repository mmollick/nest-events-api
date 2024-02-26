import { serial, text, timestamp, pgTable, jsonb } from 'drizzle-orm/pg-core';

export const events = pgTable('events', {
  id: serial('id'),
  userId: text('userId'),
  event: text('event'),
  properties: jsonb('properties'),
  timestamp: timestamp('timestamp'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});
