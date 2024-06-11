"use client";

import React, { useEffect, useState } from "react";
import FeedPost from "./feedpost";
import { getAllPosts } from "~/server/queries";

const HomePosts: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        const fetchedPosts = await response.json();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    console.log(posts);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!posts || posts.length === 0) {
    return <div>No posts available</div>;
  }

  return (
    <div className="w-full rounded-none bg-white shadow-xl md:max-w-4xl xl:max-w-full">
      {posts.map((post) => (
        <div key={post.id}>
          <FeedPost
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
};

export default HomePosts;
