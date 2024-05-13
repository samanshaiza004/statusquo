import PostForm from "./_components/postform";
import { getAllPosts } from "~/server/queries";

export const dynamic = "force-dynamic";

async function HomePosts() {
  const posts = await getAllPosts();

  return (
    <div className="card w-full rounded-none bg-white shadow-xl sm:max-w-4xl xl:max-w-full">
      {posts.map((post) => (
        <div key={post.id} className="card-body flex hover:bg-gray-100">
          <div className="">
            <h1 className="card-title text-2xl text-gray-800">{post.title}</h1>
            <div className="flex items-center">
              <h3 className="text-lg font-semibold text-gray-500">
                {post.author}
              </h3>
              <p className="px-2 text-sm text-gray-400">
                {post.createdAt.toLocaleString()}
              </p>
            </div>
            <div className="mb-4 flex">
              <p className="text-gray-800">{post.content}</p>
            </div>
          </div>

          <div className=" ml-auto">
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
      <div className="flex flex-col items-center justify-center xl:grid xl:grid-cols-3">
        <div className="h-full w-full">
          <PostForm />
        </div>

        <div className="">
          <HomePosts />
        </div>
      </div>
    </main>
  );
}
