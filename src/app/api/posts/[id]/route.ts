import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { db } from "~/server/db";

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
