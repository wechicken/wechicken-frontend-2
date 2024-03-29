export type BatchesRank = {
  userId: number;
  userName: string;
  userThumbnail: string;
  blogsCount: number;
};

export type BatchesContribution = BatchesRank & {
  penalty: number;
};

export type BatchesByWeek = {
  sun?: BatchPost[];
  mon?: BatchPost[];
  tue?: BatchPost[];
  wed?: BatchPost[];
  thu?: BatchPost[];
  fri?: BatchPost[];
  sat?: BatchPost[];
};

export type BatchPost = {
  blogWrittenDate: string;
  batchId: number;
  userId: number;
  userName: string;
  userThumbnail: string;
  blogId: number;
  blogTitle: string;
  blogLink: string;
  blogTypeName: string;
  blogTypeId: number;
};

export type PostEditorInput = {
  title: string;
  link: string;
  written_date: string;
};

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

export type Bydays = {
  MON: BydayData[];
  TUE: BydayData[];
  WED: BydayData[];
  THU: BydayData[];
  FRI: BydayData[];
  SAT: BydayData[];
  SUN: BydayData[];
};

export type BydayData = {
  date: string;
  id: number;
  link: string;
  subtitle: string;
  thumbnail: string;
  title: string;
  type: string;
  user_name: string;
  user_profile: string;
};

export type GroupByDate = {
  message: string;
  by_days: Bydays;
  userPostsCounting: UserPostsCounting;
};
