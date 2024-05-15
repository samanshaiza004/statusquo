import FullPagePostView from "~/components/full-image-page";
import { Modal } from "./modal";

export default function PostModal({
  params: { id: postId },
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <FullPagePostView id={Number(postId)} />
    </Modal>
  );
}
