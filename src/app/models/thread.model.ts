export interface Thread {
  _id?: string;
  title: string;
  content: string;
  category_id: string;
  user_id: string;
  created_at?: Date;
}
