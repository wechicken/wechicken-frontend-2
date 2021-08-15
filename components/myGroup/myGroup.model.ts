import { Obj } from 'library/models';

export type MyGroup = {
  message: string;
  is_group_joined: boolean;
  by_days: Bydays;
  myProfile: MyProfile;
  users: MyGroupUser[];
  myGroup: MyGroupSub;
  userPostsCounting: UserPostsCounting;
  Ranks: Rank[];
};

export type Rank = {
  user_name: string;
  user_profile: string;
};

export type UserPostsCounting = {
  [k: string]: number;
};

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

export type GroupByDate = {
  message: string;
  by_days: Bydays;
  userPostsCounting: UserPostsCounting;
};
