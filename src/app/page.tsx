import Link from "next/link";
import Form from "./_components/form";
import { getAllPosts } from "~/server/queries";

async function Posts() {
  const posts = await getAllPosts();

  return (
    <div className="grid grid-cols-1 gap-3 lg:gap-5">
      {posts.map((post) => (
        <div
          key={post.id}
          className="max-w-md rounded-lg bg-white p-8 shadow-md"
        >
          <h1 className="text-xl font-bold text-gray-800">{post.title}</h1>
          <div className="flex">
            <h3 className="text-lg font-semibold text-gray-800">
              {post.author}
            </h3>
            <p className="px-4 text-sm text-gray-500">
              {post.createdAt.toLocaleString()}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-800">{post.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="overflow-y-scroll p-4">
      <Form />
      <div className="">
        <Posts />
      </div>
    </main>
  );
}
