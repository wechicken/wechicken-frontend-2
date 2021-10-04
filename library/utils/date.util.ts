import dayjs from 'dayjs';
import { DATE_FORMAT, DATE_REGEX } from 'library/constants';

/**
 * 주어지는 문자열이 YYYY.MM.DD 형식이며, 유효한 날짜인지 체크하는 함수
 * @param dateString 체크 할 날짜 문자열
 */
export const isValidDate = (dateString: string): boolean => {
  const checkRegex = DATE_REGEX.test(dateString);
  const dateObj = dayjs(dateString, DATE_FORMAT);

  if (!checkRegex) {
    return false;
  }

  return dateObj.isValid();
};
