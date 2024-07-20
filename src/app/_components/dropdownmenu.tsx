"use client";

import React from "react";

interface DropdownMenuProps {
  postId: number;
  isOwner: boolean;
  onDelete: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  postId,
  isOwner,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleCopyLink = () => {
    const postUrl = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(postUrl);
    alert("Copied to clipboard!");
  };

  const handleDeletePost = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      onDelete();
    }
  };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>Options</button>
      {isOpen && (
        <div className="absolute right-0 mt-2">
          <button className="block w-full" onClick={handleCopyLink}>
            copy link
          </button>
          {isOwner && (
            <button className="block w-full" onClick={handleDeletePost}>
              delete post
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
