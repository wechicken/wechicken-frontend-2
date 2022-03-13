export type BatchesRank = {
  userId: number;
  userName: string;
  userThumbnail: string;
  blogsCount: number;
};

export type BatchesContribution = BatchesRank & {
  penalty: number;
};
