import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { ModalLayout } from 'library/components/modal';
import { setAlert } from 'library/store/setAlert';

type Props = {
  alertMessage: string;
  submitBtnText?: string;
  closeBtnText?: string;
  onSubmit?: () => void;
  onClose?: () => void;
  type?: string;
  setSelectedMenu?: React.Dispatch<React.SetStateAction<string>>;
  selectedMenu?: string;
  width?: string;
  height?: string;
};

function Alert({
  alertMessage,
  submitBtnText = '확인',
  closeBtnText = '취소',
  onSubmit,
  onClose,
  type,
  selectedMenu,
  setSelectedMenu,
  width = '25rem',
  height = '10.9375rem',
}: Props): JSX.Element {
  const dispatch = useDispatch();
  const onClickSubmit = (): void => {
    onSubmit && onSubmit();
    dispatch(setAlert(null));
  };

  const onClickCancel = (): void => {
    onClose && onClose();
    dispatch(setAlert(null));
    selectedMenu === '로그아웃' && setSelectedMenu && setSelectedMenu('');
  };

  return (
    <ModalLayout
      width={width}
      height={height}
      padding="1.875rem"
      style={{ borderRadius: '15px' }}
      closeModal={() => dispatch(setAlert(null))}
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

  ${({ theme }) => theme.sm`
    font-size: 15px;
  `}
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
