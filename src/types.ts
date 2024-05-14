export type post = {
  id: number;
  title: string;
  content: string;
  author: string;
  userId: string;
  image_url: string | null;
  likes: string | null;
  createdAt: Date;
  updatedAt: Date | null;
};
