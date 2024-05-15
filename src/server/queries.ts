import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

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
