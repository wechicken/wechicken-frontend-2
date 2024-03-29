export type Obj<T = any> = {
  [k: string]: T;
};

export type MainPage = {
  pageParams: number[];
  pages: Page[];
};

export type Page = {
  data: Post[];
};

export type Post = {
  id: number;
  title: string;
  subtitle: string | null;
  link: string;
  thumbnail: string | null;

  writtenDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  userId: number;
  user: {
    id: number;
    name: string;
    thumbnail: string | null;
    batch: {
      nth: number;
      batchType: {
        name: string;
      };
    };
    blogType: {
      name: string;
    };
  };
  isLiked: false;
  isBookmarked: false;
};

export type CreatedUser = {
  message: string;
  myGroupStatus: boolean;
  batch: {
    nth: number;
    title: string;
  };
  thumbnail: string;
  token: string;
  isGroupJoined: boolean;
  blogAddress: string;
  name: string;
  gmail: string;
};

export type LoginUser = CreatedUser & {
  isManager: boolean;
};

export type Alert = {
  alertMessage: string;
  submitBtnText?: string;
  closeBtnText?: string;
  onSubmit?: () => void;
  onClose?: () => void;
  type?: string;
  setSelectedMenu?: React.Dispatch<React.SetStateAction<string>>;
  selectedMenu?: string;
};
