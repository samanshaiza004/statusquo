import React from "react";
import { Heart } from "react-feather";
import { post } from "~/types";

function LikeButton({ curPost }: { curPost: post }) {
  return (
    <div className="flex items-center transition hover:cursor-pointer hover:text-rose-300">
      <span className="mr-1 font-semibold">{curPost.likes}</span>
      <Heart />
    </div>
  );
}

export default LikeButton;
