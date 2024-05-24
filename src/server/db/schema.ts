// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  foreignKey,
  index,
  integer,
  numeric,
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `statusquo_${name}`);

export const users = createTable("user", {
  id: serial("id").primaryKey(),

  // fields from clerk
  clerkId: varchar("clerkId", { length: 256 }).notNull().unique(),
  email: varchar("email", { length: 256 }).notNull(),
  name: varchar("name", { length: 256 }),

  username: varchar("username", { length: 256 }).notNull(),
  bio: varchar("bio", { length: 1024 }),
  avatar: varchar("avatar", { length: 256 }),

  liked_posts: varchar("liked_posts", {}).default("[]"),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }),
});

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 256 }).notNull(),
    content: text("content").notNull(),
    userId: integer("userId")
      .notNull()
      .references(() => users.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    image_url: varchar("image_url", { length: 256 }),
    likes_count: numeric("likes_count", { precision: 10, scale: 0 }).default(
      "0",
    ),
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
