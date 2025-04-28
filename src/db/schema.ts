import { InferInsertModel } from "drizzle-orm";
import {
  boolean,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  description: varchar("description"),
  status: boolean("status").default(false),
  dueDate: timestamp("date").notNull(),
});

export type Task = InferInsertModel<typeof tasks>;
