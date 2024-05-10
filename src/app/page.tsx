import Form from "./_components/form";
import { getAllPosts } from "~/server/queries";

export const dynamic = "force-dynamic";

async function HomePosts() {
  const posts = await getAllPosts();

  return (
    <div className="min-w-md flex flex-col gap-3 lg:gap-5">
      {posts.map((post) => (
        <div key={post.id} className="rounded-lg bg-white p-8 shadow-md">
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
            {post.image_url ? <img src={post.image_url} /> : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="overflow-y-scroll p-4 ">
      <Form />
      <div className="">
        <HomePosts />
      </div>
    </main>
  );
}
