// src/app/api/like/route.ts
import { auth } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { posts, users } from "~/server/db/schema";

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("you must be signed in to like");
    }
    const { postId } = await request.json();
    if (!postId) {
      throw new Error("postId is required");
    }
    const dbUser = await db.query.users.findFirst({
      where: (model, { eq }) => eq(model.clerkId, userId),
    });
    if (!dbUser) {
      throw new Error("you must be signed in to like");
    }
    if (dbUser.liked_posts.includes(postId)) {
      throw new Error("you have already liked this post");
    }
    await dbUser.liked_posts.push(postId);
    await db
      .update(users)
      .set({ liked_posts: dbUser.liked_posts })
      .where(eq(users.clerkId, userId));
    await db
      .update(posts)
      .set({ likes_count: sql`${posts.likes_count} + 1` })
      .where(eq(posts.id, Number(postId)));
    return NextResponse.json({ status: "success", message: "post liked" });
  } catch (error: any) {
    return NextResponse.json({ status: "error", message: error.message });
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("You must be signed in to unlike a post");
    }
    const { postId } = await request.json();
    console.log(postId);
    if (!postId) {
      throw new Error("Post ID is required");
    }
    const dbUser = await db.query.users.findFirst({
      where: (model, { eq }) => eq(model.clerkId, userId),
    });
    if (!dbUser) {
      throw new Error("You must be signed in to unlike a post");
    }
    const postIndex = dbUser.liked_posts.indexOf(postId);
    if (postIndex === -1) {
      throw new Error("You haven't liked this post");
    }
    await dbUser.liked_posts.splice(postIndex, 1);
    await db
      .update(users)
      .set({ liked_posts: dbUser.liked_posts })
      .where(eq(users.clerkId, userId));
    await db
      .update(posts)
      .set({ likes_count: sql`${posts.likes_count} - 1` })
      .where(eq(posts.id, Number(postId)));
    return NextResponse.json({ status: "success", message: "Post unliked!" });
  } catch (error: any) {
    return NextResponse.json(
      { status: "failure", message: error.message },
      { status: 500 },
    );
  }
}
