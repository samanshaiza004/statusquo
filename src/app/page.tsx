import Link from "next/link";
import Form from "./_components/form";
import { getAllPosts } from "~/server/queries";

async function Posts() {
  const posts = await getAllPosts();

  return (
    <div className="text-white">
      {posts.map((post) => (
        <div>
          <h1>{post.title}</h1>
          <h3>{post.author}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="">
      <Form />
      <Posts />
    </main>
  );
}
