import { getCommentCountForPost } from "~/server/queries";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");
    if (!postId) {
      throw new Error("Post ID is required");
    }

    const commentCount = await getCommentCountForPost(postId);
    return new Response(JSON.stringify({ commentCount }), {
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
