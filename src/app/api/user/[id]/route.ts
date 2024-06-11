import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

import { getUser } from "~/server/queries";
export async function GET(
  request: NextApiRequest,
  { params }: { params: { id: string } },
) {
  try {
    const posts = await getUser(Number(params.id));
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "error fetching user" }, { status: 500 });
  }
}
