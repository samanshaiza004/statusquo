import { handleClientScriptLoad } from "next/script";
import React, { useState, useEffect } from "react";

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
        <div>
          {comments.map((comment) => (
            <div key={comment.id} className="mb-2 border-b pb-2">
              <p>{comment.content}</p>
              <small>by {comment.userId}</small>
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
