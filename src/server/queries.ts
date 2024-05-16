import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { posts } from "./db/schema";
import { and, eq, sql } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function getAllPosts() {
  const posts = await db.query.posts.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return posts;
}

export async function getPost(id: number) {
  const user = auth();

  if (!user.userId) throw new Error("unauthorized");

  const post = await db.query.posts.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!post) throw new Error("post not found");

  return post;
}

export async function deletePost(id: number) {
  const user = auth();

  if (!user.userId) throw new Error("unauthorized");

  const post = await db.query.posts.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!post) throw new Error("post not found");
  if (post.userId !== user.userId) throw new Error("unauthorized");

  await db
    .delete(posts)
    .where(and(eq(posts.id, id), eq(posts.userId, user.userId)));

  redirect("/");
}

/* export async function addLikeToPost(id: number) {
  const user = auth();

  if (!user.userId) throw new Error("unauthorized");
  const post = await db.query.posts.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!post) throw new Error("post not found");

  await db.update(posts).set({ likes_count: sql`${post.likes_count} + 1` });

  return post.likes_count;
} */

/* export async function removeLikeFromPost(id: number) {
  const user = auth();

  if (!user.userId) throw new Error("unauthorized");
  const post = await db.query.posts.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!post) throw new Error("post not found");

  await db.update(posts).set({ likes_count: sql`${post.likes_count} - 1` });

  return post.likes_count;
}
 */
