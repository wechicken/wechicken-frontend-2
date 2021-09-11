import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { setAlert } from 'library/store/setAlert';
import { flexCenter } from 'styles/theme';

type Props = {
  executeFunction: () => void;
};

export default function MyGroupJoinModal({ executeFunction }: Props): JSX.Element {
  const dispatch = useDispatch();

  return (
    <MyGroupJoinModalContainer>
      <span>동기들의 포스트를 보고싶다면?</span>
      <button
        className="joinBtn"
        onClick={() =>
          dispatch(
            setAlert({
              alertMessage: '치킨계에 가입하시겠습니까?',
              onSubmit: executeFunction,
              submitBtnText: '가입',
            }),
          )
        }
      >
        치킨계 가입하고 전체 보기
      </button>
    </MyGroupJoinModalContainer>
  );
}

const MyGroupJoinModalContainer = styled.div`
  width: 500px;
  height: 300px;
  ${flexCenter};
  flex-direction: column;
  position: absolute;
  top: 150px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 7px 7px 30px rgba(0, 0, 0, 0.09);
  z-index: 2;

  span {
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.fontColor};
  }

  .joinBtn {
    width: 200px;
    height: 40px;
    margin-top: 30px;
    border: none;
    border-radius: 10px;
    outline: none;
    background-color: ${({ theme }) => theme.orange};
    color: ${({ theme }) => theme.white};
    opacity: 0.9;
    cursor: pointer;
  }

  .joinBtn:hover {
    opacity: 1;
  }
`;
