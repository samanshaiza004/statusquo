import React from "react";

import { getAllPosts } from "~/server/queries";

import FeedPost from "./feedpost";

async function HomePosts() {
  const posts = await getAllPosts();

  return (
    <div className="w-full rounded-none bg-white shadow-xl md:max-w-4xl xl:max-w-full">
      {posts.map((post) => (
        <div>
          <FeedPost
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            createdAt={post.createdAt}
            userId={post.userId as unknown as string}
            image_url={post.image_url}
            likes_count={Number(post.likes_count)}
          />
        </div>
      ))}
    </div>
  );
}

export default HomePosts;
