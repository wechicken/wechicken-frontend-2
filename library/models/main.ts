export type Obj<T = any> = {
  [k: string]: T;
};

export type Post = {
  type: string;
  thumbnail: string;
  user_profile: string;
  nth: string;
  user_name: string;
  title: string;
  link: string;
  subtitle: string;
  date: string;
  like: boolean;
  id: number;
  bookmark: boolean;
};

export type LoginResponse = {
  master: boolean;
  message: string;
  myGroupStatus: boolean;
  nth: number;
  profile: string;
  token: string;
};

export type CreatedUser = {
  message: string;
  myGroupStatus: boolean;
  nth: number;
  profile: string;
  token: string;
};

export type LoginUser = CreatedUser & {
  master?: boolean;
};
