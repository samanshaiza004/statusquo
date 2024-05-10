"use server";

import { db } from "~/server/db";
import { posts } from "./db/schema";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function addPost(prevState: any, formData: FormData) {
  console.log(formData);
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("You must be signed in to add a post");
    }
    const user = userId ? await clerkClient.users.getUser(userId) : null;

    console.log(userId);

    const title = formData.get("title") as string;

    if (!title) {
      throw new Error("Title is required");
    }

    const content = formData.get("content") as string;

    if (!content) {
      throw new Error("Content is required");
    }

    const image_url = formData.get("imageurl") as string;
    console.log(image_url);

    if (!image_url) {
      await db.insert(posts).values({
        title,
        content,
        author: user?.fullName as string,
        userId: userId as string,
      });
    } else {
      await db.insert(posts).values({
        title,
        content,
        image_url,
        author: user?.fullName as string,
        userId: userId as string,
      });
    }
  } catch (e: any) {
    return {
      message: e.message,
    };
  }
}
