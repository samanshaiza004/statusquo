import { clerkClient } from "@clerk/nextjs/server";
import React from "react";
import { MessageCircle } from "react-feather";
import LikeButton from "~/app/_components/likebutton";
import { getPost, getUser } from "~/server/queries";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";

const FullPagePostView = async ({ id }: { id: number }) => {
  const post = await getPost(id);
  const user = await getUser(post.userId);
  const uploaderInfo = await clerkClient.users.getUser(user.clerkId);
  const isLiked = user.liked_posts.includes(id as unknown as string) || false;

  return (
    <Card className="w-full max-w-4xl rounded-none bg-slate-900">
      <CardHeader>
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <div className="flex items-center">
          <Avatar className="mr-2 h-6 w-6">
            <AvatarImage
              src={uploaderInfo.imageUrl}
              alt={uploaderInfo.fullName || "User Avatar"}
            />
            <AvatarFallback>SS</AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-semibold text-gray-500">
            {uploaderInfo.username}
          </h3>
          <p className="px-2 text-sm text-gray-400">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="py-4">
          <p>{post.content}</p>
        </div>
        {post.image_url && (
          <div className="ml-auto">
            <img
              className="w-64 rounded-md"
              src={post.image_url}
              alt="Post Image"
            />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-semibold">Comments</h2>
          <div>
            <h3>saman shaiza</h3>
            <p className="px-2 text-sm">This is a good point</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <div className="flex items-center transition hover:cursor-pointer hover:text-sky-300">
          <span className="mr-1 font-semibold">2</span>
          <MessageCircle />
        </div>
        <LikeButton
          isLiked={isLiked}
          dark={false}
          id={id}
          likes_count={Number(post.likes_count)}
        />
      </CardFooter>
    </Card>
  );
};

export default FullPagePostView;
