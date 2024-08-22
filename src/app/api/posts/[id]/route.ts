// src/app/api/posts/[id]/route.ts
import { eq } from "drizzle-orm/sql";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

export async function GET(
  request: NextApiRequest,
  { params }: { params: { id: string } },
) {
  const post = await db.query.posts.findFirst({
    where: (model, { eq }) => eq(model.id, Number(params.id)),
  });

  if (!post) throw new Error("post not found");

  return NextResponse.json(post);
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("id");
    if (!postId) throw new Error("postId is required");

    await db.delete(posts).where(eq(posts.id, Number(postId)));
    return NextResponse.json({ message: "post deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
