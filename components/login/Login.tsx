import { useState } from 'react';
import styled from '@emotion/styled';
import GoogleLogin from 'components/login/GoogleLogin';
import LoginForm from 'components/login/LoginForm';
import CelebratingModal from 'components/login/CelebratingModal';
import { ModalLayout } from 'library/components/modal';
import Logo from 'library/components/modal/Logo';

type Props = {
  setModalOn: React.Dispatch<React.SetStateAction<boolean>>;
};

function Login({ setModalOn }: Props): JSX.Element {
  const [isExistingUser, setExistingUser] = useState(true);
  const [googleProfile, setGoogleProfile] = useState<gapi.auth2.BasicProfile>();
  const [isLoginSuccess, setLoginSuccess] = useState(false);

  const handleGoogleInput = (googleProfile: gapi.auth2.BasicProfile): void => {
    setGoogleProfile(googleProfile);
  };

  return (
    <ModalLayout width="675px" height="470px" closeModal={() => setModalOn(false)}>
      {isLoginSuccess ? (
        <CelebratingModal celebratingMessage="잠시만 기다려주세요!" />
      ) : isExistingUser ? (
        <LoginBox>
          <Logo />
          <LoginBoxRight>
            <Greeting>
              <div className="greeting">환영합니다!</div>
              <div className="type">로그인</div>
            </Greeting>
            <GoogleLogin
              setLoginSuccess={setLoginSuccess}
              setModalOn={setModalOn}
              setExistingUser={setExistingUser}
              handleGoogleInput={handleGoogleInput}
            />
          </LoginBoxRight>
        </LoginBox>
      ) : (
        googleProfile && (
          <LoginForm
            setModalOn={setModalOn}
            googleProfile={googleProfile}
            setLoginSuccess={setLoginSuccess}
            setExistingUser={setExistingUser}
          />
        )
      )}
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
