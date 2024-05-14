"use server";

import { db } from "~/server/db";
import { posts } from "./db/schema";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function addPost(prevState: any, formData: FormData) {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("You must be signed in to add a post");
    }

    const user = userId ? await clerkClient.users.getUser(userId) : null;
    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();
    const image_url = formData.get("imageurl")?.toString();
    if (!title) {
      throw new Error("Title is required");
    }
    if (!content) {
      throw new Error("Content is required");
    }

    const postData = {
      title,
      content,
      author: user?.fullName || "",
      userId: userId || "",
      image_url: "",
    };

    if (image_url) {
      postData.image_url = image_url;
    } else {
      postData.image_url = "";
    }

    await db.insert(posts).values(postData);
  } catch (e: any) {
    return {
      message: e.message,
    };
  }
}
