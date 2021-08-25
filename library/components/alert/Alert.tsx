import styled from '@emotion/styled';
import { ModalLayout } from 'library/components/modal';

type Props = {
  setActiveAlert: React.Dispatch<React.SetStateAction<boolean>>;
  alertMessage: string;
  submitBtn: string;
  closeBtn: string;
  excuteFunction: () => void;
  type?: string;
  setSelectedMenu?: React.Dispatch<React.SetStateAction<string>>;
  selectedMenu?: string;
};

function Alert({
  setActiveAlert,
  alertMessage,
  submitBtn,
  closeBtn,
  excuteFunction,
  type,
  selectedMenu,
  setSelectedMenu,
}: Props): JSX.Element {
  const handleExecuteFunction = (): void => {
    excuteFunction();
    setActiveAlert(false);
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
          <button
            onClick={() => {
              setActiveAlert(false);
              selectedMenu === '로그아웃' && setSelectedMenu && setSelectedMenu('');
            }}
            className="closeBtn"
          >
            {closeBtn} {type}
          </button>
          <button onClick={handleExecuteFunction} className="submitBtn">
            {submitBtn}
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
