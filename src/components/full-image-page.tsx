"use client";

import { clerkClient } from "@clerk/nextjs/server";
import React, { useEffect, useState } from "react";
import { MessageCircle } from "react-feather";
import LikeButton from "~/app/_components/likebutton";
import { getPost, getUser } from "~/server/queries";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { useUser } from "@clerk/nextjs";

const FullPagePostView = ({ id }: { id: number }) => {
  const [uploaderInfo, setUploaderInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<any>(null);
  const { user } = useUser();
  const userId = user?.id;
  useEffect(() => {
    const fetchUploaderInfo = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`);
        const uploaderData = await response.json();
        setUploaderInfo(uploaderData);
      } catch (error) {
        console.error("Error fetching uploader info:", error);
      }
    };
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        const postData = await response.json();
        setPost(postData);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
    fetchUploaderInfo();
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  if (!uploaderInfo) {
    return <div>Error loading uploader information</div>;
  }

  return (
    <Card className="w-full max-w-4xl rounded-none bg-slate-900">
      <CardHeader>
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <div className="flex items-center">
          <Avatar className="mr-2 h-6 w-6">
            <AvatarImage
              src={uploaderInfo.imageUrl}
              alt={uploaderInfo.fullName || "User Avatar"}
            />
            <AvatarFallback>SS</AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-semibold text-gray-500">
            {uploaderInfo.username}
          </h3>
          <p className="px-2 text-sm text-gray-400">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="py-4">
          <p>{post.content}</p>
        </div>
        {post.image_url && (
          <div className="ml-auto">
            <img
              className="w-64 rounded-md"
              src={post.image_url}
              alt="Post Image"
            />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-semibold">Comments</h2>
          <div>
            <h3>saman shaiza</h3>
            <p className="px-2 text-sm">This is a good point</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <div className="flex items-center transition hover:cursor-pointer hover:text-sky-300">
          <span className="mr-1 font-semibold">2</span>
          <MessageCircle />
        </div>
        <LikeButton
          userId={post.userId as unknown as string}
          dark={false}
          id={id}
          initialLikesCount={Number(post.likes_count)}
        />
      </CardFooter>
    </Card>
  );
};

export default FullPagePostView;
