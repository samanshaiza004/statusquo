import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { getAllPosts } from "~/server/queries";

export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "error fetching posts" },
      { status: 500 },
    );
  }
}
