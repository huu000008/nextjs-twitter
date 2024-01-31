import { User } from './User';

export interface Post {
  postId: number;
  user: User;
  content: string;
  createdAt: Date;
  images: [id: string, url: string | undefined];
}
