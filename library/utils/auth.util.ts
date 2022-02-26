import { TOKEN_STORAGE_KEY } from 'library/constants';
import { MockAuth } from 'library/models';

export const setUser = (user: MockAuth): void => {
  sessionStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(user));
};

export const getUser = (): string | null => {
  return sessionStorage.getItem(TOKEN_STORAGE_KEY);
};
