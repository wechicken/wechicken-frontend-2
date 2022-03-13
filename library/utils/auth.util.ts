import { TOKEN_STORAGE_KEY } from 'library/constants';
import { UserInfo } from 'library/models';

export const setUserInStorage = (user: UserInfo): void => {
  sessionStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(user));
};

export const getUserFromStorage = (): UserInfo | null => {
  const item = sessionStorage.getItem(TOKEN_STORAGE_KEY);

  return item ? JSON.parse(item) : null;
};
