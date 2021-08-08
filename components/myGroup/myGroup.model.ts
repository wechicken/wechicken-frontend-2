import { Obj } from 'library/models';

export type MyGroup = {
  message: string;
  is_group_joined: boolean;
  by_days: Bydays;
  myProfile: MyProfile;
  users: MyGroupUser[];
  myGroup: MyGroupSub;
  userPostsCounting: Obj; // UserPostsCounting
  Ranks: Rank[];
};

export type Rank = {
  user_name: string;
  user_profile: string;
};

// TODO 추후 type 채워넣을것
// export type UserPostsCounting = {}

export type MyGroupSub = {
  title: string;
  count: number;
  penalty: number;
};

export type MyGroupUser = {
  gmail: string;
  name: string;
  profile: string;
  blog_type: Blogtype;
};

export type Blogtype = {
  type: string;
};

export type MyProfile = {
  gmail: string;
  name: string;
  profile: string;
  blog_type: string;
};

// TODO 이것두
export type Bydays = {
  MON: Obj[];
  TUE: Obj[];
  WED: Obj[];
  THU: Obj[];
  FRI: Obj[];
  SAT: Obj[];
  SUN: Obj[];
};
