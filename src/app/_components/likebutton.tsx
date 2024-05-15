"use client";

import React, { useCallback, useState } from "react";
import { Heart } from "react-feather";
import axios from "axios";
import { post } from "~/types";

function LikeButton({ id, likes }: { id: number; likes: number }) {
  const [isLiked, setIsLiked] = useState(false);
  const handleClick = useCallback(async () => {
    try {
      const newIsLiked = !isLiked;
      setIsLiked(newIsLiked);
      /* if (newIsLiked) {
        await axios.post("/api/likehandler.ts", {
          postId: curPost.id,
          isLiked: newIsLiked,
        });
      } */
    } catch (e) {
      console.log(e);
    }
  }, [id, isLiked]);
  return (
    <div
      onClick={handleClick}
      className={`flex items-center transition ${
        isLiked ? "text-rose-300" : null
      } hover:cursor-pointer hover:text-rose-300`}
    >
      <span className="mr-1 font-semibold">{likes}</span>
      <Heart fill={`${isLiked ? "#fda4af" : "none"}`} />
    </div>
  );
}

export default LikeButton;
