import PostForm from "./_components/postform";
import { getAllPosts } from "~/server/queries";

export const dynamic = "force-dynamic";

async function HomePosts() {
  const posts = await getAllPosts();

  return (
    <div className="min-w-md flex flex-col gap-3 lg:gap-5">
      {posts.map((post) => (
        <div
          key={post.id}
          className="rounded-lg bg-gray-200 p-8 shadow-md transition hover:bg-gray-300"
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
            {post.image_url ? (
              <img className="w-1/2 rounded-md" src={post.image_url} />
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="overflow-y-scroll p-4">
      <div className="flex flex-col items-center justify-center">
        <PostForm />
        <div className="">
          <HomePosts />
        </div>
      </div>
    </main>
  );
}
