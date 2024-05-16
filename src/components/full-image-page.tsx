import { clerkClient } from "@clerk/nextjs/server";
import React from "react";
import { getPost } from "~/server/queries";

const FullPagePostView = async ({ id }: { id: number }) => {
  const post = await getPost(Number(id));
  const uploaderInfo = await clerkClient.users.getUser(post.userId);

  return (
    <div className="flex h-screen flex-col bg-white px-6 py-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">{post.title}</h1>
        <div className="flex items-center">
          <h3 className="text-lg font-semibold text-gray-500">
            {uploaderInfo.username}
          </h3>
          <p className="px-2 text-sm text-gray-400">
            {post.createdAt.toLocaleString()}
          </p>
        </div>
        <div className="py-8">
          <p className="text-gray-800">{post.content}</p>
        </div>
      </div>
      <div className="ml-auto">
        {post.image_url && (
          <img className=" w-64 rounded-md" src={post.image_url} alt="" />
        )}
      </div>
    </div>
  );
};
export default FullPagePostView;
