import styled from '@emotion/styled';
import { isNil } from 'lodash-es';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { flexCenter } from 'styles/theme';

type Props = {
  alertMessage?: string;
  setSelectedMenu?: Dispatch<SetStateAction<string>>;
  selectedMenu?: string;
  setActiveAlert?: Dispatch<SetStateAction<boolean>>;
  onSubmit: () => void;
  submitBtnText?: string;
  closeBtnText?: string;
};

export default function Alert({
  alertMessage = '',
  selectedMenu,
  setSelectedMenu,
  setActiveAlert,
  onSubmit,
  submitBtnText = '확인',
  closeBtnText = '취소',
}: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = useCallback(() => {
    setActiveAlert && setActiveAlert(false);
    onSubmit();
  }, []);

  const handleCancel = useCallback(() => {
    setActiveAlert && setActiveAlert(false);

    if (selectedMenu === '로그아웃' && !isNil(setSelectedMenu)) {
      setSelectedMenu('');
    }
  }, []);

  return (
    <Wrap>
      <AlertContainer>
        <span className="alertMessage">{alertMessage}</span>
        <div className="btnContainer">
          <CloseBtn onClick={handleCancel}>{closeBtnText}</CloseBtn>
          <SubmitBtn onClick={handleSubmit}>{submitBtnText}</SubmitBtn>
        </div>
      </AlertContainer>
    </Wrap>
  );
}

const Wrap = styled.div`
  height: 100%;
  top: 0;
  right: 0;
  left: 0%;
  position: fixed;
  ${flexCenter};
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

const AlertContainer = styled.div`
  ${flexCenter};
  width: 400px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.white};
  border-radius: 15px;
  box-shadow: 0 20px 75px rgba(0, 0, 0, 0.13);
  z-index: 10;

  .alertMessage {
    margin: 0 auto;
    width: 100%;
    font-size: 17px;
    line-height: 25px;
    text-align: center;
    font-family: ${({ theme }) => theme.fontContent};
    color: ${({ theme }) => theme.fontColor};
  }

  .btnContainer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

  @media (max-width: 375px) {
    width: 300px;
    padding: 25px;
    align-items: center;

    .alertMessage {
      width: 100%;
      font-size: 16px;
    }
  }
`;
const CloseBtn = styled.button`
  ${flexCenter}
  width: 150px;
  height: 40px;
  margin: 10px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.lightGrey};
  color: ${({ theme }) => theme.white};
  cursor: pointer;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
  @media (max-width: 375px) {
    width: 100px;
  }
`;

const SubmitBtn = styled(CloseBtn)`
  background-color: ${({ theme }) => theme.orange};
`;
