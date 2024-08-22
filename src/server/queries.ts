// src/server/queries.ts
import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { comments, posts } from "./db/schema";
import { and, eq, sql } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function getAllPosts() {
  const posts = await db.query.posts.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return posts;
}

export async function getPost(id: number) {
  const post = await db.query.posts.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!post) throw new Error("post not found");

  return post;
}

export async function getUser(id: number) {
  const user = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!user) throw new Error("user not found");

  return user;
}

export async function deletePost(id: number) {
  const user = auth();

  if (!user.userId) throw new Error("unauthorized");

  const post = await db.query.posts.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!post) throw new Error("post not found");
  if (Number(post.userId) !== Number(user.userId))
    throw new Error("unauthorized");

  await db
    .delete(posts)
    .where(and(eq(posts.id, id), eq(posts.userId, Number(user.userId))));

  redirect("/");
}

export async function getCommentCountForPost(postId: string) {
  if (!postId) throw new Error("postId is required");
  const commentCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(comments)
    .where(eq(comments.postId, postId));
  if (commentCount[0]) return commentCount[0].count;
  console.log(commentCount);
  return 0;
}
