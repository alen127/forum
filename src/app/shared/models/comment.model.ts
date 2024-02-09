export interface Comment {
  _id?: string;
  content: string;
  user_id: string;
  thread_id: string;
  created_at?: Date | string;
}
