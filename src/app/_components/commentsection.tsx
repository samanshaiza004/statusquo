import React, { useState, useEffect } from "react";

interface Comment {
  id: number;
  text: string;
}

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  // Fetch comments from API or database
  useEffect(() => {
    // Replace this with your actual API call or database query
    const fetchComments = async () => {
      try {
        const response = await fetch("/api/comments");
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div>
      <h2>Comments</h2>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.text}</li>
          ))}
        </ul>
      )}

      <form>
        <textarea
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          placeholder="Write your comment..."
          required
        ></textarea>
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;
