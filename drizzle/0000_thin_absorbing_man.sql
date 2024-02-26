CREATE TABLE IF NOT EXISTS "events" (
	"id" serial NOT NULL,
	"userId" text,
	"event" text,
	"properties" jsonb,
	"timestamp" timestamp,
	"created_at" timestamp,
	"updated_at" timestamp
);
