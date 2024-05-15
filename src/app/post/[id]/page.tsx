import FullPagePostView from "~/components/full-image-page";

export default function PostPage({
  params: { id: postId },
}: {
  params: { id: string };
}) {
  return <FullPagePostView id={Number(postId)} />;
}
