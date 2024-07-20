"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle } from "react-feather";
import LikeButton from "./likebutton";
import Link from "next/link";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import CommentSection from "./commentsection";
import DropdownMenu from "./dropdownmenu";

interface FeedPostProps {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  image_url: string | null;
  likes_count: number;
  userId: string;
  currentUser: any;
}

const FeedPost: React.FC<FeedPostProps> = ({
  id,
  title,
  content,
  createdAt,
  image_url,
  likes_count,
  userId,
  currentUser,
}) => {
  const [uploaderInfo, setUploaderInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [commentCount, setCommentCount] = useState(0);
  useEffect(() => {
    console.log("userId", userId);
    const fetchUploaderInfo = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`);
        const uploaderData = await response.json();
        setUploaderInfo(uploaderData);
      } catch (error) {
        console.error("Error fetching uploader info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUploaderInfo();

    const fetchCommentCount = async () => {
      try {
        const response = await fetch(`/api/comments/count?postId=${id}`);
        const commentCount = await response.json();
        setCommentCount(commentCount.commentCount);
        console.log(id, "commentCount", commentCount);
      } catch (error) {
        console.error("Error fetching comment count:", error);
      }
    };

    fetchCommentCount();
  }, [userId]);

  const handleDeletePost = async () => {
    try {
      await fetch(`/api/post/${id}`, {
        method: "DELETE",
      });
      alert("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!uploaderInfo) {
    return <div>Error loading uploader information</div>;
  }

  return (
    <Card className="rounded-none hover:bg-slate-900">
      <Link href={`/post/${id}`}>
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>
            <div className="flex items-center">
              <Avatar className="mr-2 h-6 w-6">
                <AvatarImage
                  src={uploaderInfo.imageUrl}
                  alt={uploaderInfo.fullName || "User Avatar"}
                />
                <AvatarFallback>SS</AvatarFallback>
              </Avatar>
              <h3 className="text-md font-semibold text-gray-500">
                {uploaderInfo.username}
              </h3>
              <p className="px-2 text-xs text-gray-400">
                {createdAt.toLocaleString()}
              </p>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{content}</p>
          {image_url && (
            <div className="ml-auto">
              <img
                className="w-1/2 rounded-md"
                src={image_url}
                alt="Post Image"
              />
            </div>
          )}
        </CardContent>
      </Link>
      <CardFooter className="flex gap-2">
        <div className="flex items-center transition hover:cursor-pointer hover:text-sky-300">
          <span className="mr-1 font-semibold">{commentCount}</span>
          <MessageCircle />
        </div>
        <LikeButton
          userId={userId}
          dark={false}
          id={id}
          initialLikesCount={likes_count}
        />
        <DropdownMenu
          postId={id}
          isOwner={currentUser.userId === uploaderInfo.clerkId}
          onDelete={handleDeletePost}
        />
      </CardFooter>
    </Card>
  );
};

export default FeedPost;
