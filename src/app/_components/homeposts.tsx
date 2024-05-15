import React from "react";
import { MessageCircle } from "react-feather";
import { getAllPosts } from "~/server/queries";
import LikeButton from "./likebutton";

async function HomePosts() {
  const posts = await getAllPosts();

  return (
    <div className="card w-full rounded-none bg-white shadow-xl md:max-w-4xl xl:max-w-full">
      {posts.map((post) => (
        <div key={post.id} className="card-body flex hover:bg-gray-100">
          <div>
            <h1 className="card-title text-2xl text-gray-800">{post.title}</h1>
            <div className="flex items-center">
              <h3 className="text-lg font-semibold text-gray-500">
                {post.author}
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
          <div className="xl:right-18 absolute right-8 flex gap-3 md:right-8">
            <div className="flex items-center transition hover:cursor-pointer hover:text-sky-300">
              <span className="mr-1 font-semibold">2</span>
              <MessageCircle />
            </div>
            <LikeButton curPost={post} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePosts;
