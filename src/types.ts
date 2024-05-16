export type post = {
  id: number;
  title: string;
  content: string;

  userId: string;
  image_url: string | null;
  likes_count: number;
  createdAt: Date;
  updatedAt: Date | null;
};
