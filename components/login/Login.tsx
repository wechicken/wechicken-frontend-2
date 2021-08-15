import styled from '@emotion/styled';
import { ModalLayout } from 'library/components/modal';
import LogoBox from 'library/components/modal/LogoBox';
import GoogleLogin from './GoogleLogin';

type Props = {
  setModalOn: React.Dispatch<React.SetStateAction<boolean>>;
};

function Login({ setModalOn }: Props) {
  return (
    <ModalLayout width="675px" height="470px" closeModal={() => setModalOn(false)}>
      <LoginBox>
        <LogoBox />
        <LoginBoxRight>
          <Greeting>
            <div className="greeting">환영합니다!</div>
            <div className="type">로그인</div>
          </Greeting>
          <GoogleLogin
            setLoginSuccess={() => {}}
            setModalOn={setModalOn}
            setExistingUser={() => {}}
            handleGoogleInput={() => {}}
          />
        </LoginBoxRight>
      </LoginBox>
    </ModalLayout>
  );
}

export default Login;

const LoginBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const LoginBoxRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

const Greeting = styled.div`
  .greeting {
    font-weight: bold;
    font-size: 18px;
    line-height: 26px;
    color: #525151;
  }

  .type {
    margin-top: 12px;
    font-style: normal;
    font-weight: bold;
    font-size: 26px;
    line-height: 30px;
    color: #000000;
  }
`;
