"use server";

import { db } from "~/server/db";
import { posts } from "./db/schema";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";

export type State = {
  status: "success" | "failure";
  message: string;
} | null;

export async function addPost(
  prevState: State | null,
  values: FormData,
): Promise<State> {
  console.log({
    values,
  });
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("You must be signed in to add a post");
    }

    // const user = userId ? await clerkClient.users.getUser(userId) : null;

    let dbUser = await db.query.users.findFirst({
      where: (model, { eq }) => eq(model.clerkId, userId),
    });

    const title = values.get("title") as string;
    const content = values.get("content") as string;
    const image_url = values.get("image_url");
    if (!title) {
      throw new Error("Title is required");
    }
    if (!content) {
      throw new Error("Content is required");
    }

    const postData = {
      userId: dbUser?.id ?? 0,
      title,
      content,

      image_url: "",
    };

    if (image_url) {
      postData.image_url = image_url as string;
    } else {
      postData.image_url = "";
    }

    await db.insert(posts).values(postData);

    return {
      status: "success",
      message: `post created!`,
    };
  } catch (e: any) {
    return {
      status: "failure",
      message: e.message,
    };
  }
}

export async function addLikeToPost(prevState: any, formData: FormData) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("You must be signed in to like a post");
    }
    const postId = formData.get("id")?.toString();
    const user = userId ? await clerkClient.users.getUser(userId) : null;

    await db
      .update(posts)
      .set({ likes_count: sql`${posts.likes_count} + 1` })
      .where(eq(posts.id, Number(postId)));
  } catch (e: any) {
    return {
      message: e.message,
    };
  }
  return {
    status: "success",
    message: `this is about ${formData.get("title")}`,
  };
}

export async function removeLikeFromPost(prevState: any, formData: FormData) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("You must be signed in to like a post");
    }
    const postId = formData.get("id")?.toString();
    // const user = userId ? await clerkClient.users.getUser(userId) : null;

    await db
      .update(posts)
      .set({ likes_count: sql`${posts.likes_count} - 1` })
      .where(eq(posts.id, Number(postId)));
  } catch (e: any) {
    return {
      message: e.message,
    };
  }
}
