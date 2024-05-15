import React from "react";
import { MessageCircle } from "react-feather";

import LikeButton from "./likebutton";
import Link from "next/link";
import { clerkClient } from "@clerk/nextjs/server";
async function FeedPost(props: {
  id: number;
  title: string;
  content: string;
  createdAt: Date;

  image_url: string | null;
  likes: number;
  userId: string;
}) {
  const { id, title, content, createdAt, image_url, likes, userId } = props;

  const uploaderInfo = await clerkClient.users.getUser(userId);
  return (
    <div key={id} className="card-body flex hover:bg-gray-100">
      <Link href={`/post/${id}`}>
        <div>
          <h1 className="card-title text-2xl text-gray-800">{title}</h1>
          <div className="flex items-center">
            <h3 className="text-lg font-semibold text-gray-500">
              {uploaderInfo.username}
            </h3>
            <p className="px-2 text-sm text-gray-400">
              {createdAt.toLocaleString()}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-800">{content}</p>
          </div>
        </div>
        <div className="ml-auto">
          {image_url && (
            <img className="w-1/2 rounded-md" src={image_url} alt="" />
          )}
        </div>
        <div className="xl:right-18 absolute right-8 flex gap-3 md:right-8">
          <div className="flex items-center transition hover:cursor-pointer hover:text-sky-300">
            <span className="mr-1 font-semibold">2</span>
            <MessageCircle />
          </div>
          <LikeButton id={id} likes={likes} />
        </div>
      </Link>
    </div>
  );
}

export default FeedPost;
