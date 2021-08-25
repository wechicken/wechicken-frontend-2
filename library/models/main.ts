export type Obj<T = any> = {
  [k: string]: T;
};

export type MainPage = {
  pageParams: number[];
  pages: Page[];
};

export type Page = {
  message: string;
  posts: Post[];
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

export type CreatedUser = {
  message: string;
  myGroupStatus: boolean;
  nth: number;
  profile: string;
  token: string;
};

export type LoginUser = CreatedUser & {
  master: boolean;
};
