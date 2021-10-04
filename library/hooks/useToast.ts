import { ToastConfig } from 'library/models';
import { setToastConfig } from 'library/store/toast';
import { useDispatch } from 'react-redux';

type UseToast = {
  showToast: (config: ToastConfig) => void;
};

/**
 * toast를 띄우고 싶은 컴포넌트에서 사용하는 hook.
 * 리턴되는 `showToast` 함수를 사용하여 토스트를 띄울 수 있다.
 * @returns showToast
 * @example
 * const {showToast} = useToast();
 *
 * const onClick = () => {
 *   showToast({message: 'hello world!'});
 * }
 */
export const useToast = (): UseToast => {
  const dispatch = useDispatch();

  /**
   * 토스트를 띄우는 `action`을 `dispatch`하는 함수.
   * @param config duration의 단위는 ms, 기본값 `3000` message는 innerHTML로 집어넣어서 `hello<br />world!` 가능쓰
   */
  const showToast = (config: ToastConfig): void => {
    dispatch(setToastConfig(config));
  };

  return { showToast };
};
