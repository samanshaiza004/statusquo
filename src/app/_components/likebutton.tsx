// src/app/_components/likebutton.tsx

"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "react-feather";

interface LikeButtonProps {
  id: number;
  initialLikesCount: number;
  dark: boolean;
  userId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  id,
  initialLikesCount,

  userId,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`);
        const userData = await response.json();
        setIsLiked(userData.liked_posts.includes(id));
        console.log(userData.liked_posts);
      } catch (error) {
        console.error("Error checking if post is liked:", error);
      }
    };

    checkIfLiked();
  }, [id, userId, loading]);

  const handleLike = async () => {
    if (loading) return;

    setLoading(true);
    try {
      // Check if the user is logged in before proceeding
      if (!userId) {
        window.location.href = "/auth/sign-in";
        return;
      }

      const response = await fetch(`/api/like`, {
        method: isLiked ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: id }),
      });

      const data = await response.json();

      if (response.ok) {
        setLikesCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
        setIsLiked(!isLiked);
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error: any) {
      console.error("Error updating like:", error.message);
      alert(error.message); // Or you can display a user-friendly error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center transition ${isLiked ? "text-rose-300" : ""} hover:cursor-pointer hover:text-rose-300`}
      disabled={loading}
    >
      <span className="mr-1 font-semibold">{likesCount}</span>
      <Heart fill={isLiked ? "#fda4af" : "none"} />
    </button>
  );
};

export default LikeButton;
