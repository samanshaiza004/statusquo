import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

import { sql, eq } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await db
    .update(posts)
    .set({
      likes: sql`${posts.likes} + 1`,
    })
    .where(eq(posts.id, 1));
  res.status(200).json({
    message: "like succesful",
  });
}
