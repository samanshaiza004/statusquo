// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  foreignKey,
  index,
  numeric,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { use } from "react";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `statusquo_${name}`);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 256 }).notNull(),
    content: varchar("content", { length: 1024 }).notNull(),
    author: varchar("author", { length: 256 }).notNull(),
    userId: varchar("userId", { length: 256 }).notNull(),
    image_url: varchar("image_url", { length: 256 }),
    likes: numeric("likes", { precision: 10, scale: 0 }).default("0"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (example) => ({
    titleIndex: index("title_idx").on(example.title),
  }),
);

export const comments = createTable("comment", {
  id: serial("id").primaryKey(),
  postId: varchar("postId", { length: 256 }).notNull(),
  userId: varchar("userId", { length: 256 }).notNull(),
  content: varchar("content", { length: 1024 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
