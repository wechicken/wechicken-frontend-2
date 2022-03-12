type BatchType = {
  nth: number;
  title: string;
};

export type UserInfo = {
  batch: BatchType;
  isGroupJoined: boolean;
  isManager: boolean;
  token: string;
  name: string;
  gmail: string;
  thumbnail: string;
  blogAddress: string;
};

export type MockAuth = {
  data: UserInfo;
  message: string;
};
