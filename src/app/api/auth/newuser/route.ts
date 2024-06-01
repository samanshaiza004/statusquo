import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await currentUser();
  if (!user) {
    return new NextResponse("User does not exist", { status: 404 });
  }

  let dbUser = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.clerkId, user.id),
  });

  const insertData = {
    clerkId: user.id,
    bio: "",
    name: user.fullName ?? "",
    avatar: user.imageUrl,
    email: user.emailAddresses[0]?.emailAddress ?? "",
    username: user.username ?? "",
  };

  if (!dbUser) {
    await db.insert(users).values(insertData);
  }

  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });
}
