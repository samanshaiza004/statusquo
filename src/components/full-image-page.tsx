import { clerkClient } from "@clerk/nextjs/server";
import React from "react";
import { getPost } from "~/server/queries";

async function FullPagePostView(props: { id: number }) {
  const post = await getPost(Number(props.id));

  const uploaderInfo = await clerkClient.users.getUser(post.userId);
  return (
    <div className="flex flex-col items-center justify-center bg-white ">
      <div className=" ">
        <h1 className="card-title text-2xl text-gray-800">{post.title}</h1>
        <div className="flex items-center">
          <h3 className="text-lg font-semibold text-gray-500">
            {uploaderInfo.username}
          </h3>
          <p className="px-2 text-sm text-gray-400">
            {post.createdAt.toLocaleString()}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-gray-800">{post.content}</p>
        </div>
      </div>
      <div className="ml-auto">
        {post.image_url && (
          <img className="w-1/2 rounded-md" src={post.image_url} alt="" />
        )}
      </div>
    </div>
  );
}

export default FullPagePostView;
