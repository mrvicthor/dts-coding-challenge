CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar,
	"status" boolean DEFAULT false,
	"date" timestamp NOT NULL
);
