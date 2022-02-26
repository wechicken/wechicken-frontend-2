import { TOKEN_STORAGE_KEY } from 'library/constants';

export const setToken = (token: string): void => {
  sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const getToken = (): string | null => {
  return sessionStorage.getItem(TOKEN_STORAGE_KEY);
};
