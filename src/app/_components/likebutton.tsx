"use client";

import React, { useCallback } from "react";
import { Heart } from "react-feather";
import { post } from "~/types";

function LikeButton({ curPost }: { curPost: post }) {
  const [isLiked, setIsLiked] = React.useState(false);
  const axios = require("axios").default;
  const handleClick = useCallback(async () => {
    try {
      console.log(curPost.id, "clicked");
      setIsLiked(!isLiked);
      await axios.post("/api/likehandler.ts", {
        postId: curPost.id,
        isLiked: isLiked,
      });
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div
      onClick={handleClick}
      className={`flex items-center transition ${isLiked ? "text-rose-300" : null} hover:cursor-pointer hover:text-rose-300`}
    >
      <span className="mr-1 font-semibold">{curPost.likes}</span>
      <Heart fill={`${isLiked ? "#fda4af" : "none"}`} />
    </div>
  );
}

export default LikeButton;
