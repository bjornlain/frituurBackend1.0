export interface Timeoverview {
  id: string;
  date: Date;
  description: string;
  user: User;
  worked: Number;
}

export interface User {
  avatar: string;
  deleted: boolean;
  email: string;
  name: string;
  id: string;
}
