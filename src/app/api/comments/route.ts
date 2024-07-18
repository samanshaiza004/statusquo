import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm/sql";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { comments } from "~/server/db/schema";

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("you must be signed in to comment");
    }
    const { postId, content } = await request.json();
    if (!postId) {
      throw new Error("postId is required");
    }
    if (!content) {
      throw new Error("content is required");
    }
    const newComment = await db
      .insert(comments)
      .values({
        postId,
        userId,
        content,
      })
      .returning();

    return NextResponse.json({
      status: "success",
      comment: newComment,
    });
  } catch (error: any) {
    return NextResponse.json({ status: "error", message: error.message });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");
    if (!postId) {
      throw new Error("postId is required");
    }
    const postComments = await db
      .select()
      .from(comments)
      .where(eq(comments.postId, postId));
    return NextResponse.json({ status: "success", comments: postComments });
  } catch (error: any) {
    return NextResponse.json({ status: "error", message: error.message });
  }
}
