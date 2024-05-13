import HomePosts from "./_components/homeposts";
import PostForm from "./_components/postform";

export const dynamic = "force-dynamic";

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
