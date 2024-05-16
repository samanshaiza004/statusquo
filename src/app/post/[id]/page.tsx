import FullPagePostView from "~/components/full-image-page";

export default function PostPage({
  params: { id: postId },
}: {
  params: { id: string };
}) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <FullPagePostView id={Number(postId)} />
    </div>
  );
}
