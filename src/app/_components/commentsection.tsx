import { handleClientScriptLoad } from "next/script";
import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

interface CommentProps {
  postId: number;
  userId: string;
}

const CommentSection: React.FC<CommentProps> = ({ postId, userId }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments?postId=${postId}`);
        const data = await response.json();
        console.log(data);
        setComments(data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async () => {
    if (loading || !newComment) return;
    setLoading(true);
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          content: newComment,
          userId,
        }),
      });
      const data = await response.json();
      setComments([...comments, data.comment]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h2>Comments</h2>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <div className="my-4">
          {comments.map(({ comment, user }) => (
            <div key={comment.id} className="mb-2 border-b pb-2">
              <div className="flex items-center">
                <Avatar className="mr-2 h-6 w-6">
                  <AvatarImage
                    src={user.imageUrl}
                    alt={user.fullName || "User Avatar"}
                  />
                  <AvatarFallback>SS</AvatarFallback>
                </Avatar>
                <span>by {user.username}</span>
              </div>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment..."
          className="flex-grow rounded border p-2 text-gray-500 outline-none"
          required
        />
        <button disabled={loading} onClick={handleSubmit}>
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
