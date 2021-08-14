import styled from '@emotion/styled';
import { SetStateAction, useEffect } from 'react';

type Props = {
  setActiveAlert: React.Dispatch<React.SetStateAction<boolean>>;
  alertMessage: string;
  submitBtn: string;
  closeBtn: string;
  excuteFunction: () => void;
  type?: string;
  setSelectedMenu?: React.Dispatch<SetStateAction<string>>;
  selectedMenu?: string;
};

function Alert({ setActiveAlert, alertMessage, submitBtn, closeBtn, excuteFunction, type }: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleExecuteFunction = () => {
    excuteFunction();
    type !== 'notice' && setActiveAlert(false);
  };

  return <AlertBox></AlertBox>;
}

export default Alert;

const AlertBox = styled.div``;
