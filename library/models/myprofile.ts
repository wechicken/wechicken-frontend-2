import { Post } from 'library/models';

export type MyProfile = {
  blog_address: string;
  gmail: string;
  is_group_joined: boolean;
  user_name: string;
  user_thumbnail: string;
  wecode_nth: number;
};

export type MyProfileData = {
  message: string;
  mypage: MyProfile;
};

export type MyPostData = {
  message: string;
  myPosts: Post[];
};
