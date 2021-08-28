import styled from '@emotion/styled';
import { ModalLayout } from 'library/components/modal';

type Props = {
  setActiveAlert: React.Dispatch<React.SetStateAction<boolean>>;
  alertMessage: string;
  submitBtnText?: string;
  closeBtnText?: string;
  onSubmit?: () => void;
  onClose?: () => void;
  type?: string;
  setSelectedMenu?: React.Dispatch<React.SetStateAction<string>>;
  selectedMenu?: string;
};

function Alert({
  setActiveAlert,
  alertMessage,
  submitBtnText = '확인',
  closeBtnText = '취소',
  onSubmit,
  onClose,
  type,
  selectedMenu,
  setSelectedMenu,
}: Props): JSX.Element {
  const onClickSubmit = (): void => {
    onSubmit && onSubmit();
    setActiveAlert(false);
  };

  const onClickCancel = (): void => {
    onClose && onClose();
    setActiveAlert(false);
    selectedMenu === '로그아웃' && setSelectedMenu && setSelectedMenu('');
  };

  return (
    <ModalLayout
      width="25rem"
      height="10.9375rem"
      padding="1.875rem"
      style={{ borderRadius: '15px' }}
      closeModal={() => setActiveAlert(false)}
    >
      <AlertBox>
        <AlertText>{alertMessage}</AlertText>
        <AlertBtnBox>
          <button onClick={onClickCancel} className="closeBtn">
            {closeBtnText} {type}
          </button>
          <button onClick={onClickSubmit} className="submitBtn">
            {submitBtnText}
          </button>
        </AlertBtnBox>
      </AlertBox>
    </ModalLayout>
  );
}

export default Alert;

const AlertBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const AlertText = styled.span`
  display: flex;
  align-items: center;
  flex-grow: 1;
  font-family: ${({ theme }) => theme.fontContent};
  font-size: 17px;
  color: ${({ theme }) => theme.fontColor};
`;

const AlertBtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  button {
    width: 50px;
    height: 30px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.orange};
    color: ${({ theme }) => theme.white};
    border: none;
    outline: none;
    cursor: pointer;
  }

  button:not(:last-child) {
    margin-right: 10px;
  }

  button:hover {
    opacity: 0.8;
  }
`;
