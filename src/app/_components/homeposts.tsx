import React from "react";
import { MessageCircle } from "react-feather";
import { getAllPosts } from "~/server/queries";
import LikeButton from "./likebutton";
import Link from "next/link";
import FeedPost from "./feedpost";

async function HomePosts() {
  const posts = await getAllPosts();

  return (
    <div className=" w-full rounded-none bg-white shadow-xl md:max-w-4xl xl:max-w-full">
      {posts.map((post) => (
        <div>
          <FeedPost
            id={post.id}
            title={post.title}
            content={post.content}
            createdAt={post.createdAt}
            userId={post.userId}
            image_url={post.image_url}
            likes_count={Number(post.likes_count)}
          />
        </div>
      ))}
    </div>
  );
}

export default HomePosts;
