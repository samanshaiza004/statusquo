import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

import { sql, eq } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.status(405).json({
      message: "Method not allowed",
    });
    return;
  }
  try {
    if (req.body.isLiked) {
      await db
        .update(posts)
        .set({
          likes_count: sql`${req.body.post.likes_count} - 1`,
        })
        .where(eq(req.body.post.id, 1));
      return;
    }
    await db
      .update(posts)
      .set({
        likes_count: sql`${req.body.post.likes_count} + 1`,
      })
      .where(eq(req.body.post.id, 1));
    res.status(200).json({
      message: "like succesful",
    });
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
}
