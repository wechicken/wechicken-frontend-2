import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { toastSelector } from 'library/store/toast';
import { useSelector } from 'react-redux';

function Toast(): JSX.Element | null {
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  const toastConfig = useSelector(toastSelector);

  const showToast = (duration: number): void => {
    if (isFirstRender || duration === 0) {
      return;
    }

    setIsToastOpen(true);

    setTimeout(() => {
      setIsToastOpen(false);
    }, duration);
  };

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  useEffect(() => {
    showToast(toastConfig.duration ?? 3000);
  }, [toastConfig]);

  if (!isToastOpen) {
    return null;
  }

  return (
    <ToastBox
      duration={toastConfig.duration ?? 3000}
      dangerouslySetInnerHTML={{ __html: toastConfig.message }}
    ></ToastBox>
  );
}

export default Toast;

// const ToastWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   position: fixed;
//   inset: 0;
//   z-index: -1;
// `;

const ToastBox = styled.div<{ duration: number }>`
  position: fixed;
  bottom: 50px;
  max-width: 50rem;
  text-align: center;
  padding: 0.8rem 2.3rem;
  background-color: white;
  color: ${({ theme }) => theme.darkGrey};
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  z-index: 100000000;

  ${({ theme }) => theme.sm`
    max-width: 80%;
  `}

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }

  animation: fadeIn 0.3s ease-in, fadeOut 0.3s ${({ duration }) => duration / 1000 - 0.3}s ease-in;
`;
