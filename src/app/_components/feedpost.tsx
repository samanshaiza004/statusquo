import React from "react";
import { MessageCircle } from "react-feather";

import LikeButton from "./likebutton";
import Link from "next/link";
import { clerkClient } from "@clerk/nextjs/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getUser } from "~/server/queries";

async function FeedPost(props: {
  id: number;
  title: string;
  content: string;
  createdAt: Date;

  image_url: string | null;
  likes_count: number;
  userId: string;
}) {
  const { id, title, content, createdAt, image_url, likes_count, userId } =
    props;

  const user = getUser(Number(userId));

  // const [isLiked, setIsLiked] = useState(false);

  /* function handleClick() {
    setIsLiked(!isLiked);
  } */

  const uploaderInfo = await clerkClient.users.getUser((await user).clerkId);

  return (
    <Card className="rounded-none">
      <Link href={`/post/${id}`}>
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>
            <div className="flex items-center">
              <Avatar className="mr-2 h-6 w-6">
                <AvatarImage
                  src={uploaderInfo.imageUrl}
                  alt={uploaderInfo.fullName as string}
                />
                <AvatarFallback>SS</AvatarFallback>
              </Avatar>
              <h3 className="text-md font-semibold text-gray-500">
                {uploaderInfo.username}
              </h3>

              <p className="px-2 text-xs text-gray-400">
                {createdAt.toLocaleString()}
              </p>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="">{content}</p>

          <div className="ml-auto">
            {image_url && (
              <img className="w-1/2 rounded-md" src={image_url} alt="" />
            )}
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex gap-2">
        <div className="flex items-center transition hover:cursor-pointer hover:text-sky-300">
          <span className="mr-1 font-semibold">2</span>
          <MessageCircle />
        </div>
        <LikeButton
          dark={false}
          id={id}
          likes_count={likes_count}
          /* isLiked
          handleClick={handleClick} */
        />
      </CardFooter>
    </Card>
  );
}

export default FeedPost;
