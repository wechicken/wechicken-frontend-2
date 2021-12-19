import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faHeart as filledHeart,
  faBookmark as filledBookmarks,
  faInfoCircle as info,
  faExclamationTriangle as error,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { Obj } from 'library/models';
import { toastSelector } from 'library/store/toast';

function Toast(): JSX.Element | null {
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  const toastConfig = useSelector(toastSelector);

  const openToast = (duration: number): void => {
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
    openToast(toastConfig.duration ?? 3000);
  }, [toastConfig]);

  if (!isToastOpen) {
    return null;
  }

  const formatType = (type: string): Obj => {
    return type === 'like'
      ? filledHeart
      : type === 'bookmark'
      ? filledBookmarks
      : type === 'info'
      ? info
      : error;
  };

  return (
    <ToastBox duration={toastConfig.duration ?? 3000}>
      <IconBox type={toastConfig.type ?? 'info'}>
        <FontAwesomeIcon
          className="icon"
          icon={formatType(toastConfig.type ?? 'info') as IconProp}
        />
      </IconBox>
      <span dangerouslySetInnerHTML={{ __html: toastConfig.message }}></span>
    </ToastBox>
  );
}

export default Toast;

const ToastBox = styled.div<{ duration: number }>`
  position: fixed;
  bottom: 50px;
  display: flex;
  max-width: 50rem;
  font-size: 14px;
  text-align: center;
  padding: 0.8rem 2.3rem;
  background-color: #272727a9;
  backdrop-filter: blur(5px);
  color: ${({ theme }) => theme.white};
  border-radius: 8px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
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

const IconBox = styled.div<{ type: string }>`
  margin-right: 8px;

  .icon {
    width: 15px;
    height: 15px;
    color: ${({ type, theme }) =>
      type === 'bookmark' ? theme.lightGrey : type === 'info' ? theme.blue : theme.vermilion};
  }
`;
