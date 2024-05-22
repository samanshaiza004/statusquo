"use client";

import React, { useRef, useState } from "react";
import { Heart } from "react-feather";

import { addLikeToPost, removeLikeFromPost } from "~/server/actions";
import { useFormState } from "react-dom";

const initialState = {
  message: null,
};

function LikeButton({
  id,
  likes_count,
  dark,
  /* isLiked,
  handleClick, */
}: {
  id: number;
  likes_count: number;
  dark: boolean;
  /* isLiked: boolean;
  handleClick: () => void; */
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [state, formActionAdd] = useFormState(addLikeToPost, initialState);
  const [stateR, formActionRemove] = useFormState(
    removeLikeFromPost,
    initialState,
  );
  return (
    <form
      ref={formRef}
      action={async (FormData) => {
        if (!isLiked) {
          await formActionAdd(FormData);
        } else {
          await formActionRemove(FormData);
        }
        setIsLiked(!isLiked);
      }}
    >
      <button
        type="submit"
        className={`flex items-center transition ${
          isLiked ? "text-rose-300" : null
        } hover:cursor-pointer hover:text-rose-300`}
      >
        <span className={`mr-1 font-semibold`}>{likes_count}</span>
        <Heart fill={`${isLiked ? "#fda4af" : "none"}`} />
      </button>
      <input
        type="hidden"
        name="isLiked"
        value={`${isLiked ? "true" : "false"}`}
      />
      <input type="hidden" name="id" value={id} />
    </form>
  );
}

export default LikeButton;
