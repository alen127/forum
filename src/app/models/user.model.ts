export interface User {
  _id?: string;
  username: string;
  password: string;
  email: string;
  role?: string;
  token?: string;
  created_at?: Date;
}
