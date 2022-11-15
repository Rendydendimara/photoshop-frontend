export interface IUser {
  name: string;
  _id: string;
  email: string;
  token: string;
  deleted_at: string | null;
  created_at: string;
  is_deleted: boolean;
  updated_at: string | null;
}
