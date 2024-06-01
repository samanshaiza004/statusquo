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

interface FeedPostProps {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  image_url: string | null;
  likes_count: number;
  userId: string;
}

const FeedPost: React.FC<FeedPostProps> = async ({
  id,
  title,
  content,
  createdAt,
  image_url,
  likes_count,
  userId,
}) => {
  const user = await getUser(Number(userId));
  const uploaderInfo = await clerkClient.users.getUser(user.clerkId);

  const isLiked = user.liked_posts.includes((id as unknown as string) + "");
  console.log(user.liked_posts.includes((id as unknown as string) + ""));
  return (
    <Card className="rounded-none hover:bg-slate-900">
      <Link href={`/post/${id}`}>
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>
            <div className="flex items-center">
              <Avatar className="mr-2 h-6 w-6">
                <AvatarImage
                  src={uploaderInfo.imageUrl}
                  alt={uploaderInfo.fullName || "User Avatar"}
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
          <p>{content}</p>
          {image_url && (
            <div className="ml-auto">
              <img
                className="w-1/2 rounded-md"
                src={image_url}
                alt="Post Image"
              />
            </div>
          )}
        </CardContent>
      </Link>
      <CardFooter className="flex gap-2">
        <div className="flex items-center transition hover:cursor-pointer hover:text-sky-300">
          <span className="mr-1 font-semibold">2</span>
          <MessageCircle />
        </div>
        <LikeButton
          isLiked={isLiked}
          dark={false}
          id={id}
          likes_count={likes_count}
        />
      </CardFooter>
    </Card>
  );
};
export default FeedPost;
